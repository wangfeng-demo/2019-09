<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%;margin-top:10px;"
    border
  >
    <el-table-column label="编号" type="index" align="center" width="120" :index="indexMethod"></el-table-column>
    <el-table-column label="职务" prop="name" align="center"></el-table-column>
    <el-table-column prop="desc" label="描述" align="center"></el-table-column>
    <el-table-column label="权限" align="center">
      <template slot-scope="scope">{{ scope.row.power|mypower }}</template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
// @ is an alias to /src
import Vue from "vue";
import { delJobList } from "@/api/index";
Vue.filter("mypower", function(val) {
  let obj = {
    userhandle: "员工操作权",
    departhandle: "部门操作权",
    jobhandle: "职务操作权",
    departcustomer: "部门全部客户",
    allcustomer: "公司全部客户",
    resetpassword: "重置密码"
  };
  let ary = val.split('|')
  for (const key in obj) {
    ary.forEach((item, index) => {
      if (item == key) {
        ary[index] = obj[item]
      }
    });
  }
  return ary.join('|');
});
export default {
  name: "index",
  data() {
    return {
      multipleSelection: []
    };
  },
  created() {
    this.$store.dispatch("changeJobList");
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/org/addJob", query: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delJobList(row.id).then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$store.dispatch("changeJobList");
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    tableData() {
      return this.$store.state.jobList;
    }
  },
  components: {}
};
</script>
<style lang="less">
</style>