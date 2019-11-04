<template>
  <div id="app">
    <!-- 头部主导航 -->
    <header class="headerBox">
      <h1>珠峰培训CRM客户管理系统</h1>
      <el-menu
        mode="horizontal"
        class="el-menu-demo"
        background-color="#545C64"
        text-color="#FFF"
        active-text-color="#FFD04B"
        default-active="1"
      >
        <el-menu-item index="1">
          <!-- 实现路由的切换和跳转 -->
          <router-link to="/home">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/custom">客户管理</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/system">系统设置</router-link>
        </el-menu-item>
      </el-menu>
    </header>

    <!-- 展示一级路由中各组件的内容（呈现组件的视图容器router-view） -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang='less'>
html,
body,
#app {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

.headerBox {
  position: relative;
  h1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0 10px;
    width: 300px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .el-menu-demo {
    padding-left: 300px;

    li {
      font-size: 16px !important;
    }
  }
}
</style>