<template>
  <div class="all">
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            关键字搜索：
            <el-input
              placeholder="请输入"
              clearable
              v-model="videosName"
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
    <div class="videos">
      <div class="videos_btn_wrap">
        <div class="videos_btn">
          <span class="btn">
            <el-button
              size="small"
              type="primary"
              @click="handleAddVideos"
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
import TabelList from '../../components/Table'
import ReminderModal from '../../components/ReminderModal'
import serve from '../../api/videos'
export default {
  components: { TabelList, ReminderModal },
  data () {
    return {
      multipleSelection: [],
      videosName: '',
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
            key: 'coverImgUrl',
            label: '视频封面',
            type: 'imgAndTop',
            Iwidth: 156,
            Iheight: 88
          },
          {
            key: 'titleName',
            label: '标题',
            width: 100
          },
          {
            key: 'views',
            label: '浏览量',
            width: 100
          },
          {
            key: 'downloads',
            label: '下载量',
            width: 100
          },
          {
            key: 'statusStr',
            label: '状态',
            width: 100,
            type: 'upStatus'
          },
          {
            key: 'releaseTime',
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
              return row.isTop === 0
            },
            event: (row) => {
              this.handleBtn(row, '置顶')
            }
          },
          {
            label: '取消置顶',
            type: 'text',
            isShow: (row) => {
              return row.isTop === 1
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
      id: ''
    }
  },
  mounted () {
    this.handleList()
  },
  methods: {
    // 列表
    handleList () {
      const params = {
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize,
        titleName: this.videosName
      }
      serve.getList(params).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data.rows
          this.tableData.data = data
          this.tableData.page.total = res.data.data.totalCount
        }
      })
    },
    // 搜索
    handleSearch () {
      this.handleList()
    },
    // 重置
    handleReset () {
      this.videosName = ''
      this.tableData.page.currentPage = 1
      this.handleList()
    },
    // 分页
    handleCurrentChange (page) {
      this.tableData.page.currentPage = page
      this.handleList()
    },
    // 新增视频
    handleAddVideos () {
      this.$router.push({ path: '/videos/addVideos' })
    },
    // 按钮操作
    handleBtn (row, type) {
      if (type === '置顶' || type === '取消置顶') {
        const params = {
          isTop: row.isTop === 0 ? 1 : 0,
          id: row.id
        }
        serve.updateIsTop(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.handleList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '上线' || type === '下线') {
        const params = {
          id: row.id,
          status: row.status === 0 ? 1 : 0
        }
        serve.updateStatus(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.handleList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '删除') {
        this.messageData.show = true
        this.messageData.content = '删除后不可恢复，确认删除？'
        this.id = row.id
      } else if (type === '上移') {
        const params = {
          id: row.id,
          upDown: 1
        }
        serve.move(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.handleList()
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
            this.handleList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else if (type === '编辑') {
        this.$router.push({
          path: '/videos/addVideos',
          query: {
            formData: JSON.stringify(row)
          }
        })
      }
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
        console.log(this.multipleSelection, 909090)
        if (this.multipleSelection.every(item => item.status !== 1)) {
          this.messageData.show = true
          this.messageData.content = '删除后不可恢复，确认删除？'
        } else {
          this.$message.warning('请先下线后再删除')
        }
      }
    },
    handleModalShow () {
      const ids = []
      if (this.id.length > 0) {
        this.id.map(item => {
          ids.push(item)
        })
      } else {
        ids.push(this.id)
      }
      serve.delete(ids).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.handleList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.videos {
  padding: 20px;
  background-color: #fff;
  .videos_btn_wrap {
    display: flex;
    justify-content: space-between;
    .videos_btn {
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
