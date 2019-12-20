<template>
  <el-container>
    <my-nav :ary = 'ary'></my-nav>
    <el-main class="my-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
// @ is an alias to /src
import ary from "@/router/org.js";
import nav from "@/components/nav.vue";
export default {
  name: "XXX",
  data() {
    return {
      ary: ary
    };
  },
  components: {
    "my-nav": nav
  }
};
</script>
<style lang="less" scope>
.my-main{
  padding:0;
  line-height: normal;
}
</style>