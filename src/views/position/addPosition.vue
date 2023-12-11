<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      class="form"
      :rules="rules"
    >
      <el-form-item label="招聘类型:" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择"
          @change="handleType"
          class="select"
        >
          <el-option
            v-for="item in optionsType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位名称:" prop="name">
        <el-input v-model="form.name" placeholder="请输入职位名称"></el-input>
      </el-form-item>
      <el-form-item
        label="薪资范围:"
        v-if="form.type === 3"
        class="salary-wrap"
        prop="salary"
      >
        <el-col :span="11">
          <el-select
            v-model="form.salaryRangeLow"
            placeholder="最低薪资"
            class="select"
          >
            <el-option
              v-for="item in optionsSalaryLow"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="text-align: center">
          <span
            ><img
              src="../../assets/images/arrow.png"
              style="vertical-align: middle"
              alt=""
          /></span>
        </el-col>
        <el-col :span="11">
          <el-select
            v-model="form.salaryRangeHigh"
            placeholder="最高薪资"
            class="select"
          >
            <el-option
              v-for="item in optionsSalaryHigh"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <span class="text">元 / 天</span>
      </el-form-item>
      <el-form-item label="薪资范围:" v-else prop="salary1">
        <el-row :gutter="20">
          <el-col :span="7" style="margin-left:-10px">
            <el-select
              v-model="form.salaryRangeLow"
              placeholder="最低薪资"
              class="select"
              style="width: 120%"
            >
              <el-option
                v-for="item in optionsSalaryLow"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="text-align: center; margin-left: 20px">
            <span
              ><img
                src="../../assets/images/arrow.png"
                style="vertical-align: middle"
                alt=""
            /></span>
          </el-col>
          <el-col :span="7">
            <el-select
              v-model="form.salaryRangeHigh"
              placeholder="最高薪资"
              class="select"
              style="width: 120%;margin-left:-10px"
            >
              <el-option
                v-for="item in optionsSalaryHigh"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="salary">
            <el-select
              v-model="form.salaries"
              placeholder="请选择"
              style="width: 110%;margin-left:20px"
            >
              <el-option
                v-for="item in optionsBonus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="实习要求:" v-if="form.type === 3" prop="leastReqire">
        <el-row :gutter="35">
          <el-col :span="11">
            <el-select
              v-model="form.leastReqire"
              placeholder="最少实习月数"
              style="width: 115%; margin-left: -18px"
            >
              <el-option
                v-for="item in optionsReqire"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="11">
            <el-select
              v-model="form.leastTimes"
              placeholder="最少周到岗天数"
              style="width: 113%"
            >
              <el-option
                v-for="item in optionsLeastTimes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="工作城市:" prop="intention">
        <el-select
          v-model="form.intention"
          placeholder="请选择"
          @change="handleCity"
          class="select"
        >
          <el-option
            v-for="item in optionsIntention"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验:" prop="workExperience">
        <el-select
          v-model="form.workExperience"
          placeholder="请选择"
          class="select"
          :disabled="edit"
        >
          <el-option
            v-for="item in optionsWorkExperience"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历:" prop="education">
        <el-select v-model="form.education" placeholder="请选择" class="select">
          <el-option
            v-for="item in optionsEducation"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="毕业时间:"
        prop="graduateTime"
        v-if="form.type === 2 || form.type === 3"
      >
        <el-select
          v-model="form.graduateTime"
          placeholder="请选择"
          class="select"
        >
          <el-option
            v-for="item in optionsGraduateTime"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门:" prop="positionName">
        <el-input
          v-model="form.positionName"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作地址:" prop="workAddress">
        <el-input v-model="form.workAddress" :disabled="true"></el-input>
        <baidu-map
          class="bm-view"
          :center="location"
          :zoom="18"
          :scroll-wheel-zoom="true"
        >
          <bm-marker
            :position="location"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          />
        </baidu-map>
      </el-form-item>
      <el-form-item label="职位描述:" prop="positionDesc">
        <el-input
          type="textarea"
          v-model="form.positionDesc"
          placeholder="请输入"
          :rows="6"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset">重 置</el-button>
        <el-button type="primary" @click="onSubmit('form')">发 布</el-button>
        <el-button @click="handleCancle">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import serve from '../../api/position.js'
