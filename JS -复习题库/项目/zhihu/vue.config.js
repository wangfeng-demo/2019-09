module.exports = {
    publicPath: './',
    lintOnSave: false,
    devServer: {
        //本地访问localhost:8080的时候 由node 把请求转接到知乎后台
        proxy: 'https://www.zhihu.com/api/'
    }
}