let express = require('express');
let {
    readFile,
    writeFile
} = require('./promiseFs');
// let bodyParser=require('body-parser');
let qs = require('qs'); //处理参数问题
let app = express();
app.listen(8080, function () {
    console.log('服务起于 8080');
})
app.use((req, res, next) => {
    // 在这个中间件，是把读取的数据放到了req上，这样下边的接口都可以通过req获取要用到的数据了。
    console.log(66666)
    readFile('./package-lock.json').then(data => {
        data = JSON.parse(data.toString());
        req.data = data.dependencies;
        // 由于readFile是一个一步操作，所以我们在读取成功之后在执行next
        next();
    }).catch(err => {
        res.status(500);
        res.send('')
    })
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:8000");
    res.header('Access-Control-Allow-Credentials', true)
    next();
})
// app.use(bodyParser.json()); //处理json格式
// app.use(bodyParser.raw())
// app.use(bodyParser.text())
// app.use(bodyParser.urlencoded({
//     extended:true,
// }))
app.use((req, res, next) => {
    console.log(999999999)
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    })
    req.on('end', function () {
        let obj = {};
        try {
            obj = JSON.parse(str)
        } catch (error) {
            obj = qs.parse(str)
        }
        req.body = obj;
        next();
    })
})
app.get('/list', function (req, res) {
    // req.query前端传给后端的参数
    let {
        type
    } = req.query; //query是插件自带的
    let data = req.data; //data是上面是用中间件加上的
    res.send({
        code: 0,
        data: type ? data[type] : data
        // data 存在，就给对应的type（属性值） ，否则就给全部
    })
    // type是query中的属性，是用来获取对应的对象的
})
let ary = [];

function f(req, res) {
    readFile('./package-lock.json').then(data => {
        data = JSON.parse(data);
        Object.assign(data.dependencies.my, req.body)
        return writeFile('./package-lock.json', JSON.stringify(data))
    }).then(data => {
        res.send({
            code: 0,
            data: 'success'
        })
        let fn = ary.shift();
        fn && fn();
    }).catch(err => {
        console.log(err)
        res.send({
            err: err
        })
        let fn = ary.shift();
        fn && fn();
    })
}
let timer = null;
app.post('/add', function (req, res) {
    console.log(req.body) // 放置是 前端post发给后台的数据
    ary.push(() => {
        f(req, res)
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
        let fn = ary.shift();
        fn && fn();
    }, 100);

})