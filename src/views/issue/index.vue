/* eslint-disable quotes */
<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            关键字搜索：
            <el-input
              placeholder="请输入"
              clearable
              v-model="name"
              size="small"
              class="search"
              :maxlength="50"
              @keyup.enter.native="handleSearch"
            />
          </div>
          <div class="search-item">
            问题类型：
            <el-select
              v-model="type"
              placeholder="请选择"
              size="small"
              class="search"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="search-item">
            是否热门：
            <el-select
              v-model="hot"
              placeholder="请选择"
              size="small"
              class="search"
            >
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="btn">
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="handleSearch"
              >查询</el-button
            >
          </div>
          <div class="clear">
            <el-button icon="el-icon-refresh" size="small" @click="handleReset"
              >重置</el-button
            >
          </div>
        </div>
      </div>
      <!-- <div class="kong"></div> -->
    </div>
    <div class="position">
      <div class="position_btn_wrap">
        <div class="position_btn">
          <span class="btn">
            <el-button
              size="small"
              type="primary"
              @click="handleAddIssue"
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
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      class="dialog"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="是否热门：" prop="hot">
          <el-radio-group
            v-model="form.hot"
            style="margin-left: -65%"
            :disabled="!showEdit"
          >
            <el-radio :label="-1">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题类型:" prop="type">
          <el-select
            v-model="form.type"
            placeholder="请选择"
            :disabled="!showEdit"
            style="width: 100%"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述:" prop="question">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.question"
            placeholder="请输入"
            :disabled="!showEdit"
          ></el-input>
        </el-form-item>
        <el-form-item label="问题解答:" prop="answer">
          <el-input
            type="textarea"
            :rows="6"
            v-model="form.answer"
            placeholder="请输入"
            :disabled="!showEdit"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" v-if="showEdit"
          >取 消</el-button
        >
        <el-button @click="dialogFormVisible = false" v-if="!showEdit"
          >返 回</el-button>
        <el-button type="primary" @click="handleEdit('form')">确 认</el-button>
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
import serve from '../../api/issue'
import ReminderModal from '../../components/ReminderModal'
import moment from 'moment'
export default {
  name: '',
  components: { TabelList, ReminderModal },
  props: {},
  data () {
    return {
      tableData: {
        border: true,
        isCheck: true,
        loading: true,
        data: [],
        columns: [
          {
            key: 'num',
            label: '序号',
            width: 80
          },
          {
            key: 'question',
            label: '问题',
            type: 'hot'
          },
          {
            key: 'answer',
            label: '解答'
          },
          {
            key: 'publishTime',
            label: '发布时间'
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
            label: '详情',
            type: 'text',
            event: (row) => {
              this.handleBtn(row, '详情')
            }
          },
          {
            label: '上线',
            type: 'text',
            isShow: (row) => {
              return row.status === 0
            },
            event: (row) => {
              this.handleBtn(row, '上线')
            }
          },
          {
            label: '下线',
            type: 'text',
            mode: 'danger',
            isShow: (row) => {
              return row.status === 1
            },
            event: (row) => {
              this.handleBtn(row, '下线')
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
        ],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          handleCurrentChange: this.handleCurrentChange
        }
      },
      dialogFormVisible: false,
      dialogTitle: '新增',
      form: {
        hot: -1,
        type: '',
        question: '',
        answer: ''
      },
      rules: {
        hot: { required: true, message: '请选择是否热门', trigger: 'change' },
        type: { required: true, message: '请选择问题类型', trigger: 'change' },
        question: [
          { required: true, message: '请输入问题描述内容', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入问题解答内容', trigger: 'blur' },
          { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
        ]
      },
      name: '',
      hot: '',
      type: '',
      ids: '',
      options: [],
      options1: [],
      multipleSelection: [],
      optionsType: [
        {
          id: 1,
          name: '问题1'
        },
        {
          value: 2,
          name: '问题2'
        }
      ],
      showEdit: true,
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      }
    }
  },
  mounted () {
    this.questionType()
    this.getHotType()
    this.getList()
  },
  methods: {
    // 列表
    getList () {
      const params = {
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize,
        keyWord: this.name,
        hot: this.hot,
        type: this.type
      }
      serve.getQuestionList(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData.data = res.data.data.rows
          this.tableData.page.total = res.data.data.totalCount
          this.tableData.data.map(item => {
            if (item.publishTime) {
              item.publishTime = moment(item.publishTime).format('YYYY-MM-DD HH:ss:mm')
            }
          })
        }
      })
    },
    // 问题类型枚举
    questionType () {
      serve.getQuestionType().then((res) => {
        if (res.data.code === 200) {
          this.options = res.data.data
          this.optionsType = res.data.data
        }
      })
    },
    // 热门枚举
    getHotType () {
      serve.hotType().then((res) => {
        if (res.data.code === 200) {
          this.options1 = res.data.data
        }
      })
    },
    // 分页
    handleCurrentChange (page) {
      this.tableData.page.currentPage = page
      this.getList()
    },
    // 查询
    handleSearch () {
      this.getList()
    },
    // 重置
    handleReset () {
      this.type = ''
      this.name = ''
      this.hot = ''
      this.tableData.page.currentPage = 1
      this.getList()
    },
    // 按钮操作
    handleBtn (row, type) {
      if (type === '详情') {
        this.dialogFormVisible = true
        this.showEdit = false
        this.dialogTitle = '详情'
        this.id = ''
        this.handleDetail(row.id)
      } else if (type === '编辑') {
        this.dialogFormVisible = true
        this.showEdit = true
        this.dialogTitle = '编辑'
        this.handleDetail(row.id)
        this.id = row.id
      } else if (type === '上线' || type === '下线') {
        serve
          .updateQuestionStatus(row.id, row.status === 0 ? 1 : 0)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg)
              this.getList()
            }
          })
      } else if (type === '删除') {
        this.messageData.show = true
        this.messageData.content = '问题删除后不可恢复，确认删除？'
        this.id = row.id
      }
    },
    // 详情
    handleDetail (id) {
      serve.getQuestionDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data
        }
      })
    },
    // 新增
    handleAddIssue () {
      this.dialogFormVisible = true
      this.showEdit = true
      this.id = ''
      this.form = {
        hot: -1,
        type: '',
        question: '',
        answer: ''
      }
      this.dialogTitle = '新增'
    },
    // 新增与编辑
    handleEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id !== '') {
            serve.editQuestion(this.form).then((res) => {
              if (res.data.code === 200) {
                this.dialogFormVisible = false
                this.$message.success(res.data.msg)
                this.getList()
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else if (this.id === '' && !this.showEdit) {
            this.dialogFormVisible = false
          } else {
            serve.addQuestion(this.form).then(res => {
              if (res.data.code === 200) {
                this.dialogFormVisible = false
                this.$message.success(res.data.msg)
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
    // 批量删除
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDeleteMore () {
      const IDList = this.multipleSelection.map((item) => item.id)
      this.ids = IDList
      if (this.ids.length === 0) {
        this.$message.warning('请先选择要删除的数据再点击删除')
      } else {
        this.messageData.show = true
        this.messageData.content = '问题删除后不可恢复，确认删除？'
      }
    },
    // 删除、批量删除
    handleModalShow () {
      if (this.id.length > 0) {
        serve.deleteQuestionMore(this.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        serve.deleteQuestion(this.id).then((res) => {
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
}
</script>

<style lang="scss" scoped>
::v-deep .dialog .el-dialog__body {
  padding-right: 55px;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}
::v-deep .el-dialog__header {
  text-align: left;
}
.position {
  padding: 20px;
  background-color: #fff;
  .position_btn_wrap {
    display: flex;
    justify-content: space-between;
    .position_btn {
      .btn {
        &:nth-child(2) {
          margin-left: 20px;
        }
      }
    }
  }
  .table {
    margin-top: 25px;
  }
  .form {
    text-align: left;
  }
}
</style>
