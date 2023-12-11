<template>
  <div>
    <div class="top">
      <p class="title">招聘行程管理</p>
      <div class="position_btn">
        <span class="btn">
          <el-button
            size="small"
            type="primary"
            @click="handleAddschedule"
            icon="el-icon-circle-plus-outline"
          >
            新增
          </el-button>
        </span>
        <span class="btn">
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteMore"
          >
            删除
          </el-button>
        </span>
      </div>
    </div>
    <div class="table">
      <TabelList
        :tableData="tableData"
        @currentChange="handleSelectionChange"
      ></TabelList>
    </div>
    <div class="link">
      <p>联系人管理</p>
      <el-row>
        <el-col :span="12"
          >联系方式：<el-input v-model="linkman" class="input" maxlength="50"></el-input
        ></el-col>
        <el-col :span="12"
          >邮箱：<el-input v-model="address" class="input"></el-input
        ></el-col>
      </el-row>
    </div>
    <div class="add">
      <el-button type="primary" @click="handleLinkMan">提 交</el-button>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      class="dialog"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="60px" :rules="rules">
        <el-form-item label="日期:" prop="lineDate">
          <el-date-picker
            v-model="form.lineDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="时间:" prop="time">
          <el-time-picker
            is-range
            v-model="time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="YYYY-MM-DD HH:mm"
            format="HH:mm"
            :default-time="['00:00:00','23:59:59']"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="学校:" prop="school">
          <el-input v-model="form.school" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="地点:" prop="address">
          <el-input v-model="form.address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="形式:" prop="question">
          <el-input v-model="form.question" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSumit('form')">确 认</el-button>
      </div>
    </el-dialog>
    <!-- 删除模态框 -->
    <div v-if="messageData.show">
      <reminder-modal
        @handleDialog="handleModalShow"
        v-bind:message="messageData"
      >
        <div slot="content">
          {{ messageData.content }}
        </div>
      </reminder-modal>
    </div>
  </div>
</template>

