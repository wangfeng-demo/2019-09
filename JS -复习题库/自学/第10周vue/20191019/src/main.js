import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';

/* 导入公共样式 */
import './assets/reset.min.css';
import './assets/font/iconfont.css';

/* 导入UI库中所有的组件和对应的样式 */
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;
new Vue({
  router, //=>this.$router this.$route===$router.currentRoute
  store, //=>this.$store
  render: h => h(App)
}).$mount('#app');