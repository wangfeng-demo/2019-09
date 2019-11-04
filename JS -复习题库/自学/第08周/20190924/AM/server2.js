let express = require('express'),
	promiseFS = require('./promiseFS');
let app = express();
app.listen(8080, () => {
	console.log('SERVER SUCCESSFULLY！PORT：8080！');
});

//=>数据API请求的处理  app.get/post/delete/put/head...
//客户端请求地址 http://127.0.0.1:8080/list?lx=pro GET，我们把package.json中的dependencies给其返回（如果lx=dev，我们把devDependencies返回）
app.get('/list', (req, res) => {
	let {
		lx = 'pro'
	} = req.query;
	promiseFS.readFile('./package.json').then(result => {
		result = JSON.parse(result);
		result = lx === 'dev' ? result.devDependencies : result.dependencies;
		res.status(200);
		res.type('application/json');
		res.send(result);
	}).catch(err => {
		res.status(500);
		res.type('application/json');
		res.send(err);
	});
});

//POST请求 http://127.0.0.1:8080/add 请求主体传递信息 name=zhufeng&year=10，服务器接收到请求后把信息存储在本地的AA.json文件中，返回给客户端成功或者失败
app.post('/add', (req, res) => {
	let chunk = '';
	req.on('data', chart => {
		//=>正在分批接收客户端传递的请求主体信息 CHART:当前接收的部分
		chunk += chart;
	});
	req.on('end', () => {
		let qs = require('qs');
		// qs.stringify qs.parse =>实现JSON对象和URLENCODED格式的转化
		console.log(qs.parse(chunk));
	});
});

//=>静态资源文件的请求处理
app.use(express.static('./client'));
app.use((req, res) => {
	res.status(404);
	res.send('NOT FOUND~~');
});