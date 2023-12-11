<template>
  <div>
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
              新增根节点
            </el-button>
          </span>
        </div>
      </div>
      <div class="table">
        <TabelList :tableData="tableData"></TabelList>
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
import authorityManage from '@/api/system/authority_manage'

export default {
  components: {
    TabelList,
    Diglog,
    ReminderModal
  },
  data () {
    return {
      // 删除模态框
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      },
      deleteId: '',
      userType: 0,
      tableLoading: false,
      dataFlag: true,
      title: '',
      dialogVisible: false,
      user: {},
      menuList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: {
        border: true,
        isCheck: true,
        loading: true,
        data: [],
        columns: [
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'authorityName',
            label: '权限名称'
          },
          {
            key: 'url',
            label: '路由path'
          },
          {
            key: 'sortNo',
            label: '排序'
          },
          {
            key: 'statusStr',
            label: '状态'
          },
          {
            key: 'operationsModel',
            label: '操作',
            fixed: 'right',
            width: 220
          }
        ],
        btnList: [
          {
            label: '添加子节点',
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
            label: '删除',
            type: 'text',
            isShow: () => this.userType === 1,
            mode: 'danger',
            event: row => {
              this.handleDeleteClick(row, '删除')
            }
          }
        ],
        treeProps: {
          children: 'children',
          hasChildren: 'hasChildren'
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
    getAccountList () {
      const params = {}
      authorityManage.getList(params).then(res => {
        if (res.data.code === 200) {
          const arr = res.data.data
          this.tableData.data = arr
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 新增根节点
    handleInsertClick () {
      this.title = '新增权限'
      this.user = null
      this.dialogVisible = true
    },
    handleEditClick (params) {
      this.title = '编辑权限'
      this.user = JSON.parse(JSON.stringify(params))
      this.dialogVisible = true
    },
    // 添加子节点
    handleViewClick (params) {
      this.title = '新增权限'
      this.user = JSON.parse(JSON.stringify(params))
      this.dialogVisible = true
    },
    // 删除
    handleDeleteClick (params) {
      this.messageData.show = true
      this.messageData.content = '删除后不可恢复，确认删除？'
      this.deleteId = params.id
    },
    // 删除
    handleModalShow () {
      authorityManage.deleteAuthority(this.deleteId).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getAccountList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 停用启用
    handleChangeClick (params) {
      console.log(params)
      params.status = params.status === 1 ? 2 : 1
      authorityManage.updateStatus(params.id, params.status).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          const message = params.status === 1 ? '启用成功' : '停用成功'
          this.$message.success(message)
          this.getAccountList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
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
