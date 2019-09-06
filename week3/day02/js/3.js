var str = '你好2019www哈哈2018hello珠峰2020哈哈2021londne'; //就捕获哈哈后面的数字
var reg0 = /哈哈(\d+)([a-z]+)/g;
/*封装一个execAll的方法 可以一次性把所有符合条件的内容捕获到*/
RegExp.prototype.execAll = function (str = '') {
    // 首先查看对应的正则有没有修饰符g 
    var reg=this;
    if (!reg.global) {
        // 代表正则没有修饰符g
       reg=eval(reg.toString()+'g')
    }
    // 怎么保证str是 字符串？
    str = str.toString();
    // this =====>  reg0
    var res = reg.exec(str);
    var ary = [];
    while (res) {
        // 每次循环的时候都要让res更新
        ary.push(res);
        res = reg.exec(str);
    }
    return ary
}
console.log(reg0.execAll(str));