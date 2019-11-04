import Vue from 'vue';
import App from './App.vue';
// import Temp1 from './Temp1';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index';

Vue.config.productionTip = false;

new Vue({
  //=>以后所有的组件都可以基于this.$store获取STORE容器
  store,
  render: h => h(App)
}).$mount('#app');