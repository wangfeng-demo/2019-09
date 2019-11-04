import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
Vue.use(Vuex);
export default new Vuex.Store({
	modules: {},
	plugins: [logger()]
});