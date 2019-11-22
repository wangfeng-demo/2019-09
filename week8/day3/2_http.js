let http = require('http');
let url = require('url');
let {
    readFile
} = require('./promiseFs');

let str = '';
req.on('data', function (chunk) {
    str += chunk;
    // 正在接受请求体
})
req.on('end', function () {
    console.log(str);
    // 接受请求体完成
})

let server = http.createServer((req, res) => {
    console.log(req.headers.cookie);

    // cors 跨域
    // res.setHeader('Access-Control-Allow-Origin', "https://www.baidu.com");
    /*   res.setHeader('Access-Control-Allow-Methods', "get"); 不要了 */
    // res.setHeader('Set-cookie', 'qqq=123');
    //跨域种植cookie在application中每没有体现
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    })
    res.end('999')
});

let port = 8000;
let init = true;

function listen() {
    let cb = null;
    if (init) {
        init = false;
        cb = () => {
            console.log('服务起于' + port)
        }
    }
    server.listen(port, cb);
}
listen();
server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        // 上个端口被占用了
        port++;
        listen();
    }
})