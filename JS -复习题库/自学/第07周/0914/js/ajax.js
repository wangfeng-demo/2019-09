/*
 * 支持的参数配置项
 *    url
 *    method:'GET'
 *    data:null
 *    dataType:'json'
 *    async:true
 *    cache:true
 *    success:null
 *    error:null
 *    headers:null
 *    timeout:null
 */
~ function () {
	function ajax(options) {
		return new init(options);
	}

	/* ==AJAX处理的核心== */
	let regGET = /^(GET|DELETE|HEAD|OPTIONS)$/i;
	let defaults = {
		url: '', //=>请求的API接口地址
		method: 'GET', //=>请求方式 GET/POST/DELETE/PUT/HEAD/OPTIONS
		data: null, //=>传递给服务器的信息：支持格式STRING和OBJECT，如果是OBJECT，我们需要把其处理为x-www-form-urlencoded格式；GET请求是把信息作为问号参数传递给服务器，POST请求是放到请求主体中传递给服务器；
		dataType: 'JSON', //=>把服务器返回结果处理成为对应的格式 JSON/TEXT/XML
		async: true, //=>是否异步请求
		cache: true, //=>只对GET请求有作用：设置为FALSE,在URL的末尾加随机数来清除缓存
		timeout: null, //=>超时时间
		headers: null, //=>设置请求头信息（请求头信息不能是中文，所以我们需要为其编码）
		success: null, //=>从服务器获取成功后执行 把获取的结果、状态信息、XHR传递给它
		error: null //=>获取失败后执行 把错误信息传递给它
	};

	function init(options = {}) {
		//=>参数初始化：把传递的配置项替换默认的配置项
		this.options = Object.assign(defaults, options);
		this.xhr = null;
		this.send();
	}

	ajax.prototype = {
		constructor: ajax,
		version: 1.0,
		//=>发送AJAX请求
		send() {
			let xhr = null,
				{
					url,
					method,
					async,
					data,
					cache,
					timeout,
					dataType,
					headers,
					success,
					error
				} = this.options;
			this.xhr = xhr = new XMLHttpRequest;

			//=>处理DATA:如果是GET请求把处理后的DATA放在URL末尾传递给服务器
			data = this.handleData();
			if (data !== null && regGET.test(method)) {
				url += `${this.checkASK(url)}${data}`;
				data = null;
			}

			//=>处理CACHE:如果是GET并且CACHE是FALSE需要清除缓存
			if (cache === false && regGET.test(method)) {
				url += `${this.checkASK(url)}_=${Math.random()}`;
			}

			xhr.open(method, url, async);

			//=>超时处理
			timeout !== null ? xhr.timeout = timeout : null;

			//=>设置请求头信息
			if (Object.prototype.toString.call(headers) === "[object Object]") {
				for (let key in headers) {
					if (!headers.hasOwnProperty(key)) break;
					xhr.setRequestHeader(key, encodeURIComponent(headers[key]));
				}
			}

			xhr.onreadystatechange = () => {
				let {
					status,
					statusText,
					readyState: state,
					responseText,
					responseXML
				} = xhr;
				if (/^(2|3)\d{2}$/.test(status)) {
					//=>成功
					if (state === 4) {
						switch (dataType.toUpperCase()) {
							case 'JSON':
								responseText = JSON.parse(responseText);
								break;
							case 'XML':
								responseText = responseXML;
								break;
						}
						success && success(responseText, statusText, xhr);
					}
					return;
				}
				//=>失败的
				typeof error === "function" ? error(statusText, xhr) : null;
			}
			xhr.send(data);
		},
		//=>关于DATA参数的处理
		handleData() {
			let {
				data
			} = this.options;
			if (data === null || typeof data === "string") return data;
			//=>只有DATA是一个对象，我们需要把它变为xxx=xxx&xxx=xxx这种格式字符串
			let str = ``;
			for (let key in data) {
				if (!data.hasOwnProperty(key)) break;
				str += `${key}=${data[key]}&`;
			}
			str = str.substring(0, str.length - 1);
			return str;
		},
		//=>检测URL中是否存在问号
		checkASK(url) {
			return url.indexOf('?') === -1 ? '?' : '&';
		}
	};
	init.prototype = ajax.prototype;

	window._ajax = ajax;
}();