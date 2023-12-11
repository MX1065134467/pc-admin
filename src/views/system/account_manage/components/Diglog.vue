<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      @close="handleDialogClose"
      width="1000px"
    >
      <el-form
        :disabled="title === '查看用户'"
        ref="form"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item prop="id">
          <el-input v-model="form.id" v-show="false" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="username">
              <el-input
                class="form-item"
                v-model="form.username"
                placeholder="请输入姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号:" prop="account">
              <el-input
                class="form-item"
                v-model="form.account"
                placeholder="请输入账号"
                :disabled="title === '编辑账号'"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱:" prop="email">
              <el-input
                class="form-item"
                v-model="form.email"
                placeholder="请输入邮箱"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址:" prop="address">
              <el-input
                class="form-item"
                v-model="form.address"
                placeholder="请输入地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色:" prop="roleIds">
              <el-select
                v-model="form.roleIds"
                placeholder="请选择角色"
                class="form-item"
              >
                <el-option
                  v-for="item of roleList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码:" prop="mobile">
              <el-input
                class="form-item"
                v-model="form.mobile"
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
                v-model="form.remark"
                placeholder="请输入备注"
                :rows="3"
                resize="none"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button :disabled="title === '查看用户'" @click="visible = false"
          >取 消</el-button
        >
        <el-button
          :disabled="title === '查看用户'"
          type="primary"
          @click="submitForm"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  checkPhone,
  checkEmail,
  checkLetter
} from '../../../../utils'
import accountManage from '@/api/system/account_manage'
import ImgCropper from '../../../../components/ImgCropper/ImgCropper'

export default {
  components: { ImgCropper },
  props: {
    title: {
      type: String,
      required: true,
      default: () => ''
    },
    show: {
      type: Boolean,
      required: true,
      default: () => false
    },
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    const validateName = (rule, value, callback) => {
      const age = /^[\u4e00-\u9fa5]+$/
      if (!age.test(value)) {
        callback(new Error('只能为中文汉字'))
      } else {
        callback()
      }
    }
    return {
      photoList: [],
      IMAGEURL: '',
      visible: false,
      roleList: [],
      organizationTree: [],
      agencyUserList: [],
      fileList: '',
      form: {
        id: '',
        username: '', // 姓名
        account: '', // 账号
        mobile: '', // 手机
        roleIds: '', // 角色id
        address: '', // 地址
        email: '', // 邮箱
        headUrl: '', // 头像
        remark: '' // 备注
      },
      rules: {
        address: [
          { required: false, message: '请输入地址', trigger: 'blur' },
          { max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, validator: validateName, trigger: 'blur' },
          { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, validator: checkLetter, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6~20位之间', trigger: 'blur' }
        ],
        mobile: { required: false, validator: checkPhone, trigger: 'blur' },
        roleIds: { required: true, message: '请选择角色', trigger: 'change' },
        headUrl: { required: false, message: '请选择头像', trigger: 'change' },
        email: { required: false, validator: checkEmail, trigger: 'blur' },
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' },
          { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    getImages (file) {
      this.fileList = file
      console.log(file, 'this.fileList')
    },
    deleteFile (file) {
      this.fileList = ''
    },
    // 上传图片
    async uploadImg () {
      const fileList = []
      fileList.push(this.fileList.file)
      if (fileList.length) {
        const params = new FormData()
        fileList.map(item => {
          params.append('image', item)
        })
        console.log(params)
        const res = await accountManage.upload(params)
        if (res.data.code === 200) {
          this.form.headUrl = JSON.parse(JSON.stringify(res.data.data.url))
        } else {
          this.$message.warning(res.data.msg)
        }
      }
    },
    // 处理Dialog关闭事件
    handleDialogClose () {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.photoList = []
      })
      this.$emit('update:show', false)
      location.reload()
    },
    // 查询角色
    getRoleList () {
      accountManage.getRole().then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.roleList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 提交表单
    async submitForm () {
      if (this.fileList) {
        await this.uploadImg()
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id) {
            if (this.fileList === '') {
              this.form.headUrl = ''
            }
            accountManage.editUser(this.form).then(res => {
              if (res.data.code === 200) {
                this.$message.success('更新成功')
                this.$emit('success')
                this.visible = false
                const useranme = sessionStorage.getItem('username')
                if (this.form.account === useranme) {
                  sessionStorage.setItem('headUrl', res.data.data)
                }
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            accountManage.addUser(this.form).then(res => {
              if (res.data.code === 200) {
                this.$message.success('新增成功')
                this.$emit('success')
                this.visible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
        }
      })
    }
  },
  watch: {
    show (value) {
      this.visible = value
    },
    data (value) {
      if (value) {
        if (value.headViewUrl) {
          this.photoList.push({ filePath: value.headViewUrl })
        }
        this.form = {
          id: value.id,
          username: value.username, // 用户名
          account: value.account, // 账号
          mobile: value.mobile, // 手机
          roleIds: Number(value.roleIds), // 角色id
          address: value.address, // 地址
          email: value.email, // 邮箱
          headUrl: value.headUrl, // 头像
          remark: value.remark // 备注
        }
      } else {
        this.form = {
          id: '',
          username: '', // 用户名
          account: '', // 账号
          mobile: '', // 手机
          roleIds: '', // 角色id
          address: '', // 地址
          email: '', // 邮箱
          headUrl: '', // 头像
          remark: '' // 备注
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin: 0 30px;
}
.form-item {
  width: 300px;
}
</style>
