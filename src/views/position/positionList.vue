<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            关键字搜索：
            <el-input
              placeholder="请输入岗位名称"
              clearable
              v-model="positonName"
              size="small"
              class="search"
              :maxlength="50"
              @keyup.enter.native="handleSearch"
            />
          </div>
          <div class="search-item">
            地点：
            <el-select
              v-model="intention"
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
    </div>
    <div class="position">
      <div class="position_btn_wrap">
        <div class="position_btn">
          <span class="btn">
            <el-button
              size="small"
              type="primary"
              @click="handleAddPosition"
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
        <div class="tabs">
          <span
            :class="flagIndex == index ? 'active' : ''"
            v-for="(item, index) in tabList"
            :key="index"
            @click="hadleTab(index, item.id)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <div class="table">
        <TabelList
          :tableData="tableData"
          @currentChange="handleSelectionChange"
        ></TabelList>
      </div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        class="dialog"
        width="750px"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="form" label-width="100px" class="form">
          <el-form-item label="职位名称:">
            <el-input
              v-model="form.name"
              placeholder="请输入职位名称"
              :disabled="!showEdit"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="薪资范围:"
            v-if="form.type === 3"
            class="salary-wrap"
          >
            <el-col :span="10">
              <el-select
                v-model="form.salaryRangeLow"
                placeholder="最低薪资"
                :disabled="!showEdit"
                style="width: 100%"
              >
                <el-option
                  v-for="item in optionsSalaryLow"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" style="text-align: center">
              <span><img src="../../assets/images/arrow.png" style="vertical-align:middle" alt=""></span>
            </el-col>
            <el-col :span="10">
              <el-select
                v-model="form.salaryRangeHigh"
                placeholder="最高薪资"
                :disabled="!showEdit"
                style="width: 100%"
              >
                <el-option
                  v-for="item in optionsSalaryHigh"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <span class="text">元 / 天</span>
          </el-form-item>
          <el-form-item label="薪资范围:" v-else>
            <el-col :span="7">
              <el-select
                v-model="form.salaryRangeLow"
                placeholder="最低薪资"
                :disabled="!showEdit"
                style="width: 105%"
              >
                <el-option
                  v-for="item in optionsSalaryLow"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" style="text-align: center">
              <span><img src="../../assets/images/arrow.png" style="vertical-align:middle" alt=""></span>
            </el-col>
            <el-col :span="7">
              <el-select
                v-model="form.salaryRangeHigh"
                placeholder="最高薪资"
                :disabled="!showEdit"
                style="width: 105%"
              >
                <el-option
                  v-for="item in optionsSalaryHigh"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" class="salary">
              <el-select
                v-model="form.salaries"
                placeholder="请选择"
                :disabled="!showEdit"
              >
                <el-option
                  v-for="item in optionsBonus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="实习要求:" v-if="form.type === 3">
            <el-col :span="11">
              <el-select
                v-model="form.leastReqire"
                placeholder="最少实习月数"
                style="width: 100%"
                :disabled="!showEdit"
              >
                <el-option
                  v-for="item in optionsReqire"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="11" style="margin-left: 48px">
              <el-select
                v-model="form.leastTimes"
                placeholder="最少周到岗天数"
                style="width: 100%"
                :disabled="!showEdit"
              >
                <el-option
                  v-for="item in optionsLeastTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="工作地点:">
            <el-select
              v-model="form.intention"
              placeholder="请选择"
              :disabled="!showEdit"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionsIntention"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门:">
            <el-input
              v-model="form.positionName"
              placeholder="请输入部门名称"
              :disabled="!showEdit"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作经验:">
            <el-select v-model="form.workExperience" placeholder="请选择" :disabled="!showEdit"  style="width: 100%">
              <el-option
                v-for="item in optionsWorkExperience"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历要求:">
            <el-select
              v-model="form.education"
              placeholder="请选择"
              :disabled="!showEdit"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionsEducation"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招聘类型:">
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
          <el-form-item
            label="毕业时间:"
            v-if="form.type === 2 || form.type === 3"
          >
            <el-select
              v-model="form.graduateTime"
              placeholder="请选择"
              style="width: 100%"
              :disabled="!showEdit"
            >
              <el-option
                v-for="item in optionsGraduateTime"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="!showEdit"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作地址:">
            <el-input v-model="form.workAddress" :disabled="!showEdit"></el-input>
          </el-form-item>
          <el-form-item label="职位描述:">
            <el-input
              type="textarea"
              v-model="form.positionDesc"
              placeholder="请输入"
              :disabled="!showEdit"
              autosize
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false"
          >返 回</el-button>
        <el-button type="primary" @click="handleEdit">编 辑</el-button>
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
  </div>
