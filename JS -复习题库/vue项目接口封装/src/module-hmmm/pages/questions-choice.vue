<template>
  <div class="dashboard-container">
    <el-card class="maxbox">
      <preview></preview>
      <questio></questio>
      <questionschoice></questionschoice>
      <questionsanswer></questionsanswer>
      <div>
        <!-- 头部两个按钮 -->
        <el-button size="small">新增试题</el-button>
        <el-button size="small">批量导入</el-button>
      </div>
      <!-- 头部选框区域 -->

      <el-form :model="select" :ref="select">
        <div class="bu" style="margin-top:10px;">
          <div style="display:flex" class="buo">
            <div>
              <el-form-item>
                <span>学科</span>
                <el-select placeholder="请选择" class="box" v-model="select.subjectID">
                  <el-option value="全部" :laber="null"></el-option>
                  <el-option
                    v-for="index in accept.subjectType"
                    :key="index.value"
                    :value="index.value"
                    :label="index.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>状态</span>
                <el-select placeholder="请选择" class="box" v-model="select.chkStatet">
                  <el-option
                    v-for="index in chkStates"
                    :key="index.value"
                    :value="String(index.value)"
                    :label="index.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>难度</span>
                <el-select placeholder="请选择" class="box" v-model="select.difficulty">
                  <el-option
                    v-for="index in difficultys"
                    :key="index.value"
                    :value="index.value"
                    :label="index.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>试题类型</span>
                <el-select placeholder="请选择" class="box" v-model="select.question">
                  <el-option
                    v-for="index in questions"
                    :key="index.value"
                    :value="index.value"
                    :label="index.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>标签</span>
                <el-input placeholder="请输入" class="box" v-model="select.tags"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>录入人</span>
                <el-input placeholder="请输入" class="box" v-model="select.creatorID"></el-input>
              </el-form-item>
            </div>
          </div>
          <div style="display:flex" class="buo">
            <div>
              <el-form-item>
                <span>关键字</span>
                <el-input placeholder="请输入二级目录" class="box" v-model="select.keyword"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>题目备注</span>
                <el-input placeholder="请输入题目编号/题干" class="box" v-model="select.remarks"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>二级目录</span>
                <el-input placeholder="请输入" class="box" v-model="select.catalogue"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>城市</span>
                <el-select
                  placeholder="请选择"
                  class="box"
                  v-model="select.province"
                >
                  <el-option
                    v-for="province in provinces"
                    :key="province"
                    :label="province"
                    :value="province"
                  ></el-option>
                </el-select>
                <el-select placeholder="请选择" class="box" v-model="select.city">
                  <el-option
                    v-for="city in cities"
                    :key="city"
                    :label="city"
                    :value="city"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item>
                <span>企业简称</span>
                <el-input placeholder="请输入" class="box" v-model="select.shortName"></el-input>
              </el-form-item>
            </div>
          </div>
          <div style="display:flex;justify-content: space-between;">
            <div>
              <el-form-item>
                <span>方向</span>
                <el-input placeholder="请输入" class="box" v-model="select.direction"></el-input>
              </el-form-item>
            </div>
            <!-- 头部底部右侧两个按钮 -->
            <div>
              <el-button size="small" @click="empty">清除</el-button>
              <el-button type="primary" size="small" @click="search">搜索</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <!-- 头部完成 -->

      <!-- 中部表格 -->
      <el-tabs
        v-model="select.chkState"
        type="card"
        @tab-click="handleClick"
        style="margin-top:30px"
      >
        <el-tab-pane label="全部" name="2"></el-tab-pane>
        <el-tab-pane label="待审核" name="0"></el-tab-pane>
        <el-tab-pane label="已审核" name="1"></el-tab-pane>
      </el-tabs>
      <el-table :data="table" border style="width: 100%">
        <el-table-column type="index" color="red" label="序号"></el-table-column>
        <el-table-column prop="number" label="试题编号"></el-table-column>
        <el-table-column prop="subjectID" label="学科"></el-table-column>
        <el-table-column prop="questionType" label="题型"></el-table-column>
        <el-table-column prop="question" label="题干" width="150px"></el-table-column>
        <el-table-column prop="addDate" label="录入时间" width="150px"></el-table-column>
        <el-table-column prop="creator" label="录入人"></el-table-column>
        <el-table-column prop="difficulty" label="难度"></el-table-column>
        <el-table-column prop="name" label="使用次数"></el-table-column>
        <el-table-column prop="chkRemarks" label="审核意见"></el-table-column>
        <el-table-column prop="chkUser" label="审核人"></el-table-column>
        <el-table-column prop="publishState" label="发布状态"></el-table-column>
        <el-table-column prop="name" label="操作" width="200px">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false">
              <el-dropdown trigger="click" placement="bottom">
                <span class="el-dropdown-link">审核</span>
                <el-dropdown-menu slot="dropdown" style="background-color:#ECF5FF">
                  <el-dropdown-item>
                    <el-button size="mini" @click="rad">单选</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button size="mini" @click="red">多选</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button size="mini" @click="rel">简答</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-link>&nbsp;&nbsp;&nbsp;
            <el-link type="primary" :underline="false" @click.native="rep">预览</el-link>&nbsp;&nbsp;&nbsp;
            <el-link type="primary">下架</el-link>&nbsp;&nbsp;&nbsp;
            <el-link type="info" :underline="false">修改</el-link>&nbsp;&nbsp;&nbsp;
            <el-link type="info" :underline="false" @click="quit(scope.row.id)">删除</el-link>&nbsp;&nbsp;&nbsp;
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="table.length"
        style="text-align:center"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
