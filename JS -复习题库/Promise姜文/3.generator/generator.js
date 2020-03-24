// dva  generator es6规范里 可以和promise进行配合

// 这就是一个generator 函数 ， 特点就是可以暂停
// *   yield 产出
// iterator 迭代器


// for of 循环 必须要有 iterator   (Array.from  [...likeArray])

// let obj = {
//     0: 1,
//     1: 2,
//     *[Symbol.iterator]() { // 可迭代的方法
//         // 迭代器 默认就是一个对象 具备 next方法 和 调用后返回value和done 的属性
//         for (let i = 0; i < this.length; i++) {
//             yield this[i]
//         }
//         // return {
//         //     next: () => {
//         //         return {
//         //             value: this[index],
//         //             done: this.length === index++
//         //         }
//         //     }
//         // }
//     }, // 元编程 就是可以更改js的行为
//     length: 2
// }
// console.log([...obj]); // 生成器的应用 用来生成迭代器的
// function* read() {
//     yield 1;
//     yield 2;
//     yield 3;
//     return 100
// }
// let it = read();
// console.log(it.next()); // {value:1,done:false}
// console.log(it.next()); // {value:2,done:false}
// console.log(it.next()); // {value:3,done:false}
// console.log(it.next()); // {value:3,done:false}


// function* read() {
//     let a = yield 'hello';
//     console.log(a);
//     let b = yield 'world';
//     console.log(b);
// }
// // 1) 碰到yield 就停止
// let it = read();
// console.log(it.next()) // 第一次next方法传递的参数是没有任何意义的
// console.log(it.next(1)) // 会传递给上一次yield的返回值
// console.log(it.next(2))
let fs = require('fs').promises; // 他可以直接将fs中的方法变成promise 10+
function* read() {
    try {
        let content = yield fs.readFile('./name1.txt', 'utf8');
        let r = yield fs.readFile(content, 'utf8');
        return r;
    } catch (e) {
        console.log("err", e)
    }
}
// generator -runtime

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {
                value,
                done
            } = it.next(data);
            if (!done) {
                Promise.resolve(value).then(data => {
                    next(data); // 递归
                }, (err) => {
                    // it.throw(err); // 可以捕获generator 中异常 
                    reject();
                });
            } else {
                resolve(data);
            }
        }
        next();
    })
}
co(read()).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})
// let it = read();
// // 循环 循环不支持异步  递归  
// let {
//     value,
//     done
// } = it.next();
// Promise.resolve(value).then(data => {
//     let {
//         value,
//         done
//     } = it.next(data);
//     Promise.resolve(value).then(data => {
//         let {
//             value,
//             done
//         } = it.next(data);
//         console.log(value)
//     })
// })



let fs = require('fs').promises; // 他可以直接将fs中的方法变成promise 10+
async function read() {
    try {
        let content = await fs.readFile('./name.txt', 'utf8');
        let r = await fs.readFile(content, 'utf8');
        let c = await 123
        return c;
    } catch (e) {
        console.log("err", e)
    }
}
/// 基于generator + co 

read().then(data => {
    console.log(data);
})

// 1) 回调 高阶函数 aop
// 2) promise实现原理 发布订阅 + 回调
// 3) generator  + co
// 4) async + await



// 作业： 1先用 2理解 3编写
// Promise.resolve方法的实现 / Promise.reject
// 实现Promise.race  和 Promise.catch Promise.try方法



let fs = require('fs')

function promise(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

function promises(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            obj[key] = promise(obj[key]); // AOP
        }
    }
}
promises(fs);
fs.readFile('name.txt', 'utf8').then(data => {
    console.log(data);
});


// 实现promises方法