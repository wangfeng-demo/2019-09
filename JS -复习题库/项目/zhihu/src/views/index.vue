<template>
  <div class="mainPage">
    <nav class="navBox">
      <div>
        <router-link to="/home">
          <i class="iconfont icon-shouye"></i>
          <div>首页</div>
        </router-link>
      </div>
      <div>
        <router-link to="/vip">
          <i class="iconfont icon-huiyuan"></i>
          <div>会员</div>
        </router-link>
      </div>
      <div>
        <i class="iconfont icon-plus big" @click="show"></i>
      </div>
      <div>
        <router-link to="/notify">
          <i class="iconfont icon-tongzhi2-copy"></i>
          <div>通知</div>
        </router-link>
      </div>
      <div>
        <router-link to="/user">
          <i class="iconfont icon-wode"></i>
          <div>{{loginState?'我的':'未登录'}}</div>
        </router-link>
      </div>
    </nav>
    <div>
      <router-view></router-view>
    </div>
    <my-dialog :isshow="flag" @close="close">
      <template v-slot:header = qqq>
           <header v-text="qqq.www"></header>
      </template>
     <h2>莹莹</h2>
     <template slot = "footer" slot-scope='qqq'>
           <footer v-text = 'qqq'></footer>
     </template>
     </my-dialog>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState } from "vuex";
import dialog from "@/components/dialog";
export default {
  name: "index",
  data() {
    return {
      flag: false
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      // this.$router.push('/login')
    }
  },
  components: {
    "my-dialog": dialog
  },
  computed: {
    ...mapState(["loginState"])
  },
  methods: {
    show() {
      this.flag = true;
    },
    close() {
      this.flag = false;
    }
  }
};
</script>
<style lang="less" scoped>
.mainPage > div:nth-child(1) {
  padding-bottom: 18vw;
}
//scoped支队当前魔板有作用
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 18vw;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    text-align: center;
    user-select: none;
    line-height: 3.5vh;
    > a {
      text-decoration: none;
      color: plum;
      display: block;
      width: 100%;
      height: 100%;
      i {
        font-size: 6vw;
        font-weight: 800;
      }
      div {
        font-size: 4.5vw;
        color: rgb(233, 25, 233);
      }
    }
    .big {
      font-size: 6vw;
    }
    a.router-link-active {
      color: blueviolet;
    }
  }
}
</style>