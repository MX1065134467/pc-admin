<template>
  <div class='dialog-box'>
    <el-dialog :title="message.title" :visible.sync="message.show" width="350px" :close-on-click-modal="false">
      <div class="conntent-message">
        <slot name="content"></slot>
        <!-- {{message.content}} -->
      </div>
      <div slot="footer" class="dialog-footer" v-if="!message.isFooterShow">
        <el-button class="cancelBtn" @click="handleCancel" size="small">取 消</el-button>
        <el-button class="sureBtn" type="primary" @click="handleOk" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: '',
  components: {},
  props: {
    message: {
      type: Object
    }
  },
  data () {
    return {
      isFooterShow: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 确定
    handleOk () {
      this.message.show = false
      this.$emit('handleDialog', this.message.type)
    },
    handleCancel () {
      this.message.show = false
      this.$emit('handleDialogCancel')
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__wrapper {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  margin-top: 150px;
}
::v-deep .el-dialog__title:before {
  content: url('../assets/images/del.png');
  margin-right: 16px;
  vertical-align: middle;
}
::v-deep .el-dialog__title {
  font-weight: 600;
}
::v-deep .el-dialog__header {
  text-align: left;
}
::v-deep .el-dialog__body {
  text-align: left;
  margin-left: 44px;
}
::v-deep .cancelBtn {
  width: 80px;
}
::v-deep .sureBtn {
  width: 80px;
  background-color: #d82e2e;
  border-color: #d82e2e;
}
::v-deep .sureBtn:hover {
  background-color: #d82e2e;
  border-color: #d82e2e;
}
::v-deep .el-dialog__headerbtn {
  display: none;
}
</style>
