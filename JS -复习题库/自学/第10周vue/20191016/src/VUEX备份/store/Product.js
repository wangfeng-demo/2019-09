/*
 * 产品板块中的公共状态管理 
 */
import * as types from './store-types';
export default {
	namespaced: true,
	state: {
		name: '前端开发就业班',
		baseInfo: {
			time: '5 month'
		}
	},
	getters: {
		[types.PRODUCT_GETTER_QUERY_BASE](state) {
			return `${state.name}课程的周期是：${state.baseInfo.time}`;
		}
	},
	mutations: {
		[types.PRODUCT_MUTATION_CHANGE_NAME](state, payload) {
			state.name = payload;
		}
	}
};