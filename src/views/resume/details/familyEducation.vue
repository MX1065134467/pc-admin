<template>
  <div class="container">
    <div class="header-title">
      <span class="border"></span>
      家庭成员
    </div>
    <div class="content-card">
      <div
        class="card"
        v-for="(item, index) in formData.resumeFamilyList"
        :key="index"
      >
        <div class="name">
          <span class="familyName">{{ item.familyName }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="relation">关系：{{ item.relation }}</div>
        <div class="relation">单位：{{ item.company }}</div>
        <div class="relation">职务：{{ item.job }}</div>
      </div>
    </div>
    <div class="header-title">
      <span class="border"></span>
      紧急联系人
    </div>
    <div class="form">
      <el-form ref="formData" :model="formData" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人姓名：">
              <el-input
                v-model="formData.urgentName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="与本人关系：">
              <el-input
                v-model="formData.urgentRelation"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：">
              <el-input
              class="input"
                v-model="formData.urgentPhone"
                size="small"
                style="width:70%"
                disabled
              >
              <div class="border" slot="suffix"></div>
              <el-button class="copy" slot="suffix" type="text" v-clipboard:copy="formData.urgentPhone" v-clipboard:success="copy" v-clipboard:error="onError">复制</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
  .content-card {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .card {
      box-sizing: border-box;
      width: 480px;
      // height: 230px;
      background: url("../../../assets/images/bgCard.png") no-repeat;
      background-size: contain;
      padding: 40px;
      margin-bottom: 32px;
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
        margin-top: 16px;
      }
    }
  }
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
}
</style>
