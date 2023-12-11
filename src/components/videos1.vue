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
        v-if="!show1"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽视频到此处可上传</div>
      </el-upload>
      <div class="play_wrap" v-if="show1">
        <img class="bg" :src="imgUrl" alt="" />
        <div class="play">
          <img src="../assets/images/stop.png" @click="handleVideo" alt="" />
        </div>
      </div>
      <div class="up" v-if="!show && !show1">
        <el-progress
          class="process"
          :percentage="total"
          :stroke-width="14"
          v-if="!show && success"
        ></el-progress>
        <el-progress
          class="process"
          status="exception"
          :percentage="total"
          :stroke-width="14"
          v-if="!show && !success"
        ></el-progress>
        <p class="tip tips">
          <span v-if="!show">{{ fileSize1 }}M</span>
          <span class="time" v-if="!show">速度： {{ speed }}</span>
          <span class="time" v-if="!show">剩余时间：{{ time }}</span>
          <span class="stop" v-if="abort">已暂停</span>
          <span class="stop stop1" v-if="!success">上传失败</span>
        </p>
        <div class="btns">
          <span class="cancle" @click="handleReUplod" v-if="!show"
            ><img src="../assets/images/cancle.png" />取消</span
          >
          <img
            src="../assets/images/continue.png"
            v-if="!show && btn && success"
            alt=""
          />
          <img
            src="../assets/images/tingzhi.png"
            v-if="!show && !btn && success"
            alt=""
          />
          <img src="../assets/images/reload.png" v-if="!show && !success" />
          <span v-if="!show && success" @click="handleBtn">{{
            btn | btnText
          }}</span>
          <span class="reUpload" v-if="!success" @click="handleReUplod1"
            >重新上传</span
          >
        </div>
      </div>
      <div class="up">
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
          @click="handleReUplod"
          v-if="show1"
          >重新上传</el-button
        >
        <p class="tip" v-if="show || show1">
          建议宽高比例为16:9，分辨率1280*720及以上，视频大小不超过200M
        </p>
      </div>
    </div>
    <el-dialog
      :title="diatitle"
      :visible.sync="dialogVisible"
      @close="closed"
      width="50%"
    >
      <div class="demo">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          @ready="playerReadied"
        ></video-player>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 上一次计算的文件大小
