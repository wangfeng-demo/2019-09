<template>
  <div class="dashboard-container">
    <div>
      <el-button style="margin-right:1px" @click="th()">新建目录</el-button>
      <el-button>返回学科</el-button>
    </div>
    <div>
      <span style="padding:8px;background-color:#ccc">目录名称</span>
      <el-input placeholder="请输入" style="width:200px;margin-right:10px" v-model="input"></el-input>
      <span style="padding:8px;background-color:#ccc">状态</span>
      <el-select v-model="values" placeholder="请选择" style="margin-right:10px">
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
      <el-button @click="input='';values=''">清除</el-button>
      <el-button type="primary" @click="search">搜索</el-button>
      <div>
        <el-table :data="lists" border width="1000px">
          <el-table-column fixed type="index" label="序号"></el-table-column>
          <el-table-column prop="directoryName" label="目录名称"></el-table-column>
          <el-table-column prop="creator" label="创建者"></el-table-column>
          <el-table-column prop="addDate" label="创建日期"></el-table-column>
          <el-table-column prop="totals" label="面试题数量"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column prop="zip" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="xg(scope.row)"></el-button>
              <el-button
                type="success"
                :icon="stateBtn[scope.row.state].icon"
                circle
                @click="zt(scope.row)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="quit(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 点击弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form :rules="rules" :model="modelForm" :ref="modelForm">
          <el-form-item prop="text" label="目录名称">
            <el-input placeholder="请输入" maxlength="25" v-model="modelForm.text"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;modelForm.text=''">取 消</el-button>
        <el-button type="primary" @click="th">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 2次 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form :rules="rules" :model="modelForm" :ref="modelForm">
          <el-form-item prop="text" label="目录名称">
            <el-input placeholder="请输入" maxlength="25" v-model="modelForm.text"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;modelForm.text=''">取 消</el-button>
        <el-button type="primary" @click="qd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  direction,
  difficulty,
  questionType,
  status,
  publishType
} from "@/api/hmmm/constants";
import { thistle } from "color-name";
export default {
  name: "DirectorysList",
  created() {
    this.loadAdop();
  },
  data() {
    return {
      subjectID:'',
      directoryName:'',
      directory: {},
      input: "",
      values: "",
      //字体图标
      stateBtn: [
        {
          state: 1,
          icon: "el-icon-circle-close"
        },
        {
          state: 0,
          icon: "el-icon-circle-check"
        }
      ],
      //接收数据
      options: status,
      lists: null,
      //表单验证
      modelForm: {
        text: ""
      },
      //弹出框
      dialogVisible: false,
      //表单验证
      rules: {
        text: [
          { required: true, message: "必须输入此项", trigger: "blur" },
          { max: 25, message: "最大长度为25个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    qd() {
      if (this.directory.id) {
        // 编辑
        
        this.$axios({
          url: `/directorys/${this.directory.id}`,
          method: "PUT",
          data: {
            id:this.directory.id,
            subjectID: this.subjectID,
            directoryName: this.modelForm.text
          }
        }).then(res => {
          this.directory = {};
          this.dialogVisible=false
          this.loadAdop()
        });
      } else {
        // 新增
        if (this.modelForm.text === "") {
          this.$message.error("内容不能为空");
        }
        var c = Math.random() * 1000000000;
        var d = Math.floor(c);
        console.log(d);
        this.$axios({
          url: "/directorys",
          method: "POST",
          data: {
            subjectID: this.subjectID,
            directoryName: this.modelForm.text
          }
        }).then(arr => {
          console.log("成功了");
          this.loadAdop();
          this.modelForm.text = "";
          this.dialogVisible = false;
        });
      }
    },
    loadAdop(e, a) {
      this.$axios({
        url: "/directorys",
        method: "GET",
        params: {
          state: e,
          directoryName: a
        }
      }).then(arr => {
        console.log(arr);
        this.lists = arr.data.items;
      });
    },
    //搜索
    search() {
      this.loadAdop(this.values, this.input);
    },
    //删除
    quit(e) {
      if (e.totals > 0 || e.state > 0) {
        this.$message.error("不能删除");
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios({
              url: `/directorys/${e.id}`,
              method: "DELETE"
            }).then(() => {
              this.loadAdop();
            });
            this.$message({
              type: "success",
              message: "删除成功!"
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
    //新增点击确定
    th() {
      this.dialogVisible = true;

      // }
    },
    //状态
    zt(e) {
      this.$axios({
        url: `/directorys/${e.id}/${e.state}`,
        method: "POST"
      })
        .then(arr => {
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
          if (e.state == 0) {
            e.state = 1;
          } else {
            e.state = 0;
          }
        })
        .catch(err => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    // 修改
    xg(e) {
      console.log(e);
      
      // if (this.$route.params.id) {
      if (e.state == 0) {
        this.$message.error("不能修改");
      } else {
        this.directory = e;
        this.dialogVisible = true;
        this.$axios({
          method: "GET",
          url: "/directorys/" + this.directory.id
        }).then(res => {
          console.log(res);
          this.modelForm.text=res.data.directoryName
          this.subjectID=res.data.subjectID
          this.$message({
            type: "success",
            message: "获取成功"
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding-left: 30px;
}
</style>
