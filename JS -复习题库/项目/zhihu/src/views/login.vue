<template>
  <div class="loginBox">
    <header>
      <div class="lt" @click="close">X</div>
      <div class="rt">免密码登录</div>
    </header>
    <h2>密码登录</h2>
    <div class="inpBox">
      <input type="text" placeholder="请输入用户名或手机号" v-model="name" />
      <input type="password" placeholder="请输入密码" v-model="psw" />
    </div>
    <div class="loginBtn" @click="login">登录</div>

    <div class="cl help">
      <div class="lt">海外手机号登录</div>
      <div class="rt">需要帮助</div>
    </div>

    <div class="otherLogin">
      <div>微信</div>
      <div>QQ</div>
      <div>新浪</div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { login } from "@/api/login.js";
export default {
  name: "login",
  data() {
    return {
      name: "",
      psw: ""
    };
  },
  methods: {
    close() {
      //d点击关闭按钮回到原来的页面
      this.$router.go(-1);
    },
    login() {
      if (!this.name || !this.psw) {
        alert("用户名或密码不能为空");
        return
      }
      login({
        name: this.name,
        password: this.psw
      }).then(data => {
          //登陆成功之后 要把后台给的token 存储到localStorage中
          console.log(data);
          localStorage.setItem("token", "jiyingbaobei");
          this.$store.commit('stateChange',{loginState:true})
          this.$router.go(-1)
        }).catch(err => {
          console.log(err);
          localStorage.setItem("token", "jiyingbaobei");
           this.$store.commit('stateChange',{loginState:true})
           this.$router.go(-1)
        });
    }
  },
  components: {}
};
</script>
<style lang="less">
.loginBox {
  padding: 5vw;
  > header {
    overflow: hidden;
  }
  h2 {
    height: 30vw;
    line-height: 30vw;
  }
  .inpBox {
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      width: 80vw;
      margin: auto;
      display: block;
      height: 15vw;
      font-size: 5vw;
      outline: none;
    }
  }
  .loginBtn {
    width: 80vw;
    height: 15vw;
    margin: 5vw auto;
    background: rgb(104, 104, 240);
    text-align: center;
    line-height: 15vw;
    color: #fff;
  }
  .help {
    width: 80vw;
    margin: 10vw auto;
  }
  .otherLogin {
    width: 80vw;
    display: flex;
    position: fixed;
    bottom: 10vw;
    left: 10vw;
    > div {
      flex: 1;
      text-align: center;
    }
  }
}
</style>