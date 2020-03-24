// Promise.all 全部 可以实现等待所有的异步执行完后 拿到统一结果
// 解决异步并发 同步处理结果
let Promise1 = require('./promise');

let fs = require('fs');
// Promise.defer() 可以解决封装嵌套的问题  
function read(url) {
    //return new Promise((resolve, reject) => {
    let dfd = Promise1.defer()
    fs.readFile(url, 'utf8', function (err, data) {
        if (err) dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise;
    // });
}
const isPromise = (value) => {
    if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
        if (typeof value.then === 'function') {
            return true;
        }
    } else {
        return false;
    }
}
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let index = 0; // 解决多个异步的并发问题 要使用计数器

        function processData(key, value) {
            arr[key] = value;
            if (++index == values.length) {
                resolve(arr);
            }
        }

        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            if (isPromise(current)) {
                current.then((data) => {
                    processData(i, data);
                }, reject);
            } else {
                processData(i, current);
            }
        }
    })
}
// 静态方法 全部成功就成功 有任何一个失败就失败了
Promise.all([1, 2, 3, read('./name.txt'), read('./age.txt'), 6, 7]).then(data => {
    console.log(data);
})