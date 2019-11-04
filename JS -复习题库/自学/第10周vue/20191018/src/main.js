import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import './assets/reset.min.css';

/* 导入UI库中所有的组件和对应的样式 */
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');