### webpack从零基础到企业实战

https://webpack.docschina.org/

*webpack*是一个现代 *JavaScript* 应用程序的*静态模块打包器（module bundler）*。当 *webpack* 处理应用程序时，它会递归地构建一个*依赖关系图（dependency graph）*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个*bundle*。

*webpack* 本身是基于*node.js*开发的。

从 *webpack v4.0.0* 开始，可以不用引入一个配置文件（零配置文件），然而*webpack*仍然还是高度可配置的。

#### 1. 安装webpack

目前*@vue/cli*和*create-react-app*基本上采用的是*webpack 4.0*以上版本，所以本次课程以第四代版本为主；第四代版本需要我们安装*webpack*和*webpack-cli*（可执行命令）；

为了防止全局安装*webpack*的版本冲突，我们真实项目开发的时候基本上以安装在本地项目中为主；

```shell
$ npm init -y

$ npm install webpack webpack-cli --save-dev
OR
$ yarn add webpack webpack-cli -D
```

#### 2.webpack的基础使用

- 初步体验（零配置）

  ```shell
  /*
   * 默认会打包SRC目录中的JS文件（入口默认index.js）
   * 打包完成的目录默认是DIST/MAIN.JS
   *
   * npx:http://www.ruanyifeng.com/blog/2019/02/npx.html
   * 默认执行node_modules/bin/webpack.cmd文件
   * webpack默认支持CommonJS和ES6 Module的模块规范，依此进行依赖打包
   */
  $ npx webpack
  ```

- 自定义基础配置

  - webpack.config.js OR webpackfile.js

  ```js
  let path = require('path');
  module.exports = {
  	//=>打包模式  开发环境development  生产环境production
  	mode: 'production',
  	//=>入口
  	entry: './src/index.js',
  	//=>输出
  	output: {
  		//=>输出文件的文件名
  		filename: 'bundle.js',
  		//=>输出目录的"绝对路径"
  		path: path.resolve(__dirname, 'dist')
  	}
  }
  ```

- 自定义配置文件名

  - $ npx webpack --config  webpack.config.development.js
  - 可在package.json中配置可执行的脚本命令（区分开发环境）

  ```json
  "scripts": {
      "serve": "webpack --config webpack.config.development.js",
      "build": "webpack --config webpack.config.production.js"
  },
  ```

#### 3.webpack-dev-server

https://webpack.js.org/configuration/dev-server/

- 安装：$ yarn add webpack-dev-server -D

- 基础配置

  ```js
  /* webpack.config.js */
  //=>配置DEV-SERVER
  devServer: {
      //=>端口
  	port: 3000,
      //=>显示编译进度
      progress: true,
      //=>指定访问资源目录
      contentBase: './dist',
      //=>自动打开浏览器
      open: true
  }
  ```

  ```json
  /* package.json */
  "scripts": {
      "serve": "webpack-dev-server",
      "build": "webpack"
  }
  ```

  - $ npm run serve
  - $ npx webpack-dev-server

- 代码更改后，会自动重新编译，然后自动刷新页面

#### 4.html-webpack-plugin

https://www.webpackjs.com/plugins/html-webpack-plugin/

- 安装：$ yarn add html-webpack-plugin -D

- 在webpack.config.js中使用

  ```js
  let HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
      ...,
      //=>在webpack中使用插件
  	plugins: [
  		new HtmlWebpackPlugin({
  			//=>指定自己的模板
  			template: './src/index.html',
  			//=>输出的文件名
  			filename: 'index.html',
  			//=>给引入的文件设置HASH戳（清除缓存的），也可以在output中设置 filename: 'bundle.[hash].js' 来生成不同的文件
  			hash: true,
  			//=>控制是否以及以何种方式最小化输出 
      		//=>https://github.com/kangax/html-minifier
  			minify: {
  				collapseWhitespace: true,
  				removeComments: true,
  				removeAttributeQuotes: true,
  				removeEmptyAttributes: true
  			}
  		})
  	]
  }
  ```

#### 5.webpack中的加载器loader：处理样式的

- 安装：$ yarn add css-loader style-loader less less-loader autoprefixer postcss-loader ... -D

- 使用

  ```js
  module.exports = {
      //=>配置模块加载器LOADER
  	module: {
  		//=>模块规则：使用加载器（默认从右向左执行，从下向上）
  		rules: [{
  			test: /\.(css|less)$/, //=>基于正则表达式匹配哪些模块需要处理
  			use: [
  				"style-loader", //=>把CSS插入到HEAD中
  				"css-loader", //=>编译解析@import/URL()这种语法
                  "postcss-loader", //=>设置前缀
                  {
  					loader: "less-loader",
                      options: {
                          //=>加载器额外的配置
                      }
  				}
  			]
  		}]
  	}
  }
  ```

  postcss.config.js

  ```js
  module.exports = {
  	plugins: [
  		require('autoprefixer')
  	]
  };
  ```

  package.json

  ```json
  "browserslist": [
      "> 1%",
      "last 2 versions"
  ]
  ```

