let express = require('express');

//=>APP.LISTEN:创建一个WEB服务，监听端口号
let app = express();
app.listen(8080, () => {
	console.log('SERVER SUCCESSFULLY！PORT：8080！');
});

//=>静态资源文件的请求处理
//express.static([PATH])：到指定的目录中查找客户端需要的资源文件内容，并且将其返回
app.use(express.static('./client'));
app.use((req, res) => {
	//=>执行STATIC并没有找到对应的资源文件（我们可以做404处理）
	res.status(404);
	res.send('NOT FOUND~~');
	//=>还可以重定向
	// res.redirect(301, 'http://www.zhufengpeixun.cn/');
});

/*
 * REQUEST对象(REQ)
 *    req.path：存储请求地址的路径名称
 *    req.query：存储问号传参的相关信息（对象）
 *    req.body：在配合body-parser中间件的情况下，req.body存储的是请求主体传递过来的信息
 *    req.method：请求方式
 *    req.get：获取响应头信息
 * RESPONSE对象(RES)
 *    res.end：类似于原生的操作,结束响应并返回内容
 *    res.json：返回给客户端内容，只不过传递的数据可以是JSON对象（内部会帮我们把其转换为JSON字符串 =>服务返回给客户端的内容一般都是字符串或者BUFFER格式）
 *    res.type：返回content-type的类型值
 *    res.send：最常用的给客户端返回信息（可以传递对象/PATH/BUFFER/TXT等），基于SEND是通过响应主体返回给客户端信息
 *    res.status：返回状态码
 *    res.set：设置响应头信息  res.set([KEY],[VALUE])  res.set({KEY:VALUE,...})
 */
