import Vue from 'vue';
import Vuex from 'vuex';

//=>Vuex是Vue中的一个插件
Vue.use(Vuex);

//=>创建STORE容器并且导出
export default new Vuex.Store({
	//=>STATE存储公共状态（DATA）
	state: {

	},
	//=>MUTATIONS存储SYNC FUNCTION，这些方法改变STATE中的状态信息
	mutations: {
		example(state, payload) {
			//=>STATE容器中存储的状态信息 PAYLOAD是COMMIT执行的时候传递进来的参数信息
			//=>this.$store.commit('example',100)
		}
	},
	//=>ACTIONS存储ASYNC FUNCTION，这些方法首先异步获取需要的数据，然后再基于COMMIT触发MUTATIONS中的方法，从而改变STATE
	actions: {
		exampleAction(context, payload) {
			//=>this.$store.dispatch('exampleAction','珠峰')
			setTimeout(_ => {
				context.commit('example', 1000);
			}, 1000);
		}
	},
	//=>GEETERS存储的方式等价于COMPUTED计算属性：监听当前容器中STATE的计算属性
	getters: {

	}
});