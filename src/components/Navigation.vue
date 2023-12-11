<template>
  <div class="container">
    <div class="header-title">招聘信息管理平台</div>
    <div class="header-right">
      <div class="img">
        <img :src="this.url" alt="" style="border-radius: 50%" />
      </div>
      <!-- ../assets/images/user.png -->
      <div class="header-role">
        <div class="header-admin">{{ username }}</div>
        <div class="header-roles">{{ name }}</div>
      </div>
      <div class="header-loginout">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="el-dropdown-link">
            <div class="logout">
              <img src="../assets/images/logout.png" alt="" />
            </div>
            <div class="logout-text">退出</div>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="updatePwd1">
              <span style="display: block">修改资料</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="updatePwd">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="修改密码"
      :visible.sync="visible"
      @close="handleDialogClose"
      width="550px"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="旧密码:" prop="oldPwd">
          <el-input
            class="form-item"
            v-model="form.oldPwd"
            placeholder="请输入旧密码"
            :type="type1"
          />
          <div class="hidden" v-if="hidden1" @click="hiddenClickOld">
            <img src="@/assets/images/login/password.png" alt="" />
          </div>
          <div class="hidden eyes" v-else @click="hiddenClickOld">
            <img src="@/assets/images/login/eyes.png" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPwd">
          <el-input
            class="form-item"
            v-model="form.newPwd"
            placeholder="请输入新密码"
            :type="type2"
          />
          <div class="hidden" v-if="hidden2" @click="hiddenClickNew">
            <img src="@/assets/images/login/password.png" alt="" />
          </div>
          <div class="hidden eyes" v-else @click="hiddenClickNew">
            <img src="@/assets/images/login/eyes.png" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPwd">
          <el-input
            class="form-item"
            v-model="form.confirmPwd"
            placeholder="请输入确认密码"
            :type="type3"
          />
          <div class="hidden" v-if="hidden3" @click="hiddenClickconfirm">
            <img src="@/assets/images/login/password.png" alt="" />
          </div>
          <div class="hidden eyes" v-else @click="hiddenClickconfirm">
            <img src="@/assets/images/login/eyes.png" alt="" />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="修改资料"
      :visible.sync="visible1"
      @close="handleDialogClose1"
      width="1000px"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form1"
        :model="form1"
        :rules="rules1"
        label-position="right"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="username">
              <el-input
                class="form-item"
                v-model="form1.username"
                placeholder="请输入姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱:" prop="email">
              <el-input
                class="form-item"
                v-model="form1.email"
                placeholder="请输入邮箱"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="地址:" prop="address">
              <el-input
                class="form-item"
                v-model="form1.address"
                placeholder="请输入地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码:" prop="mobile">
              <el-input
                class="form-item"
                v-model="form1.mobile"
                placeholder="请输入手机号码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="头像" prop="headUrl">
              <ImgCropper
                :numLimit="1"
                :imgBaseUrl="IMAGEURL"
                @change="getImages($event)"
                @delete="deleteFile($event)"
                :introduceImg="photoList"
              ></ImgCropper>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:" prop="remark">
              <el-input
                class="form-item"
                type="textarea"
                v-model="form1.remark"
                placeholder="请输入备注"
                :rows="3"
                resize="none"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="visible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('form1')"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Service from '@/api/login'
