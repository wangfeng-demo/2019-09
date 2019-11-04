### vue-cli的一点深入研究
$ vue inspect 查看当前项目默认的webpack配置信息
$ vue create
$ vue add [plugin] 在当前项目中安装插件
...

默认的配置项中已经把less/sass等规则写好了，如果我们的项目中需要使用less，无需配置规则，只需要安装对应的模块和加载器即可
$ yarn add less less-loader -D
```
<script>
	import './xxx/xxx.less';
</script>

<style lang='less'>
	//...
</style>
```

#### 1.修改默认的webpack配置
需要在根目录中设置 vue.config.js


=======================================
### 实现组件之间信息通信的方式
- props  父->子
- $on/$emit  子<->父  拥有共同父亲的兄弟  隔代处理
- $parent/($children|$refs)
- provide/inject  隔代处理
- $listeners/$attrs

### vuex能处理任何情况下的组件信息通信
> 前提：SPA单页面（实现的是同一个页面中，各组件的信息通信）
> vuex:vue中实现公共状态管理的插件