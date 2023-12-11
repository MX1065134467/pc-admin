<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            姓名：
            <el-input
              placeholder="请输入姓名"
              clearable
              v-model="username"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchcClick"
            />
          </div>
          <div class="search-item">
            手机号码：
            <el-input
              placeholder="请输入手机号码"
              clearable
              v-model="mobile"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchcClick"
            />
          </div>
        </div>
        <div class="btn">
          <div>
            <el-button
              @click="handleSearchcClick"
              type="primary"
              icon="el-icon-search"
              size="small"
            >
              查询
            </el-button>
          </div>
          <div class="clear">
            <el-button @click="clearClick" icon="el-icon-refresh" size="small"
              >重置</el-button
            >
          </div>
        </div>
      </div>
      <div class="kong"></div>
    </div>
    <div class="position">
      <div class="position_btn_wrap">
        <div class="position_btn">
          <span class="btn">
            <el-button
              v-if="this.userType === 1"
              size="small"
              type="primary"
              @click="handleInsertClick"
              icon="el-icon-circle-plus-outline"
            >
              新增
            </el-button>
          </span>
          <span class="btn">
            <el-button
              v-if="this.userType === 1"
              @click="deleteClick"
              size="small"
              type="danger"
              icon="el-icon-delete"
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
    <Diglog
      :title="title"
      :show.sync="dialogVisible"
      :data="user"
      @success="getAccountList"
    />
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
import TabelList from '../../../components/Table'
import ReminderModal from '../../../components/ReminderModal'
import Diglog from './components/Diglog'
import accountManage from '@/api/system/account_manage'

export default {
  components: {
    TabelList,
    Diglog,
    ReminderModal
  },
  data () {
    return {
      userType: 0,
      // 删除模态框
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      },
      deleteId: '',
      username: '',
      mobile: '',
      title: '',
      dialogVisible: false,
      form: {
        mobile: '',
        pageNo: 1,
        pageSize: 10,
        username: ''
      },
      user: {},
      accountList: [],
      total: 0,
      selectArray: [],
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
            key: 'account',
            label: '账号'
          },
          {
            key: 'username',
            label: '姓名'
          },
          {
            key: 'address',
            label: '地址'
          },
          {
            key: 'email',
            label: '邮箱'
          },
          {
            key: 'mobile',
            label: '手机号'
          },
          {
            key: 'statusStr',
            label: '状态'
          },
          {
            key: 'operationsModel',
            label: '操作',
            fixed: 'right',
            width: 260
          }
        ],
        btnList: [
          {
            label: '详情',
            type: 'text',
            event: row => {
              this.handleViewClick(row, '详情')
            }
          },
          {
            label: '停用',
            type: 'text',
            isShow: row => row.status === 1,
            event: row => {
              this.handleChangeClick(row, '停用')
            }
          },
          {
            label: '启用',
            type: 'text',
            isShow: row => row.status === 2,
            event: row => {
              this.handleChangeClick(row, '启用')
            }
          },
          {
            label: '编辑',
            type: 'text',
            event: row => {
              this.handleEditClick(row, '编辑')
            }
          },
          {
            label: '解锁',
            type: 'text',
            isShow: (row) => this.userType === 1 && row.status === 3,
            event: row => {
              this.handleClick(row, '解锁')
            }
          },
          {
            label: '重置密码',
            type: 'text',
            event: row => {
              this.handleResetClick(row, '重置密码')
            }
          },
          {
            label: '删除',
            type: 'text',
            mode: 'danger',
            event: row => {
              this.handleDeleteClick(row, '删除')
            }
          }
        ],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          handleCurrentChange: this.handleCurrentChange
        }
      }
    }
  },
  created () {
    const userType = sessionStorage.getItem('userType')
    this.userType = Number(userType)
    if (this.userType !== 1) {
      this.tableData.columns.splice(this.tableData.columns.length - 1, 1)
    }
  },
  mounted () {
    this.getAccountList()
  },
  methods: {
    // 用户列表查询
    getAccountList () {
      const params = {
        username: this.username,
        mobile: this.mobile,
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize
      }
      accountManage.getList(params).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          const arr = res.data.data.rows
          this.tableData.data = arr
          this.tableData.page.pageSize = res.data.data.pageSize
          this.tableData.page.total = res.data.data.totalCount
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 查看详情
    handleViewClick (params) {
      // console.log(params.id)
      this.title = '查看用户'
      this.dialogVisible = true
      accountManage.viewUser(params.id).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.user = JSON.parse(JSON.stringify(res.data.data))
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleInsertClick () {
      this.title = '新增账号'
      this.user = null
      this.dialogVisible = true
    },
    handleEditClick (params) {
      this.title = '编辑账号'
      this.dialogVisible = true
      accountManage.viewUser(params.id).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.user = JSON.parse(JSON.stringify(res.data.data))
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleSelectionChange (val) {
      this.selectArray = val.map(v => {
        return v.id
      })
    },
    // 批量删除
    deleteClick () {
      if (!this.selectArray.length) return
      this.messageData.show = true
      this.messageData.content = '删除后不可恢复，确认删除？'
    },
    // 删除
    handleDeleteClick (params) {
      this.messageData.show = true
      this.messageData.content = '删除后不可恢复，确认删除？'
      this.deleteId = params.id
    },
    // 删除
    handleModalShow () {
      if (this.deleteId) {
        accountManage.deleteUser(this.deleteId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.getAccountList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (this.selectArray) {
        accountManage.deleteArr(this.selectArray).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getAccountList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 停用/启用
    handleChangeClick (params) {
      params.status = params.status === 1 ? 2 : 1
      accountManage.updateStatus(params.id, params.status).then(res => {
        if (res.data.code === 200) {
          const message = params.status === 1 ? '启用成功' : '停用成功'
          this.$message.success(message)
          this.getAccountList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 解锁
    handleClick (params) {
      accountManage.unLock(params.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.getAccountList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleCurrentChange (currentPage) {
      this.tableData.page.currentPage = currentPage
      this.getAccountList()
    },
    // 搜索
    handleSearchcClick () {
      // this.form = form
      // this.form.pageNo = 1
      this.getAccountList()
    },
    clearClick () {
      this.username = ''
      this.mobile = ''
      this.getAccountList()
    },
    // 重置密码
    handleResetClick (params) {
      this.$confirm('您确定要重置该账号密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          accountManage.resetPwd(params.id).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg)
              this.getAccountList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
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
    .tabs {
      span {
        display: inline-block;
        padding: 10px 25px;
        border: 1px solid #e6e6e6;
        cursor: pointer;
        &:first-child {
          border-radius: 5px 0 0 5px;
        }
        &:last-child {
          border-radius: 0px 5px 5px 0;
        }
      }
      .active {
        color: #4791ff;
        border: 1px solid #4791ff;
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
        right: -50px;
        top: 0;
      }
    }
    .salary {
      margin-left: 25px;
    }
  }
}
</style>
