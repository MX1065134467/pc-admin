<template>
  <div class="all">
    <div class="content_wrap">
      <div class="btns">
        <el-button type="primary" @click="handleEdit" v-if="status === 0"
          >编 辑</el-button
        >
        <el-button @click="handleDelete" v-if="status === 0">删 除</el-button>
        <el-button @click="handleGoback">返 回</el-button>
      </div>
      <div class="content">
        <h3>{{ form.title }}</h3>
        <p>{{ form.createTime }}</p>
        <div class="ql-container ql-snow">
          <div class="article ql-editor" v-html="form.article"></div>
        </div>
      </div>
      <div v-if="messageData.show">
        <reminder-modal
          @handleDialog="handleModalShow"
          v-bind:message="messageData"
        >
          <div slot="content">
            {{ messageData.content }}
          </div>
        </reminder-modal>
      </div>
    </div>
  </div>
</template>

<script>
import serve from '../../api/news'
import moment from 'moment'
import ReminderModal from '../../components/ReminderModal'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
export default {
  components: { ReminderModal },
  data () {
    return {
      form: {
        title: '',
        updateTime: '',
        article: ''
      },
      messageData: {
        show: false,
        title: '确认删除',
        content: ''
      },
      status: '' // 0 下线  1 上线
    }
  },
  mounted () {
    if (this.$route.query.eid) {
      this.eid = this.$route.query.eid
      this.status = Number(this.$route.query.status)
      this.getData()
    }
  },
  methods: {
    getData () {
      serve.selectById({ id: this.eid }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data
          this.form.createTime = moment(this.form.createTime).format(
            'YYYY-MM-DD'
          )
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleEdit () {
      this.$router.push({
        path: '/news/addNews',
        query: { eid: this.eid }
      })
    },
    // 删除、批量删除
    handleModalShow () {
      serve.delete({ id: this.eid }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.$router.go(-1)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleDelete () {
      this.messageData.show = true
      this.messageData.content = '删除后不可恢复，确认删除？'
    },
    handleGoback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.article >>> img {
  width: 100%;
  height: 100%;
  margin-left: -10px;
}
</style>
<style lang="scss" scoped>
.all {
  background-color: #fff;
  .content_wrap {
    width: 820px;
    margin: auto;
    padding: 30px 0;
    h3 {
      font-size: 18px;
      color: #000000;
    }
    p {
      color: #999999;
      font-size: 14px;
    }
    .content {
      width: 820px;
    }
    .article {
      text-align: left;
      font-size: 14px;
      color: #666666;
    }
    .btns {
      text-align: left;
    }
  }
}
::v-deep .ql-container.ql-snow {
  border: none !important;
}
::v-deep .ql-editor {
  padding: 0 !important;
}
</style>
