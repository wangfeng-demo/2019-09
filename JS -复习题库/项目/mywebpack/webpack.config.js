let path = require('path');
// console.log('你好', path.resolve(__dirname, 'qqq'));
let HtmlWebpackPllugin = require('html-webpack-plugin')
module.exports = {
    //配置对象
    // 这里放的都是webpack配置信息
    mode: 'development',
    entry: './src/2.js',
    output: {
        filename: 'qqq.js', //默认是main.js
        path: path.resolve(__dirname, './dist')//告诉webpack 把生成的文件放到那个路径下
    },
    plugins:[
        new HtmlWebpackPllugin({template:'./public/index.html'})//制定该路径下的html作为模板
    ],
    module: {
        rules: [
          { test: /\.js$/, use: 'babel-loader',exclude:/node_modules/}//exclude:/node_modules/排除这个
        ]
      }
}