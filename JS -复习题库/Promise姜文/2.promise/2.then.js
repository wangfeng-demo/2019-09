// 1) (then中传递的函数)判断成功和失败函数的返回结果
// 2) 判断是不是promise 如果是promise 就采用他的状态
// 3) 如果不是promise 直接将结果传递下去即可

let Promise = require('./promise');
// 1) 问题1） x 和 promise2 不能是同一个人
// let p = new Promise((resolve, reject) => {
//     resolve();
// })
// let promise2 = p.then(() => {
//     return promise2
// })
// promise2.then(null, function (err) {
//     console.log(err);
// })

// let p = new Promise((resolve, reject) => { // promise1
//     resolve(100);
// });
// let promise2 = p.then(data => { // onfulfilled
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve('1000');
//                 }, 1000);
//             }))
//         }, 1000);
//     })
// })
// promise2.then(data => { // onrejected
//     console.log(data);
// }, err => {
//     console.log(err);
//     return 100
// }).then(data => {
//     console.log('s', data)
// })



// 2） 可选参数

let p = new Promise((resolve, reject) => {
    reject(123);
})

p.then(data => {
    return data;
}, err => {
    throw err;
}).then(data => {
    return data;
}, err => {
    throw err;
}).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})