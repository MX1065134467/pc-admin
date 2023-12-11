<template>
  <div>
    <el-dialog
      :title="title"
      left
      :visible="visible"
      width="600px"
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
        <el-form-item label="展示值:" prop="name">
          <el-input v-model="form.name" placeholder="请输入展示值" />
        </el-form-item>
        <el-form-item label="字典值:" prop="code">
          <el-input-number v-model="form.code"></el-input-number>
        </el-form-item>
        <el-form-item label="启用状态:" prop="flag">
          <el-radio-group v-model="form.flag">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序标记:" prop="sort">
          <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>
        <el-form-item label="是否显示经纬度:" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="经纬度:" required v-if="this.form.type === 1">
          <div style="display:flex">
            <el-form-item prop="longitude" label-width="0">
              <el-input
                class="input-map"
                v-model="form.longitude"
                placeholder="请选择经度"
                disabled
              />
            </el-form-item>
            <el-form-item prop="latitude" label-width="0">
              <el-input
                class="input-map"
                v-model="form.latitude"
                placeholder="请选择纬度"
                disabled
              />
            </el-form-item>
            <el-button type="primary" @click="clickMap" size="mini" style="margin-left:10px">地图获取</el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="具体地址:"
          prop="remarks"
          v-if="this.form.type === 1"
        >
          <el-input v-model="form.remarks" placeholder="请输入具体地址" />
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button @click="closeDiaLog">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 认</el-button>
      </div>
    </el-dialog>
    <div v-if="showMap">
      <BaiduMap @cancel="showMap = false" :visible="showMap" @map-confirm="confirmLocation"></BaiduMap>
    </div>
  </div>
</template>

<script>
// import informationReview from '@/api/content_supervision/informationReview.js'
import BaiduMap from '@/components/BaiduMap.vue'
import dataDictionary from '@/api/system/data_dictionary'
export default {
  components: {
    BaiduMap
  },
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
      showMap: false,
      visible: false,
      form: {
        id: '',
        name: '',
        code: '',
        flag: '',
        sort: '',
        remarks: '',
        // 经度
        latitude: '',
        // 纬度
        longitude: '',
        // 是否显示经纬度
        type: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入展示值',
            trigger: 'blur'
          },
          { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
        ],
        code: {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        },
        flag: {
          required: true,
          message: '请选择状态',
          trigger: 'change'
        },
        sort: {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        },
        type: {
          required: true,
          message: '请选择是否显示经纬度',
          trigger: 'change'
        },
        remarks: [
          {
            required: false,
            message: '请输入具体地址',
            trigger: 'blur'
          },
          { max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
        ],
        latitude: {
          required: true,
          message: '请选择经度',
          trigger: 'blur'
        },
        longitude: {
          required: true,
          message: '请选择纬度',
          trigger: 'blur'
        }
      }
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
          name: value.name,
          code: value.code,
          flag: value.flag,
          sort: value.sort,
          remarks: value.remarks,
          // 经度
          latitude: value.latitude,
          // 纬度
          longitude: value.longitude,
          // 是否显示经纬度
          type: value.type
        }
      } else {
        this.form = {
          id: '',
          name: '',
          code: '',
          flag: '',
          sort: '',
          remarks: '',
          // 纬度
          latitude: '',
          // 经度
          longitude: '',
          // 是否显示经纬度
          type: ''
        }
      }
    }
  },
  created () {},
  methods: {
    clickMap () {
      this.showMap = true
    },
    confirmLocation (data) {
      console.log(data)
      this.form.longitude = data.lng.toFixed(6)
      this.form.latitude = data.lat.toFixed(6)
      this.showMap = false
    },
    // 处理Dialog关闭事件
    handleDialogClose () {
      this.$emit('update:show')
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    closeDiaLog () {
      this.visible = false
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '编辑字典项') {
            if (this.form.type === 0) {
              this.form.longitude = ''
              this.form.latitude = ''
              this.form.remarks = ''
            }
            dataDictionary.editCode(this.form).then((res) => {
              // console.log(res)
              if (res.data.code === 200) {
                this.$message.success('更新成功')
                this.$emit('success')
                this.visible = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            console.log(Number(this.$route.params.id))
            this.form.id = Number(this.$route.params.id)
            dataDictionary.addDictionaryEntry(this.form).then((res) => {
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
.input-map {
  width: 130px;
  margin-left: 10px;
}
</style>
