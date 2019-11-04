### 脚手架
帮助我们把webpack等相关配置都处理好，我们只需要基于脚手架快速构建一个项目即可（项目中一定包含webpack的相关配置）

### vue中的脚手架vue-cli
https://cli.vuejs.org/zh/guide/

1. 安装脚手架（一般安装在全局）
$ npm install @vue/cli -g
OR
$ yarn global add @vue/cli

安装成功后，全局环境下会生成一个 $ vue 的可执行命令，基于 $ vue --version 查看版本号

2. 创建工程化的项目
$ vue create 项目名称（遵循npm包名称规范：数字或小写字母）

### 项目目录
|- src 存储我们项目开发的源文件
	|- main.js  打包编译的入口文件
	|- App.vue  项目页面的入口文件
	|- components 存放当前项目的公共组件
		|- xxx.vue
	|- assets 一般存放项目中需要引入的静态资源文件
		|- xxx.png
		|- xxx.css
	|- ...
|- public
	|- index.html 当前项目的主页面（我们最后把所有在SRC中写的内容，通过webpack/vue编译渲染后，最后都会呈现在index.html的#app容器中）
	|- xxx.xx 虽然建议大家开发的时候，把代码或者资源都放置在SRC中，但是有时候，我们某些资源也可能需要单独在index.html就引用了

开发模式下，我们基于这个命令启动一个本地服务，把基于webpack编译后的内容预览
$ npm run serve

生产模式下，把写好的内容进行编译打包，最后部署到服务器上
$ npm run build