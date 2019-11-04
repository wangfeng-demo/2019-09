<template>
  <div class="container">
    <div class="leftBox">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link slot="title" to="/custom/list/my">我的客户</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link slot="title" :to="{name:'customList',params:{lx:'all'}}">全部客户</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link slot="title" to="/custom/handle">新增客户</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="rightBox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;

  .leftBox {
    width: 20%;
    height: 100%;
  }

  .rightBox {
    width: 80%;
    height: 100%;
  }
}
</style>