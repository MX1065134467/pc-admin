<template>
  <div class="container">
    <div class="header-title">
      <span class="border"></span>
      主要教育与培训经历
    </div>
    <div class="content-card">
      <div
        class="card"
        v-for="(item, index) in formData.resumeEducationList"
        :key="index"
      >
        <div class="name">
          <span class="familyName">{{ item.school }}</span>
        </div>
        <div class="relation">起止时间：{{ item.startTime + '~' + item.endTime }}</div>
        <div class="relation">学历：{{ item.education }}</div>
        <div class="relation">文理/专业：{{ item.artsScience + '/' + item.educationMajor }}</div>
        <div class="relation">担任职务：{{ item.educationJob }}</div>
      </div>
    </div>
    <div class="header-title">
      <span class="border"></span>
      社会实践经历
    </div>
    <div class="content-card">
      <div
        class="card"
        v-for="(item, index) in formData.resumeSocialPracticeList"
        :key="index"
      >
        <div class="name">
          <span class="familyName">{{ item.companyName }}</span>
        </div>
        <div class="relation">起止时间：{{ item.startTime + '~' + item.endTime }}</div>
        <div class="relation">实践内容：{{ item.practice }}</div>
      </div>
    </div>
    <div class="header-title">
      <span class="border"></span>
      学生干部经历及社团活动
    </div>
    <el-input class="textarea" type="textarea" resize="none" v-model="formData.activity" size="small" disabled></el-input>
    <div class="header-title">
      <span class="border"></span>
      获奖情况及资质证书情况
    </div>
    <el-input class="textarea" type="textarea" resize="none" v-model="formData.certificates" size="small" disabled></el-input>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    copy (e) {
      this.$message.success('复制成功')
    },
    onError (e) {
      this.$message.error('复制失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .header-title {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 24px;
    .border {
      display: inline-block;
      width: 4px;
      height: 14px;
      background: #4791ff;
      margin-right: 10px;
    }
  }
  .textarea {
    margin-bottom: 30px;
  }
  .content-card {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .card {
      box-sizing: border-box;
      width: 490px;
      height: 240px;
      background: url("../../../assets/images/bgCard.png") no-repeat;
      background-size: contain;
      padding: 40px;
      margin-bottom: 32px;
      margin-right: 40px;
      .name {
        font-size: 22px;
        font-weight: 600;
        color: #000000;
        line-height: 30px;
        .familyName {
          margin-right: 24px;
        }
      }
      .relation {
        font-size: 14px;
        color: #666666;
        line-height: 21px;
        margin-top: 24px;
      }
      .relation:nth-child(n + 3) {
        margin-top: 10px;
      }
    }
    .card:last-child {
      margin-right: 0;
    }
  }
}
</style>