import md5 from 'js-md5'
import accountManage from '@/api/system/account_manage'
import ImgCropper from '../../src/components/ImgCropper/ImgCropper'
import { checkPhone, checkEmail } from '../utils'
export default {
  name: '',
  components: { ImgCropper },
  data () {
    const validateName = (rule, value, callback) => {
      const age = /^[\u4e00-\u9fa5]+$/
      if (!value || value === '') {
        callback(new Error('请输入姓名'))
      } else if (!age.test(value)) {
        callback(new Error('只能为中文汉字'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$%&_=])[A-Za-z\d#$%&_=]{8,18}$/
      if (value !== '') {
        if (value.length < 8) {
          callback(new Error('请输入至少8位的密码'))
          return false
        } else if (value.length > 18) {
          callback(new Error('密码长度不能超过18位'))
          return false
        } else if (!regPassword.test(value)) {
          callback(new Error('密码必须包含字母、数字和特殊字符(#$%&_=)'))
          return false
        } else {
          callback()
        }
      }
    }
    var validateSurePassword = (rule, value, callback) => {
      if (value !== '') {
        if (value.length < 8) {
          callback(new Error('请输入至少8位确认密码'))
          return false
        } else if (value.length > 18) {
          callback(new Error('密码长度不能超过18位'))
          return false
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入的密码不一致'))
          return false
        } else {
          callback()
        }
      }
    }
    return {
      IMAGEURL: '',
      photoList: [],
      fileList: '',
      hidden1: true,
      hidden2: true,
      hidden3: true,
      type1: 'password',
      type2: 'password',
      type3: 'password',
      username: '',
      name: '',
      headUrl: '',
      url: require('../assets/images/user.png'),
      visible: false,
      visible1: false,
      form: {
        confirmPwd: '',
        newPwd: '',
        oldPwd: ''
      },
      rules: {
        oldPwd: { required: true, message: '请输入旧密码', trigger: 'blur' },
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateSurePassword, trigger: 'blur' }
        ]
      },
      form1: {
        username: '',
        email: '',
        headUrl: '',
        mobile: '',
        remark: ''
      },
      rules1: {
        username: [
          { required: true, validator: validateName, trigger: 'blur' },
          { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '请输入地址', trigger: 'blur' },
          { max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
        ],
        email: { required: false, validator: checkEmail, trigger: 'blur' },
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' },
          { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        ],
        mobile: { required: false, validator: checkPhone, trigger: 'blur' }
      }
    }
  },
  created () {
    this.username = sessionStorage.getItem('username')
    this.name = sessionStorage.getItem('typeStr')
    this.headUrl = sessionStorage.getItem('headUrl')
    if (this.headUrl !== '') {
      this.url = this.headUrl
    }
  },
  mounted () {},
  methods: {
    hiddenClickOld () {
      if (this.hidden1 === true) {
        this.hidden1 = false
        this.type1 = 'input'
      } else {
        this.hidden1 = true
        this.type1 = 'password'
      }
    },
    hiddenClickNew () {
      if (this.hidden2 === true) {
        this.hidden2 = false
        this.type2 = 'input'
      } else {
        this.hidden2 = true
        this.type2 = 'password'
      }
    },
    hiddenClickconfirm () {
      if (this.hidden3 === true) {
        this.hidden3 = false
        this.type3 = 'input'
      } else {
        this.hidden3 = true
        this.type3 = 'password'
      }
    },
    logout () {
      this.$confirm('您确定要退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        Service.logout().then((res) => {
          if (res.data.code === 200) {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('menuList')
            sessionStorage.removeItem('userType')
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('typeStr')
            sessionStorage.removeItem('headUrl')
            sessionStorage.removeItem('currentMenu')
            this.$router.push('/login')
            location.reload()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    updatePwd () {
      console.log('修改密码')
      this.visible = true
    },
    updatePwd1 () {
      this.visible1 = true
      this.getPersonData()
    },
    handleDialogClose () {
      this.$refs.form.resetFields()
      this.visible = false
    },
    handleDialogClose1 () {
      this.visible1 = false
      this.photoList = []
      // this.$refs.form.resetFields()
    },
    submitForm () {
      const pwd = md5(this.form.oldPwd)
      const newpwd = md5(this.form.newPwd)
      const confirmpwd = md5(this.form.confirmPwd)
      this.$refs.form.validate((valid) => {
        if (valid) {
          accountManage
            .updatePwd({
              oldPwd: pwd,
              newPwd: newpwd,
              confirmPwd: confirmpwd
            })
            .then((res) => {
              if (res.data.code === 200) {
                this.visible = false
                this.$refs.form.resetFields()
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('menuList')
                sessionStorage.removeItem('userType')
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('typeStr')
                sessionStorage.removeItem('headUrl')
                sessionStorage.removeItem('currentMenu')
                this.$router.push('/login')
                setTimeout(() => {
                  this.$message.success(res.data.msg + '请重新登录')
                }, 1000)
              } else {
                this.$message.error(res.data.msg)
              }
            })
        }
      })
    },
    getPersonData () {
      Service.viewPerson().then(res => {
        if (res.data.code === 200) {
          this.form1 = res.data.data
          if (this.form1.headUrl) {
            this.photoList.push({ filePath: this.form1.headViewUrl })
          } else {
            this.fileList = ''
          }
          console.log(this.photoList, 89898)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 头像编辑
    getImages (file) {
      this.fileList = file
      console.log(file, 'this.fileList')
    },
    // 头像删除
    deleteFile (file) {
      this.fileList = ''
      this.form1.headUrl = ''
      this.form.headViewUrl = ''
    },
    // 上传图片
    async uploadImg () {
      const fileList = []
      fileList.push(this.fileList.file)
      if (fileList.length) {
        const params = new FormData()
        fileList.map((item) => {
          params.append('image', item)
        })
        const res = await accountManage.upload(params)
        if (res.data.code === 200) {
          this.form1.headUrl = JSON.parse(JSON.stringify(res.data.data.url))
        } else {
          this.$message.warning(res.data.msg)
          return false
        }
      }
    },
    editForm1 () {
      Service.updatePerson(this.form1).then(res => {
        if (res.data.code === 200) {
          this.visible1 = false
          const useranme = sessionStorage.getItem('username')
          if (this.form1.account === useranme) {
            if (res.data.data) {
              sessionStorage.setItem('headUrl', res.data.data)
            } else {
              sessionStorage.setItem('headUrl', '')
            }
          }
          if (res.data.data) {
            this.url = res.data.data
          } else {
            this.url = require('../assets/images/user.png')
          }
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msga)
        }
      })
    },
    submitForm1 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.photoList, 90909)
          if (this.form.headUrl !== '' && this.fileList !== '') {
            this.uploadImg().then((res) => {
              if (res !== false) {
                this.editForm1()
              }
            })
          } else {
            this.editForm1()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 30px 60px 30px 20px;
}
.container {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 0 31px;
  height: 64px;
  .header-title {
    font-size: 22px;
    font-weight: 600;
    color: #000000;
    height: 64px;
    line-height: 64px;
  }
  .header-right {
    display: flex;
    justify-content: flex-start;
    .img {
      width: 40px;
      height: 40px;
      background: #eeeeee;
      border-radius: 50%;
      margin: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header-role {
      margin: auto 0 auto 14px;
      .header-admin {
        font-size: 14px;
        font-weight: 600;
        color: #000000;
        line-height: 22px;
      }
      .header-roles {
        font-size: 10px;
        color: #4791ff;
        line-height: 14px;
        border: 1px solid #4791ff;
        border-radius: 3px;
      }
    }
    .header-loginout {
      cursor: pointer;
      .avatar-container {
        height: 100%;
        .el-dropdown-link {
          display: flex;
          justify-content: flex-start;
          height: 100%;
          .logout {
            width: 20px;
            height: 21px;
            margin: auto 8px auto 60px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .logout-text {
            font-size: 14px;
            color: #d82e2e;
            line-height: 22px;
            margin: auto;
          }
        }
      }
      // .logout {
      //   width: 20px;
      //   height: 21px;
      //   margin: auto 8px auto 60px;
      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
      // .logout-text {
      //   font-size: 14px;
      //   color: #d82e2e;
      //   line-height: 22px;
      //   margin: auto;
      // }
    }
  }
  .el-form-item__content {
    position: relative;
    .hidden {
      position: absolute;
      top: 5px;
      right: 6px;
      z-index: 1000;
      margin: auto 0;
    }
  }
}
</style>
