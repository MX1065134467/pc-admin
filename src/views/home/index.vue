<template>
  <div class='home-wrap'>
    <div class="opcity-box">
      <div class="home-content">
        <div class="welcome-box">
          <div class="login">
            <div>欢迎
              <span class="login-font">{{userName}} </span>登录</div>
            <div class="plateMargin">招聘信息管理平台</div>
          </div>
          <div class="date">
            {{dateTime}}
            <span style="margin-left:20px;">{{weekday}}</span>
          </div>
        </div>
        <div class="message">
          <div class="tip-font">
            {{messageList[num]}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      userName: '',
      dateTime: '',
      weekday: '',
      messageList: [
        '每一个成功者都有一个开始。勇于开始，才能找到成功的路。',
        '一个人失败的最大原因，就是对于自己的能力永远不敢充分信任，甚至认为自己必将失败。',
        '决定今天的不是今天，而是昨天对人生的态度；决定明天的不是明天，而是今天对事业的作为。我们的今天由过去决定，我们的明天由今天决定！',
        '不要质疑你的付出，这些都会一种累积一种沉淀，它们会默默铺路，只为让你成为更优秀的人。',
        '所有的不甘，都是因为还心存梦想，在你放弃之前，好好拼一把，只怕心老，不怕路长。',
        '如果你想要什么，那就勇敢地去追求，不要管别人是怎么想的，因为这就是实现梦想的方式——行动。',
        '与其抱怨过去，不如认真面对未来。',
        '梦想不抛弃苦心追求的人，只要不停止追求，你们会沐浴在梦想的光辉之中。',
        '心态决定看世界的眼光，行动决定生存的状态。要想活出尊严，展现不凡，只有改变观念，敢于和命运抗争！',
        '人的生命之所以顽强，是得已历经风露，磨难，而依然完好无损，享受阳光。可生命中那些不完美的缺陷，往往它会成为生命中的一道独特的风景！',
        '世界上那些最容易的事情中，拖延时间是最容易的。'
      ]
    }
  },
  created () {
    this.getDate()
    this.getRandomNo()
    this.getUserInfo()
    this.userName = sessionStorage.getItem('username')
  },
  mounted () {},
  methods: {
    getUserInfo () {
      // const userInfo = getUserInfo()
      // this.userName = 'Admin'
    },
    getDate () {
      var myDate = new Date()
      const year = myDate.getFullYear()
      const month = myDate.getMonth() + 1
      const day = myDate.getDate()
      const months = month < 10 ? '0' + month : month
      const days = day < 10 ? '0' + day : day
      this.dateTime = year + '年' + months + '月' + days + '日'
      var week = myDate.getDay()
      if (week === 0) this.weekday = '星期日'
      else if (week === 1) this.weekday = '星期一'
      else if (week === 2) this.weekday = '星期二'
      else if (week === 3) this.weekday = '星期三'
      else if (week === 4) this.weekday = '星期四'
      else if (week === 5) this.weekday = '星期五'
      else if (week === 6) this.weekday = '星期六'
    },
    getRandomNo () {
      this.num = Math.floor(Math.random() * 10 + 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.home-wrap {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/wallhaven-39xqzy.jpg') no-repeat;
  background-size: cover;
  position: relative;
  .opcity-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    .home-content {
      height: calc(100% - 400px);
      .welcome-box {
        // padding-top: 60px;
        padding: 60px 100px;
        width: calc(100% - 200px);
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #316d6e;
        line-height: 45px;
        font-weight: 700;
        .login {
          .login-font {
            color: #d59764;
            font-size: 30px;
          }
        }
        .plateMargin {
          margin-left: 130px;
        }
      }
      .message {
        text-align: left;
        height: 100%;
        margin-top: 20px;
        margin-left: 100px;
        font-family: Microsoft Yahei;
        padding: 0 50px;
        width: calc(100% - 400px);
        .tip-font {
          padding-top: 60px;
          color: #333333;
          line-height: 45px;
          margin-left: 20px;
          font-size: 24px;
          margin-top: 30px;
          text-indent: 50px;
        }
      }
    }
  }
}
</style>
