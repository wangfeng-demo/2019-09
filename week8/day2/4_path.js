// let path = require('path');
let url = require('url')
// console.log(path.resolve('./qqq'));
// console.log(path.resolve(__dirname, './qqq')); //可以拼接成一个绝对路径


//url.parse(xxx) 一般用来解析url上每一部分的信息 第二个参数是 true 会自动把问号传参解析成键值对的方式
//存储在query中
//query:问号传参的键值对 常用
// pathname 请求路径名称 常用
let str = 'http://baidu.com?a=12&b=13&c=14#qqq';
console.log(url.parse(str,true).query);

