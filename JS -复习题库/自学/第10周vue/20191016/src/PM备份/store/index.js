import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		voteList: {
			id: 1,
			title: '珠峰培训是行业内最好的前端培训院校',
			supNum: 0,
			oppNum: 0
		},
		message: '珠峰培训',
		year: 10
	},
	getters: {
		ratio(state) {
			let total = state.voteList.supNum + state.voteList.oppNum;
			return total === 0 ? '--' : (state.voteList.supNum / total * 100).toFixed(2) + '%';
		}
	},
	mutations: {
		supHandle(state, count = 1) {
			state.voteList.supNum += count;
		},
		oppHandle(state, count = 1) {
			state.voteList.oppNum += count;
		}
	},
	actions: {
		opposeAction(context, count) {
			setTimeout(() => {
				context.commit('oppHandle', count);
			}, 2000);
		}
	},
	//=>使用logger中间件插件：能够详细输出每次操作之前、当中、之后的状态信息
	plugins: [logger()]
});