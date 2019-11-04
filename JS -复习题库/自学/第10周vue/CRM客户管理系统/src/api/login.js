import axios from './index';

export function handleLogin(account, password) {
	return axios.post('/user/login', {
		account,
		password
	}).then(result => {
		if (parseInt(result.code) === 0) {
			return result.power;
		}
		return Promise.reject(result.codeText);
	});
}

export function checkLogin() {
	return axios.get('/user/login').then(result => {
		if (parseInt(result.code) === 0) {
			return true;
		}
		return Promise.reject(false);
	});
}

export function queryPower() {
	return axios.get('/user/power').then(result => {
		if (parseInt(result.code) === 0) {
			return result.power;
		}
		return Promise.reject(result.codeText);
	});
}

export function queryBaseInfo(userId) {
	let obj = {};
	userId ? obj.userId = userId : null;
	return axios.get('/user/info', {
		params: obj
	}).then(result => {
		if (parseInt(result.code) === 0) {
			return result.data;
		}
		return Promise.reject(result.codeText);
	});
}

export function resetpassword(option) {
	let params = {};
	if (typeof option === 'number') {
		params.userId = option;
	} else {
		params.password = option;
	}
	return axios.post('/user/resetpassword', params).then(result => {
		if (parseInt(result.code) === 0) {
			return true;
		}
		return Promise.reject(result.codeText);
	});
}

export function signout() {
	return axios.get('/user/signout').then(result => {
		if (parseInt(result.code) === 0) {
			return true;
		}
		return Promise.reject(result.codeText);
	});
}