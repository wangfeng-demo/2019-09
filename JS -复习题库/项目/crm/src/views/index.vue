<template>
  <div>
    <el-container>
      <el-header class="cl">
        <h2 class="lt">CRM管理系统</h2>
        <div class="topTabBox lt">
          <div class="lt">
            <router-link tag="span" to="/org">组织结构</router-link>
          </div>
          <div class="lt">
            <router-link tag="span" to="/crm">客户管理</router-link>
          </div>
        </div>
        <div class="userNameBox rt">
          <span>您好,珠峰培训</span>
          <span @click="black">安全退出</span>
        </div>
      </el-header>
      <div class="middle_content_box">
        <router-view></router-view>
      </div>
      <el-footer class="footer_bottom">Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
//在该组件  验证登录
import { judgeLogin } from "@/api/index.js";
import { signout } from "@/api/login";
export default {
  name: "index",
  data() {
    return {};
  },
  created() {
    judgeLogin().then(flag => {
      if (!flag) {
        this.$router.push("./login");
      }
    });
  },
  methods: {
    black() {
      signout().then(data => {
        if (data.code == 0) {
          localStorage.removeItem("power"); 
          this.$router.push("/login");
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less">
.topTabBox {
  padding: 0 50px;
  > div {
    margin: 0 20px;
    cursor: pointer;
    color: #ccc;
    &:hover {
      color: #fff;
      &::after {
        content: "";
        display: block;
        width: 100%;
        position: relative;
        border-bottom: 3px solid #fff;
        top: -3px;
      }
    }
    > span {
      display: block;
      width: 100%;
      height: 100%;
    }
    > span.router-link-active {
      font-size: 20px;
      font-weight: 200;
      color: #fff;
    }
  }
}
.userNameBox {
  > span:nth-child(2) {
    cursor: pointer;
    padding-left: 20px;
  }
}
.middle_content_box {
  position: absolute;
  top: 60px;
  bottom: 60px;
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  .el-container {
    height: 100%;
  }
}
.footer_bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.el-header,
.el-footer {
  background-color: #444;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(205, 234, 245);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>