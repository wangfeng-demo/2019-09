//'node 的模块化 是循环commitjs 规范
let qqq = require('./2.js')
console.log(qqq);
qqq.f()
//每一个js文件对node来说都是一个大闭包
//require _dirname _filename _module.exports exports
// 以上五个都是属于当前js文件的私有变量
//require是用来导出文件
//module.exports 和 exports都是用来导出内容的
//——dirname 是当前文件所以在文文件夹的绝对路径
// _filename 是当前文件的绝对路径
console.log('文件夹路径',__dirname);
console.log('文件路径',__filename);
//npm i less less-loader --save-dev 安装依赖
//npm run 对应的脚本命令在package.json的script中对用的属性名
/* 
  装上了less 和 less-loader
  修改过package.json文件 噶了对应script 属性中的myqqq 有对应的less文件
*/

