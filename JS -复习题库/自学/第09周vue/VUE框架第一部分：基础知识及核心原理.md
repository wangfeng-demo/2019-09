# VUE框架第一部分：基础知识及核心原理

<a name="7d47370d"></a>
### VUE基础概念
> [https://cn.vuejs.org](https://cn.vuejs.org)

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**<br />特点：易用、灵活、高效<br />全家桶：vue + components（vue element / iview...） + vue-router + vuex + vue-cli<br />[]()
<a name="80157848"></a>
#### 类库 vs 插件 vs 组件 vs 框架

- 类库：jquery、zepto、underscore...
- 插件：dialog、banner、drag、tab、iscroll...
- 组件：bootstrap、swiper...
- 框架：backbone、angular、vue、react、uni-app、react native、flutter...

[]()
<a name="580dd8f4"></a>
#### 声明式和命令式

- 命令式编程：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现，例如for循环
- 声明式编程：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)，例如数组内置方法forEach等

![4.png](https://cdn.nlark.com/yuque/0/2019/png/456562/1570388620160-39041079-a64f-4ea4-8b96-6f33951dd8b4.png#align=left&display=inline&height=262&name=4.png&originHeight=450&originWidth=800&search=&size=63357&status=done&width=465)[]()

<a name="bb5157c9"></a>
#### MVC  & MVVM

- 传统操作DOM模式
- MVC：model view controller
- MVVM：model view viewModel

![2.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/456562/1570388665775-da82d710-85ae-4d7a-9ffa-b513104a68ae.jpeg#align=left&display=inline&height=414&name=2.jpg&originHeight=414&originWidth=549&search=&size=22407&status=done&width=549)![3.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/456562/1570388665907-1a42a934-4832-4cc6-a42a-f8065f674cc2.jpeg#align=left&display=inline&height=257&name=3.jpg&originHeight=257&originWidth=525&search=&size=10709&status=done&width=525)
```
<div id="app">
	{{msg}}
</div>
<!-- IMPORT JS -->
<script src="node_modules/vue/dist/vue.min.js"></script>
<script>
    new Vue({
    	el: '#app',
    	data: {
    		msg: 'hello world'
    	}
	});
	setTimeout(() => {
    	vm.msg = '你好世界';
    }, 1000);
</script>
```

```javascript
<div id="app">
    人民币：￥<input type="text" v-model='price'>元
	<br>
    美元：${{price/8}}
</div>
<!-- IMPORT JS -->
<script src="node_modules/vue/dist/vue.min.js"></script>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            price: 0
        }
    });
</script>
```

[]()
<a name="67e3e4a6"></a>
### VUE的基础语法[]()
<a name="cfbf6a04"></a>
#### new Vue(options)

- 返回值vm（viewModel）
- el：不能挂载到html或者body上  =>querySelector
- data
  - 数据值对于对象来说要先声明，否则新增属性无效（可以基于vm.$set处理）
  - vm.arr[0]=xxx 改变数组中的某一项视图不会渲染，需要基于内置的方法，例如：push...
  - 对象或者数组可以整体替换值实现数据变视图也变
- ...

[]()
<a name="362cc822"></a>
#### mustache（[ˈmʌstæʃ]） 小胡子语法

- value
- JS表达式

[]()
<a name="814c3e82"></a>
#### 常用的指令（directive）

- v-model
- v-html / v-text：取消小胡子语法刷新中的闪烁问题
- v-bind（缩写 :）
- v-once
- v-if 和 v-show
- v-for
  - for in循环 & for of循环
    - 遍历数据类型的范围
    - 原型上方法遍历（或者数组新增的xxx:xxx属性遍历）
    - ......
  - Symbol.iteratoer：Array、Set、Map、String、Arguments、NodeList...
- v-on 事件绑定
  - v-on:xxx
  - methods ：和data类似，都会把方法挂载到vm实例上（this都是当前实例）
  - @xxx
  - @xxx="func"  &  @xxx="func($event,...)"



<a name="RAFVC"></a>
#### directive自定义指令

- Vue.directive([指令名，省略v-], function(el,bindings,vnode){}
  - el当前元素
  -  bindings包含很多信息
    - name：指令名，不包括 v- 前缀
    - value：指令的绑定值
    - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用
    - expression：字符串形式的指令表达式
    - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"
    - modifiers：包含修饰符的对象。例如：my-directive.foo.bar 中，修饰符对象 { foo: true, bar: true }
  - vnode虚拟DOM
    - ctx = vnode.context  获取当前元素所在的上下文
    - ctx[bindings.expression]=xxx 获取上下文中的表达式变量，并且把指定的值赋值给它
- 钩子函数
  - bind：当用户绑定指令时生效（只调一次）
  - update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前（一个函数的方式就是把bind和update合在一起的写法）
  - componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
  - unbind：只调用一次，指令与元素解绑时调用
  - inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
- 小练习：创建一个自定义指令控制文本框的校验

[]()
<a name="fd9e99b0"></a>
#### 事件修饰符

- 常规：.stop / .prevent / .once ...
- 按键：.enter 或者 .13 / .up / .down / .left / .right ...
- 组合修饰符
- ...

[]()
<a name="94cb0e38"></a>
#### 表单元素的处理

- 普通文本框 或者 文本域
- 单选框
- 复选框
- 下拉框
- 小案例：全选和非全选

[]()
<a name="VRT12"></a>
#### 计算属性、过滤器、监听器

- methods 普通方法
- filters 过滤器
  - 只能应用到胡子语法和v-bind中
  - 小练习：输入内容的单词首字母大写
- computed
  - getter & setter
  - 相对于普通方法来讲，计算属性是基于它们的响应式依赖进行缓存的
  - 依赖data中的数据变量
  - 小练习：输入内容的单词首字母大写
  - 小练习：全选和非全选
- watch
  - 当需要在数据变化时执行异步或开销较大的操作时应用监听器
  - 小练习：全选和非全选 
  - 小练习：数据异步绑定的处理
```javascript
data(){
　　return {
　　　　checked:false, //是否全选
　　　　checkModel:[]
　　}
},
watch:{
　　checkModel(){
　　　　if(this.checkModel.length==this.list.length){
　　　　　　this.checked=true;
　　　　}else{
　　　　　　this.checked=false;
　　　　}
　　}
}
...
```

<a name="9lKd9"></a>
#### class和style绑定

- class的处理（对象语法、数组语法）
- 内联样式的处理
- ...

<a name="fsLV2"></a>
#### 生命周期函数（钩子函数）

- beforeCreate
- created 
- beforeMount
- mounted 
- beforeUpdate
- updated
- beforeDestory
- destory
- ...

 
<a name="CFfel"></a>
#### 常用的属性方法

- $set : 设置响应式数据
- $el : 挂载的元素
- $destroy : 销毁vue的实例；同时调用beforeDestroy destroyed
- $mount  : 挂载真实DOM的方法
- $data  : 响应式的对象
- $options: 是Vue的构造函数的参数
- $refs : 可以用来获取指定的元素对象 （非受控组件）
- $on : 订阅
- $emit : 发布
- $watch：监控
- ...

<a name="sWOpi"></a>
#### 案例：选项卡
<a name="06448eaf"></a>
#### 案例：购物车计算器
<a name="shyGn"></a>
#### 案例：商城类别筛选

---------------------------------------------------------------------------------------------------

<a name="3e17bd5e"></a>
### 双向数据绑定的实现原理

- Object.defineProperty
- 实现的底层原理
```javascript
//observer:观察者
function observer(obj) {
	if (obj && typeof obj === 'object') {
		for (let key in obj) {
			if (!obj.hasOwnProperty(key)) break;
			defineReactive(obj, key, obj[key]);
		}
	}
}

function defineReactive(obj, key, value) {
	observer(value);
	Object.defineProperty(obj, key, {
		get() {
			return value;
		},
		set(newValue) {
			observer(newValue);
			if (value === newValue) return;
			value = newValue;
		}
	});
}

function $set(data, key, value) {
	defineReactive(data, key, value);
}
```
![5.jpg](https://cdn.nlark.com/yuque/0/2019/jpeg/456562/1570388757458-316f7f22-c65e-480b-94ba-1fa7caa1e618.jpeg#align=left&display=inline&height=436&name=5.jpg&originHeight=497&originWidth=674&search=&size=17242&status=done&width=591)<br />Vue 主要通过以下 4 个步骤来实现数据双向绑定的：

- 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
- 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
- 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
- 实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

---------------------------------------------------------------------------------------------------

<a name="261147f7"></a>
### VUE中的组件（component）
组件的特点是：

- 每个组件就是一个自定义标签
- 可复用
- 方便维护
- 方便拆分
- 每个组件作用域隔离（互不干扰）
- 有完整的生命周期
- 有自己的响应式数据和各种方法（事件）
- ...

<a name="cc5d02f5"></a>
#### 1.全局组件 & 组件的基本语法
> 在任何组件中可以直接使用（不需要引入，直接在组件模板中调用即可）
> Vue.component(componentName,options)

- 组件名字中的一点规范
  - kebab-case：只能<kebab-case><kebab-case/>调用
  - PasalCase：既可类似前种方式调用，也可以<PasalCase><PasalCase/>方式调用
- 调用组件的细节规范
  - 采用双闭合方式
  - 单闭合方式不符合w3c规范（只能识别一个）
- template
  - 每个组件只能有一个根元素
  - 模板字符串方式
  - template标记方式
  - slot插槽处理
    - 基础操作
    - 多插槽的指定
- data必须是一个函数，保证不同组件之间的数据互不干扰（返回的对象中初始化数据）
- ...
```javascript
<my-component>
	<template v-slot:xxx 或者 #xxx>
		珠峰培训
	</template>
</my-component>

{
	templete:`<div>
		<slot name='xxx'></slot>
	</div>`
}
```

<a name="669eb911"></a>
#### 2.局部组件

- 创建组件：let componenName={...}
- 基于components属性声明组件：想用哪个组件需要先声明
- 使用组件

<a name="d2cb1cc1"></a>
#### 3.组件信息通讯之父传子：props属性传递

- 父组件调用到的时候
```javascript
<my-component aa='zhufeng' :bb='xxx'></my-component>
```

- 子组件中基于props声明需要接收的属性值
```javascript
Vue.component('my-component',{
	props:['aa','bb'],
	...
})
```

- props中声明的属性和data一样，是响应式数据，挂载到vm实例上，可控制视图渲染
- props中的一些细节问题
  - 命名大小写：传递的是kebab-case格式，props中获取的是camelCase驼峰命名
  - 指定属性的类型：props:{xxx:String,...}
  - 指定属性的默认值：props:{xxx:{type:String,default:'xxx',required:true}}
    - type如果是一个数组，意为指定的多类型皆可以
    - default可以是一个函数，函数返回值是默认值
    - validator自定义验证规则函数：必须符合函数中指定的规则，返回true/false
  - 传递的属性值默认都是字符串格式，如果想要让传递的值是数字、布尔、数组、对象等格式，我们需要使用v-bind处理
  - 样式和class自动合并问题

<a name="ad4e70bd"></a>
#### 4.vue的单向数据流
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
- 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 父组件更新过程：父 beforeUpdate -> 父 updated
- 销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。有两种常见的试图改变一个 prop 的情形 :

- 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值
- 这个 prop 以一种原始的值传入且需要进行转换。 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

<a name="a5a21eff"></a>
#### 5.组件信息通讯之子改父：this.$emit

- 订阅自定义事件：调用组件的时候基于属性传递一个方法 （父）
```javascript
<my-component @func='xxx'></my-component>

new Vue({
	methods:{
		xxx(value){
			//=>value是this.$emit时候传递的第二个参数值
		}
	}
});
```

- 通知自定义事件执行 （子）
```javascript
{
	methods:{
		xxx(){
			this.$emit('func',10);
		}
	}
}
```

- 也可以基于此方法实现兄弟组件（父子组件、隔代组件）之间的信息通信
```javascript
let eventBus=new Vue; //=>创建事件总线

//A组件
eventBus.$on('xxxA',this.func);

//B组件
eventBus.$emit('xxxA');
```

<a name="b1e8afc3"></a>
#### 6.基于ref实现父子组件信息通信

- ref 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，基于此可以快速获取和操作子组件中的数据
- $parent和$children是获取组件和子组件的实例，只不过$children是一个数组集合，需要我们记住组件顺序才可以

<a name="07505362"></a>
#### 7.基于provide和inject实现祖先与后代的通信

- 祖先组件基于provide注册需要供后代组件使用的数据
```javascript
{
	provide:{ //=>对象或者返回对象的函数都可以（属性值如果是data中的数据，则必须使用函数的方法进行处理）
		name:'zhufeng',
		year:10
	},
	...
}
```

- 后代组件基于inject声明需要使用的数据并调取使用
```javascript
{
	inject:['name'],
	methods:{
		func(){
			let name=this.name;
		}
	}
}
```

<a name="jjn7m"></a>
### VUE中的TRANSITION动画
<a name="TkBol"></a>
#### 1. 什么情况下会用动画

- 条件渲染 v-if
- 条件展示 v-show
- 动态组件 例如：vue-router控制组件渲染
- ...

<a name="3wpMp"></a>
#### 2. 如何实现动画

- 修改元素的样式：style & class
- 使用JS实现动画（前两周在某些场景下都需要自己直接去操作DOM或者更加的麻烦）
- 使用vue内置的transition & transition-group

<a name="RUaRP"></a>
#### 3. transition的基础使用

- v-enter：定义进入过渡的开始状态，在元素被插入之前生效，在元素被插入之后的下一帧移除
- v-enter-active：定义进入过渡生效时的状态，在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除
- v-enter-to: 定义进入过渡的结束状态，元素被插入之后下一帧生效 ，在过渡/动画完成之后移除
- v-leave: 定义离开过渡的开始状态，在离开过渡被触发时立刻生效，下一帧被移除<br />
- v-leave-active：定义离开过渡生效时的状态，在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除<br />
- v-leave-to:  定义离开过渡的结束状态，在离开过渡被触发之后下一帧生效，在过渡/动画完成之后移除
- 基于 transiton 标记中的 name 属性来进行动画样式区分
  - <transition name='demo'>
  - .demo-enter 等
- 自定义过渡类名（例如：结合animate.css使用）
  - <transition
    
    enter-active-class="animated xxx"  leave-active-class="animated xxx"
  >

<a name="YA26d"></a>
#### 4.JAVASCRIPT中的动画钩子函数

- Velocity.js函数
```javascript
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @before-leave="beforeLeave"
  ...
>
</transition>

methods:{
	 beforeEnter: function (el,done) {
   	 
   },
   ...
}
```

<a name="ORaga"></a>
#### 5. transition-group 处理多组元素动画

- 如果在transition-group中使用v-for，需要设置:key唯一值
- 小练习：关键词模糊匹配搜索



<a name="XAPxQ"></a>
### 综合实战案例
<a name="UfZhl"></a>
#### 1. 轮播图的实现
<a name="XVtHv"></a>
#### 2. TASK OA任务管理系统（俗称TODO）

---------------------------------------------------------------------------------------------------



















