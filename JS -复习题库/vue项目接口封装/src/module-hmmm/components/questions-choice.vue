<template>
  <div>
    <button @click="dialogVisiblea=true" id="dk" v-show="false"></button>
    <el-dialog
      title="题目预览"
      :visible.sync="dialogVisiblea"
      :close-on-click-modal="false"
      width="1050px"
    >
      <!-- 右侧栏 -->
      <div class="mar">
        <div class="bt">
          <el-button type="primary" @click="dialogVisibleyesb=true">审核通过</el-button>
        </div>
        <div class="bt">
          <el-button type="primary" @click="dialogVisiblenoc=true">审核不通过</el-button>
        </div>
        <div class="bt">
          <el-button type="primary" @click="dialogVisiblerzd=true">审核日志</el-button>
        </div>
        <div class="bt">
          <el-button type="primary">下一题</el-button>
        </div>
        <div class="bt">
          <el-button type="primary" @click="dialogVisiblea=false">关闭</el-button>
        </div>
      </div>
      <!-- 中部 -->
      <div style="font-size:16px;border:1px solid #ccc;padding:30px">
        <div style="display:flex;margin-bottom:10px;">
          <div class="fle">
            <strong>【编号】:</strong>&nbsp;&nbsp;
            <strong>JX</strong>
            <span>000002</span>
          </div>
          <div class="fle">
            <strong>【学科】:</strong>&nbsp;&nbsp;
            <strong>JavaEE</strong>
          </div>
          <div class="fle">
            <strong>【题型】:</strong>&nbsp;&nbsp;
            <strong>单选题</strong>
          </div>
          <div class="fle">
            <strong>【难度】:</strong>&nbsp;&nbsp;
            <strong>一般</strong>
          </div>
        </div>
        <div style="display:flex;margin-bottom:10px">
          <div class="fle">
            <strong>【目录】:</strong>&nbsp;&nbsp;
            <span>JavaScript</span>
          </div>
          <div class="fle">
            <strong>【企业】:</strong>&nbsp;&nbsp;
            <span>阿里巴巴</span>
          </div>
          <div class="fle">
            <strong>【方向】:</strong>&nbsp;&nbsp;
            <span>金融</span>
          </div>
          <div class="fle">
            <strong>【城市】:</strong>&nbsp;&nbsp;
            <span>成都</span>
          </div>
        </div>
        <div style="margin-bottom:20px">
          <div>
            <strong>【标签】:</strong>&nbsp;&nbsp;
            <span>JavaScript</span>
          </div>
        </div>
        <!-- 下划线 -->
        <div class="xhx" style="margin-bottom:20px"></div>
        <div>
          <!-- 右侧原型 -->
          <div class="tc">
            <div class="tc-a">2</div>
            <span class="tc-b">情形2</span>
          </div>
          <!-- 左侧题目主要部分 -->
          <div>
            <strong>【题干】:</strong>
          </div>
          <div style="padding-left:30px">
            <div style="line-height:30px">对效果图进行高仿，通过本考题重点了解学生对代码进阶阶段所学知识的综合应用</div>
            <div style="line-height:30px">多选题选项：（以下选中的选项为正确答案）</div>
            <div>
              <div style="margin-bottom:10px">
                <el-checkbox v-model="radio" label="A">
                  <span style="font-size:16px">A：选项一</span>
                </el-checkbox>
              </div>
              <div style="margin-bottom:10px">
                <el-checkbox v-model="radio" label="B">
                  <span style="font-size:16px">B：选项二</span>
                </el-checkbox>
              </div>
              <div style="margin-bottom:10px">
                <el-checkbox v-model="radio" label="C">
                  <span style="font-size:16px">C：选项三</span>
                </el-checkbox>
              </div>
              <div style="margin-bottom:10px">
                <el-checkbox v-model="radio" label="D">
                  <span style="font-size:16px">D：选项四</span>
                </el-checkbox>
              </div>
            </div>
            <div class="xhx" style="margin-bottom:20px;padding-left:20px"></div>
            <div style="padding-left:20px">
              <strong style="margin-right:10px">【参考答案】:</strong>&nbsp;&nbsp;
              <el-button>视频答案预览</el-button>
            </div>
            <div class="xhx" style="margin-bottom:20px;padding-left:20px;margin-top:20px"></div>
            <div style="padding-left:20px">
              <strong style="margin-right:10px">【参考答案】:</strong>&nbsp;&nbsp;
              <div
                style="margin-left:30px;line-height:30px;margin-bottom:20px"
              >对效果图进行高仿，通过本考题重点了解学生对代码进阶阶段所学知识的综合应用</div>&nbsp;&nbsp;
            </div>
            <div class="xhx" style="margin-bottom:20px;padding-left:20px;margin-top:20px"></div>
            <div style="padding-left:20px">
              <strong style="margin-right:10px">【题目备注】:</strong>&nbsp;&nbsp;
              <div
                style="margin-left:20px;line-height:30px;margin-bottom:20px"
              >对效果图进行高仿，通过本考题重点了解学生对代码进阶阶段所学知识的综合应用</div>&nbsp;&nbsp;
            </div>
          </div>
          <el-button class="quit" @click="dialogVisiblea=false">关闭</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 审核通过 -->
    <el-dialog
      title="审核通过"
      :visible.sync="dialogVisibleyesb"
      width="600px"
      :close-on-click-modal="false"
    >
      <div style="display:flex;padding-bottom:20px;">
        <div>审核通过:</div>
        <div style="flex:1;margin-left:20px">
          <el-input type="textarea" placeholder="请输入审核意见" :rows="10" v-model="abs"></el-input>
          <!-- <textarea type="textarea" placeholder="请输入内容" style="resize:none;height:200px; width:100%;  border-radius:10px;outline:none;box-shadow: 0 0 0 1px #409EFF;"></textarea> -->
        </div>
      </div>
      <div style=" height: 1px;  width: 100%;  background-color: #ebebeb;"></div>
      <div style="margin-top:20px;margin-left:400px">
        <el-button @click="cl">取消</el-button>
        <el-button type="primary" @click="dialogVisibleyesb= false">确定</el-button>
      </div>
    </el-dialog>

    <!-- 审核不通过 -->
    <el-dialog
      title="审核不通过"
      :visible.sync="dialogVisiblenoc"
      width="600px"
      :close-on-click-modal="false"
    >
      <div style="display:flex;padding-bottom:20px;">
        <div>审核不通过:</div>
        <div style="flex:1;margin-left:20px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="region">
              <el-input type="textarea" placeholder="请输入审核意见" :rows="10" v-model="ruleForm.region"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style=" height: 1px;  width: 100%;  background-color: #ebebeb;"></div>
      <div style="margin-top:20px;margin-left:400px">
        <el-button @click="cm">取消</el-button>
        <el-button type="primary" @click="dialogVisiblenoc= false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="审核不通过"
      :visible.sync="dialogVisiblerzd"
      width="600px"
      :close-on-click-modal="false"
    >
      <div style="font-size:16px;line-height:40px">
        <div style="margin-botoom:10px">审核意见：</div>
        <div style="display:flex;justify-content:space-between;">
          <div>
            拒绝&nbsp;&nbsp;&nbsp;&nbsp;
            <span>拒绝的理由</span>
          </div>
          <div>2018-09-07 11:39:50 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 审核人 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;毕鹏</div>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <div>
            通过&nbsp;&nbsp;&nbsp;&nbsp;
            <span>通过的理由</span>
          </div>
          <div>2018-09-07 11:39:50 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 审核人 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;毕鹏</div>
        </div>
        <div>出题记录：</div>
        <div
          style="margin-bottom:20px"
        >2018-09-07 11:39:50 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 增试题，并指定审核人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 毕鹏</div>
      </div>
      <div style=" height: 1px;  width: 100%;  background-color: #ebebeb;"></div>
      <div style="margin-top:20px;margin-left:400px">
        <el-button @click="dialogVisiblerzd= false">取消</el-button>
        <el-button type="primary" @click="dialogVisiblerzd= false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "but",
  data() {
    return {
      dialogVisiblea: false,
      dialogVisibleyesb: false,
      dialogVisiblenoc: false,
      dialogVisiblerzd: false,
      radio: [],
      abs: "",
      ruleForm: {
        region: ""
      },
      rules: {
        region: [{ required: true, message: "请输入原因", trigger: "blur" }]
      }
    };
  },
  methods: {
    cl() {
      (this.dialogVisibleyesb = false), (this.abs = "");
    },
    cm() {
      (this.dialogVisiblenoc = false), (this.abs = "");
    }
  }
};
</script>

<style scoped lang="scss">
.mar {
  position: absolute;
  right: -190px;
  top: 0;
  font-size: 30px;
}
.bt {
  margin-bottom: 10px;
}
.fle {
  flex: 1;
}
.xhx {
  height: 1px;
  width: 700px;
  background-color: #ebebeb;
}
.tc-a {
  height: 40px;
  width: 40px;
  background-color: pink;
  float: right;
  margin-right: 210px;
  margin-top: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
}
.tc-b {
  float: right;
  margin-right: -100px;
  margin-top: 29px;
  color: #ff3399;
  font-size: 20px;
}
.quit {
  float: right;
  margin-right: 20px;
  margin-top: 30px;
}
.el-textarea .el-textarea__inner {
  // 然后找到对应的类名，在这里将拉伸去掉即可
  resize: none;
}
</style>
