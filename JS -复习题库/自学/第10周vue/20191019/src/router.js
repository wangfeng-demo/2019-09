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
const router = new VueRouter({
	mode: "hash",
	routes: [{
		path: '/',
		redirect: '/home'
	}, {
		path: '/home',
		name: 'home', //=>命名路由
		component: Home,
		/* 路由独有守卫 */
		beforeEnter(to, from, next) {
			console.log("=====路由独有BEFORE ENTER");
			next();
		}
	}, {
		path: '/custom',
		name: 'custom',
		component: Custom,
		children: [{
			path: '/custom/list/:lx', //=>动态路由（把传递的参数作为路由地址的一部分）
			name: 'customList',
			component: CustomList
		}, {
			path: 'handle',
			name: 'customHandle',
			component: CustomHandle
		}]
	}, {
		path: '/system',
		name: 'system',
		component: System
	}, {
		//=>每一次地址改变，都会到路由表中自上而下逐一匹配
		//匹配到一级成功，在匹配二级...，在某级中没有则跳出来继续向下匹配
		//直到找到一个完全匹配的，则渲染对应的组件（不在向下匹配了）
		path: '*',
		redirect: '/'
		// component:Error
	}]
});

/* 全局守卫（不管路由匹配哪一个地址，渲染了哪一个组件，都会触发） */
router.beforeEach((to, from, next) => {
	//to:将要跳转的到的路由对象（query/params...）
	//from:从哪个路由来，存储的也是这个路由对象
	// console.log("=====全局BEFORE EACH", to, from);
	console.log("=====全局BEFORE EACH", this);
	//=>进入下一个钩子函数（下一项任务）：不写next当前操作到此结束
	next();
});

router.beforeResolve((to, from, next) => {
	console.log("=====全局BEFORE RESOLVE");
	next();
});

router.afterEach((to, from) => {
	console.log("=====全局AFTER EACH");
});

export default router;