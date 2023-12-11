<template>
  <div class="all">
    <el-form ref="form" :model="form" :rules="rules" class="form" label-position="right" label-width="100px">
      <el-form-item label="封  面：" prop="avatarImage" ref="imageAvatar">
        <upload-img
          :imgBaseUrl="imgBaseUrl"
          :introduceImg="editImages"
          :numLimit="1"
          @change="getImages($event, 'fileId')"
          @delete="deleteImages"
          class="upload-img-style"
          style="margin-left: 10px"
          :postCropWidth="282"
          :postCropHeight="180"
          >建议尺寸282*180</upload-img
        >
      </el-form-item>
      <el-form-item label="发布时间：" prop="createTime">
        <el-date-picker
          v-model="form.createTime"
          type="date"
          placeholder="选择日期时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="标  题：" prop="title" >
        <el-input
          v-model="form.title"
          placeholder="不超过50个字符"
          :maxlength="50"
          show-word-limit
          style="width: 850px"
        ></el-input>
      </el-form-item>
      <el-form-item label="文  章：">
        <RichTextEditor
          style="width: 860px"
          ref="textEditor"
          :content="form.article"
          @onEditorChange="onEditorChange"
        ></RichTextEditor>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="handleResData">重 置</el-button>
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading"
        >发 布</el-button
      >
    </div>
  </div>
</template>

<script>
import uploadImg from '@c/ImgCropper/ImgCropper'
import RichTextEditor from '../../components/RichTextEditor.vue'
import serve from '../../api/news'
export default {
  components: { RichTextEditor, uploadImg },
  data () {
    const valiAvatar = (rule, value, callback) => {
      // 图片验证
      if (!this.hasavatar) {
        callback(new Error('新闻封面图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      imgBaseUrl: '',
      editImages: [],
      loading: false,
      imgTemporary: {
        // 图片文件暂存
        fileId: []
      },
      form: {
        title: '',
        article: '',
        createTime: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' },
          {
            max: 50,
            message: '长度在 50 个字符以内',
            trigger: 'blur'
          }
        ],
        createTime: [{ required: true, message: '请选择发布日期', trigger: 'blur' }],
        avatarImage: [{ required: true, validator: valiAvatar }]
      }
    }
  },
  mounted () {
    if (this.$route.query.eid) {
      this.eid = this.$route.query.eid
      this.getData()
    }
  },
  methods: {
    // 获取数据
    getData () {
      serve.selectById({ id: this.eid }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data
          this.editImages.push({
            filePath: res.data.data.coverImage
          })
          this.hasavatar = true
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 富文本
    onEditorChange (val) {
      this.form.article = val
    },
    // 添加图片
    getImages (res, type) {
      if (res.id) {
        this.hasavatar = true
        this.$refs.imageAvatar.clearValidate()
      }
      this.imgTemporary[type].push(res)
    },
    // 删除图片
    deleteImages (data) {
      if (data) {
        this.hasavatar = false
      }
      this.imgTemporary.fileId = []
      this.form.coverImage = ''
      this.editImages = []
    },
    // 重置
    handleResData () {
      this.$router.go(0)
    },
    // 取消
    handleCancle () {
      this.$router.go(-1)
    },
    // 保存
    async onSubmit (status) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const uploadImgAll = []
          for (const key in this.imgTemporary) {
            this.imgTemporary[key].map((item) => {
              const params = new FormData()
              params.append('file', item.file)
              uploadImgAll.push(
                serve.upload(params).then((res) => {
                  this.form.coverImage = res.data.data
                })
              )
            })
          }
          Promise.all(uploadImgAll).then((suc) => {
            if (this.eid) {
              this.form.id = this.eid
              serve.edit(this.form).then((res) => {
                this.loading = false
                if (res.data.code === 200) {
                  this.$message.success('修改成功')
                  this.$router.go(-1)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              serve.create(this.form).then((res) => {
                this.loading = false
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg)
                  this.$router.go(-1)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.all {
  background-color: #fff;
  padding: 30px;
  text-align: left;
  .footer {
    text-align: left;
    margin: 40px 0 0 100px;
  }
}
</style>
