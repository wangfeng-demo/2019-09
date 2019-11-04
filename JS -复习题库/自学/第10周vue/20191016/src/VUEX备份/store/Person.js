/*
 * 个人中心板块中的公共状态管理 
 */
export default {
	namespaced: true,
	state: {
		name: '珠峰培训',
		baseInfo: {
			email: '1144709265@qq.com',
			phone: '18310612838'
		}
	},
	getters: {
		queryBase(state) {
			//=>state:本模块的私有状态
			// console.log(state);
			return `${state.name}的邮箱是：${state.baseInfo.email}`;
		}
	},
	mutations: {
		changeName(state, payload) {
			state.name = payload;
		},
		changeBase(state, payload) {
			state.baseInfo = {
				...state.baseInfo,
				...payload
			};
		}
	},
	actions: {
		actionDemo(context, payload) {
			// context.state 当前模块私有的状态
			// context.rootState 整个store中的全部状态
			// console.log(context, payload);
		}
	}
};