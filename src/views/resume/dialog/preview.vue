<template>
  <div class="previewPicture">
    <el-dialog
      class="previewPictureDialog"
      width="80%"
      :title="dialogVisible.title"
      :visible.sync="dialogVisible.show"
      :close-on-click-modal="false"
    >
      <div class="previewPictureContainer">
        <iframe :src="url" frameborder="0" style="width:100%;height:100%;"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    // 模态框是否显示
    dialogVisible: {
      type: Object
    }
  },
  data () {
    return {
      url: ''
    }
  },
  created () {
    this.url = this.dialogVisible.url
  },
  mounted () {},
  watch: {},
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-dialog__wrapper {
//   z-index: 99999999999 !important;
// }
::v-deep .el-dialog {
  border-radius: 4px !important;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2) !important;
  margin-top: 5vh !important;
  height: 80%;
  .el-dialog__header {
    padding: 20px 0 20px !important;
    margin: 0 !important;
    border-bottom: 1px solid #e6e6e6 !important;
    .el-dialog__title {
      margin-left: 20px !important;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }
  }
  .el-dialog__body {
    padding: 0 !important;
    height: 100%;
  }
}
.previewPictureContainer {
  padding: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
