// finally 最终的  try catch finally  es9// node 11版本是支持


let p = new Promise((resolve, reject) => {
    reject(1000);
});
// 1) 如果放的是普通值会将这个值 包装成promise，如果放的是promise 会等待这个promise执行完后再继续执行
// Promise.resolve(1).then(data => {
//     console.log(data);
// })





// Promise.resolve.finally = function (cb) {
//     return p.then(
//         data => Promise.resolve(cb()).then(() => data),
//         err => Promise.resolve(cb()).then(() => {
//             throw err
//         })
//     )
// }


Promise.prototype.finally = function (cb) {
    return p.then(data => {
        // Promise.resolve() 可以等待这个promise执行完成 
        return Promise.resolve(cb()).then(() => data)
        // finally 传入的函数 无论成功或者失败 都会执行
        // return data; // 如果是成功走到下一个人的成功里
    }, err => {
        return Promise.resolve(cb()).then(() => {
            throw err
        });
    })
}
p.finally(() => { // 返回的是一个promise实例
    console.log('最终的');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })
}).then(data => {
    console.log(data);
}).catch(e => {
    console.log('err', e);
})


// generator co