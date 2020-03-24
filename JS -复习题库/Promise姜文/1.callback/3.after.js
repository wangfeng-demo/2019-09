// after 在....之后  

// 词法作用域
// js的执行过程  AO 执行对象
function after(times, callback) { // 闭包
    return function () { // fn
        if (--times === 0) {
            callback();
        }
    }
}
let fn = after(3, function () { // 真正执行的函数
    console.log('really')
});
fn();
fn();
fn();