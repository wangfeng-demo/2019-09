<template>
  <div class="loginBox">
    <h1>CRM客户管理系统</h1>
    <h3>为了保护企业安全，请妥善保管莹莹</h3>
    <div>
      <el-input class="inp" placeholder="请输入内容" prefix-icon="el-icon-user" v-model="name"></el-input>
      <el-input
        class="inp"
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        v-model="psw"
        show-password
      ></el-input>
      <el-button class="btn" type="primary" @click="login">登录</el-button>
    </div>
    <p>北京珠峰世纪技术培训有限公司 京ICP备09041920号 京公网安备110108400531号</p>
  </div>
</template>
<script>
// @ is an alias to /src
import { login } from "@/api/login.js";
import md5 from "md5";
export default {
  name: "login",
  data() {
    return {
      name: "",
      psw: ""
    };
  },
  methods: {
    login() {
      if (!this.name || !this.psw) {
        this.$message.error("用户名或密码不能为空");
        return;
      }
      let obj = {
        acconut: this.name,
        password: md5(this.psw)
      };
      login(obj).then(data => {
        if (data.code == 0) {
          this.$alert("登录成功", "提示", {
            confirmButtonText: "确定",
            callback: action => {//action能知道是点击的之后返回的东西
             this.$router.push('/')
            }
          });
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less">
.loginBox {
  width: 100%;
  height: 100%;
  text-align: center;
  background: linear-gradient(white, skyblue);
  position: fixed;
  top: 0;
  left: 0;
  h1 {
    height: 60px;
    line-height: 60px;
    margin-top: 80px;
  }
  > div {
    width: 400px;
    margin: 50px auto;
    box-shadow: 1px 3px 20px 9px #ccc;
    padding-top: 50px;
    .inp {
      width: 80%;
      margin: 5px auto;
    }
    .btn {
      width: 80%;
      margin: 20px 0;
    }
  }
  > p {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }
}
</style>