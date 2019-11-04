let fs = require('fs');
/* ==READ-DIR== */
//=>读取指定目录（相对目录或者绝对目录都可以）中的文件目录
// let result = fs.readdirSync('./');
// console.log(result); //=>["fs1.js","note.md","node_modules"...]

//异步操作是：读取成功后触发回调函数执行
// fs.readdir('./', (err, result) => {
// 	//=>ERR存储读取失败后的错误信息
// 	//=>RESULT存储读取成功后的结果（此时ERR=NULL）
// 	if (err === null) {
// 		console.log(result);
// 	}
// });

/* ==READ-FILE== */
//=>同步或者异步读取某一个文件中的内容
//fs.readFileSync([path],[encoding])：不设置编码格式，默认得到的是Buffer文件流（编码）格式的数据，设置UTF8，得到的结果是字符串（例如:JSON格式、HTML或者CSS等格式）；但是对于富媒体资源（例如：图片、音视频等）我们读取和传输的过程中就是基于BUFFER文件流格式操作的，所以不要设置UTF8读取；
/* let result = fs.readFileSync('./add.png');
console.log(result); */
//fs.readFile([path],[encoding],[callback])
/* fs.readFile('./package.json', 'utf8', (err, result) => {
	if (err !== null) return;
	console.log(result);
}); */

/* ==WRITE-FILE== */
//=>向某个文件中写入内容（如果文件不存在，它会默认创建一个文件再写入，而且写入方式是覆盖式写入“把之前文件中的内容全部覆盖”） =>appendFile是追加写入内容
//=>文件不存在可以，但是需要保证路径的正确性
//=>fs.writeFileSync([pathname],[string/buffer content],[encoding])：没有返回值
/* fs.writeFileSync('./AA.txt', '你好世界~~', 'utf8');
fs.appendFileSync('./AA.txt', 'hello world~~', 'utf8'); */

//=>异步操作的方式可以监听其成功或者失败
/* fs.writeFile('./AA.txt', '哈哈哈~~我学会NODE了~~', 'utf8', err => {
	console.log(err);
}); */
// fs.writeFileSync('./js/AA.txt', '哈哈哈~~我学会NODE了~~', 'utf8'); =>这样会直接的报错 （可以基于try/catch异常捕获）
/* let err = null;
try {
	fs.writeFileSync('./js/AA.txt', '哈哈哈~~我学会NODE了~~', 'utf8');
} catch (e) {
	err = e;
}
if (err !== null) {
	console.log('执行报错~~');
} */

//=>把某个文件及里面的内容拷贝到新的目录中（替换型拷贝：原来目录中存在这个文件，新拷贝的会替换原来的）
/* fs.copyFile('./AA.txt', './CC.txt', err => {
	console.log(err);
}); */

//=>创建目录
/* fs.mkdir('./js', err => {
	console.log(err);
}); */

//=>删除目录（但是一定要保证目录中不在有文件，否则不让删除）
/* fs.rmdir('./js', err => {
	console.log(err);
}); */

//=>删除文件
// fs.unlink('./js/1.js', err => {});

/* ======================= */
/* let {
	readFile
} = require('./utils/promiseFS');

readFile('./js/path.js').then(result => {
	console.log(result);
}).catch(reason => {
	console.log(reason);
}); */