<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="myform">
    <el-form-item label="部门名称" style="width:400px;" prop="name">
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>
    <el-form-item label="部门描述" style="width:400px;" prop="desc">
      <el-input type="textarea" rows="6" v-model.trim="form.desc"></el-input>
    </el-form-item>
    <el-form-item label="职务权限">
      <el-checkbox-group v-model="power">
        <el-checkbox v-for="item in data" :key="item.id" :label="item.name">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="mybtn">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// @ is an alias to /src
import { updataJobList, addJobList } from "@/api/index";
export default {
  name: "add",
  checkedList: [],
  data() {
    return {
      data: [
        {
          name: "员工操作权",
          id: Math.random()
        },
        {
          name: "部门操作权",
          id: Math.random()
        },
        {
          name: "职务操作权",
          id: Math.random()
        },
        {
          name: "部门全部客户",
          id: Math.random()
        },
        {
          name: "公司全部客户",
          id: Math.random()
        },
        {
          name: "重置密码",
          id: Math.random()
        }
      ],
      form: {
        name: "",
        desc: "",
        power: ""
      },
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写部门描述", trigger: "blur" }]
      },
      id:''
      //userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      // this.$refs.form
      let id = this.$route.query.id;
      this.form.jobId = id;
      (id ? updataJobList : addJobList)(this.form).then(data => {
        if (data.code == 0) {
          this.$confirm(id ? "更新成功!" : "添加成功!", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }).then(
            () => {
              this.$router.push("/org/job");
            },
            () => {}
          );
        } else {
          this.$message.error("添加失败");
        }
      });
      return;
    }
  },
  computed: {
    power: {
      get() {
        //把后台给的字符串改成数组
        return this.form.power.split("|");
      },
      set(val) {
        this.form.power = val.join("|");
      }
    }
  },
  created() {
    let id = this.id = this.$route.query.id;
    let obj = this.$store.state.jobList.filter(item => {
      return item.id == id;
    })[0];
    this.form = obj || this.form;
  },
  watch:{
   
  }
};
</script>
<style lang="less">
.my-group {
  margin: 10px 0;
  display: inline;
  margin-left: 30px;
}
.mybtn {
  margin-top: 30px;
}
</style>