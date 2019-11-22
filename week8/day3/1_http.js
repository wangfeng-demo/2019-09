//__dirname __filaname
let http = require('http'), //process.env
    url = require('url');

let {
    readFile
} = require('./promiseFs.js')
http.createServer((req, res) => {
    //req 存放的是请求信息  
    //res 存放的是响应信息
    //只要前端发了请求就会执行该函数
    // console.log(2);
    //console.log(req.method)
    // console.log(req.method)//前端的请求方式
    console.log(url.parse(req.url, true)); //true 解析前端路径
    //pathname 是前端给的纯路径
    //query 是前端在路径上给的的参数 
    let {
        pathname,
        query
    } = url.parse(req.url, true);
    if (pathname == '/favicon.ico') {
        //前端请求的是小图标
        readFile('./1.jpg').then((data) => {
            res.end(data);
            console.log(data);
        }).catch(() => {
            //读取失败
            res.statusCode = 404; //给前端的状态码
            res.statusMessage = 'hello word' //给前端的状态文本
        })
    } else {
        res.end(JSON.stringify(query))
    }
    // console.log('hello');
    // res.end('888') //给前端响应的
    // res.statusCode = 404;
    // res.statusMessage = 'hello word'//给前端的状态码
}).listen(8000, () => {
    //启动服之后会执行该函数
    console.log(('启动成功，端口是8000'));

})