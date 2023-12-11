<template>
  <div class="search_warp">
   <div class="form">
      <el-form ref="formData" :model="formData" label-width="110px">
        <el-form-item label="应聘岗位：">
          <el-input
            v-model="formData.positionName"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="意向工作城市：">
          <el-input
            v-model="formData.intentionName"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="具体是：">
          <el-input
            v-model="formData.city"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input
            v-model="formData.name"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input
            v-model="formData.sexName"
            size="small"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input
            class="input"
            v-model="formData.phone"
            size="small"
            disabled
          >
            <div class="border" slot="suffix"></div>
            <el-button
              class="copy"
              slot="suffix"
              type="text"
              v-clipboard:copy="formData.phone"
              v-clipboard:success="copy"
              v-clipboard:error="onError"
              >复制</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <div class="file">
            <div class="file-left">
              <div class="file-img">
                <img src="../../assets/images/file.png" alt="" />
              </div>
              <div class="enclosureName">{{ formData.enclosureName }}</div>
            </div>
            <div class="file-right">
              <div class="header-right">
                <div>
                  <el-button type="text" @click="handleDown"
                    >下载</el-button
                  >
                </div>
                <div class="border"></div>
                <div class="del">
                  <el-button class="delete" type="text" @click="preview"
                    >预览</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-button class="down" size="small" type="primary" @click="handleDowned">下载</el-button>
          <el-button class="down" size="small" @click="deleteResume">删除</el-button>
          <el-button class="down" size="small" @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
   </div>
   <!-- 文件预览 -->
    <div v-if="dialogVisibles.show">
      <preview :dialogVisible="dialogVisibles"></preview>
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
import serve from '@/api/resume'
import moment from 'moment'
import preview from './dialog/preview.vue'
import ReminderModal from '../../components/ReminderModal'
export default {
  name: '',
  components: { preview, ReminderModal },
  // props: {
  //   formData: {
  //     type: Object
  //   }
  // },
  data () {
    return {
      formData: {
        positionName: '',
        intentionName: '',
        city: '',
        name: '',
        sexName: '',
        phone: ''
      },
      id: this.$route.query.id,
      dialogVisibles: {
        // 附件预览
        title: '附件预览',
        show: false,
        url: ''
      },
      // 删除模态框
      messageData: {
        show: false,
        title: '确认删除',
        type: '',
        content: ''
      }
    }
  },
  created () {
    this.details()
  },
  mounted () {},
  methods: {
    details () {
      serve.getdetail(this.id).then(res => {
        if (res.data.code === 200) {
          this.formData = res.data.data
          if (this.formData.city === '') {
            this.formData.city = '不限'
          }
          if (this.formData.resumeEducationList) {
            this.formData.resumeEducationList.forEach(item => {
              item.startTime = moment(item.startTime).format('YYYY.MM')
              item.endTime = moment(item.endTime).format('YYYY.MM')
            })
          }
          if (this.formData.resumeSocialPracticeList) {
            this.formData.resumeSocialPracticeList.forEach(item => {
              item.startTime = moment(item.startTime).format('YYYY.MM')
              item.endTime = moment(item.endTime).format('YYYY.MM')
            })
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    copy (e) {
      this.$message.success('复制成功')
    },
    onError (e) {
      this.$message.error('复制失败')
    },
    // 下载
    handleDown () {
      var downloadA = document.createElement('a')
      downloadA.href = this.formData.enclosure
      downloadA.download = this.formData.enclosureName
      document.body.appendChild(downloadA)
      downloadA.click()
      document.body.removeChild(downloadA)
    },
    // 预览
    preview () {
      // const filePost = this.formData.enclosureName.substring(
      //   this.formData.enclosureName.lastIndexOf('.') + 1
      // )
      // console.log(filePost, 'filePost')
      console.log(this.formData.enclosure, 'this.formData.enclosure')
      this.dialogVisibles.url = this.formData.enclosurePreview
      this.dialogVisibles.show = true
    },
    // 下载
    handleDowned () {
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
    deleteResume () {
      this.messageData.show = true
      this.messageData.type = 1
      this.messageData.content = '删除后不可恢复，确认删除？'
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
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.search_warp {
  .form {
    width: 700px;
    margin: auto;
    .input {
      position: relative;
      // .copy {
      //   position: absolute;
      //   top: 0;
      //   left: -50%;
      // }
      .border {
        position: absolute;
        top: 50%;
        left: -10px;
        width: 1px;
        height: 10px;
        border: 1px solid #cccccc;
        background-color: #cccccc;
        line-height: 10px;
        margin-top: -5px;
      }
    }
    .file {
      display: flex;
      justify-content: space-between;
      .file-left {
        display: flex;
        justify-content: flex-start;
        .file-img {
          width: 13px;
          height: 12px;
          margin-right: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .enclosureName {
          font-size: 14px;
          color: #4791ff;
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
          margin: 0 10px;
        }
        .del {
          .delete {
            color: #4791ff;
          }
        }
      }
    }
    .down {
      width: 88px;
      margin-bottom: 30px;
    }
    .down:nth-child(2) {
      margin-left: 16px;
    }
  }
}
</style>
