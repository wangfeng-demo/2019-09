<template>
  <div>我是首页</div>
</template>

<script>
/*
 * 每一次路由的跳转和切换，都是把之前渲染的组件销毁（DESTORYED） ，重新渲染新的组件（BEFORE-CREATE => DATA）
 */
export default {
  beforeCreate() {
    console.log("BEFORE-CREATE");
  },
  created() {
    console.log("CREATE");
  },
  beforeMount() {
    console.log("BEFORE-MOUNT");
  },
  mounted() {
    console.log("MOUNTED");
  },
  beforeDestroy() {
    console.log("BEFORE-DESTROY");
  },
  destroyed() {
    console.log("DESTROYED");
  },
  data() {
    console.log("DATA");
    return {};
  },
  /* 组件独有的守卫 */
  beforeRouteEnter(to, from, next) {
    //=>也获取不到THIS
    console.log("=====组件独有BEFORE ROUTE ENTER");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("=====组件独有BEFORE ROUTE UPDATE");
    next();
  },
  beforeRouteLeave(to, from, next) {
    //=>获取到this
    console.log("=====组件独有BEFORE ROUTE LEAVE");
    next();
  }
};
</script>

<style lang="less" scoped>
</style>