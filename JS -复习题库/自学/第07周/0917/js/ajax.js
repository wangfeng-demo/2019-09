/*
 * 支持的功能
 *   1.支持全局默认配置项 _ajax.defaults.xxx=xxx
 *   2.发送请求_ajax.get/post...
 *   3.每一次请求都会返回PROMISE实例，基于PROMISE设计模式进行管理
 *   4.支持_ajax.all
 */
~ function () {
	//=>发送AJAX请求，且基于PROMISE进行管理
	class MyAjax {
		constructor(url, options) {
			this.url = url;
			this.options = options;
			return this.init();
		}
		//=>发送AJAX请求（基于PROMISE来管理）
		init() {
			let {
				url,
				options: {
					baseURL,
					withCredentials,
					headers,
					transformRequest,
					transformResponse,
					validateStatus,
					params,
					data,
					cache,
					method
				}
			} = this;
			//=>保证响应拦截器中信息的合法性
			!Array.isArray(transformResponse) ? transformResponse = [] : null;
			new Array(2).fill(null).forEach((item, index) => {
				typeof transformResponse[index] !== 'function' ? transformResponse[index] = null : null;
			});

			return new Promise((resolve, reject) => {
				let xhr = new XMLHttpRequest;

				//=>URL的处理
				url = baseURL + url;
				if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
					if (params) {
						let result = ``;
						for (let attr in params) {
							if (!params.hasOwnProperty(attr)) break;
							result += `&${attr}=${params[attr]}`;
						}
						result = result.substring(1);
						url += `${url.indexOf('?')===-1?'?':'&'}${result}`;
					}
					if (cache === false) {
						url += `${url.indexOf('?')===-1?'?':'&'}_=${Math.random()}`;
					}
				}
				xhr.open(method, url);

				//=>结果处理
				xhr.onreadystatechange = () => {
					let resultFlag = validateStatus(xhr.status);
					if (!resultFlag) {
						reject({
							status: xhr.status,
							statusText: xhr.statusText,
							request: xhr
						});
						return;
					}
					if (xhr.readyState === 4) {
						let res_headers = {};
						xhr.getAllResponseHeaders().split(/\n/).forEach(item => {
							let [key = '', value = ''] = item.split(':');
							if (key.trim() === '') return;
							res_headers[key.trim()] = value.trim();
						});
						resolve({
							status: xhr.status,
							statusText: xhr.statusText,
							request: xhr,
							data: JSON.parse(xhr.responseText),
							headers: res_headers
						});
					}
				}

				//=>跨域处理
				xhr.withCredentials = withCredentials;

				//=>设置请求头
				if (headers) {
					for (let attr in headers) {
						if (!headers.hasOwnProperty(attr)) break;
						xhr.setRequestHeader(attr, encodeURI(headers[attr]));
					}
				}

				//=>请求拦截器：请求主体传递信息的拦截
				if (/^(POST|PUT)$/i.test(method)) {
					typeof transformRequest === 'function' ? data = transformRequest(data) : null;
				} else {
					data = null;
				}
				xhr.send(data);
			}).then(...transformResponse);
		}
	}

	//=>创建_ajax管理调用
	function _init(options = {}) {
		//=>参数初始化：HEADERS需要特殊处理（把用户OPTIONS中传递的HEADERS，和DEFAULTS中的HEADERS进行合并，而不是整体替换），其余的配置项直接用OPTIONS中的替换DEFAULTS中的即可；
		let optionsHeaders = options.headers;
		_ajax.defaults.headers = Object.assign(_ajax.defaults.headers, optionsHeaders);
		delete options.headers;
		return Object.assign(_ajax.defaults, options);
	}

	function _ajax() {}

	_ajax.defaults = {
		//=>全局配置项
		baseURL: '',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		transformRequest: function (data) {
			if (!data) return data;
			let result = ``;
			for (let attr in data) {
				if (!data.hasOwnProperty(attr)) break;
				result += `&${attr}=${data[attr]}`;
			}
			return result.substring(1);
		},
		transformResponse: [function onFulfilled(response) {
			return response.data;
		}, function onRejected(reason) {
			return Promise.reject(reason);
		}],
		validateStatus: function (status) {
			return /^(2|3)\d{2}$/.test(status);
		},
		//=>请求配置项
		params: {},
		data: {},
		cache: true
	};

	_ajax.all = function all(promiseArr = []) {
		return Promise.all(promiseArr);
	};

	["get", "delete", "head", "options"].forEach(item => {
		_ajax[item] = function (url, options = {}) {
			options.method = item;
			return new MyAjax(url, _init(options));
		};
	});

	["post", "put"].forEach(item => {
		_ajax[item] = function (url, data = {}, options = {}) {
			//=>把DATA也放到配置项目
			options.data = data;
			options.method = item;
			return new MyAjax(url, _init(options));
		};
	});

	window._ajax = _ajax;
}();