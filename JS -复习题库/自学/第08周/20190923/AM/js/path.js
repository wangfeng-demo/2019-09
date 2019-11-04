/* let path = require('path');
let {
	readFile
} = require('../utils/promiseFS');

readFile('../package.json').then(result => {
	console.log(result);
}).catch(reason => {
	console.log(reason);
}); */

//=>获取当前模块所在的绝对路径 "E:\...\js\"
// console.log(__dirname);

//=>获取当前NODE执行时所在的绝对目录（我们一般认为执行的目录就是项目根目录）
// console.log(path.resolve()); //=>E:\201908\第八周\20190923
//=>如果传递了一个相对目录，也是以获取的绝对目录为依托，再查找对应的目录
// console.log(path.resolve('../package.json')); //=>E:\201908\第八周\package.json