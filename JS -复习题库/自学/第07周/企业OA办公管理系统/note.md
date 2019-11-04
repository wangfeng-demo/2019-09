项目结构目录
	|- admin 存储我们所有的后台程序
	|- client 客户端（前端）所有的程序

admin
> 首先跑环境：$ npm i 
> 纠正一些基础的配置：config.js
>   - PORT 后台程序运行的端口
>   - CROS.ALLOW_ORIGIN 客户端程序运行的服务地址
> 启动服务：$ node server.js
> 启动后的运行窗口不能关闭，关闭则后台服务器结束

客户端采用的技术栈：
- HTML5/CSS3（会用到字体图标）
- JQUERY
- AXIOS
- 辅助插件：JQUERY.COOKIE / MD5 / 自己写的一些方法
- 基于IFRAME构建最初版本的SPA单页面应用开发

服务端采用的技术栈：
- NODE
- EXPRESS / EXPRESS-ROUTER
- 本应基于数据库存储，为了方便简单，当前项目临时采用JSON文件存储数据
- SESSION

-----------------
本地存储 VS 服务器存储
> 本地存储：把信息存储在客户端本地
> 谷歌控制台Application中都可以查看到
- cookie
- H5中WebStorage：localStorage / sessionStorage
- 本地数据库存储：IndexDB
- 本地缓存存储：manifest
- ...

> 服务器存储：把数据存储在服务器端
- 数据库存储：SQLSERVER / MYSQL / ORACLE / MONGODB ...
- REDIS
- SESSION
- ...

==========================
项目属于SPA（Single Page Application）单页面应用
- iframe 基于iframe页面嵌套（父页面嵌套子页面）模拟出SPA的效果，但是它的本质还是多页面开发
- AMD（require.js）/ CMD（sea.js）：基于最初的模块化思想，我们把每一部分功能开发成为组件，最后让所有的组件都在同一个页面中，基于不同操作控制组件的显示隐藏
- 前端路由：HASH路由和BROWSER路由
	+ vue-router
	+ react-router-dom
	+ ...
