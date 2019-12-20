let path = require('path')
let hp = require('html-webpack-plugin')
let dev = require('./webpack.dev')
let prod = require('./webpack.prod')
const base = {
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'../dist')
    },
    plugins:[
        new hp({
            template:'./public/index.html',//指定渲染的html模板
            // filename:'index.html'// 指定生成htnl文件的名字 默认跟模板名字相同
        })
    ],
    module:{
        rules:[
            {test: /\.js$/, use: 'babel-loader',exclude:/node_modules/}
        ]
    }
}
module.exports = (env)=>{
    if(env.production){
        //生产环境 走build‘
        return Object.assign(prod,base)
    }else{
        //开环境走serve
        return Object.assign(dev,base)
    }
}