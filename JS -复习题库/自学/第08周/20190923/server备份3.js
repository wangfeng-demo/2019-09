let http = require('http'),
	url = require('url'),
	path = require('path'),
	mime = require('mime');
let {
	readFile
} = require('./utils/promiseFS');

//=>HTTP.CREATE-SERVER创建服务
let server = http.createServer((req, res) => {
	//req.url / req.method / req.headers ...
	let {
		pathname,
		query
	} = url.parse(req.url, true);
	
	pathname = path.resolve('./static') + pathname;
	let suffixREG = /\.([0-9a-zA-Z]+)$/,
		encodeREG = /^(PNG|GIF|JPG|JPEG|WEBP|BMP|ICO|SVG|MP3|MP4|WAV|OGG|M3U8)$/i,
		encoding = '',
		suffix = suffixREG.test(pathname) ? suffixREG.exec(pathname)[1] : null;
	//=>项目中我们一般认为有后缀名是为了请求WEB静态资源文件（WEB服务器处理），没有后缀名的是要请求数据（数据服务器 API接口）
	if (suffix !== null) {
		!encodeREG.test(suffix) ? encoding = 'charset=utf8;' : null;
		suffix = mime.getType(suffix);
		readFile(pathname).then(result => {
			res.writeHead(200, {
				'content-type': `${suffix};${encoding}`
			});
			res.end(result);
		}).catch(err => {
			res.writeHead(404, {
				'content-type': `application/json;charset=utf8;`
			});
			res.end(JSON.stringify(err));
		});
		return;
	}
});

//=>SERVER.LISTEN监听端口号
server.listen(8080, () => {
	console.log('server is create success！listening on 8080 port！');
});