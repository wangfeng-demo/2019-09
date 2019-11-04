import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
import * as types from './store-types';
import custom from './custom';
import {
	queryPower
} from '../api/login';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		custom
	},
	//=>设置公共信息
	state: {
		isLogin: false,
		power: ''
	},
	mutations: {
		[types.CHECK_IS_LOGIN](state, isLogin = true) {
			state.isLogin = isLogin;
		},
		[types.QUERY_POWER](state, power) {
			state.power = power;
		}
	},
	actions: {
		[types.QUERY_POWER](context) {
			queryPower().then(power => {
				context.commit(types.QUERY_POWER, power);
			});
		}
	},
	plugins: [logger()]
});