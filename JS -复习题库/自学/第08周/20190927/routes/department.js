let express = require('express'),
	route = express.Router();

let {
	success
} = require('../utils');

route.get('/list', (req, res) => {
	req.$DEPARTMENTDATA = req.$DEPARTMENTDATA.map(item => {
		return {
			id: item.id,
			name: item.name,
			desc: item.desc
		}
	});
	if (req.$DEPARTMENTDATA && req.$DEPARTMENTDATA.length > 0) {
		success(res, {
			data: req.$DEPARTMENTDATA
		});
		return;
	}
	success(res, {
		code: 1,
		codeText: '暂无匹配的数据~~'
	});
});

module.exports = route;