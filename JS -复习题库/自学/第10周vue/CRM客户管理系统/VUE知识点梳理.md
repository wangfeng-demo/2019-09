框架、类库、插件、组件之间的关系和区别
	=> 搜索常用的框架、类库等
MVC和MVVM
	=> vue双向数据绑定的实现原理
		=> 数组和对象在响应状态中的细节问题
		=> v-model的实现原理
	=> 能够手写observe/defineRective/$set
	=> vue3.0和vue2.0之间的一些区别
	=> mvvm和mvc的区别
new Vue({})中的一些细节
	=>beforeRouteEnter ...
	=>beforeCreate 它及以前的钩子函数中都没有this的
	=>el / template / render&JSX
	=>data
	=>mixins混入
	=>methods / computed / watch / filters （四个的区别和实际应用场景）
	=>provide和inject、props（包含props的验证和命名规范）
	=>components
	=>created  一般用于从服务器获取数据的操作
	=>beforeMount
	render编译渲染（把虚拟DOM->真实DOM（vNode）：真实DOM就是一个DOM元素对象，我们还要把这个DOM元素对象插入到页面的指定容器中）  dom diff -> vnode -> 浏览器渲染
	=>mounted  此处可以获取到DOM信息了
	当有状态或者属性等信息进行修改的时候
	=>beforeUpdate
	render
	=>updated
	当销毁组件的时候（vm.$destroy() 或者 路由切换）
	=>beforeDestroy
	=>destroyed
VUE中的指令
	=>v-model v-text v-html v-once v-bind（:） v-on（@）v-if/v-else v-show v-for
	=>v-slot：命名插槽、作用域插槽
	=>事件处理和事件修饰符
	=>自定义指令
VUE中常用的属性
	=>key 循环绑定的时候，给每一个循环的元素标识唯一值（作用：方便DOM DIFF）
	=>slot
	=>slot-scoped
	=>ref 获取元素或者某一个组件的实例
	=>is
VUE组件
	=>全局组件和局部组件（脚手架生成项目中的xxx.vue都是局部组件）
	=>掌握如何划分组件和实现组件的嵌套
	=>组件之间的信息通信
		=>props
		=>evnetBus：$emit $on/@xxx='xxx'自定义事件
		=>$parent $children/$refs
		=>$listeners $attrs
		=>provide inject
		=>vuex
VUEX公共状态管理（数据临时缓存存储）
	=>state / getters / mutations / actions / modules（namespaced）
	=>plugins：logger
	=>mapState/mapGetters/mapMutations/mapActions/createNamespacedHelpers
	=>页面刷新，vuex中存储的数据必然会清空
VUE-ROUTER
	=>SPA VS MPA
	=>第一步：构建路由表（摸清楚项目的结构和需求）
		=>mode HASH路由和BROWSER路由的原理和区别
		=>每一个路由中
			=>path
			=>name 命名路由
			=>props:true 把传递的params信息当做属性传递给组件
			=>component:xxx/function 如果是函数，最开始不会导入和加载对应的组件，只有路由匹配成功后才会导入组件import('./xxx')，也可以在函数中做点其它的事情，例如：权限校验
			=>children
			=>redirect
	=>第二步：设置路由视图 router-view
		=>命名视图
		=>路由表中：components = {default:xxx,xxx:xxx}
	=>第三步：路由切换和跳转
		=>router-link
			=>to='xxx/xxx'
			=>:to='{path:xxx,query:{xxx:xxx}}' 问号传参（显示在地址栏中）
			=>:to='{name:xxx,params:{xxx:xxx}}' 隐藏传参（刷新当前页面,params清空）
			=>动态路由：规则中设置 path='xxx/:xxx/:xxx'  传参 to='xxx/100/200' 最后也是基于params来接受
		=>编程式导航
			=>this.$router.push/go/back/forward...
	=>在组件中获取路由的相关信息
		=>this.$router
		=>this.$route === this.$router.currentRoute
	=>导航守卫
		=>全局守卫 beforeEach ...（路由守卫、组件守卫）... beforeResolve afterEach （组件的渲染）
		=>路由守卫 beforeEnter
		=>组件守卫 beforeRouteEnter  （beforeRouteUpdate/beforeRouteLeave）
DEVTOOLS浏览器中帮助我们进行vue调试的插件（扩展程序）
WEBPACK和VUE-CLI
	=>vue-loader
	=>webpack的性能优化
VUE中的插件
VUE中的动画
VUE中的单元测试
VUE中的核心原理（和REACT基本一致）
VUE中的组件框架
	=>element ui / iview
	=>vant / Cube UI
	=>自己写
VUE的服务器渲染（SSR）：前端架构必备能力（全栈开发）
	=>vue + nuxt
===================================================
- 基础知识的背诵
- 面试题和网上资料的扩充
- 实战案例