<script>
import TabelList from '../../components/Table'
import serve from '../../api/journey'
import ReminderModal from '../../components/ReminderModal'
export default {
  components: { TabelList, ReminderModal },
  data () {
    var validateTime = (rule, value, callback) => {
      if (!this.time) {
        return callback(new Error('请选择行程时间'))
      } else if (this.time[0] === this.time[1]) {
        return callback(new Error('结束时间不可与开始时间相同'))
      } else {
        callback()
      }
    }
    return {
      tableData: {
        border: true,
        isCheck: true,
        loading: true,
        id: null,
        data: [],
        columns: [
          {
            key: 'num',
            label: '序号',
            width: 80
          },
          {
            key: 'lineDateStr',
            label: '日期'
          },
          {
            key: 'time',
            label: '时间'
          },
          {
            key: 'school',
            label: '学校'
          },
          {
            key: 'address',
            label: '地点'
          },
          {
            key: 'question',
            label: '形式'
          },
          {
            key: 'operationsModel',
            label: '操作',
            width: 200,
            fixed: 'right'
          }
        ],
        btnList: [
          {
            label: '上移',
            type: 'text',
            isShow: (row) => {
              return row.showUpSort !== false
            },
            event: (row) => {
              this.handleBtn(row, '上移')
            }
          },
          {
            label: '下移',
            type: 'text',
            isShow: (row) => {
              return row.showDownSort !== false
            },
            event: (row) => {
              this.handleBtn(row, '下移')
            }
          },
          {
            label: '编辑',
            type: 'text',
            event: (row) => {
              this.handleBtn(row, '编辑')
            }
          },
          {
            label: '删除',
            type: 'text',
            mode: 'danger',
            event: (row) => {
              this.handleBtn(row, '删除')
            }
          }
        ]
        // page: {
        //   currentPage: 1,
        //   pageSize: 10,
        //   total: 0,
        //   handleCurrentChange: this.handleCurrentChange
        // }
      },
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        lineDate: '',
        school: '',
        address: '',
        question: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        lineDate: { required: true, message: '请选择日期', trigger: 'change' },
        time: { required: true, validator: validateTime, trigger: 'change' },
        school: [
          { required: true, message: '请输入学校名称', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入地点', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        question: [
          { required: true, message: '请输入形式', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      time: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8, 0, 0), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 18, 0, 0)],
      dialogTitle: '新增',
      address: '',
      linkman: '',
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      }
    }
  },
  mounted () {
    this.getList()
    this.getLinkMan()
  },
  methods: {
    // 获取列表
    getList () {
      serve.getLineList().then((res) => {
        if (res.data.code === 200) {
          this.tableData.data = res.data.data
          if (this.tableData.data.length > 0) {
            this.tableData.data.map((item) => {
              item.showUpSort = true
              item.showDownSort = true
            })
            this.tableData.data[0].showUpSort = false
            this.tableData.data[
              this.tableData.data.length - 1
            ].showDownSort = false
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 联系人
    getLinkMan () {
      serve.getLineperson().then((res) => {
        if (res.data.code === 200) {
          if (res.data.data) {
            this.linkman = res.data.data.linkman
            this.address = res.data.data.address
          } else {
            this.linkman = ''
            this.address = ''
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 按钮操作
    handleBtn (row, type) {
      if (type === '编辑') {
        this.dialogFormVisible = true
        this.dialogTitle = '编辑'
        this.id = row.id
        serve.lineDetail(row.id).then((res) => {
          if (res.data.code === 200) {
            this.form.lineDate = res.data.data.lineDate
            this.form.address = res.data.data.address
            this.form.question = res.data.data.question
            this.form.startTime = res.data.data.startTime
            this.form.endTime = res.data.data.endTime
            this.form.school = res.data.data.school
            this.time = [
              new Date(this.form.startTime),
              new Date(this.form.endTime)
            ]
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '删除') {
        this.messageData.show = true
        this.messageData.content = '删除后不可恢复，确认删除？'
        this.id = row.id
      } else if (type === '上移') {
        const array = []
        this.tableData.data.map((item, index) => {
          if (row.id === item.id) {
            array.push(
              {
                id: this.tableData.data[index].id,
                sort: this.tableData.data[index].sort
              },
              {
                id: this.tableData.data[index - 1].id,
                sort: this.tableData.data[index - 1].sort
              }
            )
          }
        })
        this.handleSort(array)
      } else if (type === '下移') {
        const array = []
        this.tableData.data.map((item, index) => {
          if (row.id === item.id) {
            array.push(
              {
                id: this.tableData.data[index].id,
                sort: this.tableData.data[index].sort
              },
              {
                id: this.tableData.data[index + 1].id,
                sort: this.tableData.data[index + 1].sort
              }
            )
          }
        })
        this.handleSort(array)
      }
    },
    // 新增
    handleAddschedule () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增'
      this.id = ''
      // this.time = [new Date(2021, 5, 24, 8, 0, 0), new Date(2021, 5, 24, 18, 0, 0)]
      for (const key in this.form) {
        this.form[key] = ''
      }
    },
    // 新增联系人
    handleLinkMan () {
      // const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      // if (!reg.test(this.linkman)) {
      //   this.$message.warning('请填写正确的手机号')
      //   return
      // }
      if (!mailReg.test(this.address)) {
        this.$message.warning('请注意邮箱填写格式')
        return
      }
      const params = {
        linkman: this.linkman,
        address: this.address
      }
      serve.addLinkMan(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 新增与编辑
    handleSumit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            this.FormDate(this.form.lineDate, this.time[0], this.time[1])
            serve.updateLine(this.id, this.form).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.dialogFormVisible = false
                this.getList(this.id, this.form)
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.FormDate(this.form.lineDate, this.time[0], this.time[1])
            serve.addLine(this.form).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.dialogFormVisible = false
                this.getList()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    FormDate (data1, data2, data3) {
      const time = new Date(data1)
      const time1 = new Date(data2)
      const time2 = new Date(data3)
      const lineDate =
        time.getFullYear() +
        '-' +
        this.p(time.getMonth() + 1) +
        '-' +
        this.p(time.getDate())
      const restime1 =
        lineDate +
        ' ' +
        this.p(time1.getHours()) +
        ':' +
        this.p(time1.getMinutes()) +
        ':' +
        this.p(time1.getSeconds())
      const restime2 =
        lineDate +
        ' ' +
        this.p(time2.getHours()) +
        ':' +
        this.p(time2.getMinutes()) +
        ':' +
        this.p(time2.getSeconds())
      const date1 = new Date(restime1).getTime()
      const date2 = new Date(restime2).getTime()
      this.form.startTime = date1
      this.form.endTime = date2
      this.form.lineDate = time.getTime()
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },
    // 批量删除
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    handleDeleteMore () {
      const IDList = this.multipleSelection.map((item) => item.id)
      this.id = IDList
      if (this.id.length === 0) {
        this.$message.warning('请先选择要删除的数据再点击删除')
      } else {
        this.messageData.show = true
        this.messageData.content = '删除后不可恢复，确认删除？'
      }
    },
    // 删除、批量删除
    handleModalShow () {
      if (this.id.length > 0) {
        const params = {
          ids: this.id
        }
        serve.deleteLineMore(params).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        serve.deleteLine(this.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 排序
    handleSort (params) {
      serve.lineSort(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.getList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-range-editor.el-input__inner {
  width: 100%;
}
::v-deep .dialog .el-dialog__body {
  padding-right: 40px;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}
::v-deep .el-dialog__header {
  text-align: left;
}
::v-deep .el-button.el-button--text.el-button--mini {
  margin-left: 0;
  margin-right: 10px;
}
.top {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  text-align: left;
  box-sizing: border-box;
  .title {
    color: #030303;
    font-size: 16px;
    font-weight: bold;
  }
  .position_btn {
    margin-top: 24px;
    .btn {
      &:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
}
.table {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
}
.link {
  margin-top: 24px;
  text-align: left;
  background-color: #fff;
  padding: 20px;
  p {
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: bold;
  }
  .input {
    width: 50%;
  }
}
.add {
  width: 100%;
  background-color: #fff;
  margin-top: 140px;
  padding: 10px;
}
</style>
