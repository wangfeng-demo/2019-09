/*
 * 服务器端要做的常规任务
 *   1.首先想干事需要有一个服务（创建服务：IIS/NGINX/APPACHE/NODE[HTTP/HTTPS内置模块]） =>端口号
 *   2.接收客户端的请求信息（请求静态资源文件的、也有请求数据的）
 *   3.查找到对应的资源文件内容或者对应的数据信息
 *   4.把找到的内容返回给客户端 
 */
let http = require('http'),
	url = require('url');

//=>HTTP.CREATE-SERVER创建服务
let server = http.createServer((req, res) => {
	//=>当客户端向当前服务发送请求的时候，会触发此回调函数（请求N次，回调函数被执行N次），而且每一次都能获取本次请求的相关信息
	//req:request REQ对象中存储了客户端的请求信息
	//res:response RES对象中提供了对应的属性和方法，可以让服务器返回给客户端信息
	res.end('hello world~~');
});

//=>SERVER.LISTEN监听端口号
server.listen(8080, () => {
	//=>当服务创建成功，并且端口号已经监听完成，触发此回调函数执行
	console.log('server is create success！listening on 8080 port！');
});

/* let PORT = 80;
function listen(PORT) {
	try {
		server.listen(PORT, () => {
			console.log(`服务已经基于${PORT}端口启动，请勿关闭！`);
		});
	} catch (err) {
		PORT++;
		listen(PORT);
	}
}
listen(80); */