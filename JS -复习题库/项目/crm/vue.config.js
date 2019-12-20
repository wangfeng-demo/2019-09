module.exports = {
    publicPath: './',
    lintOnSave:false,//不让eslint报错
    devServer: {
        //proxy代理
        proxy: 'http://localhost:3000'
    }
}