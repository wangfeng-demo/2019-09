<template>
  <el-aside width="200px" style="background:#545c64;overflow: hidden">
    <div class="asideBox">
      <el-row class="tac">
        <el-col>
          <el-menu
            :router="true"
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
          >
            <!-- v-if="power.indexOf(item[0].meta.power)!=-1" -->
            <el-submenu
              class="mycolor"
              v-for="(item,index) in menuList"
              :index="index+''"
              :key="index"
            >
              <template slot="title">
                <i :class="item[0].meta.icon"></i>
                <span>{{item[0].meta.rootTil}}</span>
              </template>
              <router-link tag="span" v-for="(v,i) in item" :key="index+'-'+i" :to="v.path">
                <el-menu-item :route="v.path" :index="index+'-'+i">{{v.meta.til}}</el-menu-item>
              </router-link>
            </el-submenu>
            <!-- <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>部门管理</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-grape"></i>
                  <span>职务管理</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>-->
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-aside>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["ary"],
  data() {
    return {
      menuList: [],
      power: decodeURIComponent(localStorage.getItem("power"))
    };
  },
  created() {
    this.menuInit();
  },
  methods: {
    menuInit() {
      let t = [this.ary[0]];
      this.ary.reduce((prv, cur) => {
        if (prv.meta.type == cur.meta.type) {
          t.push(cur);
        } else {
          this.menuList.push(t);
          t = [cur];
        }
        return cur;
      });
      this.menuList.push(t);
      //权限校验
      this.menuList = this.menuList.filter(item => {
        if (!this.power) return false;
        return this.power.includes(item[0].meta.power);
      });
      console.log(this.menuList);
      // 权限校验完成之后 设置默认的跳转路径
      let url = this.menuList[0] && this.menuList[0][0].path
      let ary = this.$route.path.split('/');
      if(ary.length>2&&ary.pop().length>0){
        // 说明路径是在二级路径下，这时什么也不用做
        //ary.length>2 说明至少由两个 /
        // ary.pop().length>0 说明最后一项的长度不是0； 也就是第二个/后边有内容， 也就是当前是二级路径
      }else{
        this.$router.push(url)
      }
    }
  },
  components: {}
};
</script>
<style lang="less">
.mycolor {
  span,
  li {
    color: #fff;
  }
}
.router-link-active {
  .el-menu-item {
    color: aqua;
  }
}
.asideBox {
  height: 100%;
  width: 110%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>