import axios from './index';

export function queryCustomList(options) {
	let params = {
		lx: 'all',
		type: '',
		search: '',
		page: 1,
		limit: 10
	};
	params = Object.assign(params, options);
	return axios.get('/customer/list', {
		params
	}).then(result => {
		if (parseInt(result.code) === 0) {
			return result;
		}
		return Promise.reject(result.codeText);
	});
}