<template>
  <div class="index">
    <div class="container">
      <div class="left">
        <img src="../../assets/images/login/left_login.png" alt="" />
      </div>
      <div class="right">
        <img src="../../assets/images/login/logo.png" alt="logo" class="logo" />
        <div class="title">中电兴发招聘信息管理平台</div>
        <el-form :model="form">
          <el-form-item>
            <img
              src="../../assets/images/login/username.png"
              alt=""
              class="img"
            />
            <el-input
              class="username"
              v-model="form.userName"
              size="medium"
              placeholder="请输入账号"
              autocomplete=""
            />
          </el-form-item>
          <el-form-item>
            <img src="../../assets/images/login/lock.png" alt="" class="img" />
            <el-input
              class="password"
              v-model="form.password"
              :type="type"
              size="medium"
              placeholder="请输入密码"
              autocomplete=""
              @keyup.enter.native="login"
            />
            <div class="hidden" v-if="hidden" @click="hiddenClick">
              <img src="../../assets/images/login/password.png" alt="" />
            </div>
            <div class="hidden eyes" v-else @click="hiddenClick">
              <img src="../../assets/images/login/eyes.png" alt="" />
            </div>
          </el-form-item>
          <el-form-item>
            <!-- :loading="btnLoading" -->
            <el-button class="btn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="remeber">
          <el-checkbox class="myCheckBox" v-model="checked"
            >记住密码</el-checkbox
          >
        </div>
        <!-- <div class="hint">如忘记密码请联系管理员！</div> -->
      </div>
    </div>
    <!-- <div class="copyright">@copyright © 2019 北京中电兴发科技有限公司</div> -->
  </div>
</template>

<script>
import Service from '@/api/login'
import md5 from 'js-md5'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        userName: '',
        password: '',
        rememberMe: true
      },
      checked: false,
      hidden: true,
      type: 'password'
    }
  },
  watch: {},
  created () {
    this.form.userName = localStorage.getItem('userName')
    this.form.password = localStorage.getItem('password')
    const checked = localStorage.getItem('checked')
    this.checked = JSON.parse(checked)
  },
  mounted () {},
  methods: {
    login () {
      const pwd = md5(this.form.password)
      if (this.form.userName && this.form.password) {
        if (this.checked === true) {
          localStorage.setItem('userName', this.form.userName)
          localStorage.setItem('password', this.form.password)
          localStorage.setItem('checked', this.checked)
        } else {
          localStorage.removeItem('userName')
          localStorage.removeItem('password')
          localStorage.removeItem('checked')
        }
        Service.login({
          userName: this.form.userName,
          password: pwd,
          rememberMe: true
        }).then((res) => {
          if (res.data.code === 200) {
            const token = res.data.data.token
            const menu = res.data.data.authorityList
            const userType = res.data.data.type
            const username = res.data.data.userName
            const typeStr = res.data.data.typeStr
            const headUrl = res.data.data.headUrl
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('menuList', JSON.stringify(menu))
            sessionStorage.setItem('userType', userType)
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('typeStr', typeStr)
            sessionStorage.setItem('headUrl', headUrl)
            this.$router.push('/')
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
      }
    },
    hiddenClick () {
      if (this.hidden === true) {
        this.hidden = false
        this.type = 'input'
      } else {
        this.hidden = true
        this.type = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 380px;
  height: 50px !important;
  line-height: 50px;
  background: #f8f8f8;
  border-radius: 4px;
  border: none;
  padding-left: 40px;
}
.index {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/login/bg_login_b.png");
  background-size: 100% 100%;
  position: fixed;
  .container {
    text-align: center;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0px 2px 76px 0px rgba(71, 145, 255, 0.24);
    .right {
      background: url("../../assets/images/login/rigth_login.png");
      background-size: 100% 100%;
      width: 600px;
      height: 640px;
      .logo {
        display: inline-block;
        width: 112px;
        height: 37px;
        margin-top: 103px;
      }
      .title {
        width: 480px;
        font-size: 40px;
        font-family: SourceHanSansCN, SourceHanSansCN-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 60px;
        width: 480px;
        margin: auto;
        height: 61px;
      }
      .el-form {
        margin-top: 40px;
      }
      .btn {
        width: 380px;
        height: 50px;
        background: #ffffff;
        border-radius: 4px;
        color: #4791ff;
        font-size: 18px;
        font-weight: 500;
      }
      .el-form-item {
        position: relative;
        .img {
          position: absolute;
          top: 15px;
          left: 110px;
          z-index: 1000;
          margin: 0 10px;
        }
        .hidden {
          position: absolute;
          top: 10px;
          right: 120px;
          z-index: 1000;
          margin: auto 0;
        }
      }
      .remeber {
        margin-left: -298px;
      }
      .myCheckBox {
        font-size: 14px;
        color: #ffffff;
        ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #ffffff;
        }
        ::v-deep .el-checkbox__inner {
          border: 1px solid #ffffff;
          background-color: #4791FF;
        }
      }
    }
  }
}
</style>
