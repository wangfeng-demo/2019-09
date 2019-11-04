### vuex状态管理模式
https://vuex.vuejs.org/zh/

#### 1.基础概述
- 安装vuex
- 组件信息通信的常用方式
- vuex的操作流程

#### 2.基础语法
store.js
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex); //=>给每一个组件都设置一个$store属性
export default new Vuex.Store({
	//=>公共管理的状态信息
	state:{
		n:0
	},
	//=>更改store中的状态的唯一方法是提交mutation
	mutation:{
		func(state,payload){
			//...
		}
	},
	//=>处理异步操作的mutaions
	actions:{
		asyncfunc(context,payload){
			//context => store  => context.commit()
		}
	},
	//=>等价于computed
	getter:{
		xxx(state){
			//...
		}
	}
});
```

main.js
```javascript
import store from './store'
new Vue({
	el:'#app',
	//=>确保每一个组件都可以使用this.$store来操作容器中的状态
	store,
	...
});
```
- 获取公共状态信息：this.$store.state.xxx
- 直接调取mutation中的方法：this.$store.commit([mutation-function-name],[payload])
- 调取acttion中的方法：this.$store.dispatch([actions-function-name],[payload])

#### 3.基于各种map简化操作方式
- mapState
- mapGetters 
- mapMutations
- mapActions

```javascript
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
export default {
	computed:{
		//=>数组方式
		...mapState(['n','m']),  //=>this.n
		//=>对象方式
		...mapState({
			a:'n',  //=>this.a === this.$store.state.n
		}),
		//=>函数方式
		...mapState({
			a:state=>state.xxx.xxx
		})
	},
	//=>其余的map操作方式和mapState类似
}
```

#### 4.module按照模块进行分组
模块A
```javascript
export default {
	namepaced:true,
	state:{
		n:10	
	},
	//...
}
```

模块B
```javascript
export default {
	namepaced:true,
	state:{
		n:20	
	},
	//...
}
```

store.js
```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import A from './A';
import B from './B';
Vue.use(Vuex);
export default new Vuex.Store({
	//=>每个模块独有的
	modules:{
		A,
		B
	},
	//=>公共的
	state:{
			
	}
});
```

获取状态或者触发mutation/actions中的方法执行：
- this.$store.state.A.xxx
- this.$store.dispatch('A/xxx')
- ...mapActions('A',['xxx'])
- 基于createNamespacedHelpers处理
```javascript
import {createNamespacedHelpers} from 'vuex';
let {mapActions,mapSate} = createNamespacedHelpers('A');
//...
...mapActions(['xxx']);
```

#### 5.宏标识名称管理 
mutations-type.js
```javascript
export const GET_XXX='GET_XXX';
//...
```

xxx.js
```javascript
import * as types from './mutations-type';
actions:{
	[types.GET_XXX](){
		//...
	}
}

this.$store.dispatch(types.GET_XXX);
```

#### 6.使用vuex中间件
```javascript
import logger from 'vue/dist/logger';

new Vuex.Store({
	...,
	plugins:[logger()]
})
```
