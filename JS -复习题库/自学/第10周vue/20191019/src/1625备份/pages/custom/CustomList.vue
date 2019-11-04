<template>
  <div>我是客户列表 === {{queryLx}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    queryLx() {
      //=>获取路由切换时传递的参数信息
      /*
       * this.$router
       *    go(n)：回退或者前进N步
       *    back() => go(-1)
       *    forward() => go(1)
       *    push()：跳转到指定的路由，实现路由切换
       * =>编程式导航
       */
      console.log(this.$router);
    }
  }
};
</script>

<style lang="less" scoped>
</style>