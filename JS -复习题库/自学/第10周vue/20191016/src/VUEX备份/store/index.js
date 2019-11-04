import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
import Person from './Person';
import Product from './Product';

Vue.use(Vuex);
export default new Vuex.Store({
	//=>把每一个模块中的STATE~ACTIONS都进行合并
	//1.STATE会按照各版块进行区分 state={Person:{...},Product:{...},isLogin:true}
	//2.但是GETTERS/MUTATIONS/ACTIONS默认不会进行模块区分，默认是全部合并在一起的，这样会导致冲突  解决方案：每个模块设置namespaced:true，这样最后虽然也是把每个模块中的方法合并在一起了，但是会以模块的名字做为前缀，来进行标识和区分 mutations={'Person/changeName':function xxx,'Product/changeName':function xxx,changeLogin:function xxx,...}
	modules: {
		Person,
		Product
	},
	//=>各个板块公共的状态和方法
	state: {
		isLogin: true
	},
	getters: {
		queryLogin(state) {
			return state.isLogin;
		}
	},
	mutations: {
		changeLogin(state, payload) {
			state.isLogin = payload;
		}
	},
	plugins: [logger()]
});