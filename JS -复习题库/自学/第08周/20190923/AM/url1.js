let url = require('url');
//=>url.parse(str,true)用来解析URL中每一部分信息的，第二个参数传TRUE，自动会把问号参数解析成键值对的方式，存储在query属性中
// query：问号传递参数的键值对
// pathname：请求路径名称

let str = 'http://www.zhufengpeixun.cn:80/stu/index.html?lx=1&from=weixin#teacher';
console.log(url.parse(str, true));