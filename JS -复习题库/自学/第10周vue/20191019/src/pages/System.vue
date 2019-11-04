<template>
  <div>我是系统设置</div>
</template>

<script>
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
    console.log("=====组件独有BEFORE ROUTE ENTER");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("=====组件独有BEFORE ROUTE UPDATE");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("=====组件独有BEFORE ROUTE LEAVE");
    next();
  }
};
</script>

<style lang="less" scoped>
</style>