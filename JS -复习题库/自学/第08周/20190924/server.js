let express = require('express'),
	promiseFS = require('./promiseFS'),
	bodyParser = require('body-parser');

let {
	dataHandle
} = require('./utils');

//=>创建WEB服务
let app = express(),
	port = 8080;
app.listen(port, () => console.log(`SUCCESSFULLY！PORT:${port}！`));

//=>数据接口API的请求处理
//把处理SESSION的中间件设置上 REQ.SESSION可以操作SESSION信息
let session = require('express-session');
app.use(session({
	secret: 'ZFPX',
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}
}));
//把POST请求基于请求主体传递的信息获取到，放到REQ.BODY上
app.use(bodyParser.urlencoded({
	extended: true
}));
//我们把JSON文件中所有存储的数据都获取到，放到REQ.XXX上
app.use((req, res, next) => {
	let path = './json';
	let p1 = promiseFS.readFile(path + '/user.json'),
		p2 = promiseFS.readFile(path + '/customer.json'),
		p3 = promiseFS.readFile(path + '/visit.json'),
		p4 = promiseFS.readFile(path + '/department.json'),
		p5 = promiseFS.readFile(path + '/job.json');
	Promise.all([p1, p2, p3, p4, p5]).then(results => {
		let [$USERDATA, $CUSTOMERDATA, $VISITDATA, $DEPARTMENTDATA, $JOBDATA] = results;
		req.$USERDATA = dataHandle($USERDATA);
		req.$CUSTOMERDATA = dataHandle($CUSTOMERDATA);
		req.$VISITDATA = dataHandle($VISITDATA);
		req.$DEPARTMENTDATA = dataHandle($DEPARTMENTDATA);
		req.$JOBDATA = dataHandle($JOBDATA);
		next();
	}).catch(err => {
		res.status(500);
		res.send(err);
	});
});

//=>构建EXPRESS路由
//请求的API地址符合/XXX的，都进入到指定的路由中
app.use('/user', require('./routes/user'));
app.use('/department', require('./routes/department'));
app.use('/job', require('./routes/job'));
app.use('/customer', require('./routes/customer'));
app.use('/visit', require('./routes/visit'));

//=>静态资源文件的请求处理
app.use(express.static('./client'));
app.use((req, res) => {
	res.status(404);
	res.send(`很抱歉，您请求的资源文件 ${req.path} 不存在！`);
});