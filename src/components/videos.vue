<template>
  <div class="all">
    <div class="up_wrap">
      <span class="text">上传视频：</span>
      <el-upload
        drag
        action
        :auto-upload="false"
        :show-file-list="false"
        class="upload"
        :on-change="handleFile"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽图片到此处可上传</div>
      </el-upload>
      <div class="up" v-if="total > 0 && total < 100">
        <el-progress
          class="process"
          :percentage="total"
          :stroke-width="14"
        ></el-progress>
        <p class="tip tips">
          <span>速度: 837.5kb/s</span> <span>剩余时间：00:00:05</span>
          <span class="stop">已暂停</span>
        </p>
        <div class="btns">
          <span class="cancle">取消</span
          ><span v-if="total > 0 && total < 100" @click="handleBtn">{{ btn | btnText }}</span
          >
        </div>
      </div>
      <div class="up" v-else>
        <el-button
          class="btn"
          icon="el-icon-upload2"
          type="primary"
          @click="changeFile(file)"
          v-if="show"
          >上传视频</el-button
        >
        <el-button
          class="btn"
          icon="el-icon-upload2"
          type="primary"
          @click="changeFile(file)"
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
// import { fileParse } from '../utils/files'
// import axios from 'axios'
// import md5 from 'js-md5'
import SparkMD5 from 'spark-md5'
import serve from '../api/videos'
export default {
  name: 'App',
  data () {
    return {
      total: 0,
      abort: false,
      video: null,
      btn: false,
      param: null,
      file: null,
      show: true,
      blob: {},
      videoUrl: require('../assets/images/login/3.mp4'),
      fileSize: '', // 文件大小
      fileName: '', // 文件名
      partsize: '', // 每个切片大小定为5MB
      pratCount: '', // 切片数
      partList: [] // 切片集合
    }
  },
  filters: {
    btnText (btn) {
      return btn ? '继续' : '暂停'
    },
    totalText (total) {
      return total > 100 ? 100 : total
    }
  },
  methods: {
    handleFile (file) {
      this.file = file
      console.log(this.file, 99999999999)
    },
    changeFile (file) {
      if (!file) {
        this.$message.warning('请先选择要上传的视频')
        return
      }
      this.total = 0
      const blob = file.raw
      this.blob = file.raw
      const fileSize = blob.size
      this.fileSize = fileSize
      console.log(fileSize, 'fileSize')
      const fileName = blob.name
      this.fileName = fileName
      console.log(fileSize, 111111111)
      if (fileSize > 200 * 1024 * 1024) {
        this.$message.warning('视频大小不可超过200M')
        return
      }

      // const partsize = 5 * 1024 * 1024
      // const pratCount = Math.ceil(fileSize / partsize)
      const suffix = /\.([0-9a-zA-Z]+)$/i.exec(fileName)[1]
      // 创建切片
      const partList = []
      const partsize = fileSize / 5
      this.pratCount = 5
      let cur = 0
      // for (let i = 1; i <= pratCount; i++) {
      //   let chunk
      //   if (i === pratCount) {
      //     // 最后一片
      //     chunk = blob.slice((i - 1) * partsize, fileSize - 1)// 切割文件
      //   } else {
      //     chunk = blob.slice((i - 1) * partsize, i * partsize)
      //   }
      for (let i = 0; i < 5; i++) {
        const item = {
          chunk: blob.slice(cur, cur + partsize),
          filename: `${fileName.split('.')[0]}_${i}.${suffix}`
        }
        cur += partsize
        partList.push(item)
      }
      // const item = {
      //   chunk: chunk,
      //   fileName: `${fileName.split('.')[0]}_${i}.${suffix}`,
      //   flag: i
      // }
      // partList.push(item)
      // }
      this.partList = partList
      this.sendRequest()
    },
    async sendRequest () {
      this.total = 0
      console.log(this.partList, 9090909)
      const requestList = []
      const res = await this.uploadFile(this.blob)
      this.partList.forEach((item, index) => {
        const fn = () => {
          const formData = new FormData()
          formData.append('file', item.chunk)
          this.param = JSON.stringify({
            md5: JSON.parse(res).md5,
            fileName: this.fileName,
            size: this.fileSize,
            chunks: this.pratCount,
            chunk: index + 1
          })
          console.log(this.param, 12121212)
          formData.append(
            'param',
            new Blob([this.param], { type: 'application/json' })
          )
          return serve.chunkUploadVideo(formData).then((res) => {
            if (res.data.code === 200) {
              if (res.data.msg === '视频上传成功') {
                this.show = false
              }
              this.total += Math.round(100 / this.pratCount)
              // this.partList.splice(index, 1)
            }
          })
        }
        requestList.push(fn)
      })
      let i = 0
      const send = async () => {
        if (this.abort) return
        if (i >= requestList.length) {
          console.log('都传完了')
          return
        }
        await requestList[i]()
        i++
        send()
      }
      send()
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
    handleBtn () {
      if (this.btn) {
        // 断点续传
        console.log('继续')
        this.abort = false
        this.btn = false
        this.sendRequest()
        return
      }
      // 暂停上传
      console.log('暂停')
      this.btn = true
      this.abort = true
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
::v-deep .el-icon-upload {
  margin-top: 17%;
}
::v-deep .el-icon-upload:before {
  content: url("../../src/assets/images/videos.png");
}
::v-deep .el-upload__text {
  margin-top: -10%;
}
.all {
  text-align: left;
  display: flex;
  height: 100%;
  margin-top: 20px;
  .text::before {
    content: "*";
    color: red;
    margin-right: 5px;
  }
  .up_wrap {
    display: flex;
    width: 70%;
    .upload {
      margin-left: 10px;
      flex: 1;
    }
    .up {
      flex: 2;
      margin-left: 48px;
      .btn {
        margin-top: 20%;
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
        width: 80%;
        margin-top: 22%;
      }
      .btns {
        margin-top: 32px;
        font-size: 14px;
        color: #666666;
        span {
          cursor: pointer;
          display: inline-block;
        }
      }
      .cancle {
        margin-right: 40px;
      }
    }
  }
}
</style>
