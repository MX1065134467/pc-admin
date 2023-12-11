<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            关键字搜索：
            <el-input
              placeholder="请输入姓名、电话、招聘岗位"
              clearable
              v-model="keyWord"
              size="small"
              style="width:260px;"
              class="search"
            />
          </div>
        </div>
        <div class="btn">
          <div><el-button type="primary" icon="el-icon-search" size="small" @click="getList">查询</el-button></div>
          <div class="clear"><el-button icon="el-icon-refresh" size="small" @click="reset">重置</el-button></div>
        </div>
      </div>
      <div class="kong"></div>
    </div>
    <div class="search_warp">
      <div class="position">
      <div class="button-left">
        <el-button type="primary" icon="el-icon-download" size="small" @click="btachDown">批量下载</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" @click="batchDel">批量删除</el-button>
      </div>
      <div class="button-right">
        <div class="tabs">
          <span
            :class="flagIndex == index ? 'active' : ''"
            v-for="(item, index) in tabList"
            :key="index"
            @click="hadleTab(item)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="table">
      <TabelList :tableData="tableData" @currentChange="currentChange"></TabelList>
    </div>
    </div>
    <!-- 删除模态框 -->
    <div v-if="messageData.show">
      <reminder-modal @handleDialog="handleModalShow" :message="messageData">
        <div slot="content">
          {{messageData.content}}
        </div>
      </reminder-modal>
    </div>
  </div>
</template>

<script>
import TabelList from '../../components/Table'
import serve from '../../api/resume.js'
import ReminderModal from '../../components/ReminderModal'
export default {
  components: { TabelList, ReminderModal },
  data () {
    return {
      // 删除模态框
      messageData: {
        show: false,
        title: '确认删除',
        type: '',
        content: ''
      },
      deleteId: '',
      tabList: [],
      flagIndex: 0,
      type: '',
      keyWord: '',
      multipleSelection: [],
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
            key: 'name',
            label: '姓名'
          },
          {
            key: 'sexName',
            label: '性别'
          },
          {
            key: 'phone',
            label: '联系电话'
          },
          {
            key: 'positionName',
            label: '招聘岗位',
            width: 200
          },
          {
            key: 'createTimeStr',
            label: '提交时间'
          },
          {
            key: 'typeName',
            label: '招聘类型'
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
            isShow: false,
            event: row => {
              this.handleDetail(row, '详情')
            }
          },
          {
            label: '下载',
            type: 'text',
            isShow: false,
            event: row => {
              this.handleDown(row, '详情')
            }
          },
          {
            label: '删除',
            type: 'text',
            mode: 'danger',
            isShow: false,
            event: row => {
              this.handleDelete(row, '详情')
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
    this.tableList()
    this.tabBtnList()
  },
  mounted () {},
  methods: {
    tableList () {
      const params = {
        keyWord: this.keyWord,
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize,
        type: this.type
      }
      serve.getResumeList(params).then(res => {
        if (res.data.code === 200) {
          const arr = res.data.data.rows
          this.tableData.data = arr
          this.tableData.page.pageSize = res.data.data.pageSize
          this.tableData.page.total = res.data.data.totalCount
        }
      })
    },
    tabBtnList () {
      serve.getBtnList().then(res => {
        if (res.data.code === 200) {
          this.tabList = res.data.data
        }
      })
    },
    handleCurrentChange (page) {
      this.tableData.page.currentPage = page
      this.tableList()
    },
    // 详情
    handleDetail (row) {
      if (row.type === 1) {
        this.$router.push({ path: '/resume/societyDetail', query: { id: row.id } })
      } else {
        this.$router.push({ path: '/resume/detail', query: { id: row.id } })
      }
    },
    // 下载
    handleDown (row) {
      console.log(row, 'row')
      const params = {
        id: row.id
      }
      serve.resumeDown(params).then(res => {
        if (res.data) {
          const blob = new Blob([res.data], {
            type: 'application/zip'
          })
          var downloadA = document.createElement('a')
          downloadA.href = window.URL.createObjectURL(blob)
          downloadA.download = row.name + '(' + '手机号' + row.phone + ')' + row.positionName
          // downloadA.download = res.headers['content-disposition'] ? decodeURI(res.headers['content-disposition'].split('=')[1]) : '简历' + '_' + new Date().valueOf()
          downloadA.click()
          window.URL.revokeObjectURL(downloadA.href)
        }
      })
    },
    // 批量下载
    btachDown () {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请先选择要下载的数据后再点击批量下载')
        return false
      } else {
        const ids = []
        this.multipleSelection.forEach(item => {
          ids.push(item.id)
        })
        const params = {
          ids: ids
        }
        serve.BatchResumeDown(params).then(res => {
          if (res.data) {
            const blob = new Blob([res.data], {
              type: 'application/zip'
            })
            var downloadA = document.createElement('a')
            downloadA.href = window.URL.createObjectURL(blob)
            downloadA.download = res.headers['content-disposition'] ? decodeURI(res.headers['content-disposition'].split('=')[1]) : '简历' + '_' + new Date().valueOf()
            downloadA.click()
            window.URL.revokeObjectURL(downloadA.href)
          }
        })
      }
    },
    // 删除
    handleDelete (row) {
      this.messageData.show = true
      this.messageData.type = 1
      this.messageData.content = '删除后不可恢复，确认删除？'
      this.deleteId = row.id
    },
    currentChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 批量删除
    batchDel () {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning('请先选择要删除的数据后再点击批量删除')
        return false
      } else {
        this.messageData.show = true
        this.messageData.type = 2
        this.messageData.content = '删除后不可恢复，确认删除？'
      }
    },
    // 删除
    handleModalShow (type) {
      if (type === 1) {
        serve.deleteresume(this.deleteId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.tableList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
      if (type === 2) {
        const ids = []
        this.multipleSelection.forEach(item => {
          ids.push(item.id)
        })
        const params = {
          ids: ids
        }
        serve.batchDeleteresume(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.tableList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    hadleTab (item) {
      console.log(item)
      this.flagIndex = item.id
      if (item.id === null) {
        this.type = ''
        this.flagIndex = 0
      } else {
        this.type = item.id
      }
      this.tableList()
    },
    getList () {
      this.tableList()
    },
    reset () {
      this.keyWord = ''
      this.tableList()
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 24px;
  padding-bottom: 24px;
}
</style>
