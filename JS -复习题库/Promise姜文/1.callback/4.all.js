let fs = require('fs'); // file System
// 文件名  编码  callback

// 同时写两个异步方法
// let school = {}

// function out() {
//     if (Object.keys(school).length === 100) {
//         console.log(school)
//     }
// }
function after(times, cb) {
    let school = {}
    return function (key, value) {
        school[key] = value
        if (--times == 0) { // 如果达到次数就执行after方法的回调函数
            cb(school); // 并且将结果传入
        }
    }
}
let out = after(2, function (result) { // 公用处理异步方式
    console.log(result)
})
// after
// 串行  第一个走完 走第二个  并行：并发
fs.readFile('./name.txt', 'utf8', function (err, data) {
    out('name', data)
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
    out('age', 10)
})
// 最终拿到一个整体的结果  {name:'zf',age:10}

// 1) 通过回调函数来解决 after函数
// 2) 发布订阅模式 发布和订阅