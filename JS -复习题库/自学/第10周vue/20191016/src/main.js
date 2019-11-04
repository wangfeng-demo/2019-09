import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import './reset.min.css';

/* 导入UI库中所有的组件和对应的样式 */
/* import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI); */

/* 导入UI组件库中自己需要的，编译的时候也是只把导入的编译了 */
import "element-ui/lib/theme-chalk/index.css";
import {
  Button,
  Link,
  Input,
  Table,
  TableColumn,
  MessageBox,
  Dialog,
  Tag,
  DatePicker,
  Loading,
  Notification,
  Message
} from 'element-ui';
Vue.use(Button);
Vue.use(Link);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(DatePicker);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');