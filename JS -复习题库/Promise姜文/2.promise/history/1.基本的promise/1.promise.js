// promise的特点  
// 承诺 我答应你... promise是一个类 


// 1） 里面有三个状态 等待态(默认) 成功态 失败态 一旦成功了就不能失败,反过来也一样
// resolve 代表的是成功 reject代表的是失败
// 2) 每个promise实例都有一个then方法
// 3) 如果new Promise的时候 报错了 会变成失败态 (抛错也算失败)


let Promise = require('./promise')
let promise = new Promise((resolve, reject) => { // executor 执行器
    setTimeout(() => {
        resolve('成功')
    }, 1000);
});
promise.then(data => { // 成功
    console.log(data,1);
}, err => { //失败
    console.log('err', err)
});

promise.then(data => { // 成功
    console.log(data,2);
}, err => { //失败
    console.log('err', err)
});

promise.then(data => { // 成功
    console.log(data,3);
}, err => { //失败
    console.log('err', err)
});