<template>
  <div>
   <div class="search_warp">
      <div class="header">
        <div class="link">
          <ul class="clacategory-list">
            <li class="list-item" v-for="(item, index) in navList" :key="index">
              <span
              @click="handleNav(index)"
              :class="flagIndex === index ? 'active' : ''"
              >{{item}}</span>
            </li>
          </ul>
        </div>
        <div class="header-right">
          <div>
            <el-button type="text" icon="el-icon-download" @click="handleDown">下载</el-button>
          </div>
          <div class="border"></div>
          <div class="del">
            <el-button class="delete" type="text" icon="el-icon-delete" @click="deleteResume">删除</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <basic-information v-if="isShow1" :formData="formData"></basic-information>
        <family-education v-if="isShow2" :formData="formData"></family-education>
        <social-practice v-if="isShow3" :formData="formData"></social-practice>
        <remark v-if="isShow4" :formData="formData"></remark>
      </div>
      <div class="goBack">
        <el-button type="primary" size="small" @click="goBack">返 回</el-button>
      </div>
   </div>
   <!-- 删除模态框 -->
    <div v-if="messageData.show">
      <reminder-modal @handleDialog="handleModalShow" v-bind:message="messageData">
        <div slot="content">
          {{messageData.content}}
        </div>
      </reminder-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ReminderModal from '../../components/ReminderModal'
import basicInformation from './details/basicInformation'
import familyEducation from './details/familyEducation'
import socialPractice from './details/socialPractice'
import serve from '@/api/resume'
import Remark from './details/remark.vue'

export default {
  name: '',
  components: { basicInformation, familyEducation, socialPractice, Remark, ReminderModal },
  data () {
    return {
      id: this.$route.query.id,
      flagIndex: 0,
      navList: [
        '基本信息',
        '家庭成员及教育经历',
        '社会实践及获得荣誉',
        '备注联系方式'
      ],
      // 删除模态框
      messageData: {
        show: false,
        title: '确认删除',
        type: '',
        content: ''
      },
      dialogVisible: {
        title: '',
        show: false,
        url: ''
      },
      formData: {},
      isShow1: true, // 基本信息
      isShow2: false, // 家庭及教育
      isShow3: false, // 社会实践及获得荣誉
      isShow4: false // 备注联系方式
    }
  },
  created () {
  },
  mounted () {
    this.details()
  },
  methods: {
    handleNav (index) {
      console.log(index)
      this.flagIndex = index
      switch (index) {
        case 0:
          this.isShow1 = true
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = false
          break
        case 1:
          this.isShow1 = false
          this.isShow2 = true
          this.isShow3 = false
          this.isShow4 = false
          break
        case 2:
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = true
          this.isShow4 = false
          break
        case 3:
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = true
          break
      }
    },
    details () {
      serve.getdetail(this.id).then(res => {
        if (res.data.code === 200) {
          this.formData = res.data.data
          if (this.formData.city === '') {
            this.formData.city = '不限'
          }
          this.formData.resumeEducationList.forEach(item => {
            item.startTime = moment(item.startTime).format('YYYY.MM')
            item.endTime = moment(item.endTime).format('YYYY.MM')
          })
          this.formData.resumeSocialPracticeList.forEach(item => {
            item.startTime = moment(item.startTime).format('YYYY.MM')
            item.endTime = moment(item.endTime).format('YYYY.MM')
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 下载
    handleDown () {
      console.log(this.formData, 'this.formData')
      const params = {
        id: this.id
      }
      serve.resumeDown(params).then(res => {
        if (res.data) {
          const blob = new Blob([res.data], {
            type: 'application/zip'
          })
          var downloadA = document.createElement('a')
          downloadA.href = window.URL.createObjectURL(blob)
          downloadA.download = this.formData.name + '(' + '手机号' + this.formData.phone + ')' + this.formData.positionName
          // downloadA.download = res.headers['content-disposition'] ? decodeURI(res.headers['content-disposition'].split('=')[1]) : '简历' + '_' + new Date().valueOf()
          downloadA.click()
          window.URL.revokeObjectURL(downloadA.href)
        }
      })
    },
    // 删除
    handleModalShow (type) {
      if (type === 1) {
        serve.deleteresume(this.id).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.$router.push('/resume')
            this.id = ''
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 删除
    deleteResume () {
      this.messageData.show = true
      this.messageData.type = 1
      this.messageData.content = '删除后不可恢复，确认删除？'
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.search_warp {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    .link {
      box-sizing: border-box;
      .clacategory-list {
        text-align: left;
        .list-item {
          position: relative;
          cursor: pointer;
          list-style: none;
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          margin-right: 70px;
        }
        .active {
          &:after {
            content: '';
            position: absolute;
            bottom: -15px;
            top: auto;
            left: 50%;
            margin-left: -14px;
            height: 3px;
            width: 28px;
            background-color: #4791ff;
          }
        }
      }
    }
    .header-right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .border {
        width: 1px;
        height: 10px;
        border: 1px solid #e4e4e4;
        background-color: #e4e4e4;
        margin: 0 12px;
      }
      .del {
        .delete {
          color: #d82e2e;
        }
      }
    }
  }
  .content {
    text-align: left;
    padding: 0 36px;
  }
  .goBack {
    text-align: center;
    padding: 20px 0;
  }
}
</style>