</template>

<script>
import TabelList from '../../components/Table'
import serve from '../../api/position.js'
import ReminderModal from '../../components/ReminderModal'
import moment from 'moment'
export default {
  components: { TabelList, ReminderModal },
  data () {
    return {
      positonName: '',
      intention: '',
      flagIndex: 0,
      type: '',
      options: [],
      id: '',
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      },
      tableData: {
        border: true,
        isCheck: true,
        loading: true,
        data: [],
        columns: [
          {
            key: 'num1',
            label: '序号',
            width: 80
          },
          {
            key: 'name',
            label: '岗位名称'
          },
          {
            key: 'typeName',
            label: '薪资范围'
          },
          {
            key: 'workCity',
            label: '工作地点'
          },
          {
            key: 'positionName',
            label: '所属部门'
          },
          {
            key: 'publishTime',
            label: '发布时间'
          },
          {
            key: 'educationName',
            label: '学历要求'
          },
          {
            key: 'type',
            label: '招聘类型'
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
      multipleSelection: [],
      tabList: [],
      dialogTitle: '详情',
      queryId: '',
      dialogFormVisible: false,
      showEdit: false,
      form: {
        type: 1,
        name: '',
        salaryRangeLow: '',
        salaryRangeHigh: '',
        leastReqire: '',
        leastTimes: '',
        intention: '',
        workExperience: 1,
        education: '',
        graduateTime: '',
        workAddress: '',
        positionName: '',
        positionDesc: '',
        workLatitude: '',
        workLongitude: '',
        salaries: ''
      },
      optionsType: [
        {
          id: 1,
          name: '社招'
        },
        {
          id: 2,
          name: '校招'
        },
        {
          id: 3,
          name: '校招实习'
        }
      ],
      optionsWorkExperience: [],
      optionsIntention: [],
      optionsEducation: [],
      optionsSalaryLow: [],
      optionsSalaryHigh: [],
      optionsReqire: [],
      optionsLeastTimes: [
        {
          value: 1,
          label: '1天'
        },
        {
          value: 2,
          label: '2天'
        },
        {
          value: 3,
          label: '3天'
        },
        {
          value: 4,
          label: '4天'
        },
        {
          value: 5,
          label: '5天'
        },
        {
          value: 6,
          label: '6天'
        }
      ],
      optionsGraduateTime: [
        {
          value: '2001',
          label: '2001'
        },
        {
          value: '2002',
          label: '2002'
        },
        {
          value: '2003',
          label: '2003'
        }
      ],
      optionsBonus: [
        {
          value: 12,
          label: '12薪'
        },
        {
          value: 13,
          label: '13薪'
        },
        {
          value: 14,
          label: '14薪'
        },
        {
          value: 15,
          label: '15薪'
        },
        {
          value: 16,
          label: '16薪'
        },
        {
          value: 17,
          label: '17薪'
        },
        {
          value: 18,
          label: '18薪'
        },
        {
          value: 19,
          label: '19薪'
        },
        {
          value: 20,
          label: '20薪'
        }
      ]
    }
  },
  mounted () {
    this.getTabsList()
    this.getList()
    this.getIntentionDrop()
    this.getExprienceDrop()
    this.getTypeDrop()
    this.getEducationDrop()
    this.salaryList()
    this.requireList()
  },
  methods: {
    // 获取标签页
    getTabsList () {
      serve.getTabs().then((res) => {
        if (res.data.code === 200) {
          this.tabList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getList () {
      serve
        .getPositionList(
          this.positonName,
          this.tableData.page.currentPage,
          this.type,
          this.intention
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData.data = res.data.data.rows
            this.tableData.page.total = res.data.data.totalCount
            this.tableData.data.map((item, index) => {
              if (item.publishTime) {
                item.publishTime = moment(item.publishTime).format(
                  'YYYY-MM-DD HH:mm:ss'
                )
              }
              item.num1 = index + 1
              if (item.type === 1) {
                item.type = '社招'
              } else if (item.type === 2) {
                item.type = '应届校招'
              } else if (item.type === 3) {
                item.type = '应届校招实习'
              }
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 分页
    handleCurrentChange (page) {
      this.tableData.page.currentPage = page
      this.getList()
    },
    // 搜素
    handleSearch () {
      this.getList()
    },
    // 重置
    handleReset () {
      this.positonName = ''
      this.intention = ''
      this.tableData.page.currentPage = 1
      this.getList()
    },
    // 招聘类型切换
    hadleTab (index, id) {
      this.flagIndex = index
      if (id == null) {
        this.type = ''
      } else {
        this.type = id
      }
      this.tableData.page.currentPage = 1
      this.getList()
    },
    // 按钮操作
    handleBtn (row, type) {
      if (type === '详情') {
        this.dialogFormVisible = true
        this.dialogTitle = '详情'
        this.showEdit = false
        this.queryId = row.id
        this.getDetail(row.id)
      } else if (type === '编辑') {
        this.dialogFormVisible = true
        this.dialogTitle = '编辑'
        this.showEdit = true
        this.$router.push({
          path: '/position/addPosition',
          query: {
            id: row.id
          }
        })
      } else if (type === '上线' || type === '下线') {
        const status = row.status === 0 ? 1 : 0
        this.updatePositionStatus(row.id, status)
      } else if (type === '删除') {
        this.messageData.show = true
        this.messageData.content = '删除后不可恢复，确认删除？'
        this.id = row.id
      }
    },
    handleEdit () {
      this.$router.push({
        path: '/position/addPosition',
        query: {
          id: this.queryId
        }
      })
    },
    // 新增
    handleAddPosition () {
      this.$router.push({
        path: '/position/addPosition'
      })
    },
    // 批量删除
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
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
    // 查看详情
    getDetail (id) {
      serve.getPositionDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 上线、下线
    updatePositionStatus (id, status) {
      const params = {
        status: status
      }
      serve.updateStatus(id, params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.getList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 删除、批量删除
    handleModalShow () {
      if (this.id.length > 0) {
        const params = {
          ids: this.id
        }
        serve.deletePositionMore(params).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        serve.deletePosition(this.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 招聘类型
    getTypeDrop () {
      serve.getType().then((res) => {
        if (res.data.code === 200) {
          this.optionsType = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 工作经验
    getExprienceDrop () {
      serve.getExperience().then((res) => {
        if (res.data.code === 200) {
          this.optionsWorkExperience = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 工作城市
    getIntentionDrop () {
      serve.getWorkCity().then((res) => {
        if (res.data.code === 200) {
          this.optionsIntention = res.data.data
          this.options = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 学历
    getEducationDrop () {
      serve.getEducation().then((res) => {
        if (res.data.code === 200) {
          this.optionsEducation = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 社招、校招下拉框
    salaryList () {
      this.optionsSalaryLow = []
      this.optionsSalaryHigh = []
      for (let index = 0; index < 50; index++) {
        this.optionsSalaryLow.push({
          value: index + 1,
          label: index + 1 + 'k'
        })
        this.optionsSalaryHigh.push({
          value: index + 1,
          label: index + 1 + 'K'
        })
      }
    },
    // 实习生下拉框
    salaryListOne () {
      this.optionsSalaryLow = []
      this.optionsSalaryHigh = []
      for (let index = 0; index < 6; index++) {
        this.optionsSalaryLow.push({
          value: 50 * (index + 1),
          label: 50 * (index + 1)
        })
        this.optionsSalaryHigh.push({
          value: 50 * (index + 1),
          label: 50 * (index + 1)
        })
      }
    },
    // 最少实习月数
    requireList () {
      for (let index = 0; index < 12; index++) {
        this.optionsReqire.push({
          value: index + 1,
          label: index + 1 + '个月'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .dialog .el-dialog__body {
  padding-right: 50px;
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
    width: 100%;
    margin: 0 auto 35px auto;
    .bm-view {
      margin-top: 5px;
      width: 100%;
      height: 140px;
    }
    .salary-wrap {
      position: relative;
      .text {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .salary {
      margin-left: 45px;
    }
  }
}
</style>
