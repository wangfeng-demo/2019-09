/*
 * 读取CSS目录中所有的文件，找到后缀名是.CSS的
 * 依次读取CSS文件中的内容，最后把所有内容合并在一起
 * 把合并后的结果放到DIST文件夹的index.css文件中 
 */
let {
	readdir,
	readFile,
	writeFile
} = require('./utils/promiseFS');
let less = require('less');

readdir('./css').then(result => {
	result = result.filter(item => /\.CSS$/i.test(item));
	result = result.map(item => {
		return readFile(`./css/${item}`);
	});
	return Promise.all(result);
}).then(results => {
	results = results.join('');
	//=>此时的RESULTS存储的是未经过压缩的合并后的CSS代码，接下来基于LESS模块完成CSS内容的压缩
	return new Promise((resolve, reject) => {
		less.render(results, {
			//=>LESS模块规定：设置压缩的方式
			compress: true
		}, (err, result) => {
			if (err !== null) reject(err);
			//=>RESULT是一个对象，对象的CSS属性包含压缩后的代码
			resolve(result.css);
		});
	});
}).then(css => {
	//=>把压缩后的写在指定的目录中
	return writeFile('./dist/index.css', css);
});