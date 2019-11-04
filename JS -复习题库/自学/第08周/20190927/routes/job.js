let express = require('express'),
	route = express.Router();

let {
	success
} = require('../utils');

route.get('/list', (req, res) => {
	req.$JOBDATA = req.$JOBDATA.map(item => {
		return {
			id: item.id,
			name: item.name,
			desc: item.desc,
			power: item.power
		}
	});
	if (req.$JOBDATA && req.$JOBDATA.length > 0) {
		success(res, {
			data: req.$JOBDATA
		});
		return;
	}
	success(res, {
		code: 1,
		codeText: '暂无匹配的数据~~'
	});
});

module.exports = route;