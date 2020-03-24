const PENDING = 'PENDING'; // 等待
const RESOLVED = 'RESOLVED'; // 成功 
const REJECTED = 'REJECTED'; // 失败
// 宏变量 

// 因为所有的promise 都遵循这个规范 ， 规定 这里这个写法应该兼容所有的promise

// bluebird Q  

const resolvePromise = (promise2, x, resolve, reject) => {
    // 判断 x 的值 和promise2 是不是同一个 如果是同一个 就不要在等待了 直接出错即可
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // promise 必会
    // 判断数据类型 typeof  constructor   instanceof   toString
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called; // 内部测试的时候 会成功和失败都调用
        try {
            let then = x.then; // 取then 有可能这个then属性是通过 defineProperty来定义的
            if (typeof then === 'function') { // 当前有then 方法 我就姑且认为他是一个promise
                then.call(x, y => { // y 可能还是一个promise,直到解析出来的结果是一个普通值为止
                    if (called) {
                        return
                    }
                    called = true; // 防止多次调用成功和失败
                    resolvePromise(promise2, y, resolve, reject); // 采用promise的成功结果将值向下传递
                }, r => {
                    if (called) {
                        return
                    }
                    called = true;
                    reject(r); // 采用失败结果向下传递
                }); // 能保证不用再次取then的值
            } else {
                // {then:1}
                resolve(x); // 说明x 是一个普通的对象 直接成功即可
            }
        } catch (e) {
            // promise 失败了 有可能还能调用成功
            if (called) {
                return
            }
            called = true
            reject(e);
        }
    } else {
        // x 是一个普通值 
        resolve(x); // 直接让promise2成功即可 
    }
}

class Promise {
    // 1.看这个属性 能否在原型上使用
    // 2.看属性是否公用
    constructor(executor) {
        this.status = PENDING // 默认是pending状态
        // 成功函数
        this.value = undefined; // 成功的值
        this.reason = undefined; // 失败的原因

        this.onResolvedCallbacks = []; // 成功的回调的数组
        this.onRejectedCallbacks = []; // 失败的回调的数组
        let resolve = (value) => {
            // 屏蔽调用的
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => fn()); // 发布
            }
        }
        // 失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject); // 默认执行器会立刻执行
        } catch (e) {
            reject(e); // 如果执行时发生错误 等价于调用了 失败方法
        }
    }
    then(onfulfilled, onrejected) { // then 目前有两个参数 then方法就是异步的
        // onfulfilled  onrejected 是可选参数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val

        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => { // executor 会立刻执行
            // 同步
            if (this.status === RESOLVED) {
                setTimeout(() => { // 宏任务 为了保证promise2 已经new完了
                    try {
                        let x = onfulfilled(this.value);
                        // x可能是普通值 也可能是promise
                        // 判断x的值 => promise2的状态
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0); // mdn 至少>=4ms
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            // 异步情况
            if (this.status === PENDING) {
                // 如果是异步就先订阅好
                this.onResolvedCallbacks.push(() => { // 重写push方法的时候
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);

                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
        })

        return promise2;
    }
}

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise;


// 第八期 最后一天报名 