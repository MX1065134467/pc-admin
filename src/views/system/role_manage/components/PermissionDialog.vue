<!--
 * @Author: your name
 * @Date: 2021-05-18 11:08:55
 * @LastEditTime: 2021-05-24 14:55:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\views\system\role_manage\components\PermissionDialog.vue
-->
<template>
  <el-dialog
    title="角色权限"
    :visible.sync="visible"
    width="550px"
    @close="handleDialogClose"
  >
    <el-tree
      v-if="visible"
      ref="tree"
      node-key="id"
      show-checkbox
      highlight-current
      :data="permissionTree"
      :props="defaultProps"
      :default-checked-keys="data.permissionList"
    >
      <span class="custom-tree-node" slot-scope="{ node }">
        <el-tooltip class="item" effect="dark" :content="node.label" placement="top-start">
          <span > {{ node.label }} </span>
        </el-tooltip>
      </span>
    </el-tree>
    <div slot="footer">
      <el-button @click="handleDialogClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import roleManage from '@/api/system/role_manage'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false
    },
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    permissionTree: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      defaultProps: {
        children: 'children',
        label: 'authorityName'
      },
      form: {
        authorityIds: [],
        roleId: ''
      }
    }
  },
  mounted () {},
  methods: {
    // 处理Dialog关闭事件
    handleDialogClose () {
      this.$emit('update:show')
      this.data.permissionList = []
    },
    submitForm () {
      console.log(this.$refs.tree.getCheckedNodes(false, true))
      this.form.authorityIds = this.$refs.tree
        .getCheckedNodes(false, true)
        .map(item => item.id)
      const { roleId } = this.data
      this.form.roleId = roleId
      console.log(this.form)
      roleManage.setRole(this.form).then(res => {
        if (res.data.code === 200) {
          this.visible = false
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  watch: {
    show (value) {
      this.visible = value
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  max-height: 350px;
  min-height: 200px;
  overflow-y: auto;
}
</style>
