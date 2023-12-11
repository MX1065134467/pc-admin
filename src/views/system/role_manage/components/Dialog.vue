<!--
 * @Author: your name
 * @Date: 2021-05-11 17:36:59
 * @LastEditTime: 2021-05-24 09:51:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\views\system\role_manage\components\Dialog.vue
-->
<template>
  <el-dialog
    :title="title"
    :visible="visible"
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
      <el-form-item label="角色名称:" prop="roleName">
        <el-input
          class="form-item"
          v-model="form.roleName"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input
          class="form-item"
          type="textarea"
          v-model="form.remark"
          placeholder="请输入角色备注"
          resize="none"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import roleManage from '@/api/system/role_manage'

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
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      form: {
        id: '',
        roleName: '',
        remark: ''
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          { max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请输入备注', trigger: 'blur' },
          { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 处理Dialog关闭事件
    handleDialogClose () {
      this.$emit('update:show', false)
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    // 提交表单
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id) {
            roleManage.editRole(this.form).then(res => {
              if (res.data.code === 200) {
                this.$emit('success')
                this.visible = false
                this.$message.success('更新成功')
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            roleManage.addRole(this.form).then(res => {
              if (res.data.code === 200) {
                this.$emit('success')
                this.visible = false
                this.$message.success('新增成功')
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
        this.form = {
          id: value.id,
          roleName: value.roleName,
          remark: value.remark
        }
      } else {
        this.form = {
          id: '',
          roleName: '',
          remark: ''
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
