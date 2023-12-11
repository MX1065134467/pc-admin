<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @close="handleDialogClose"
      width="550px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item prop="id">
          <el-input v-model="form.id" v-show="false" />
        </el-form-item>
        <el-form-item label="权限名称:" prop="authorityName">
          <el-input
            class="form-item"
            v-model="form.authorityName"
            placeholder="请输入权限名称"
          />
        </el-form-item>
        <el-form-item label="路径:" prop="url">
          <el-input
            class="form-item"
            v-model="form.url"
            placeholder="请输入路径"
          />
        </el-form-item>
        <el-form-item label="排序:" prop="sortNo">
          <el-input
            class="form-item"
            v-model="form.sortNo"
            placeholder="请输入排序"
          />
        </el-form-item>
        <el-form-item label="权限标识:" prop="levelCode">
          <el-input
            class="form-item"
            v-model="form.levelCode"
            placeholder="请输入唯一标识"
            :disabled="this.title === '编辑权限'"
          />
        </el-form-item>
        <el-form-item label="父节点:">
          <el-input class="form-item" v-model="this.parentName" disabled />
        </el-form-item>
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
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import authorityManage from '@/api/system/authority_manage'

export default {
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
    const validateNum = (rule, value, callback) => {
      const age = /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('只能为数字'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      params: {
        userId: 0,
        agencyId: ''
      },
      parentName: '根目录',
      form: {
        id: '',
        authorityName: '',
        levelCode: '',
        remark: '',
        sortNo: '',
        url: ''
      },
      rules: {
        authorityName: [
          {
            required: true,
            message: '请输入权限名称',
            trigger: 'blur'
          },
          { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, validator: validateNum, trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' },
          { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入路径', trigger: 'blur' },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        levelCode: [
          {
            required: true,
            message: '请输入权限标识',
            trigger: 'blur'
          },
          { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    handleChange (val) {
      console.log(val)
      this.params.agencyId = val
      console.log(this.params.agencyId)
      this.form.agencyUserId = ''
      this.getUserList()
      if (val && this.form.agencyId !== '') {
        this.flag = true
      }
    },
    // 处理Dialog关闭事件
    handleDialogClose () {
      // this.flag = false
      this.$refs.form.resetFields()
      this.$emit('update:show', false)
    },
    // 提交表单
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.roleIds = [this.form.roleId]
          this.form.sortNo = Number(this.form.sortNo)
          delete this.form.agencyId
          if (this.title === '编辑权限') {
            authorityManage.editAuthority(this.form).then(res => {
              if (res.data.code === 200) {
                this.$message.success('更新成功')
                this.$emit('success')
                this.visible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else if (this.title === '新增权限') {
            this.form.sortNo = Number(this.form.sortNo)
            authorityManage.addAuthority(this.form).then(res => {
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
      console.log(value)
      if (value !== null) {
        console.log(this.title)
        if (this.title === '新增权限') {
          this.form = {
            id: value.id,
            authorityName: '',
            levelCode: '',
            remark: '',
            sortNo: '',
            url: ''
          }
          this.parentName = value.authorityName
        } else {
          this.form = {
            id: value.id,
            authorityName: value.authorityName,
            levelCode: value.levelCode,
            remark: value.remark,
            sortNo: value.sortNo,
            url: value.url === '' ? '无' : value.url
          }
        }
      } else {
        this.form = {
          id: '',
          authorityName: '',
          levelCode: '',
          remark: '',
          sortNo: '',
          url: ''
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
