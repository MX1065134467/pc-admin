<template>
  <div>
    <div class="search_warp">
      <div class="search_content_wrap">
        <div class="search_content">
          <div class="search-item">
            用户：
            <el-input
              placeholder="请输入用户"
              clearable
              v-model="account"
              size="small"
              class="search"
              maxlength="50"
              @keyup.enter.native="handleSearchcClick"
            />
          </div>
          <div class="search-item">
            姓名：
            <el-input
              placeholder="请输入姓名"
              clearable
              v-model="name"
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
        <div class="position_btn"></div>
      </div>
      <div class="table">
        <TabelList :tableData="tableData"></TabelList>
      </div>
    </div>
  </div>
</template>

<script>
import TabelList from '../../../components/Table'
import logManage from '@/api/system/log_manage'
export default {
  components: {
    TabelList
  },
  data () {
    return {
      account: '',
      name: '',
      user: {},
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
            label: '用户'
          },
          {
            key: 'name',
            label: '姓名'
          },
          {
            key: 'createDate',
            label: '登录时间'
          },
          {
            key: 'operatorIp',
            label: '登录IP'
          },
          {
            key: 'action',
            label: '内容'
          },
          {
            key: 'operatorAccount',
            label: '操作账户'
          },
          {
            key: 'operatorName',
            label: '操作人'
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
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const params = {
        account: this.account,
        name: this.name,
        pageNo: this.tableData.page.currentPage,
        pageSize: this.tableData.page.pageSize
      }
      logManage.getList(params).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.tableData.data = res.data.data.rows.map(item => {
            return {
              id: item.id,
              account: item.account,
              name: item.name,
              createDate: item.createDate
                ? this.formatDate(item.createDate)
                : '',
              operatorIp: item.operatorIp,
              action: item.action,
              operatorAccount: item.operatorAccount,
              operatorName: item.operatorName
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
      this.tableData.page.currentPage = currentPage
      this.getList()
    },
    handleSearchcClick () {
      // this.form = form
      // this.form.pageNo = 1
      this.getList()
    },
    clearClick () {
      this.account = ''
      this.name = ''
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
