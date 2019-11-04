let express = require('express'),
	route = express.Router(); //=>ROUTE就是创建的一个路由，用法和APP一样

let {
	md5Handle,
	success,
	queryJOB
} = require('../utils');

//=>登录接口
route.post('/login', (req, res) => {
	//1.获取客户端传递的信息
	let {
		account,
		password
	} = req.body;
	//2.把用户传递进来的MD5加密后的密码进行二次加密
	password = md5Handle(password);
	//3.到USER数据中查找符合账户密码的这一项
	let result = req.$USERDATA.find(item => {
		return (item.name === account || item.email === account || item.phone === account) && item.password === password;
	});
	//4.根据结果返回不同的信息
	if (result) {
		//5.根据员工获取其对应的权限检验码
		let power = (queryJOB(req, result.jobId) || {}).power || '';
		//6.通过设置SESSION来保存登录态
		req.session.userId = result.id;
		req.session.userPower = power;
		success(res, {
			power
		});
		return;
	}
	success(res, {
		code: 1,
		codeText: '账号密码不匹配~'
	});
});

//=>验证是否登录
route.get('/login', (req, res) => {
	let userId = req.session.userId;
	if (userId) {
		success(res);
		return;
	}
	success(res, {
		code: 1,
		codeText: '当前客户端没有登录~'
	});
});

//=>退出登录
route.get('/signout', (req, res) => {
	req.session.userId = null;
	req.session.userPower = null;
	success(res);
});

module.exports = route;