<template>
  <div class="news">
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            关键字搜索：
            <el-input
              placeholder="请输入"
              clearable
              v-model="newName"
              size="small"
              class="search"
              :maxlength="50"
              @keyup.enter.native="handleSearch"
            />
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
              @click="handleAddNews"
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
              批量删除
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
import serve from '../../api/news'
import TabelList from '../../components/Table'
import moment from 'moment'
import ReminderModal from '../../components/ReminderModal'

export default {
  components: { TabelList, ReminderModal },
  name: '',
  data () {
    return {
      newName: '',
      tableData: {
        border: true,
        isCheck: true,
        loading: true,
        columns: [
          {
            key: 'num',
            label: '序号',
            width: 80
          },
          {
            key: 'title',
            label: '标题',
            type: 'top',
            Iwidth: 200,
            Iheight: 200
          },
          {
            key: 'browse',
            label: '浏览',
            width: 100
          },
          {
            key: 'statusStr',
            label: '状态',
            width: 100,
            type: 'upStatus'
          },
          {
            key: 'createTime',
            label: '发布时间'
          },
          {
            key: 'operationsModel',
            label: '操作',
            fixed: 'right'
          }
        ],
        data: [],
        btnList: [
          {
            label: '置顶',
            type: 'text',
            isShow: (row) => {
              return row.hot === 0
            },
            event: (row) => {
              this.handleBtn(row, '置顶')
            }
          },
          {
            label: '取消置顶',
            type: 'text',
            isShow: (row) => {
              return row.hot === 1
            },
            event: (row) => {
              this.handleBtn(row, '取消置顶')
            }
          },
          {
            label: '上移',
            type: 'text',
            isShow: (row) => {
              return row.status === 0
            },
            event: (row) => {
              this.handleBtn(row, '上移')
            }
          },
          {
            label: '下移',
            type: 'text',
            isShow: (row) => {
              return row.status === 0
            },
            event: (row) => {
              this.handleBtn(row, '下移')
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
            label: '详情',
            type: 'text',
            event: (row) => {
              this.handleBtn(row, '详情')
            }
          },
          {
            label: '编辑',
            type: 'text',
            isShow: (row) => {
              return row.status === 0
            },
            event: (row) => {
              this.handleBtn(row, '编辑')
            }
          },
          {
            label: '删除',
            type: 'text',
            mode: 'danger',
            isShow: (row) => {
              return row.status === 0
            },
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
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      },
      multipleSelection: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取新闻列表
    getList () {
      const params = {
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize,
        keyword: this.newName
      }
      serve.selectAll(params).then(res => {
        if (res.data.code === 200) {
          const resData = res.data.data.rows
          resData.map(item => {
            item.createTime = moment(item.createTime).format('YYYY-MM-DD')
          })
          this.tableData.data = resData
          this.tableData.page.total = res.data.data.totalCount
        }
      })
    },
    // 搜索
    handleSearch () {
      this.getList()
    },
    // 重置
    handleReset () {
      this.newName = ''
      this.tableData.page.currentPage = 1
      this.getList()
    },
    // 新增
    handleAddNews () {
      this.$router.push({
        path: '/news/addNews'
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
        if (this.multipleSelection.every(item => item.status !== 1)) {
          this.messageData.show = true
          this.messageData.content = '删除后不可恢复，确认删除？'
        } else {
          this.$message.warning('请先下线后再删除')
        }
      }
    },
    // 删除、批量删除
    handleModalShow () {
      if (this.id.length > 0) {
        serve.batchDelete(this.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        serve.delete({ id: this.id }).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 分页
    handleCurrentChange (page) {
      this.tableData.page.currentPage = page
      this.getList()
    },
    // 按钮操作
    handleBtn (row, type) {
      if (type === '置顶' || type === '取消置顶') {
        const params = {
          hot: row.hot === 0 ? 1 : 0,
          id: row.id
        }
        serve.upOrDown(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '上线' || type === '下线') {
        const params = {
          id: row.id,
          status: row.status === 0 ? 1 : 0
        }
        serve.update(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '上移') {
        const params = {
          id: row.id,
          upDown: 1
        }
        serve.move(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '下移') {
        const params = {
          id: row.id,
          upDown: 2
        }
        serve.move(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '编辑') {
        this.$router.push(
          {
            path: '/news/addNews',
            query: { eid: row.id }
          }
        )
      } else if (type === '删除') {
        this.messageData.show = true
        this.messageData.content = '删除后不可恢复，确认删除？'
        this.id = row.id
      } else if (type === '详情') {
        this.$router.push(
          {
            path: '/news/viewNews',
            query: { eid: row.id, status: row.status }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button.el-button--text.el-button--mini {
margin-left: 0;
margin-right: 10px;
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
