<template>
  <div>
    <!-- <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
            label = '莹莹'
            >
     <div slot="action" @click="onSearch">搜索</div>
    </van-search>-->
    <!-- <van-search placeholder="请输入搜索关键词" v-model="value"/> -->
    <div>
      <my-header></my-header>
      <van-tabs class="top_tab" v-model="active" swipeable animated @change="change" line-width="35px">
        <van-tab v-for="item in ary" :title="item.til" :key="item.to">
          <router-view></router-view>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template> 
<script>
// @ is an alias to /src
import Header from "./header";
export default {
  name: "home",
  data() {
    return {
      // active: 1,
      ary: [
        { til: "关注", to: "/home/focus" },
        { til: "推荐", to: "/home/recommend" },
        { til: "热榜", to: "/home/hot" }
      ]
    };
  },
  components: {
    "my-header": Header
  },
  methods: {
    change(n) {
      console.log(arguments, this.active);
      this.$router.push(this.ary[n].to);
    }
  },
  computed: {
    active: {
      get() {
        return this.ary.findIndex(item => item.to == this.$route.path);
      },
      set() {}
    }
  }/* ,
  watch: {
    $route(to) {
      //侦听路由变化
      console.log(to);
      this.ary.forEach((item, index) => {
        if (item.to == to.path) {
          this.active = index;
        }
      });
    }
  } */
};
</script>
<style lang="less">
.van-tabs__wrap::after {
  border: none;
}
.top_tab>.van-tabs__wrap {
  box-shadow: 0px 4px 4px 0px #eee;
}
.van-tabs__line {
  background: #333;
}
.van-ellipsis{
    font-size: 4.5vw;
}
</style>