// let token = document.cookie.split("=")[1];
// import { getToken } from '@/utils/auth.js'
// let tken = getToken()
import preview from "../components/questions-preview";
import questio from "../components/questions-Multiple";
import questionschoice from "../components/questions-choice";
import questionsanswer from "../components/questions- answer";
import { direction, difficulty, questionType, status, publishType } from "@/api/hmmm/constants";
//更改名字 例direction:difficulties,
import { provinces, citys, } from "@/api/hmmm/citys";
import addressData from '@/module-form/components/address-data'
var a = difficulty;
var b = questionType;
var c = status;

export default {
  components: {
    questio,
    questionschoice,
    questionsanswer,
    preview
  },
  name: "QuestionsChoice",
  // 初始化获取数据
  created() {
    this.initializing();
    this.subject();
  },
  // 数据
  data() {
    return {
      provinces: Object.keys(addressData), // 城市列表
      dialogVisible: false,
      table: [],
      activeName: null,
      difficultys: a,
      questions: b,
      chkStates: c,
      //接收的数据，用来渲染的
      accept: {
        subjectType: []
      },
      //用来选择的数据
      select: {
        subjectID: "",
        difficulty: "",
        question: "",
        tags: "",
        creatorID: "",
        keyword: "",
        remarks: "",
        catalogue: "",
        shortName: "",
        direction: "",
        province:'',
        city:'',
        chkState: "2",
        chkStates: 0
      }
    };
  },
    computed: {
    cities () {
      let data = []
      const province = this.select.province
      if (province) {
        data = Object.keys(addressData[province])
      }
      return data
    }
  },
  // 事件
  methods: {
    initializing(e) {
      this.$axios({
        method: "GET",
        url: "/questions/choice",
        params: e
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      }).then(arr => {
        this.table = arr.data.items;
        console.log(this.table);
      });
    },
    handleClick() {
      this.initializing(this.chkState);
    },
    //状态接口
    subject() {
      this.$axios({
        url: "/subjects/simple",
        method: "GET"
      }).then(arr => {
        this.accept.subjectType = arr.data;
        // console.log(arr);
      });
    },
    //清空按钮
    empty() {
      (this.select.subjectID = ""),
        (this.select.difficulty = ""),
        (this.select.question = ""),
        (this.select.tags = ""),
        (this.select.creatorID = "");
      (this.select.keyword = ""),
        (this.select.remarks = ""),
        (this.select.catalogue = ""),
        (this.select.shortName = ""),
        (this.select.direction = "");
    },
    search() {
      this.initializing(this.select);
    },
    // 删除接口
    quit(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$axios({
            url: `/questions/${e}`,
            method: "DELETE"
          }).then(arr => {});
          this.initializing();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击事件触发隐藏单选按钮点击事件
    rad() {
      document.getElementById("dj").click();
    },
    red() {
      document.getElementById("dk").click();
    },
    rel() {
      document.getElementById("dl").click();
    },
    rep() {
      document.getElementById("dp").click();
    }
  }
};
</script>

<style scoped lang="scss">
// 1. 如果在此处 scoped 当前组件下生效样式
// 2. 在style中的所有选择器 编译的时候会自动带上属性选择器
// 3. .box{} ===> .box[data-v-2c9827a4]{} 交集选择器
// 4. 在当前组件下暴露的标签都会加上 data-v-2c9827a4 属性
// 5. 但是如果是组件，其他组件内部的标签是不会加上这个属性 意味写组件内部的样式是不会生效的
// 6. 其他组件的样式都不会生效
// .maxbox {
//   // width: 1500px;
// }
.bu {
  overflow: hidden;
}
.box {
  width: 150px;
  margin-right: 10px;
}
.bu span {
  padding: 5px;
  background-color: #f2f2f2;
  vertical-align: middle;
}
.db {
  height: 30px;
  background-color: #000;
  display: block;
}
.buo {
  margin-bottom: 10px;
}
.el-dialog__header {
  background-color: #fff;
}
</style>
