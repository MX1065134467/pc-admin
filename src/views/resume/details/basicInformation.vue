<template>
  <div class="container">
    <div>
      <el-form ref="formData" :model="formData" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="应聘岗位：">
              <el-input
                v-model="formData.positionName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="意向工作城市：">
              <el-input
                v-model="formData.intentionName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体是：">
              <el-input
                v-model="formData.city"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名：">
              <el-input
                v-model="formData.name"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别：">
              <el-input
                v-model="formData.sexName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期：">
              <el-input
                v-model="formData.birthday"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="民族：">
              <el-input
                v-model="formData.nation"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="籍贯：">
              <el-input
                v-model="formData.nativePlace"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌：">
              <el-input
                v-model="formData.politicalOutlookName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="健康状况：">
              <el-input
                v-model="formData.health"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身高：">
              <el-input
                v-model="formData.height"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体重：">
              <el-input
                v-model="formData.weight"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="毕业院校：">
              <el-input
                v-model="formData.school"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业：">
              <el-input
                v-model="formData.major"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历：">
              <el-input
                v-model="formData.educationName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="外语级别：">
              <el-input
                v-model="formData.language"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分数：">
              <el-input
                v-model="formData.score"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计算机等级：">
              <el-input
                v-model="formData.computerLevel"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="档案归属地：">
              <el-input
                v-model="formData.fileOwnership"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生源地：">
              <el-input
                v-model="formData.source"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期望薪资：">
              <el-input
                v-model="formData.salaryExpect"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="户籍地址：">
              <el-input
                v-model="formData.permanentAddress"
                size="small"
                style="width:87%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户口性质：">
              <el-input
                v-model="formData.permanentTypeName"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="身份证号码：">
              <el-input
                v-model="formData.idCard"
                size="small"
                style="width:87%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特长：">
              <el-input
                v-model="formData.specialty"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="联系电话：">
              <el-input
                class="input"
                v-model="formData.phone"
                size="small"
                style="width:87%"
                disabled
              >
                <div class="border" slot="suffix"></div>
                <el-button
                  class="copy"
                  slot="suffix"
                  type="text"
                  v-clipboard:copy="formData.phone"
                  v-clipboard:success="copy"
                  v-clipboard:error="onError"
                  >复制</el-button
                >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱：">
              <el-input
                v-model="formData.email"
                size="small"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="个人照片：">
              <div class="img" @click="photoPre">
                <img :src="formData.photo" alt="" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="附件：">
              <div class="file">
                <div class="file-left">
                  <div class="file-img">
                    <img src="../../../assets/images/file.png" alt="" />
                  </div>
                  <div class="enclosureName">{{ formData.enclosureName }}</div>
                </div>
                <div class="file-right">
                  <div class="header-right">
                    <div>
                      <el-button type="text" @click="handleDown"
                        >下载</el-button
                      >
                    </div>
                    <div class="border"></div>
                    <div class="del">
                      <el-button class="delete" type="text" @click="preview"
                        >预览</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 照片预览 -->
    <div v-if="previewPictureVisible.show">
      <preview-picture
        v-bind:dialogVisible="previewPictureVisible"
        @previewPictureDialog="previewPictureDialogShow"
        :dialogFromData="previewPictureFromData"
      ></preview-picture>
    </div>
    <!-- 文件预览 -->
    <div v-if="dialogVisibles.show">
      <preview :dialogVisible="dialogVisibles"></preview>
    </div>
  </div>
</template>

<script>
import previewPicture from '../../../components/previewPicture'
import preview from '../dialog/preview'
export default {
  name: '',
  components: { previewPicture, preview },
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {
      previewPictureVisible: {
        // 图片预览
        show: false,
        title: ''
      },
      dialogVisibles: {
        // 附件预览
        title: '附件预览',
        show: false,
        url: ''
      },
      previewPictureFromData: {} // 图片预览数据
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
    },
    // 关闭图片预览
    previewPictureDialogShow () {
      this.previewPictureFromData = {
        currentImg: ''
      }
    },
    // 图片预览
    photoPre () {
      this.previewPictureVisible.title = '个人照片预览'
      this.previewPictureFromData = {
        currentImg: this.formData.photo
      }
      this.previewPictureVisible.show = true
    },
    // 下载
    handleDown () {
      var downloadA = document.createElement('a')
      downloadA.href = this.formData.enclosure
      downloadA.download = this.formData.enclosureName
      document.body.appendChild(downloadA)
      downloadA.click()
      document.body.removeChild(downloadA)
    },
    // 预览
    preview () {
      // const filePost = this.formData.enclosureName.substring(
      //   this.formData.enclosureName.lastIndexOf('.') + 1
      // )
      // console.log(filePost, 'filePost')
      console.log(this.formData.enclosure, 'this.formData.enclosure')
      this.dialogVisibles.url = this.formData.enclosurePreview
      this.dialogVisibles.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
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
  .img {
    width: 100px;
    height: 100px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .file {
    display: flex;
    justify-content: space-between;
    .file-left {
      display: flex;
      justify-content: flex-start;
      .file-img {
        width: 13px;
        height: 12px;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .enclosureName {
        font-size: 14px;
        color: #4791ff;
      }
    }
    .header-right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 10px;
      .border {
        width: 1px;
        height: 10px;
        border: 1px solid #e4e4e4;
        background-color: #e4e4e4;
        margin: 0 10px;
      }
      .del {
        .delete {
          color: #4791ff;
        }
      }
    }
  }
}
</style>