#### 6.mini-css-extract-plugin 抽离CSS内容

https://www.npmjs.com/package/mini-css-extract-plugin

- 安装 $ yarn add mini-css-extract-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D

```js
let MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'),
	UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    //=>设置优化项
	optimization: {
		//=>设置压缩方式
		minimizer: [
			//=>压缩CSS（但是必须指定JS的压缩方式）
			new OptimizeCssAssetsWebpackPlugin(),
			//=>压缩JS
			new UglifyjsWebpackPlugin({
				cache: true, //=>是否使用缓存
				parallel: true, //=>是否是并发编译
				sourceMap: true, //=>启动源码映射（方便调试）
			})
		]
	},
	plugins: [
		//=>使用插件
		new MiniCssExtractPlugin({
			//=>设置编译后的文件名字
			filename: 'main.css'
		})
	],
	module: {
		rules: [{
			test: /\.(css|less)$/,
			use: [
				// "style-loader",
				//=>使用插件中的LOADER代替STYLE方式
				MiniCssExtractPlugin.loader,
				"css-loader",
                "postcss-loader",
				"less-loader"
			]
		}]
	}
}
```

上述JS压缩对于require/import等还存在问题，需要对于ES6中的一些语法进行处理!

#### 7.基于babel实现ES6的转换和ESLint语法检测

https://babeljs.io/

https://eslint.org/

- 安装  $ yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties  @babel/plugin-proposal-decorators @babel/plugin-transform-runtime -D
- 安装 $ yarn add @babel/runtime @babel/polyfill
- 安装 $ yarn add eslint eslint-loader -D

```js
module.exports = {
	...,
	module: {
		rules: [...,{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader',
				options: {
					//=>转换的语法预设（ES6->ES5）
					presets: [
						"@babel/preset-env"
					],
					//=>基于插件处理ES6/ES7中CLASS的特殊语法
					plugins: [
						["@babel/plugin-proposal-decorators", {
							"legacy": true
						}],
						["@babel/plugin-proposal-class-properties", {
							"loose": true
						}],
						"@babel/plugin-transform-runtime"
					]
				}
			}], //=>, "eslint-loader"
			//=>设置编译时忽略的文件和指定编译目录
			include: path.resolve(__dirname, 'src'),
			exclude: /node_modules/
		}]
	}
}
```

参考https://eslint.org/demo生成 .eslintrc.json

补充知识：在vscode中开启ES7中类的装饰器，项目根目录中设置 jsconfig.json

```json
{
	"compilerOptions": {
		"experimentalDecorators": true
	}
}
```

```js
@log
class A{
	a=1;
}
```

#### 8.暴露全局loader

- $ yarn add expose-loader -D
- 前置加载器、后置加载器、普通加载器...

 ```js
//=>内联加载器
import jquery from 'expose-loader?$!jquery';
console.log(window.$);

{
    //=>只要引入JQUERY就在全局注入$
    test: require.resolve('jquery'),
    use: ['expose-loader?$']
}
 ```

```javascript
let webpack = require('webpack');
module.exports = {
    plugins: [
		//=>在每个模块中都注入$
		new webpack.ProvidePlugin({
			'$': 'jquery'
		})
	],
}

//=>页面中
console.log($);
```

#### 9.webpack中图片的处理和分目录分发

- 在JS中创建IMG
- 在CSS中设置背景图
- 在HTML中写死
- ...

安装 $ yarn add file-loader url-loader html-withimg-loader -D

```js
module.exports = {
	...,
	module: {
		//=>模块规则：使用加载器（默认从右向左执行）
		rules: [..., {
			test: /\.(png|jpg|gif)$/i,
			use: [{
				//=>把指定大小内的图片BASE64
				loader: 'url-loader',
				options: {
					limit: 200 * 1024,
    				outputPath:'/images'
				}
			}],
			include: path.resolve(__dirname, 'src'),
			exclude: /node_modules/
		}, {
			test: /\.html$/,
			use: ['html-withimg-loader']
		}]
	}
}
```

最后实现文件分目录发布

```js
module.exports = {
	output: {
		//=>配置引用前缀（所有资源前加这个地址）
		publicPath: './'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		})
	],
	module: {
		//=>模块规则：使用加载器（默认从右向左执行）
		rules: [...,{
			test: /\.(png|jpg|gif)$/i,
			use: [{
				options: {
					outputPath: 'images'
				}
			}]
		}]
	}
}
```





