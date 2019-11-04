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
        <el-link type="primary" class="btn-link" @click="dialogVisable=true">新增任务</el-link>
      </header>

      <!-- 页卡切换 -->
      <section class="tabBox">
        <el-tag :type="type===0?'success':'info'" @click="type=0">全部</el-tag>
        <el-tag :type="type===1?'success':'info'" @click="type=1">未完成</el-tag>
        <el-tag :type="type===2?'success':'info'" @click="type=2">已完成</el-tag>
      </section>

      <!-- 数据表格 -->
      <el-table :data="taskList" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="50" :formatter="formatID"></el-table-column>
        <el-table-column prop="task" label="任务描述" width="240"></el-table-column>
        <el-table-column prop="state" label="完成状态" width="80" :formatter="formatState"></el-table-column>
        <el-table-column prop="time" label="完成时间" width="130" :formatter="formatTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scopeItem">
            <el-button size="small" type="text" @click="handleDelete(scopeItem)">删除</el-button>
            <el-button
              size="small"
              type="text"
              @click="handleComplete(scopeItem)"
              v-if="check(scopeItem)"
            >完成</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增的弹出层 -->
      <el-dialog
        :visible="dialogVisable"
        :before-close="dialogBeforeClose"
        :close-on-click-modal="false"
        title="珠峰培训-新增任务"
        width="70%"
      >
        <el-form :model="taskInfo" :rules="taskRules" ref="taskForm">
          <el-form-item label="任务描述" prop="task">
            <el-input type="textarea" :rows="2" v-model="taskInfo.task"></el-input>
          </el-form-item>
          <el-form-item label="预期完成时间" prop="time">
            <el-date-picker type="datetime" v-model="taskInfo.time"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogBeforeClose">取 消</el-button>
          <el-button type="primary" @click="commitTask">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addTask, removeTask, completeTask } from "./api/task";

export default {
  name: "app",
  data() {
    return {
      //=>控制DIALOG的显示隐藏
      dialogVisable: false,
      //=>控制新增任务信息
      taskInfo: {
        task: "",
        time: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      },
      //=>控制新增任务时候每一项的校验规则
      taskRules: {
        task: [
          {
            required: true,
            message: "任务描述必须要输入~~",
            trigger: "blur"
          },
          {
            min: 10,
            max: 200,
            message: "描述信息介于10~200个字符之间~~",
            trigger: "blur"
          }
        ],
        time: [
          {
            required: true,
            message: "请选择预期完成的时间~~",
            trigger: "change"
          }
        ]
      },
      //=>控制当前点击的是哪一个页卡
      type: 0
    };
  },
  methods: {
    //=>当DIALOG关闭时触发的函数
    dialogBeforeClose() {
      if (!this.taskInfo.task) {
        this.dialogVisable = false;
        return;
      }
      this.$confirm("当前编辑的内容还没有提交, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisable = false;
          this.$refs.taskForm.resetFields();
        })
        .catch(() => {});
    },
    //=>新增任务的提交操作
    commitTask() {
      //this.$refs.taskForm.validate()表单校验
      //this.$refs.taskForm.resetFields()表单内容清空
      this.$refs.taskForm.validate(valide => {
        if (!valide) return false;
        addTask(this.taskInfo.task, this.taskInfo.time)
          .then(result => {
            if (parseInt(result.code) === 0) {
              //=>成功（派发任务行为来修改VUEX中的状态信息）
              this.$store.dispatch("task/updateTaskListAction");
              this.$message({
                type: "success",
                message: "恭喜您，任务添加成功~~"
              });
              this.$refs.taskForm.resetFields();
              this.dialogVisable = false;
              return;
            }
            return Promise.reject(result.msg);
          })
          .catch(reason => {
            //=>失败
            this.$message.error(reason);
          });
      });
    },
    formatState(item) {
      //=>item:记录的是每一行自己的数据
      return item.state === 1 ? "未完成" : "已完成";
    },
    formatTime(item) {
      let time = item.state === 1 ? item.time : item.complete;
      time = new Date(time);
      time = `${time.getMonth() +
        1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
      return time.replace(/\d+/g, val => {
        if (val.length < 2) {
          return "0" + val;
        }
        return val;
      });
    },
    formatID(item) {
      return (item.id + "").length < 2 ? "0" + item.id : item.id;
    },
    //=>完成和删除
    handleDelete(scopeItem) {
      let itemID = scopeItem.row.id;
      this.$confirm(`您确定要删除编号为 ${itemID} 的任务吗？`, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return removeTask(itemID);
        })
        .then(result => {
          if (parseInt(result.code) === 0) {
            this.$message("当前任务已被您成功删除！");
            this.$store.dispatch("task/updateTaskListAction");
            return;
          }
          return Promise.reject(result.msg);
        })
        .catch(reason => {
          if (reason === "cancel") return;
          this.$message(reason);
        });
    },
    handleComplete(scopeItem) {
      let itemID = scopeItem.row.id;
      this.$confirm(
        `您确定要把编号为 ${itemID} 的任务设置为已完成吗？`,
        "温馨提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          return completeTask(itemID);
        })
        .then(result => {
          if (parseInt(result.code) === 0) {
            this.$message("当前任务已被您设置为已完成！");
            this.$store.dispatch("task/updateTaskListAction");
            return;
          }
          return Promise.reject(result.msg);
        })
        .catch(reason => {
          if (reason === "cancel") return;
          this.$message(reason);
        });
    },
    check(scopeItem) {
      return scopeItem.row.state === 2 ? false : true;
    }
  },
  created() {
    //=>验证vuex中是否存储了任务列表的状态，没有则派发行为，从服务器获取数据，同步到vuex中，后期组件中需要用到的数据都从vuex中获取
    if (this.$store.state.task.taskList === null) {
      this.$store.dispatch("task/updateTaskListAction");
    }
  },
  computed: {
    taskList() {
      //=>每一次计算的时候，根据点击项，筛选出对应状态中的数据
      let type = this.type,
        taskList = this.$store.state.task.taskList;
      if (type === 1 || type === 2) {
        taskList = taskList.filter(item => {
          return parseInt(item.state) === type;
        });
      }
      return taskList;
    }
  }
};
</script>