let fs = require('fs');
let obj = {};
['readFile', 'readdir'].forEach(item => {
    obj[item] = function (url, encoding = null) {
        if (/\.(js|txt|html|md|css)$/.test(url)) {
            encoding = 'utf-8'
        }
        return new Promise((res, rej) => {
            fs[item](url, encoding, (err, data) => {
                if (!err) {
                    res(data)
                } else {
                    rej(err)
                }
            })
        })
    }

});

['mkdir', 'rmdir', 'unlink'].forEach(item => {
    obj[item] = function (url) {
        return new Promise((res, rej) => {
            fs[item](url, (err) => {
                if (!err) {
                    res();
                } else {
                    rej()
                }
            })
        })
    }
});
['writeFile', 'appendFile'].forEach((item) => {
    obj[item] = function (url, data, encoding) {
        if (/\.(js|txt|html|md|css)$/.test(url)) {
            encoding = 'utf-8'
        }
        return new Promise((res, rej) => {
            fs[item](url, data, encoding, (err) => {
                if (!err) {
                    res()
                } else {
                    rej(err)
                }
            })
        })
    }
});
obj.copyFile = function (oldurl, newurl) {
    return new Promise((res, rej) => {
        fs.copyFile(oldurl, newurl, (err) => {
            if (!err) {
                res()
            } else {
                rej(err)
            }
        })
    })
};
module.exports = obj;