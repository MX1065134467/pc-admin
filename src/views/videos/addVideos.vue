<template>
  <div class="all_wrap">
    <div class="content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="form"
      >
        <el-form-item label="标题：" prop="titleName">
          <el-input v-model="form.titleName" style="width: 99%"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：" prop="releaseTime">
          <el-date-picker
            v-model="form.releaseTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择发布时间"
            style="width: 99%"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <upload-image :type="type" :coverImgUrl="coverImgUrl"></upload-image>
      <videos1
        :type="type"
        :title="form.titleName"
        :coverImgUrl="coverImgUrl"
        :videoName="form.videoName"
      ></videos1>
      <div class="footer">
        <el-button class="cancle" @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')"
          >发 布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import uploadImage from './uploadImage.vue'
import videos1 from '../../components/videos1.vue'
import serve from '../../api/videos'
export default {
  components: { videos1, uploadImage },
  data () {
    return {
      type: 1,
      coverImgUrl: '',
      form: {
        titleName: '',
        releaseTime: '',
        coverImgName: '',
        videoName: ''
      },
      rules: {
        titleName: [
          { required: true, message: '请输入视频标题', trigger: 'blur' },
          {
            max: 50,
            message: '长度在 50 个字符以内',
            trigger: 'blur'
          }
        ],
        releaseTime: [
          { required: true, message: '请选择发布时间', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.formData) {
      this.form = JSON.parse(this.$route.query.formData)
      this.type = 2
      this.coverImgUrl = this.form.coverImgUrl
    } else {
      this.type = 1
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.coverImgName === '') {
            this.$message.warning('请上传视频封面')
            return false
          } else if (this.form.videoName === '') {
            this.$message.warning('请上传视频')
            return false
          } else {
            if (this.type === 1) {
              serve.addVideo(this.form).then((res) => {
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg)
                  this.$router.go(-1)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              serve.update(this.form).then((res) => {
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg)
                  this.$router.go(-1)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            }
          }
        }
      })
    },
    handleVideo (video) {
      this.form.videoName = video
    },
    handleImg (img, imgUrl) {
      this.form.coverImgName = img
      this.coverImgUrl = imgUrl
    },
    handleCancle () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-size: 16px;
  text-align: right;
  padding: 0;
  margin-left: -8px;
  color: #282828;
}
.all_wrap {
  width: 100%;
  background-color: #fff;
  .content {
    padding: 30px;
    .form {
      width: 900px;
    }
    .footer {
      margin-top: 70px;
      text-align: left;
      margin-left: 6%;
      .cancle {
        margin-right: 40px;
      }
    }
  }
}
</style>