export default {
  data () {
    var validateSalary = (rule, value, callback) => {
      if (this.form.salaryRangeLow === '' || this.form.salaryRangeHigh === '') {
        return callback(new Error('请选择薪资范围'))
      } else if (this.form.salaryRangeLow > this.form.salaryRangeHigh) {
        return callback(new Error('请选择合理的薪资范围'))
      } else {
        callback()
      }
    }
    var validateSalary1 = (rule, value, callback) => {
      if (
        this.form.salaryRangeLow === '' ||
        this.form.salaryRangeHigh === '' ||
        this.form.salaries === ''
      ) {
        return callback(new Error('请选择薪资范围'))
      } else if (this.form.salaryRangeLow > this.form.salaryRangeHigh) {
        return callback(new Error('请选择合理的薪资范围'))
      } else {
        callback()
      }
    }
    var validateSalary2 = (rule, value, callback) => {
      if (this.form.leastReqire === '' || this.form.leastTimes === '') {
        return callback(new Error('请选择实习要求'))
      } else {
        callback()
      }
    }
    return {
      form: {
        type: 1,
        name: '',
        salaryRangeLow: '',
        salaryRangeHigh: '',
        leastReqire: '',
        leastTimes: '',
        intention: '',
        workExperience: '',
        education: '',
        graduateTime: '',
        workAddress: '',
        positionName: '',
        positionDesc: '',
        workLatitude: '',
        workLongitude: '',
        salaries: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择招聘类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
          {
            max: 20,
            message: '长度在 20 个字符以内',
            trigger: 'blur'
          }
        ],
        salary: {
          required: true,
          validator: validateSalary,
          trigger: 'change'
        },
        salary1: {
          required: true,
          validator: validateSalary1,
          trigger: 'change'
        },
        intention: {
          required: true,
          message: '请选择工作城市',
          trigger: 'change'
        },
        leastReqire: {
          required: true,
          validator: validateSalary2,
          message: '请选择实习要求',
          trigger: 'change'
        },
        workExperience: {
          required: true,
          message: '请选择工作经验',
          trigger: 'change'
        },
        education: { required: true, message: '请选择学历', trigger: 'change' },
        positionName: [
          { required: true, message: '请输入所属部门名称', trigger: 'blur' },
          {
            max: 30,
            message: '长度在 30 个字符以内',
            trigger: 'blur'
          }
        ],
        workAddress: [
          { required: true, message: '请输入工作地址', trigger: 'blur' },
          {
            max: 100,
            message: '长度在 100 个字符以内',
            trigger: 'blur'
          }
        ],
        positionDesc: [
          { required: true, message: '请描述职位', trigger: 'blur' },
          {
            max: 3000,
            message: '长度在 3000 个字符以内',
            trigger: 'blur'
          }
        ],
        graduateTime: {
          required: true,
          message: '请选择毕业时间',
          trigger: 'change'
        }
      },
      edit: false,
      optionsType: [],
      optionsWorkExperience: [],
      optionsIntention: [],
      optionsEducation: [],
      optionsSalaryLow: [],
      optionsSalaryHigh: [],
      optionsReqire: [],
      optionsLeastTimes: [
        {
          value: 1,
          label: '1天'
        },
        {
          value: 2,
          label: '2天'
        },
        {
          value: 3,
          label: '3天'
        },
        {
          value: 4,
          label: '4天'
        },
        {
          value: 5,
          label: '5天'
        },
        {
          value: 6,
          label: '6天'
        }
      ],
      optionsGraduateTime: [],
      optionsBonus: [
        {
          value: 12,
          label: '12薪'
        },
        {
          value: 13,
          label: '13薪'
        },
        {
          value: 14,
          label: '14薪'
        },
        {
          value: 15,
          label: '15薪'
        },
        {
          value: 16,
          label: '16薪'
        },
        {
          value: 17,
          label: '17薪'
        },
        {
          value: 18,
          label: '18薪'
        },
        {
          value: 19,
          label: '19薪'
        },
        {
          value: 20,
          label: '20薪'
        }
      ],
      location: {
        lng: 116.181732,
        lat: 40.06492
      }
    }
  },
  mounted () {
    this.getTypeDrop()
    this.getEducationDrop()
    this.getExprienceDrop()
    this.getIntentionDrop()
    this.salaryList()
    this.requireList()
    this.finishDate()
    if (this.$route.query.id) {
      this.getDetail(+this.$route.query.id)
    }
  },
  methods: {
    // 查看详情
    getDetail (id) {
      serve.getPositionDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data
          this.location.lng = this.form.workLongitude
          this.location.lat = this.form.workLatitude
          if (this.form.type === 1) {
            this.edit = false
            this.salaryList()
          } else if (this.form.type === 2) {
            this.salaryList()
            this.edit = true
          } else {
            this.salaryListOne()
            this.edit = true
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 招聘类型
    getTypeDrop () {
      serve.getType().then((res) => {
        if (res.data.code === 200) {
          this.optionsType = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 工作经验
    getExprienceDrop () {
      serve.getExperience().then((res) => {
        if (res.data.code === 200) {
          this.optionsWorkExperience = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 工作城市
    getIntentionDrop () {
      serve.getWorkCity().then((res) => {
        if (res.data.code === 200) {
          this.optionsIntention = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 学历
    getEducationDrop () {
      serve.getEducation().then((res) => {
        if (res.data.code === 200) {
          this.optionsEducation = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 招聘类型联动工作经验
    handleType () {
      if (this.form.type === 1) {
        this.form.graduateTime = ''
        this.form.leastReqire = ''
        this.form.leastTimes = ''
        this.form.salaryRangeLow = ''
        this.form.salaryRangeHigh = ''
        this.form.workExperience = ''
        this.form.graduateTime = ''
        this.edit = false
        this.salaryList()
      } else if (this.form.type === 2) {
        const name = '应届'
        this.optionsWorkExperience.map((item, index) => {
          if (name === item.name) {
            this.form.workExperience = this.optionsWorkExperience[index].id
          }
        })
        this.form.graduateTime = this.optionsGraduateTime[0].value
        this.edit = true
        this.salaryList()
      } else if (this.form.type === 3) {
        this.form.salaries = ''
        this.form.salaryRangeLow = ''
        this.form.salaryRangeHigh = ''
        const name = '实习生'
        this.optionsWorkExperience.map((item, index) => {
          if (name === item.name) {
            this.form.workExperience = this.optionsWorkExperience[index].id
          }
        })
        this.form.graduateTime = this.optionsGraduateTime[0].value
        this.edit = true
        this.salaryListOne()
      }
    },
    // 工作城市联动工作地址
    handleCity () {
      this.optionsIntention.map((item, index) => {
        if (this.form.intention === item.id) {
          this.location = {
            lng: this.optionsIntention[index].longitude,
            lat: this.optionsIntention[index].latitude
          }
          this.form.workLongitude = this.location.lng
          this.form.workLatitude = this.location.lat
          this.form.workAddress = this.optionsIntention[index].remarks
        }
      })
    },
    // 社招、校招下拉框
    salaryList () {
      this.optionsSalaryLow = []
      this.optionsSalaryHigh = []
      for (let index = 0; index < 50; index++) {
        this.optionsSalaryLow.push({
          value: index + 1,
          label: index + 1 + 'k'
        })
        this.optionsSalaryHigh.push({
          value: index + 1,
          label: index + 1 + 'K'
        })
      }
    },
    // 实习生下拉框
    salaryListOne () {
      this.optionsSalaryLow = []
      this.optionsSalaryHigh = []
      for (let index = 0; index < 6; index++) {
        this.optionsSalaryLow.push({
          value: 50 * (index + 1),
          label: 50 * (index + 1)
        })
        this.optionsSalaryHigh.push({
          value: 50 * (index + 1),
          label: 50 * (index + 1)
        })
      }
    },
    // 最少实习月数
    requireList () {
      for (let index = 0; index < 12; index++) {
        this.optionsReqire.push({
          value: index + 1,
          label: index + 1 + '个月'
        })
      }
    },
    finishDate () {
      const date = new Date()
      const currentDate = date.getFullYear()
      this.optionsGraduateTime = [
        {
          value: currentDate,
          label: currentDate
        },
        {
          value: currentDate + 1,
          label: currentDate + 1
        },
        {
          value: currentDate + 2,
          label: currentDate + 2
        }
      ]
    },
    // 重置
    handleReset () {
      for (const key in this.form) {
        if (key === 'type') {
          this.form[key] = 1
        } else {
          this.form[key] = ''
        }
      }
      this.location = {
        lng: 116.181732,
        lat: 40.06492
      }
    },
    // 取消
    handleCancle () {
      this.$router.push('/position')
    },
    // 发布
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.optionsIntention.map((item, index) => {
            if (this.form.intention === item.id) {
              this.form.workCity = this.optionsIntention[index].name
            }
          })
          this.form.publishTime = new Date().getTime()
          if (this.$route.query.id) {
            serve
              .updatePosition(+this.$route.query.id, this.form)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message.success(res.data.msg)
                  this.$router.push('/position')
                } else {
                  this.$message.error(res.data.msg)
                }
              })
          } else {
            this.optionsIntention.map((item, index) => {
              if (this.form.intention === item.id) {
                this.form.workCity = this.optionsIntention[index].name
              }
            })
            this.form.createTime = new Date().getTime()
            serve.addPosition(this.form).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg)
                this.$router.push('/position')
              } else {
                this.$message.error(res.data.msg)
              }
            })
          }
        } else {
          console.log('error Submit')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .BMap_Marker {
  div {
    width: 40px !important;
    height: 25px !important;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.form {
  width: 740px;
  margin: 0 auto 35px auto;
  .bm-view {
    margin-top: 5px;
    width: 100%;
    height: 140px;
  }
  .salary-wrap {
    position: relative;
    .text {
      position: absolute;
      right: -50px;
      top: 0;
    }
  }
  // .salary {
  //   margin-left: 55px;
  // }
  .select {
    width: 100%;
  }
}
</style>