import SparkMD5 from 'spark-md5'
// import serve from '../api/videos'
import base from '../api/base'
import 'video.js/dist/video-js.css'
import axios from '../utils/http'
var lastTime = 0 // 上一次计算时间
var lastSize = 0
export default {
  name: 'App',
  data () {
    return {
      diatitle: '', // 视频名称
      imgUrl: '', // 视频封面
      total: 0,
      show1: false,
      time: '-',
      success: true,
      abort: false,
      video: null,
      btn: false,
      param: null,
      file: null,
      show: true,
      speed: '-',
      blob: {},
      fileSize1: '0', // 文件大小M
      fileSize: '', // 文件大小
      fileName: '', // 文件名
      partsize: '', // 每个切片大小定为5MB
      pratCount: '', // 切片数
      partList: [], // 切片集合
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如'16:9'或'4:3'）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: '' // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        },
        playtimes: '' // 视频观看起点
      },
      dialogVisible: false
    }
  },
  props: {
    type: Number,
    title: String,
    coverImgUrl: String,
    videoName: String
  },
  filters: {
    btnText (btn) {
      return btn ? '继续上传' : '暂停'
    },
    totalText (total) {
      return total > 100 ? 100 : total
    }
  },
  mounted () {
    if (this.type === 2) {
      this.show = false
      this.show1 = true
      this.success = true
      this.imgUrl = this.coverImgUrl
      this.playerOptions.sources[0].src =
        base.baseUrl + '/video/gradualPlay/anon?videoName=' + this.videoName
    }
    console.log(this.playerOptions.sources[0].src, 11111)
  },
  methods: {
    // 上传文件
    handleFile (file) {
      this.file = file
    },
    // 创建切片
    changeFile (file) {
      if (this.coverImgName === '') {
        this.$message.warning('请先上传视频封面')
        return
      }
      if (!file) {
        this.$message.warning('请先选择要上传的视频')
        return
      }
      this.total = 0
      const blob = file.raw
      this.blob = file.raw
      const fileSize = blob.size
      this.fileSize = fileSize
      this.fileSize1 = (fileSize / 1024 / 1024).toFixed(2)
      const fileName = blob.name
      this.fileName = fileName
      const partsize = 5 * 1024 * 1024
      const pratCount = Math.ceil(fileSize / partsize)
      this.pratCount = pratCount
      if (fileSize > 200 * 1024 * 1024) {
        this.$message.warning('视频大小不可超过200M')
        return
      }
      const suffix = /\.([0-9a-zA-Z]+)$/i.exec(fileName)[1]
      if (suffix !== 'mp4') {
        this.$message.warning('仅支持MP4格式')
        return
      }
      this.show = false
      this.show1 = false
      this.btn = false
      this.abort = false
      const partList = []
      for (let i = 1; i <= pratCount; i++) {
        let chunk
        if (i === pratCount) {
          chunk = blob.slice((i - 1) * partsize, fileSize - 1)
        } else {
          chunk = blob.slice((i - 1) * partsize, i * partsize)
        }
        const item = {
          chunk: chunk,
          fileName: `${fileName.split('.')[0]}_${i}.${suffix}`
        }
        partList.push(item)
      }
      this.partList = partList
      console.log(22222)
      this.sendRequest()
    },
    // 上传请求
    async sendRequest () {
      const requestList = []
      const res = await this.uploadFile(this.blob)
      this.partList.forEach((item, index) => {
        const fn = () => {
          const formData = new FormData()
          formData.append('file', item.chunk)
          this.param = JSON.stringify({
            md5: JSON.parse(res).md5,
            fileName: item.fileName,
            size: this.fileSize,
            chunks: this.pratCount,
            chunk: index + 1
          })
          formData.append(
            'param',
            new Blob([this.param], { type: 'application/json' })
          )
          this.flagIndex = index
          return axios({
            url: `${base.baseUrl}/video/chunkUploadVideo`,
            method: 'post',
            data: formData,
            onUploadProgress: (progressEvent) => {
              this.progressHandle(progressEvent)
            },
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          })
            .then((res) => {
              if (res.data.code === 200) {
                this.total += Math.ceil(100 / this.pratCount)
                this.total = this.total >= 100 ? 99 : this.total
                if (res.data.msg === '视频上传成功') {
                  this.show = false
                  this.show1 = true
                  this.playerOptions.sources[0].src =
                    base.baseVideo +
                    base.baseUrl +
                    '/video/gradualPlay/anon?videoName=' +
                    res.data.data
                  this.imgUrl = this.coverImgUrl
                  this.$parent.handleVideo(res.data.data)
                }
              } else {
                this.time = '-'
                this.speed = '-'
                this.show = false
                this.success = false
                this.btn = false
                throw new Error()
              }
            })
            .catch((err) => {
              console.log(err)
              this.time = '-'
              this.speed = '-'
              this.show = false
              this.success = false
              this.btn = false
              throw new Error()
            })
        }
        requestList.push(fn)
      })
      let i = this.flagIndex1 ? this.flagIndex1 + 1 : 0
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
    progressHandle (event) {
      /* 计算间隔 */
      var nowTime = new Date().getTime()
      var intervalTime = (nowTime - lastTime) / 1000 // 时间单位为毫秒，需转化为秒
      var intervalSize = event.loaded - lastSize
      /* 重新赋值以便于下次计算 */
      lastTime = nowTime
      lastSize = event.loaded
      /* 计算速度 */
      var speed = intervalSize / intervalTime
      var bSpeed = speed // 保存以b/s为单位的速度值，方便计算剩余时间
      var units = 'b/s' // 单位名称
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'k/s'
      }
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'M/s'
      }
      /* 计算剩余时间 */
      var leftTime = (event.total - event.loaded) / bSpeed
      /* 计算进度 */
      if (this.abort || this.btn) {
        this.time = '-'
        this.speed = '-'
      } else {
        this.speed = speed.toFixed(1) + units
        this.time = leftTime.toFixed(1) + '秒'
      }
    },
    // 文件加密
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
    // 暂停、继续
    handleBtn () {
      if (this.btn) {
        this.flagIndex1 = this.flagIndex
        this.abort = false
        this.btn = false
        this.sendRequest()
        return
      }
      this.btn = true
      this.abort = true
    },
    // 重新上传
    handleReUplod () {
      this.flagIndex1 = 0
      this.flagIndex = 0
      this.show1 = false
      this.file = ''
      this.total = 0
      this.show = true
      this.btn = false
      this.abort = false
      this.success = true
      this.handleBtn()
      this.$parent.handleVideo('', '')
    },
    // 失败续传
    handleReUplod1 () {
      this.success = true
      this.flagIndex = this.flagIndex - 1
      this.flagIndex1 = this.flagIndex
      this.abort = false
      this.btn = false
      this.sendRequest()
    },
    // 播放视频
    handleVideo () {
      this.diatitle = this.title
      this.dialogVisible = true
      // if (this.diatitle === '') {
      //   this.$message.warning('请先填写视频标题')
      // } else {
      //   this.dialogVisible = true
      // }
    },
    // 关闭视频
    closed () {
      this.$refs.videoPlayer.player.pause()
    },
    // 将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied (player, playtimes) {
      player.currentTime(playtimes)
      console.log('example player 1 readied', player)
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
    .play_wrap {
      margin-left: 10px;
      position: relative;
      .bg {
        width: 500px;
        height: 280px;
      }
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
        margin-left: -5px;
        span {
          margin-right: 15px;
        }
        .stop {
          text-align: right;
          margin-right: 0;
          margin-left: 13%;
        }
        .stop1 {
          color: red;
        }
        .time {
          margin-left: 20px;
        }
      }
      .process {
        width: 100%;
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
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .cancle {
        margin-right: 40px;
      }
    }
  }
}
</style>
