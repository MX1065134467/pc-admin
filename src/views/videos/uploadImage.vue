<template>
  <div class="all">
    <div class="up_wrap">
      <span class="text">视频封面：</span>
      <el-upload
        v-if="show"
        class="upload"
        drag
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleFile"
        action
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽图片到此处可上传</div>
      </el-upload>
      <div class="showimg" v-else>
        <img :src="imgUrl" alt="" />
      </div>
      <div class="up">
        <el-button
          class="btn"
          icon="el-icon-upload2"
          type="primary"
          @click="changeFile(file)"
          v-if="show"
          >上传图片</el-button
        >
        <el-button
          class="btn"
          icon="el-icon-upload2"
          type="primary"
          @click="handleReUplod"
          v-else
          >重新上传</el-button
        >
        <p class="tip">
          建议宽高比例为16:9，分辨率1280*720及以上，视频大小不超过200M
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import serve from '../../api/videos'
import SparkMD5 from 'spark-md5'
export default {
  data () {
    return {
      show: true,
      imgUrl: '',
      file: ''
    }
  },
  props: {
    type: Number,
    coverImgUrl: String
  },
  mounted () {
    console.log(this.type, 909090)
    if (this.type === 2) {
      this.show = false
      this.imgUrl = this.coverImgUrl
    }
  },
  methods: {
    handleFile (file) {
      this.file = file.raw
    },
    async changeFile () {
      if (!this.file) {
        this.$message.warning('请先选择图片')
        return
      }
      const res = await this.uploadFile(this.file)
      const fileName = this.file.name
      const suffix = /\.([0-9a-zA-Z]+)$/i.exec(fileName)[1]
      if (suffix === 'png' || suffix === 'jpg' || suffix === 'jpeg') {
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('md5', JSON.parse(res).md5)
        serve.uploadImg(formData).then((res) => {
          if (res.data.code === 200) {
            this.imgUrl = res.data.data.coverImgUrl
            this.show = false
            this.$parent.handleImg(res.data.data.coverImgName, res.data.data.coverImgUrl)
          } else {
            this.$message.error(res.data.msg)
            this.show = false
          }
        })
      } else {
        this.$message.warning('图片格式仅支持jpg/jpeg/png')
      }
    },
    uploadFile (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = (e) => {
          const param = JSON.stringify({
            md5: SparkMD5.hashBinary(e.target.result)
          })
          resolve(param)
        }
      })
    },
    // 重新上传
    handleReUplod () {
      this.imgUrl = ''
      this.file = ''
      this.$parent.handleImg('', '')
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload-dragger {
  width: 500px;
  height: 280px;
  border: 2px dashed #a3a8ae;
}
::v-deep .el-icon-upload:before {
  content: url("../../assets/images/upimg.png");
  position: relative;
  top: 30px;
}
::v-deep .el-upload__text {
   margin-top: 25px;
}
.all {
  text-align: left;
  display: flex;
  width: 100%;
  margin-top: 20px;
  .text::before {
    content: "*";
    color: red;
    margin-right: 5px;
  }
  .up_wrap {
    display: flex;
    width: 100%;
    .play_wrap {
      position: relative;
      .play {
        position: absolute;
        top: 40%;
        left: 45%;
        cursor: pointer;
      }
    }
    .upload {
      margin-left: 10px;
      flex: 1;
    }
    .up {
      flex: 2;
      margin-left: 48px;
      .btn {
        margin-top: 100px;
        margin-left: 10px;
      }
      .tip {
        color: #999999;
        font-size: 14px;
        margin-top: 15px;
        width: 480px;
      }
      .tips {
        width: 400px;
        border: 1px solid red;
        display: flex;
        margin-left: -5px;
        span {
          flex: 1;
        }
        .stop {
          flex: 1.2;
          text-align: right;
        }
      }
      .process {
        width: 40%;
        margin-top: 100px;
      }
      .btns {
        margin-top: 32px;
        font-size: 14px;
        color: #666666;
        span {
          cursor: pointer;
          display: inline-block;
        }
        .reUpload {
          color: #4791ff;
        }
      }
      .cancle {
        margin-right: 40px;
      }
    }
  }
  .showimg {
    margin-left: 10px;
    img {
      width: 500px;
      height: 280px;
    }
  }
}
</style>
