<template>
  <div class="edit-container">
    <!-- 图片上传组件辅助-->
    <el-upload
      class="image-uploader"
      :action="serverUrl"
      accept="image/jpeg,image/gif,image/png,image/bmp"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
      :headers="headers"
      id="quill-upload"
    >
    </el-upload>
    <!--富文本编辑器组件-->
    <el-row v-loading="quillUpdateImg">
      <quill-editor
        v-model="remark"
        ref="myQuillEditor"
        :options="editorOption"
        @ready="ready($event)"
        @change="onEditorChange($event)"
      >
      </quill-editor>
    </el-row>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import { lineHeightStyle } from '@/utils/lineHeight'
import { letterSpacingStyle } from '@/utils/letterSpacing'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

var fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = [
  '12px',
  false,
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '32px',
  '48px'
]
Quill.register(fontSizeStyle, true)
export default {
  name: 'RichTextEditor',
  components: { quillEditor },
  props: {
    content: String
  },
  data () {
    return {
      quillUpdateImg: false,
      remark: this.content,
      headers: {},
      serverUrl: '/websiteManager/v1.0/news/upload',
      imagePrefix: '',
      editorOption: {
        placeholder: '请输入...',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], // 引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: 'ordered' }, { list: 'bullet' }], // 列表
              [{ script: 'sub' }, { script: 'super' }], // 上下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ direction: 'rtl' }], // 文本方向
              [{ size: fontSizeStyle.whitelist }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: [] }], // 字体
              [{ align: [] }], // 对齐方式
              [{ lineheight: ['1', '1.5', '1.75', '2', '3', '4', '5'] }], // 行高
              [
                {
                  letterspacing: [
                    '1px',
                    '3px',
                    '5px',
                    '7px',
                    '9px',
                    '11px',
                    '13px'
                  ]
                }
              ], // 字间距
              ['clean'], // 清除字体样式
              ['image'] // 上传图片、上传视频 ['link', 'image', 'video']
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发隐藏的图片上传，选择图片文件
                  document
                    .querySelector('.image-uploader .el-upload__input')
                    .click()
                } else {
                  this.quill.format('image', false)
                }
              },
              lineheight: (value) => {
                if (value) {
                  const quill = this.$refs.myQuillEditor.quill
                  quill.format('lineHeight', value)
                }
              },
              letterspacing: (value) => {
                if (value) {
                  const quill = this.$refs.myQuillEditor.quill
                  quill.format('letterSpacing', value)
                }
              }
            }
          }
        },
        theme: 'snow'
      }
    }
  },
  computed: {},
  watch: {
    content: function (newVal, oldVal) {
      this.remark = newVal
    }
  },
  created () {},
  mounted () {
    this.headers.token = sessionStorage.getItem('token')
      ? sessionStorage.getItem('token')
      : ''
  },
  methods: {
    // 内容改变事件
    onEditorChange () {
      this.$emit('onEditorChange', this.remark)
    },
    // 上传图片前
    beforeUpload (res, file) {
      this.quillUpdateImg = true
    },
    // 上传图片成功
    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code === 200 && res.result !== null) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片为服务器返回的图片地址
        const imgUrl = `${res.data}`
        quill.insertEmbed(length, 'image', imgUrl)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传图片失败
    uploadError (res, file) {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    // 行高
    ready () {
      Quill.register({ 'formats/lineHeight': lineHeightStyle }, true)
      Quill.register({ 'formats/letterSpacing': letterSpacingStyle }, true)
    }
  }
}
</script>

<style>
.ql-toolbar.ql-snow .ql-picker-label {
  position: relative;
  bottom: 5px;
}
.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
  position: relative;
  top: 3px;
  left: 5px;
}
p {
  margin: 10px;
}
.ql-toolbar.ql-snow {
  text-align: left;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="22px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="22px"]::before {
  content: "22px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="26px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="26px"]::before {
  content: "26px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="48px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="48px"]::before {
  content: "48px";
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label::before {
  content: "行高";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="1"]::before {
  content: "1";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="1.5"]::before {
  content: "1.5";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="1.75"]::before {
  content: "1.75";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="2"]::before {
  content: "2";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="3"]::before {
  content: "3";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="4"]::before {
  content: "4";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="5"]::before {
  content: "5";
}
.ql-snow .ql-picker.ql-lineheight {
  width: 70px;
  margin-bottom: 5px;
}
.ql-snow .ql-picker.ql-size {
  margin-bottom: 5px;
  width: 70px;
}
.ql-snow .ql-picker.ql-header {
  margin-bottom: 5px;
  width: 75px;
}
.ql-snow .ql-picker.ql-font {
  margin-bottom: 5px;
  width: 90px;
}
.ql-snow .ql-picker.ql-letterspacing {
  margin-bottom: 5px;
  width: 90px;
}
.ql-snow .ql-picker.ql-letterspacing .ql-picker-label::before {
  content: "字间距";
}
.ql-snow .ql-picker.ql-letterspacing .ql-picker-item[data-value="1px"]::before {
  content: "1px";
}
.ql-snow .ql-picker.ql-letterspacing .ql-picker-item[data-value="3px"]::before {
  content: "3px";
}
.ql-snow .ql-picker.ql-letterspacing .ql-picker-item[data-value="5px"]::before {
  content: "5px";
}
.ql-snow .ql-picker.ql-letterspacing .ql-picker-item[data-value="7px"]::before {
  content: "7px";
}
.ql-snow .ql-picker.ql-letterspacing .ql-picker-item[data-value="9px"]::before {
  content: "9px";
}
.ql-snow
  .ql-picker.ql-letterspacing
  .ql-picker-item[data-value="11px"]::before {
  content: "11px";
}
.ql-snow
  .ql-picker.ql-letterspacing
  .ql-picker-item[data-value="13px"]::before {
  content: "13px";
}
</style>
