<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="myform">
    <el-form-item label="部门名称" style="width:400px;" prop="name">
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>
    <el-form-item label="部门描述" style="width:400px;" prop="desc">
      <el-input type="textarea" rows="6" v-model.trim="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addDpList, upDataDpList } from "@/api/index";
export default {
  data() {
    return {
      form: {
        name: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写部门描述", trigger: "blur" }]
      }
    };
  },
  created() {
    let id = this.$route.query.id;
    let obj = this.$store.state.departmentList.filter(item => {
      return item.id == id;
    })[0];
    this.form = obj ? obj : this.form;
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      this.$refs.form.validate(flag => {
        //falg是true  代表刚验证的规则通过了
        if (flag) {
          let id = this.$route.query.id;
          this.form.departmentId = id ;//后台要的Id
          (id ? upDataDpList : addDpList)(this.form).then(data => {
            if (data.code == 0) {
              //新增成功
              this.$confirm((id?'更新':'添加')+'成功!', "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              }).then(
                () => {
                  this.$router.push("/org/department");
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
  }
};
</script>
<style lang="less">
.myform {
  text-align: left;
  background: #fff;
  padding: 20px;
  height: 100%;
}
</style>