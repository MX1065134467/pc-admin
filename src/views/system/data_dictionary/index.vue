<!--
 * @Author: your name
 * @Date: 2021-05-12 14:27:59
 * @LastEditTime: 2021-05-27 09:23:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\12\src\views\system\data_dictionary\index.vue
-->
<template>
  <div v-if="isShow">
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            字典名（中）：
            <el-input
              placeholder="请输入字典名（中）"
              clearable
              v-model="categoryName"
              size="small"
              class="search form-item"
              maxlength="50"
              @keyup.enter.native="handleSearchClick"
            />
          </div>
          <div class="search-item">
            字典名（英）：
            <el-input
              placeholder="请输入字典名（英）"
              clearable
              v-model="category"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchClick"
            />
          </div>
          <div class="search-item">
            描述：
            <el-input
              placeholder="请输入描述"
              clearable
              v-model="remarks"
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
              新增字典
            </el-button>
          </span>
        </div>
      </div>
      <div class="table">
        <TabelList :tableData="tableData"></TabelList>
      </div>
    </div>
    <Dialog :title="title" :show.sync="dialogVisible" :data="user" @success="getCodeList" />
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
  <router-view v-else />
</template>

<script>
import TabelList from '../../../components/Table'
import Dialog from './components/Dialog'
import ReminderModal from '../../../components/ReminderModal'
import dataDictionary from '@/api/system/data_dictionary'
import { isUrlFinallyParameter } from '../../../utils/index'
export default {
  components: {
    TabelList,
    Dialog,
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
      user: {},
      // 字典名（英文）
      category: '',
      // 字典名
      categoryName: '',
      // 描述
      remarks: '',
      title: '',
      dialogVisible: false,
      accountList: [],
      // 选择的信息
      selectArray: [],
      tableData: {
        border: true,
        isCheck: true,
        loading: true,
        data: [],
        columns: [
          {
            key: 'createTime',
            label: '日期'
          },
          {
            key: 'categoryName',
            label: '字典名（中）'
          },
          {
            key: 'category',
            label: '字典名（英）'
          },
          {
            key: 'flagstr',
            label: '状态'
          },
          {
            key: 'remarks',
            label: '描述'
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
            label: '详情',
            type: 'text',
            event: row => {
              this.handleViewClick(row, '详情')
            }
          },
          {
            label: '编辑',
            type: 'text',
            isShow: () => this.userType === 1,
            event: row => {
              this.handleEditClick(row, '编辑')
            }
          },
          {
            label: '删除',
            type: 'text',
            mode: 'danger',
            isShow: () => this.userType === 1,
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
  computed: {
    isShow () {
      return isUrlFinallyParameter('system_code')
    }
  },
  created () {
    const userType = sessionStorage.getItem('userType')
    this.userType = Number(userType)
    this.getCodeList()
  },
  methods: {
    // 获取字典列表
    getCodeList () {
      const params = {
        category: this.category,
        categoryName: this.categoryName,
        remarks: this.remarks,
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize
      }
      dataDictionary.getList(params).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.tableData.data = res.data.data.rows.map(item => {
            return {
              id: item.id,
              createTime: item.createTime
                ? this.formatDate(Number(item.createTime))
                : '',
              categoryName: item.categoryName,
              category: item.category,
              flag: item.flag,
              flagstr: item.flagstr,
              remarks: item.remarks
            }
          })
          this.tableData.page.pageSize = res.data.data.pageSize
          this.tableData.page.total = res.data.data.totalCount
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleCurrentChange (currentPage) {
      this.tableData.page.pageNo = currentPage
      this.getCodeList()
    },
    // 搜索
    handleSearchClick () {
      // this.params = form
      // this.params.pageNo = 1
      this.getCodeList()
    },
    // 重置
    clearClick () {
      this.category = ''
      this.categoryName = ''
      this.remarks = ''
      this.getCodeList()
    },
    // 新增
    handleInsertClick () {
      this.title = '新增字典'
      this.user = null
      this.dialogVisible = true
    },
    // 详情
    handleViewClick (params) {
      this.$router.push(`/system/addDictionaryEntry/${params.id}`)
      // this.user = null
    },
    // 编辑
    handleEditClick (params) {
      console.log(params)
      this.title = '编辑字典'
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
      dataDictionary.deleteCode(this.deleteId).then(res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getCodeList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
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
