<template>
  <div class="container">
    <div class="leftBox">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#343D4A"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex()"
        @select="changeRouter"
      >
        <el-menu-item index="1">
          <span>我的客户</span>
        </el-menu-item>
        <el-menu-item index="2" v-power="customAll">
          <span>所有客户</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>新增客户</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--右侧内容-->
    <div class="rightBox">
      <!-- KEEP-ALIVE组件可以保证路由切换的时候，当前组件不销毁 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customAll: "departcustomer|allcustomer"
    };
  },
  methods: {
    activeIndex() {
      let nowURL = location.href;
      if (nowURL.includes("/custom/list")) {
        let { type } = this.$route.query;
        if (type === "all") return "2";
        return "1";
      }
      if (nowURL.includes("/custom/handle")) return "3";
    },
    changeRouter(index) {
      let arr = [
        "/custom/list?type=my",
        "/custom/list?type=all",
        "/custom/handle"
      ];
      index = parseInt(index);
      if (location.href.includes(arr[index - 1])) return;
      this.$router.push(arr[index - 1]);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;

  .leftBox {
    width: 18%;
    height: 100%;
    background: #343d4a;
  }

  .rightBox {
    width: 82%;
    height: 100%;
  }
}
</style>