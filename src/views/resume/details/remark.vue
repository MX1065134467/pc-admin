<template>
  <div class="container">
    <div class="header-title">
      <span class="border"></span>
      联系方式
    </div>
    <div class="form">
      <el-form ref="formData" :model="formData" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="辅导员姓名：">
              <el-input
                v-model="formData.teacherName"
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
                v-model="formData.teacherPhone"
                size="small"
                style="width:70%"
                disabled
              >
              <div class="border" slot="suffix"></div>
              <el-button class="copy" slot="suffix" type="text" v-clipboard:copy="formData.teacherPhone" v-clipboard:success="copy" v-clipboard:error="onError">复制</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="舍友姓名：">
              <el-input
                v-model="formData.roommateName"
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
                v-model="formData.roommatePhone"
                size="small"
                style="width:70%"
                disabled
              >
              <div class="border" slot="suffix"></div>
              <el-button class="copy" slot="suffix" type="text" v-clipboard:copy="formData.roommatePhone" v-clipboard:success="copy" v-clipboard:error="onError">复制</el-button>
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
    return {
    }
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

<style lang='scss' scoped>
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
}
</style>
