<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            展示值：
            <el-input
              placeholder="请输入字典名（中）"
              clearable
              v-model="name"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchClick"
            />
          </div>
          <div class="search-item">
            字典值：
            <el-input
              placeholder="请输入字典名（英）"
              clearable
              v-model="code"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchClick"
            />
          </div>
          <div class="search-item">
            启用状态：
            <el-select
              size="small"
              class="search"
              v-model="flag"
              clearable
              placeholder="请选择状态"
              @keyup.enter.native="handleSearchClick"
            >
              <el-option label="无效" value="0" />
              <el-option label="有效" value="1" />
            </el-select>
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
              size="small"
              type="primary"
              @click="handleInsertClick"
              icon="el-icon-circle-plus-outline"
              v-if="this.userType === 1"
            >
              新增字典项
            </el-button>
          </span>
          <span class="btn">
            <el-button
              @click="goBack"
              size="small"
            >
              返回
            </el-button>
          </span>
        </div>
      </div>
      <div class="table">
        <TabelList :tableData="tableData"></TabelList>
      </div>
    </div>
    <Diglog :title="title" :show.sync="dialogVisible" :data="user" @success="getList" />
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
import TabelList from '../../../../components/Table'
import Diglog from '../components/DialogEntry'
import ReminderModal from '../../../../components/ReminderModal'
import dataDictionary from '@/api/system/data_dictionary'

export default {
  components: {
    TabelList,
    Diglog,
    ReminderModal
  },
  data () {
    return {
      userType: 0,
      user: {},
      // 删除模态框
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      },
      deleteId: '',
      // 展示值
      code: '',
      // 字典名
      name: '',
      // 状态
      flag: '',
      dialogVisible: false,
      title: '',
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
            key: 'name',
            label: '展示值'
          },
          {
            key: 'code',
            label: '字典值'
          },
          {
            key: 'flagstr',
            label: '启用状态'
          },
          {
            key: 'sort',
            label: '排序标记'
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
    this.getList()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 用户列表查询
    getList () {
      const params = {
        id: Number(this.$route.params.id),
        name: this.name,
        flag: this.flag,
        code: this.code,
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize
      }
      dataDictionary.getDictionaryEntry(params).then(res => {
        if (res.data.code === 200) {
          this.tableData.data = res.data.data.rows.map(item => {
            return {
              id: item.id,
              createTime: item.createTime
                ? this.formatDate(Number(item.createTime))
                : '',
              name: item.name,
              code: item.code,
              flagstr: item.flagstr,
              sort: item.sort,
              latitude: item.latitude,
              longitude: item.longitude,
              remarks: item.remarks,
              flag: item.flag,
              type: item.type
            }
          })
          this.tableData.page.pageSize = res.data.data.pageSize
          this.tableData.page.total = res.data.data.totalCount
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleInsertClick () {
      this.title = '新增字典项'
      this.user = null
      this.dialogVisible = true
    },
    // 搜索
    handleSearchClick () {
      // this.params = form
      // this.params.pageNo = 1
      this.getList()
    },
    handleEditClick (params) {
      this.title = '编辑字典项'
      this.user = JSON.parse(JSON.stringify(params))
      console.log(this.user)
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
          this.getList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleCurrentChange (currentPage) {
      this.tableData.page.currentPage = currentPage
      this.getList()
    },
    // 重置
    clearClick () {
      this.code = ''
      this.name = ''
      this.flag = ''
      this.getList()
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
