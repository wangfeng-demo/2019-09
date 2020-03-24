const PENDING = 'PENDING'; // 等待
const RESOLVED = 'RESOLVED'; // 成功 
const REJECTED = 'REJECTED'; // 失败
// 宏变量 

class Promise {
    // 1.看这个属性 能否在原型上使用
    // 2.看属性是否公用
    constructor(executor) {
        this.status = 'PENDING' // 默认是pending状态
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
    then(onfulfilled, onrejected) { // then 目前有两个参数
        // 同步
        if (this.status === RESOLVED) {
            onfulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onrejected(this.reason)
        }
        // 异步情况
        if (this.status === PENDING) {
            // 如果是异步就先订阅好
            this.onResolvedCallbacks.push(() => { // 重写push方法的时候
                // todo...
                onfulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => {
                onrejected(this.reason)
            })
        }
    }
}

module.exports = Promise