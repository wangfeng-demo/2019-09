<template>
  <div class="dashboard-container">
    <button @click="dbgas=true;dsa=true;das=true;asd=true" id="dp" v-show="false"></button>
    <el-dialog :visible.sync="dbgas" width="100%" >
      <div style="display:flex;
			overflow-x: scroll;">
        <!-- 1中部 -->
        <div style="font-size:16px;border:1px solid #ccc;padding:30px" v-show="dsa">
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
              <div class="tc-a">1</div>
              <span class="tc-b">情形1</span>
            </div>
            <!-- 左侧题目主要部分 -->
            <div>
              <strong>【题干】:</strong>
            </div>
            <div style="padding-left:30px">
              <div style="line-height:30px">对效果图进行高仿，通过本考题重点了解学生对代码进阶阶段所学知识的综合应用</div>
              <div style="line-height:30px">单选题选项：（以下选中的选项为正确答案）</div>
              <div>
                <div style="margin-bottom:10px">
                  <el-radio v-model="radio" label="A">
                    <span style="font-size:16px">A：选项一</span>
                  </el-radio>
                </div>
                <div style="margin-bottom:10px">
                  <el-radio v-model="radio" label="B">
                    <span style="font-size:16px">B：选项二</span>
                  </el-radio>
                </div>
                <div style="margin-bottom:10px">
                  <el-radio v-model="radio" label="C">
                    <span style="font-size:16px">C：选项三</span>
                  </el-radio>
                </div>
                <div style="margin-bottom:10px">
                  <el-radio v-model="radio" label="D">
                    <span style="font-size:16px">D：选项四</span>
                  </el-radio>
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
            <el-button class="quit" @click="dsa=false">关闭</el-button>
          </div>
        </div>

        <!-- 2中部 -->
        <div v-show="das">
          <div style="font-size:16px;border:1px solid #ccc;padding:30px;margin:0 20px">
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
                    <el-checkbox v-model="checkbox" label="A">
                      <span style="font-size:16px">A：选项一</span>
                    </el-checkbox>
                  </div>
                  <div style="margin-bottom:10px">
                    <el-checkbox v-model="checkbox" label="B">
                      <span style="font-size:16px">B：选项二</span>
                    </el-checkbox>
                  </div>
                  <div style="margin-bottom:10px">
                    <el-checkbox v-model="checkbox" label="C">
                      <span style="font-size:16px">C：选项三</span>
                    </el-checkbox>
                  </div>
                  <div style="margin-bottom:10px">
                    <el-checkbox v-model="checkbox" label="D">
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
              <el-button class="quit" @click="das=false">关闭</el-button>
            </div>
          </div>
        </div>

        <!-- 3中部 -->
        <div v-show="asd">
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
                <div class="tc-a">3</div>
                <span class="tc-b">情形3</span>
              </div>
              <!-- 左侧题目主要部分 -->
              <div>
                <strong>【题干】:</strong>
              </div>
              <div style="padding-left:30px">
                <div style="line-height:30px">对效果图进行高仿，通过本考题重点了解学生对代码进阶阶段所学知识的综合应用</div>
                <div style="line-height:30px">多选题选项：（以下选中的选项为正确答案）</div>
                <div class="xhx" style="margin-bottom:20px;padding-left:20px"></div>
                <div style="padding-left:20px;padding-bottom:20px">
                  <strong style="margin-right:10px">【题干附件】:</strong>
                  <el-button>题干附件下载</el-button>
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
              <el-button class="quit" @click="asd=false">关闭</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TagsAdd",
  data() {
    return {
      radio: "",
      checkbox: [],
      dbgas: false,
      dsa: false,
      das: false,
      asd: false,
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
      (this.dialogVisibleyes = false), (this.abs = "");
    },
    cm() {
      (this.dialogVisibleno = false), (this.abs = "");
    }
  },
  updated: function() {
    if (this.dsa === false && this.das === false && this.asd === false) {
      this.dbgas = false;
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
