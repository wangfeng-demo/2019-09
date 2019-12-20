import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局引入 ele-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false;

/* router.beforeEach((to,from,next)=>{
  //to是要去的路径  若to的路径  用户没有权限 那么不执行 next即可
  let power = decodeURIComponent(localStorage.getItem('power')||'')
  if(/^\/\w+[/]?$/.test(to.path)){
    next()
  }else if(power.indexOf(to.meta.power)!=-1){
    next()
  }else{
    next(from)//没有权限 就从哪里来 回哪里去
  }
  
}) */
/* checkLogin().then(result=>{
  new Vue({
    router,
    store,
    render:(h)=>(h)
  }).$mount('$app')
}).catch(reason=>{
  Vue.prototype.$alert('zhiyou','xitong,',{
    callback:action=>{
      location.href = location.orgin+'login.html'
    }
  })
}) */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
