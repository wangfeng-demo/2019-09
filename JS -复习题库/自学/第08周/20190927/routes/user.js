let express = require('express'),
	route = express.Router(),
	promiseFS = require('../promiseFS');

let {
	md5Handle,
	success,
	queryJOB,
	queryDEPARTMENT,
	queryUSER
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

//=>获取员工列表信息
route.get('/list', (req, res) => {
	//1.接收客户端问号传递的参数信息
	let {
		departmentId = 0,
			search = ''
	} = req.query;
	//2.筛选出对应的用户信息
	departmentId = parseInt(departmentId);
	if (departmentId !== 0) {
		req.$USERDATA = req.$USERDATA.filter(item => {
			return parseInt(item.departmentId) === departmentId;
		});
	}
	if (search !== '') {
		req.$USERDATA = req.$USERDATA.filter(item => {
			return item.name.includes(search) || item.phone.includes(search) || item.email.includes(search);
		});
	}
	//3.按照API文档要求，把筛选出来的信息进行格式化处理
	req.$USERDATA = req.$USERDATA.map(item => {
		return {
			id: item.id,
			name: item.name,
			sex: item.sex,
			email: item.email,
			phone: item.phone,
			departmentId: item.departmentId,
			department: (queryDEPARTMENT(req, item.departmentId) || {}).name || '',
			jobId: item.jobId,
			job: (queryJOB(req, item.jobId) || {}).name || '',
			desc: item.desc
		}
	});
	//4.返回给客户端
	if (req.$USERDATA && req.$USERDATA.length > 0) {
		success(res, {
			data: req.$USERDATA
		});
		return;
	}
	success(res, {
		code: 1,
		codeText: '暂时没有找到相匹配的信息~~'
	});
});

//=>获取员工详细信息
route.get('/info', (req, res) => {
	let {
		userId = req.session.userId
	} = req.query;
	let data = queryUSER(req, userId) || {};
	data = {
		id: data.id,
		name: data.name,
		sex: data.sex,
		email: data.email,
		phone: data.phone,
		departmentId: data.departmentId,
		department: (queryDEPARTMENT(req, data.departmentId) || {}).name || '',
		jobId: data.jobId,
		job: (queryJOB(req, data.jobId) || {}).name || '',
		desc: data.desc
	};
	if (typeof data.id !== 'undefined') {
		success(res, {
			data: data
		});
		return;
	}
	success(res, {
		code: 1,
		codeText: '没有找到对应的信息~~'
	});
});

//=>删除员工信息
route.get('/delete', (req, res) => {
	//1.获取登录用户的权限校验码，对于重要操作，服务器进行二次权限校验
	let power = req.session.userPower;
	if (!power.includes('userhandle')) {
		res.status(401);
		res.send({
			code: 1,
			codeText: '您无权限访问这个操作~~'
		});
		return;
	}
	//2.有权限再进行正常的删除操作
	let flag = false;
	let {
		userId = 0
	} = req.query;
	req.$USERDATA = req.$USERDATA.map(item => {
		if (parseInt(item.id) === parseInt(userId)) {
			flag = true;
			return {
				...item,
				state: 1
			};
		}
		return item;
	});
	//我们需要把最新修改的数据写入到JSON中
	if (!flag) {
		success(res, {
			code: 1,
			codeText: '当前用户不存在~~'
		});
		return;
	}
	promiseFS.writeFile('./json/user.json', req.$USERDATA).then(() => {
		success(res);
	}).catch(err => {
		success(res, {
			code: 1,
			codeText: err
		});
	});
});

//=>增加员工信息
route.post('/add', (req, res) => {
	let {
		name = '',
			sex = 0,
			email = '',
			phone = '',
			departmentId = 0,
			jobId = 0,
			desc = ''
	} = req.body;
	req.$USERDATA.push({
		id: req.$USERDATA.length === 0 ? 1 : parseInt(req.$USERDATA[req.$USERDATA.length - 1]['id']) + 1, //=>自增长:用最大的ID+1
		name,
		password: '8376ac810bb9f231d28fcf1f',
		sex,
		email,
		phone,
		departmentId,
		jobId,
		desc,
		time: new Date().getTime(),
		state: 0
	});

	promiseFS.writeFile('./json/user.json', req.$USERDATA).then(() => {
		success(res);
	}).catch(err => {
		success(res, {
			code: 1,
			codeText: '增加失败~~'
		});
	});
});

//=>修改员工信息
route.post('/update', (req, res) => {
	let flag = false;
	let {
		userId = 0
	} = req.body;
	req.$USERDATA = req.$USERDATA.map(item => {
		if (parseInt(item.id) === parseInt(userId)) {
			flag = true;
			return {
				...item,
				...req.body
			};
		}
		return item;
	});
	if (!flag) {
		success(res, {
			code: 1,
			codeText: '当前用户不存在~~'
		});
		return;
	}
	promiseFS.writeFile('./json/user.json', req.$USERDATA).then(() => {
		success(res);
	}).catch(err => {
		success(res, {
			code: 1,
			codeText: '修改失败~~'
		});
	});
});

module.exports = route;