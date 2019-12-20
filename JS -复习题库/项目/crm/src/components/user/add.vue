<template>
  <el-form class="myform" ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="部门">
      <el-select v-model="form.departmentId" placeholder="请选择部门">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id+''"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务">
      <el-select v-model="form.jobId" placeholder="请选择职务">
        <el-option v-for="item in jobOption" :key="item.id" :label="item.name" :value="item.id+''"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="自我介绍">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addUserList, updataUserList } from "@/api/index";
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
        email: "",
        phone: "",
        departmentId: "",
        jobId: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        email: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      // this.$refs.form
      this.$refs.form.validate(flag => {
        if (flag) {
          let id = this.$route.query.id;
          this.form.userId = id;
          (id ? updataUserList : addUserList)(this.form).then(data => {
            if (data.code == 0) {
              this.$confirm(id ? "更新成功!" : "添加成功!", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              }).then(
                () => {
                  this.$router.push("/org/user");
                },
                () => {}
              );
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
      return;
    }
  },
  created() {
    let id = this.$route.query.id;
    let obj = this.$store.state.userList.filter(item => {
      return item.id == id;
    })[0];
    this.form = obj ? obj : this.form;
    this.form.jobId += "";
    this.form.departmentId += "";
  },
  computed: {
    options() {
      return this.$store.state.departmentList;
    },
    jobOption() {
      return this.$store.state.jobList;
    }
  }
};
</script>