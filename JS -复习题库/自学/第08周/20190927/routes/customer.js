let express = require('express'),
	route = express.Router();

let {
	success,
	queryUSER
} = require('../utils');

route.get('/list', (req, res) => {
	let {
		lx = 'all',
			type = '',
			search = '',
			limit = 10,
			page = 1
	} = req.query;
	//=>如果LX=MY，不论有啥权限，只获取自己的客户信息；如果LX=ALL，我们需要查看用户的权限，有DEPARTCUSTOMER可以查看部门全部客户，有ALLCUSTOMER可以查看整个公司的客户，如果没有这两个权限，也让其只能看自己的客户；
	let power = req.session.userPower;
	if (lx === 'my') {
		req.$CUSTOMERDATA = req.$CUSTOMERDATA.filter(item => {
			return parseInt(item.userId) === parseInt(req.session.userId);
		});
	} else {
		if (power.includes('departcustomer') && !power.includes('allcustomer')) {
			req.$CUSTOMERDATA = req.$CUSTOMERDATA.filter(item => {
				let departmentId = (queryUSER(req, req.session.userId) || {}).departmentId || 0;
				return parseInt(item.departmentId) === parseInt(departmentId);
			});
		}
		if (!power.includes('departcustomer') && !power.includes('allcustomer')) {
			req.$CUSTOMERDATA = req.$CUSTOMERDATA.filter(item => {
				return parseInt(item.userId) === parseInt(req.session.userId);
			});
		}
	}
	//=>TYPE和SEARCH的校验
	if (type !== '') {
		req.$CUSTOMERDATA = req.$CUSTOMERDATA.filter(item => {
			return item.type === type;
		});
	}
	if (search !== '') {
		req.$CUSTOMERDATA = req.$CUSTOMERDATA.filter(item => {
			return item.name.includes(search) || item.phone.includes(search) || item.email.includes(search) || item.weixin.includes(search) || item.QQ.includes(search);
		});
	}
	//=>分页的处理
	req.$CUSTOMERDATA.reverse();
	let total = req.$CUSTOMERDATA.length,
		totalPage = Math.ceil(total / limit),
		data = [];
	for (let i = (page - 1) * limit; i <= page * limit - 1; i++) {
		let item = req.$CUSTOMERDATA[i];
		if (!item) break;
		data.push({
			id: item.id,
			name: item.name,
			sex: item.sex,
			phone: item.phone,
			email: item.email,
			weixin: item.weixin,
			QQ: item.QQ,
			type: item.type,
			address: item.address,
			userId: item.userId,
			userName: (queryUSER(req, item.userId) || {}).name || ''
		});
	}
	//=>返回给客户端数据
	if (data.length > 0) {
		success(res, {
			page,
			limit,
			total,
			totalPage,
			data
		});
		return;
	}
	success(res, {
		code: 1,
		codeText: '暂无匹配的数据~~'
	});
});
module.exports = route;