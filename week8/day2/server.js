let http = require('http'),
    url = require('url');
http.createServer(function (req, res) {
    if (req.url == '/love') {
        res.end('666')
    } else {
        res.end('999')
    }
}).listen(8686, () => {
    console.log('服务起于 8686端口');
})



let port = 80
function listen() {
    let server = http.createServer();
    try {
        server.listen(port, () => {
            console.log('服务起于 8000端口');
        })
    } catch (error) {
        port++;
        listen(port)
    }
}