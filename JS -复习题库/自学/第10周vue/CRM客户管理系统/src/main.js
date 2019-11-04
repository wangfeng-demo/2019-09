import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import * as types from './store/store-types';
import router from './router';
import {
  checkLogin,
  queryPower
} from './api/login';

/* 导入公共样式 */
import './assets/reset.min.css';
import './assets/font/iconfont.css';

/* 导入UI库中所有的组件和对应的样式 */
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* 注入全局指令：做权限的校验 v-power='' */
Vue.directive('power', {
  inserted(el, binding) {
    let arrVal = binding.value.split('|'),
      power = store.state.power,
      flag = false;
    flag = arrVal.some(item => {
      return power.includes(item);
    });
    !flag ? el.parentNode.removeChild(el) : null;
  }
});

//=>检测是否登录：只有保证是登录状态，才让其继续渲染组件等
checkLogin().then(result => {
  //把登录态存储到vuex中
  store.commit(types.CHECK_IS_LOGIN, true);
  return queryPower();
}).catch(reason => {
  Vue.prototype.$alert('只有登录的用户才能访问系统，请您先登录！', '系统提示', {
    callback: action => {
      location.href = location.origin + '/login.html';
    }
  });
}).then(power => {
  //=>已经获取到权限信息了，把权限信息存储到vuex
  store.commit(types.QUERY_POWER, power);
  //=>渲染组件：此时vuex中一定有权限和登录状态信息
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});