/*
 * 在这个文件中设置我们自定义的打包规则 
 *   1.所有的规则都写在module.exports={}中
 */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin'); //=>每一个导入进来的插件都是一个类 new HtmlWebpackPlugin({})

module.exports = {
	//=>配置环境 production development
	mode: 'production',
	//=>入口
	entry: './src/index-my.js',
	//=>出口
	output: {
		//=>输出的文件名 
		//=>bundle.min.[hash].js 让每一次生成的文件名都带着HASH值
		filename: 'bundle.min.[hash].js',
		//=>输出的目录必须是绝对路径
		path: path.resolve(__dirname, 'build')
	},
	//=>关于webpack-dev-server的一些配置  执行命令：webpack-dev-server --config xxx.js（特点：服务器启动后，默认是不关闭的，当我们修改SRC中的文件时，它会自动进行编译，然后自动刷新浏览器）
	devServer: {
		port: 3000, //=>创建服务指定的端口号
		progress: true, //=>显示打包编译的进度
		contentBase: './build', //=>指定当前服务处理资源的目录
		// open: true //=>编译完会自动打开浏览器
	},
	//=>使用插件（数组）
	plugins: [
		new HtmlWebpackPlugin({
			//=>不指定模板会按照默认模板创建一个HTML页面，当然真实项目中一般都是把自己写好的HTML进行编译
			template: './src/index.html',
			//=>输出的文件名
			filename: 'index.html',
			//=>让我们引入JS后面加上HASH戳（清除缓存），但是真实项目中我们一般都是每一次编译生层不同的JS文件引入
			// hash: true,
			//=>控制压缩
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeAttributeQuotes: true,
				removeEmptyAttributes: true
			}
		})
	],
	//=>使用加载器loader处理规则
	module: {
		rules: [{
			//=>基于正则匹配处理哪些文件
			test: /\.(css|less)$/i,
			//=>控制使用的LOADER（有顺序的：从右到左执行）
			use: [
				//=>把编译好的CSS插入到页面的HEAD中（内嵌式样式）
				"style-loader",
				//=>编译@import/url()这种语法的 
				"css-loader",
				//=>设置前缀
				"postcss-loader",
				//=>编译LESS
				{
					loader: "less-loader",
					options: {

					}
				}
			]
		}]
	}
};