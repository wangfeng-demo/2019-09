let express = require('express'),
	promiseFS = require('./promiseFS'),
	bodyParser = require('body-parser');
let app = express();
app.listen(8080, () => {
	console.log('SERVER SUCCESSFULLY！PORT：8080！');
});

//=>中间件:在创建完服务和处理数据(文件)请求之前,我们提前做一些事情(公共的事情)
//=>例如：我们需要在所有的请求之前，把客户端基于请求主体传递的信息获取到，存放到req.body属性上，这样以后到具体接口的处理方法中，想要获取信息直接通过req.body获取即可
// app.use((req,res,next)=>{})：使用中间件  next执行是让其继续执行下面该做的事情
/* app.use((req, res, next) => {
	let chunk = '';
	req.on('data', chart => chunk += chart);
	req.on('end', () => {
		let qs = require('qs');
		req.body = qs.parse(chunk);
		next(); //=>一定要执行，不执行不再往下走了
	});
}); */
//=>通过执行不同的方法，把客户端传递的内容转化为对象存放在REQ.BODY上  bodyParser.urlencoded/json/raw...
app.use(bodyParser.urlencoded({
	extended: true
}));

//=>数据API请求的处理
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
	res.status(200);
	res.type('application/json');
	promiseFS.writeFile('./AA.json', req.body).then(() => {
		res.send({
			code: 0,
			codeText: 'OK'
		});
	}).catch(err => {
		res.send({
			code: 1,
			codeText: 'NO'
		});
	});
});

//=>静态资源文件的请求处理
app.use(express.static('./client'));
app.use((req, res) => {
	res.status(404);
	res.send('NOT FOUND~~');
});