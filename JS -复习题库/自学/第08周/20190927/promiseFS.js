let fs = require('fs'),
	path = require('path'),
	exportsOBJ = {};

//=>根据后缀名返回编码格式:UTF8/NULL
function suffixHandle(pathname) {
	let suffixREG = /\.([0-9a-zA-Z]+)$/,
		suffix = suffixREG.test(pathname) ? suffixREG.exec(pathname)[1] : '',
		encoding = 'utf8';
	/^(PNG|GIF|JPG|JPEG|WEBP|BMP|ICO|SVG|MP3|MP4|WAV|OGG|M3U8)$/i.test(suffix) ? encoding = null : null;
	return encoding;
}

//=>READ-FILE/READ-DIR/MK-DIR/RM-DIR/UN-LINK
['readFile', 'readdir', 'mkdir', 'rmdir', 'unlink'].forEach(item => {
	exportsOBJ[item] = function anonymous(pathname) {
		pathname = path.resolve(pathname);
		return new Promise((resolve, reject) => {
			let encoding = suffixHandle(pathname),
				callback = (err, result) => {
					if (err !== null) {
						reject(err);
						return;
					}
					resolve(result);
				};
			if (item !== 'readFile') {
				encoding = callback;
				callback = null;
			}
			fs[item](pathname, encoding, callback);
		});
	}
});

//=>WRITE-FILE / APPEND-FILE
['writeFile', 'appendFile'].forEach(item => {
	exportsOBJ[item] = function anonymous(pathname, content) {
		pathname = path.resolve(pathname);
		//=>如果是JSON对象,我们转化为JSON字符串
		content !== null && typeof content === 'object' ? content = JSON.stringify(content) : null;
		typeof content !== 'string' ? content += '' : null;

		return new Promise((resolve, reject) => {
			let encoding = suffixHandle(pathname),
				callback = (err, result) => {
					if (err !== null) {
						reject(err);
						return;
					}
					resolve(result);
				};
			fs[item](pathname, content, encoding, callback);
		});
	}
});

//=>COPY-FILE
exportsOBJ['copyFile'] = function anonymous(pathname1, pathname2) {
	pathname1 = path.resolve(pathname1);
	pathname2 = path.resolve(pathname2);
	return new Promise((resolve, reject) => {
		fs['copyFile'](pathname1, pathname2, err => {
			if (err !== null) {
				reject(err);
				return;
			}
			resolve();
		});
	});
};
module.exports = exportsOBJ;