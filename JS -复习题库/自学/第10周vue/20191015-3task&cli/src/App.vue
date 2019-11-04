/* 当前组件需要渲染的视图 */
<template>
  <div id="app"></div>
</template>

/* 当前组件需要的JS部分：声明周期、DATA等 */
<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

/* 当前组件的样式：设置scoped属性，代表当前的样式是组件的私有样式，和其它组件中的样式不冲突*/
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
