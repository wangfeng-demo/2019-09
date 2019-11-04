/*
 * 配置路由表：设定什么样的地址（或者HASH）渲染哪一个组件的规则 
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home';
import Custom from './pages/Custom';
import CustomList from './pages/custom/CustomList';
import CustomHandle from './pages/custom/CustomHandle';
import System from './pages/System';

Vue.use(VueRouter);
export default new VueRouter({
	//=>设置路由模式：hash/history
	mode: "hash",
	//=>配置一级路由
	routes: [{
		// 请求的是一个/，我们让其重定向到/home
		path: '/',
		redirect: '/home'
	}, {
		// HASH路径
		path: '/home',
		// 渲染的组件
		component: Home
	}, {
		path: '/custom',
		component: Custom,
		//=>配置某一个一级路由下面的二级路由
		children: [{
			path: '/custom/list',
			component: CustomList
		}, {
			path: 'handle', //=>可以简写，但是不能写斜杠了，否则认为是根目录下访问
			component: CustomHandle
		}]
	}, {
		path: '/system',
		component: System
	}]
});