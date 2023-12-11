<template>
  <el-dialog
    :title="title"
    left
    :visible="visible"
    width="550px"
    class="search-dialog"
    @close="handleDialogClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="150px"
      class="form"
    >
      <el-form-item label="字典名（中）:" prop="categoryName">
        <el-input v-model="form.categoryName" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="字典名（英）:" prop="category">
        <el-input v-model="form.category" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="字典状态:" prop="flag">
        <el-radio-group v-model="form.flag">
          <el-radio :label="1">有效</el-radio>
          <el-radio :label="0">无效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述:" prop="remarks">
        <el-input
          type="textarea"
          v-model="form.remarks"
          placeholder="请输入描述"
          :rows="3"
          resize="none"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button @click="closeDiaLog">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import dataDictionary from '@/api/system/data_dictionary'
import {
  checkLetter
} from '../../../../utils'
export default {
  props: {
    title: {
      type: String,
      required: false,
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
    return {
      visible: false,
      form: {
        id: '',
        categoryName: '',
        category: '',
        flag: '',
        remarks: ''
      },
      rules: {
        categoryName: [
          {
            required: true,
            message: '请输入字典名（中）',
            trigger: 'blur'
          },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        category: [
          {
            required: true,
            validator: checkLetter,
            trigger: 'blur'
          },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        flag: {
          required: true,
          message: '请选择字典状态',
          trigger: 'change'
        },
        remarks: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          },
          { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        ]
      },
      // 当前拉黑用户id
      curUserId: ''
    }
  },
  watch: {
    show (value) {
      this.visible = value
    },
    data (value) {
      console.log(value)
      if (value !== null) {
        this.form = {
          id: value.id,
          categoryName: value.categoryName,
          category: value.category,
          flag: value.flag,
          remarks: value.remarks
        }
      } else {
        this.form = {
          id: '',
          categoryName: '',
          category: '',
          flag: '',
          remarks: ''
        }
      }
    }
  },
  created () {},
  methods: {
    // 处理Dialog关闭事件
    handleDialogClose () {
      this.$emit('update:show')
      this.$refs.form.resetFields()
    },
    closeDiaLog () {
      this.visible = false
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id) {
            dataDictionary.editCode(this.form).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.$message.success('更新成功')
                this.$emit('success')
                this.visible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            dataDictionary.addCode(this.form).then(res => {
              console.log(res)
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
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin: 0 30px;
}

.form-item {
  width: 300px;
}
.el-textarea {
  width: 280px;
}
</style>
