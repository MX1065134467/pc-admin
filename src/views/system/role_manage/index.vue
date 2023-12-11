<!--
 * @Author: your name
 * @Date: 2021-05-11 12:59:03
 * @LastEditTime: 2021-05-26 18:07:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\views\system\role_manage\index.vue
-->
<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            角色名称：
            <el-input
              placeholder="请输入角色名称"
              clearable
              v-model="roleName"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchClick"
            />
          </div>
        </div>
        <div class="btn">
          <div>
            <el-button
              @click="handleSearchClick"
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
        <TabelList :tableData="tableData" @currentChange="handleSelectionChange"></TabelList>
      </div>
    </div>
    <Dialog
      :title="title"
      :show.sync="dialogVisible"
      :data="role"
      @success="getRoleList"
    />
    <PermissionDialog
      :show.sync="permissionDialogVisible"
      :data="permissionObj"
      :permissionTree="permissionTree"
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
import Dialog from './components/Dialog'
import ReminderModal from '../../../components/ReminderModal'
import PermissionDialog from './components/PermissionDialog'
import roleManage from '@/api/system/role_manage'

export default {
  components: {
    TabelList,
    Dialog,
    PermissionDialog,
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
      roleName: '',
      title: '',
      dialogVisible: false,
      permissionDialogVisible: false,
      role: {},
      roleList: [],
      permissionObj: {
        roleId: '',
        permissionList: []
      },
      permissionTree: [],
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
            key: 'roleName',
            label: '角色名称'
          },
          {
            key: 'remark',
            label: '描述'
          },
          {
            key: 'name',
            label: '创建人'
          },
          {
            key: 'createTime',
            label: '创建时间'
          },
          {
            key: 'operationsModel',
            label: '操作',
            fixed: 'right',
            width: 200
          }
        ],
        btnList: [
          {
            label: '编辑',
            type: 'text',
            event: row => {
              this.handleEditClick(row, '编辑')
            }
          },
          {
            label: '权限设置',
            type: 'text',
            event: row => {
              this.handlePermissionClick(row, '详情')
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
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      const params = {
        roleName: this.roleName,
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize
      }
      roleManage.getList(params).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.tableData.data = res.data.data.rows.map(item => {
            return {
              id: item.id,
              roleName: item.roleName,
              remark: item.remark,
              name: item.name,
              createTime: item.createTime
                ? this.formatDate(Number(item.createTime))
                : ''
            }
          })
          this.tableData.page.pageSize = res.data.data.pageSize
          this.tableData.page.total = res.data.data.totalCount
        } else {
          this.$message.error(res.data.code)
        }
      })
    },
    handleInsertClick () {
      this.title = '角色新增'
      this.role = {}
      this.dialogVisible = true
    },
    handleEditClick (params) {
      this.title = '角色编辑'
      this.dialogVisible = true
      this.role = JSON.parse(JSON.stringify(params))
    },
    handleSelectionChange (val) {
      this.selectArray = val.map(v => {
        return v.id
      })
    },
    // 批量删除
    deleteClick () {
      console.log(this.selectArray)
      if (!this.selectArray.length) return
      this.messageData.show = true
      this.messageData.content = '删除后不可恢复，确认删除？'
    },
    handleDeleteClick (params) {
      console.log(params)
      this.messageData.show = true
      this.messageData.content = '删除后不可恢复，确认删除？'
      this.deleteId = params.id
    },
    // 删除
    handleModalShow () {
      if (this.deleteId) {
        roleManage.deleteRole(this.deleteId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.getRoleList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (this.selectArray) {
        roleManage.deleteArr(this.selectArray).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getRoleList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    handlePermissionClick (params) {
      roleManage.getTree(params.id).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.permissionTree = res.data.data
          this.permissionObj.roleId = params.id
          this.getSelectedData(this.permissionObj.permissionList, res.data.data)
          console.log(this.permissionObj.permissionList)
          this.permissionDialogVisible = true
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getSelectedData (permissionList, data) {
      data.forEach((item, index) => {
        if (item.selected) {
          permissionList.push(item.id)
        }
        if (item.children) {
          const selected = item.children.every(item2 => {
            return item2.selected
          })
          if (!selected) {
            permissionList.map((item2, index2) => {
              if (item2 === data[index].id) {
                permissionList.splice(index2, 1)
              }
            })
          }
          item.children.map(item1 => {
            if (item1.selected) {
              permissionList.push(item1.id)
            }
          })
        }
      })
      console.log(permissionList, 900)
    },
    handleSearchClick () {
      // this.form = from
      // this.form.pageNum = 1
      this.getRoleList()
    },
    clearClick () {
      this.roleName = ''
      this.getRoleList()
    },
    handleCurrentChange (currentPage) {
      this.tableData.page.currentPage = currentPage
      this.getRoleList()
    },
    formatDate (dateStr) {
      var date = new Date(dateStr)
      var YY = date.getFullYear() + '-'
      var MM =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hh =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':'
      var ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return YY + MM + DD + ' ' + hh + mm + ss
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
