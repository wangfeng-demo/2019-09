<style scoped lang='less'>
.container {
  box-sizing: border-box;
  margin: 10px auto;
  width: 600px;

  .headerBox {
    position: relative;
    h2 {
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
    }

    .btn-link {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .tabBox {
    padding: 10px 0;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .inputDesc {
    line-height: 30px;
  }
}
</style>

<template>
  <div id="app">
    <div class="container">
      <!-- 头部 -->
      <header class="headerBox">
        <h2>TASK LIST</h2>
        <el-link type="primary" class="btn-link" @click="dialogVisible=true">新增任务</el-link>
      </header>
      <!-- 页卡切换 -->
      <section class="tabBox">
        <el-tag type="success">全部</el-tag>
        <el-tag type="info">未完成</el-tag>
        <el-tag type="info">已完成</el-tag>
      </section>
      <!-- 数据表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="task" label="任务描述" width="240"></el-table-column>
        <el-table-column prop="state" label="完成状态" width="80"></el-table-column>
        <el-table-column prop="time" label="完成时间" width="130"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope>
            <el-button size="small" type="text" @click="open">删除</el-button>
            <el-button size="small" type="text">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增的弹出层 -->
      <el-dialog title="新增任务" :visible.sync="dialogVisible" width="80%">
        <div>
          <p class="inputDesc">请输入任务的描述信息:</p>
          <el-input type="textarea" :rows="2"></el-input>
          <p class="inputDesc">请设置预期完成时间：</p>
          <el-date-picker type="datetime" v-model="test"></el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 警告框 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      test: "",
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          task: "我今天临时安排的一个任务，下午我们需要进行模拟考试",
          state: 1,
          time: "2019-07-06 14:40:00"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    open() {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>