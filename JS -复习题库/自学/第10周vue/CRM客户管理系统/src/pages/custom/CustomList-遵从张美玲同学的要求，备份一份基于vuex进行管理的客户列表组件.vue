<template>
  <div class="box">
    <div class="filterBox">
      <select
        class="selectBox"
        v-model="type"
        @change="()=>{
		  this.page=1;
		  this.queryData();
		}"
      >
        <option value>全部客户</option>
        <option value="重点客户">重点客户</option>
        <option value="一般客户">一般客户</option>
        <option value="放弃客户">放弃客户</option>
      </select>
      <input
        v-model="search"
        type="text"
        class="searchInp"
        placeholder="客户综合信息模糊查询"
        @keydown.enter="()=>{
		  this.page=1;
		  this.queryData();
		}"
      />
    </div>

    <div v-if="result">
      <el-table stripe :data="result.data" style="width:100%">
        <el-table-column label="姓名" min-width="8%" prop="name"></el-table-column>
        <el-table-column label="性别" min-width="5%" prop="sex" :formatter="formatSex"></el-table-column>
        <el-table-column label="邮箱" min-width="10%" prop="email" show-overflow-tooltip></el-table-column>
        <el-table-column label="电话" min-width="10%" prop="phone" show-overflow-tooltip></el-table-column>
        <el-table-column label="微信" min-width="10%" prop="weixin" show-overflow-tooltip></el-table-column>
        <el-table-column label="QQ" min-width="10%" prop="QQ" show-overflow-tooltip></el-table-column>
        <el-table-column label="类型" min-width="10%" prop="type"></el-table-column>
        <el-table-column label="隶属人" min-width="8%" prop="userName"></el-table-column>
        <el-table-column label="地址" min-width="15%" prop="address" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="14%">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">回访</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="parseInt(result.total)"
        :page-size="limit"
        :current-page="page"
        @current-change="currentHandle"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as types from "../../store/store-types";
import { queryCustomList } from "../../api/custom";
export default {
  data() {
    return {
      result: null,
      type: "",
      search: "",
      limit: 10,
      page: 1
    };
  },
  watch: {
    //=>当vuex中的数据发生改变，我们把自己的result的状态也改变了
    ["$store.state.custom.myList"](val) {
      console.log(val);
      this.result = val;
    },
    ["$store.state.custom.allList"](val) {
      this.result = val;
    },
    //=>路由切换，但是渲染相同的组件，只不过传参信息不同（可以监听一切挂载到this上的数据）
    ["$route"](val) {
      this.onceVuex();
    }
  },
  methods: {
    onceVuex() {
      //=>vuex中如果没有存储对应的数据，我们派发行为为其获取
      let lx = this.$route.query.type || "my";
      let result = this.queryResult();
      if (result === null) {
        this.$store.dispatch("custom/" + types.CUSTOM_QUERY_LIST, lx);
      } else {
        this.result = result;
      }
    },
    queryResult() {
      //=>获取问号传递参数的信息，从而从vuex中取出需要的结果
      let { myList, allList } = this.$store.state.custom;
      let lx = this.$route.query.type || "my",
        result = lx === "my" ? myList : allList;
      return result;
    },
    formatSex(item) {
      return parseInt(item.sex) === 0 ? "男" : "女";
    },
    //=>向服务器发送请求，获取经过筛选后的数据
    queryData() {
      queryCustomList({
        lx: this.$route.query.type || "my",
        type: this.type,
        search: this.search,
        limit: this.limit,
        page: this.page
      }).then(result => {
        this.result = result;
      });
    },
    currentHandle(page) {
      this.page = page;
      this.queryData();
    }
  },
  created() {
    this.onceVuex();
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* ==filterBox== */
.filterBox {
  padding: 10px;
  text-align: right;
}

.selectBox,
.searchInp,
.deleteAll {
  box-sizing: border-box;
  margin-right: 10px;
  padding: 0 5px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  vertical-align: middle;
}

.searchInp {
  padding: 0 10px;
  width: 250px;
}

.deleteAll {
  background: #eee;
  padding: 0;
  cursor: pointer;
}
</style>