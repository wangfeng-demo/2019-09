import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import Custom from './pages/Custom.vue';
import CustomList from './pages/custom/CustomList.vue';
import CustomHandle from './pages/custom/CustomHandle.vue';
import System from './pages/System.vue';
Vue.use(VueRouter);
const router = new VueRouter({
	mode: "hash",
	routes: [{
		path: '/',
		redirect: '/custom'
	}, {
		path: '/custom',
		name: 'custom',
		component: Custom,
		children: [{
			path: '',
			redirect: {
				path: '/custom/list',
				query: {
					type: 'my'
				}
			}
		}, {
			path: 'list',
			name: 'customList',
			component: CustomList
		}, {
			path: 'handle',
			name: 'customHandle1',
			component: CustomHandle
		}, {
			path: 'handle/:customId',
			name: 'customHandle2',
			component: CustomHandle
		}]
	}, {
		path: '/system',
		name: 'system',
		component: System,
		//=>系统设置的权限校验
		beforeEnter(to, from, next) {
			let power = store.state.power;
			if (/(userhandle|departhandle|jobhandle)/.test(power)) {
				next();
				return;
			}
			Vue.prototype.$alert('您无权限访问此页面，请联系系统管理员！', '系统提示');
		}
	}, {
		path: '*',
		redirect: '/custom'
	}]
});

export default router;