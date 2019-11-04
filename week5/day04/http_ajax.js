function ajax(url, options) {
    let {
        method = 'get',
            data = {},
            cache = 'true', //是否走缓存
            async = true,
                headers = {}
    } = options;
    let isGet = method.toLowerCase() === 'get'; //判断是不是get请求；
    if (isGet) {
        let searchStr = '';
        for (let k in data) {
            searchStr += `&${k}=${data[k]}`
        }
        searchStr = searchStr.slice(1);
        url = url.indexOf('?') == -1 ? url + '?' + searchStr : url + '&' + searchStr;
    }
    return new Promise(function (res, rej) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (/2\d{2}|304/.test(xhr.status)) {
                    let data = JSON.parse(xhr.response);
                    res(data)
                } else if (/[45]\d{2}/.test(xhr.status)) {
                  rej(xhr);

                }
            }
        }
        xhr.send(JSON.stringify(data));
    })


}
ajax.post = function(url,data){
    return ajax(url,{
        method:'post',
        data
    })
}
ajax.get = function(url,data){
    return ajax(url,{
        method:'get',
        data
    })
}

ajax('./data.json', {
    method:'post',
    data: {
        a: 12,
        b: 13
    }
}).then((data) => {
    console.log(data);
})

