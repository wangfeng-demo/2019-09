module.exports = {
    publicPath: '/app',
    directives:{
        proxy:{
            //本地访问 都被转移到了 知乎的后台
            target:'https://www.zhihu.com/api/v4/'
        }
    }
}