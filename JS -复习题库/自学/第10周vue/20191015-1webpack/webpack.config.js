let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');

module.exports = {
	//=>配置优化规则
	optimization: {
		//=>压缩优化
		minimizer: [
			//=>压缩CSS（产生问题：JS压缩不在执行自己默认的压缩方式了，也走的是这个插件，从而导致无法压缩）
			new OptimizeCssAssetsWebpackPlugin(),
			//=>压缩JS
			new UglifyjsWebpackPlugin({
				cache: true, //=>是否使用缓存
				parallel: true, //=>是否是并发编译
				sourceMap: true, //=>启动源码映射（方便调试）
			})
		]
	},
	//=>配置环境 production development
	mode: 'production',
	entry: "./src/index.js", //=>["@babel/polyfill", "./src/index.js"]
	output: {
		//=>bundle.min.[hash].js 让每一次生成的文件名都带着HASH值
		filename: 'bundle.min.js',
		path: path.resolve(__dirname, 'dist'),
		//=>给编译后引用资源地址前面设置的前缀
		publicPath: './'
	},
	devServer: {
		port: 3000,
		progress: true,
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			hash: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeAttributeQuotes: true,
				removeEmptyAttributes: true
			}
		}),
		new MiniCssExtractPlugin({
			//=>指定输出的文件名
			filename: 'main.min.css'
		}),
		//=>向每一个模块中注入全局变量
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	],
	module: {
		rules: [{
			test: /\.(css|less)$/i,
			use: [
				// "style-loader",
				MiniCssExtractPlugin.loader,
				"css-loader",
				{
					loader: "postcss-loader",
					options: {
						ident: "postcss",
						plugins: [
							require("autoprefixer")
						]
					}
				},
				"less-loader"
			]
		}, {
			test: /\.js$/i,
			//=>编译JS的LOADER
			use: [{
				loader: "babel-loader",
				options: {
					//=>基于BABEL的语法解析包（ES6->ES5）
					presets: ["@babel/preset-env"],
					//=>使用插件处理>=ES6中的特殊语法的
					plugins: [
						/* ["@babel/plugin-proposal-decorators", {
							"legacy": true
						}],
						["@babel/plugin-proposal-class-properties", {
							"loose": true
						}],
						"@babel/plugin-transform-runtime" */
					]
				}
			}],
			//=>指定JS编译的目录（忽略哪些目录）
			exclude: /node_modules/,
			include: path.resolve(__dirname, 'src')
		}, {
			//=>图片处理
			test: /\.(png|jpg|jpeg|gif|ico|webp|bmp)$/i,
			use: [{
				loader: "url-loader",
				options: {
					//=>只要图片是小于200KB，在处理的时候直接给BASE64
					limit: 1 * 1024,
					//=>控制打包后图片所在的目录
					outputPath: 'images'
				}
			}]
		}, {
			//=>处理HTML文件中导入的IMG图片
			test: /\.(html|htm|xml)$/i,
			use: ["html-withimg-loader"]
		}]
	}
};