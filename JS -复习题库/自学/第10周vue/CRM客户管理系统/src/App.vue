<template>
  <div id="app">
    <!-- 头部主导航 -->
    <header class="headerBox" ref="headerBox">
      <h1 class="logo">CRM客户管理系统</h1>
      <el-menu
        mode="horizontal"
        class="el-menu-demo"
        background-color="#3A3D42"
        text-color="#FFF"
        active-text-color="#FFD04B"
        :default-active="activeIndex()"
      >
        <el-menu-item index="1">
          <router-link to="/custom">客户管理</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/system">系统设置</router-link>
        </el-menu-item>
      </el-menu>

      <div class="baseBox">
        <span v-text="name"></span>
        <a href="javascript:;" @click="dialogVisible=true">修改密码</a>
        <a href="javascript:;" @click="handleSignout">安全退出</a>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="mainBox" ref="mainBox">
      <router-view></router-view>
    </main>

    <!-- DIALOG -->
    <el-dialog :visible="dialogVisible" title="修改密码" width="30%" :before-close="closeDialog">
      <el-form :model="modePass">
        <el-form-item label="新密码">
          <el-input type="password" v-model="modePass.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="modePass.confirmPass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitResetPass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryBaseInfo, signout, resetpassword } from "./api/login";
import md5 from "blueimp-md5";
export default {
  components: {},
  data() {
    return {
      name: "",
      dialogVisible: false,
      modePass: {
        pass: "",
        confirmPass: ""
      }
    };
  },
  methods: {
    activeIndex() {
      let nowURL = location.href;
      if (nowURL.includes("/custom")) return "1";
      if (nowURL.includes("/system")) return "2";
    },
    handleSignout() {
      signout()
        .then(() => {
          location.href = location.origin + "/login.html";
        })
        .catch(() => {
          this.$message.error("当前网络异常，请稍后再试！");
        });
    },
    closeDialog() {
      this.modePass.pass = "";
      this.modePass.confirmPass = "";
      this.dialogVisible = false;
    },
    submitResetPass() {
      let reg = /^\w{6,16}$/;
      if (
        !reg.test(this.modePass.pass) ||
        !reg.test(this.modePass.confirmPass)
      ) {
        this.$message.error("密码格式不正确，请重新输入！");
        return;
      }

      if (this.modePass.pass !== this.modePass.confirmPass) {
        this.$message.error("请确保两次输入的密码一致！");
        return;
      }

      resetpassword(md5(this.modePass.pass))
        .then(() => {
          this.$message.success("新密码已经修改成功，请妥善保存！");
          this.closeDialog();
        })
        .catch(() => {
          this.$message.error("新密码修改失败，请稍后重试！");
        });
    }
  },
  created() {
    queryBaseInfo().then(result => {
      this.name = "欢迎：" + result.name;
    });
  },
  mounted() {
    let winH = document.documentElement.clientHeight,
      headerBox = this.$refs.headerBox,
      mainBox = this.$refs.mainBox;
    mainBox.style.height = winH - headerBox.offsetHeight + "px";
    this.$forceUpdate();
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

/* ==HEADER== */
@H: 62px;
.headerBox {
  display: flex;
  justify-content: space-between;
  height: @H;
  background: #3a3d42;
  overflow: hidden;

  .logo {
    width: 20%;
    line-height: @H;
    text-align: center;
    font-size: 20px;
    color: #fff;
    letter-spacing: 3px;
  }

  .baseBox {
    box-sizing: border-box;
    padding-right: 10px;
    width: 30%;
    line-height: @H;
    text-align: right;
    font-size: 16px;

    span,
    a {
      margin: 0 5px;
      color: #fff;
    }

    a {
      text-decoration: underline;
    }
  }

  .el-menu-demo {
    box-sizing: border-box;
    width: 46%;

    li {
      font-size: 16px !important;

      a {
        display: block;
        height: 100%;
      }
    }
  }
}

.mainBox {
  display: flex;
  overflow: hidden;
}
</style>