let http = require('http'),
	url = require('url'),
	path = require('path');
let {
	readFile
} = require('./utils/promiseFS');

//=>HTTP.CREATE-SERVER创建服务
let server = http.createServer((req, res) => {
	let {
		//=>URL存储的是请求信息中的：资源文件的路径名称和问号传参的信息
		url: requestURL
	} = req;
	let {
		//=>请求资源的路径名称
		pathname,
		//=>问号传参信息(键值对)
		query
	} = url.parse(requestURL, true);

	//=>根据请求的路径和名称，让其去STATIC文件中查找对应的资源文件内容
	pathname = path.resolve('./static') + pathname;
	readFile(pathname).then(result => {
		//=>返回的数据格式一般都是字符串或者BUFFER  
		//WRITE服务器返回信息（可以执行多次）
		//END告诉客户端返回的信息已经结束了（必须写的）
		//RES.END相当于基于响应主体返回信息，还需要掌握基于响应头返回信息RES.WRITE-HEAD(STATUS,OPTIONS)
		res.writeHead(200, {
			//=>告诉客户端返回的数据格式和编码方式：返回的格式类型是MIME类型（每一种文件都有一个自己所属的类型，而这个类型就是MIME类型）
			'content-type': 'text/css'
		});
		res.end(result);
	}).catch(err => {
		res.end('not found!');
	});
});

//=>SERVER.LISTEN监听端口号
server.listen(8080, () => {
	console.log('server is create success！listening on 8080 port！');
});