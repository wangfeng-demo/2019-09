import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
import task from './task';
Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		task
	},
	plugins: [logger()]
});