<template>
  <div class="table_list">
    <el-table
      ref="table"
      :border="tableData.border ? true : false"
      :data="tableData.data"
      stripe
      fit
      :height="maxHeight"
      :size="tableData.size ? tableData.size : ''"
      style="width: 100%"
      :row-key="
        (row) => {
          return row.id;
        }
      "
      :tree-props="tableData.treeProps"
      highlight-current-row
      tooltip-effect="dark"
      @selection-change="currentChange"
      @current-change="handleCurrentChange"
    >
      <el-table-column
        v-if="tableData.isCheck"
        type="selection"
        width="40"
        align="left"
      ></el-table-column>
      <el-table-column
        v-for="column in tableData.columns"
        show-overflow-tooltip
        :key="column.key"
        :label="column.label"
        :width="column.width"
        :prop="column.key"
        :sortable="column.sortable"
        :align="column.align || 'left'"
        :fixed="column.fixed"
      >
        <template slot-scope="scope">
          <!-- 序号 -->
          <span v-if="column.key === 'num'">{{ scope.$index + 1 }}</span>
          <!-- 热门图标 -->
          <span v-else-if="column.type === 'hot'"
            ><img
              src="../../src/assets/images/hot.png"
              width="18px"
              height="18px"
              style="vertical-align: middle; margin-right: 5px"
              alt=""
              v-if="scope.row.hot === -1"
            /><span v-if="scope.row.hot === -1">{{ scope.row.question }}</span>
            <span v-else style="margin-left: 20px">{{
              scope.row.question
            }}</span></span
          >
          <span v-else-if="column.type === 'top'"
            ><span
              style="
                border: 1px solid #4791ff;
                border-radius: 2px;
                padding: 2px 5px;
                color: #4791ff;
                font-size: 10px;
                margin-right: 10px;
              "
              v-if="scope.row.hot > 0"
              >置顶</span
            ><span v-if="scope.row.hot > 0">{{ scope.row.title }}</span>
            <span v-else style="margin-left: 20px">{{
              scope.row.title
            }}</span></span
          >
          <span v-else-if="column.type === 'upStatus'"
            ><span
              :class="
                scope.row.statusStr === '上线中' ||
                scope.row.statusStr === '已上线'
                  ? 'status1'
                  : 'status2'
              "
            ></span
            ><span
              v-if="
                scope.row.statusStr === '上线中' ||
                scope.row.statusStr === '已上线'
              "
              >{{ scope.row.statusStr }}</span
            >
            <span v-else style="margin-left: 20px">{{
              scope.row.statusStr
            }}</span></span
          >
          <span v-else-if="column.type === 'img'">
            <img
              alt
              :src="scope.row[column.key] ? scope.row[column.key] : localUrl"
              :width="column.Iwidth ? column.Iwidth + 'px' : '60px'"
              :max-height="column.Iheight ? column.Iheight + 'px' : '60px'"
            />
          </span>
          <span v-else-if="column.type === 'imgAndTop'" class="imgAndTop">
            <span class="top" v-if="scope.row.isTop === 1">置顶</span
            ><span>
              <img
                alt
                :src="scope.row[column.key] ? scope.row[column.key] : localUrl"
                :width="column.Iwidth ? column.Iwidth + 'px' : '60px'"
                :max-height="column.Iheight ? column.Iheight + 'px' : '60px'"
              />
            </span>
          </span>
          <!-- 按钮-->
          <span v-else-if="column.type === 'btn'">
            <el-button
              @click="tableData.btn(scope.row) || ''"
              type="text"
              size="small"
            >
              {{ scope.row[column.key] }}
            </el-button>
          </span>
          <!-- 链接 @click="scope.row[column.event](scope.row)" -->
          <span
            v-else-if="column.type === 'link'"
            @click="
              column.event &&
                column.event(scope.row, column.key, scope.row[column.key])
            "
            style="cursor: pointer; text-decoration: underline"
            :style="{ color: column.color ? column.color : '' }"
          >
            {{ scope.row[column.key] }}
          </span>
          <!-- 无链接 有颜色@click="scope.row[column.event](scope.row)" -->
          <span
            v-else-if="column.type === 'noLink'"
            @click="
              column.event &&
                column.event(scope.row, column.key, scope.row[column.key])
            "
            :style="{ color: column.color ? column.color : '' }"
          >
            {{ scope.row[column.key] }}
          </span>
          <span
            v-else-if="column.type === 'elink'"
            @click="handleLink(scope.row, column.key, scope.row[column.key])"
            style="cursor: pointer; text-decoration: underline"
            :style="{ color: column.color ? column.color : '' }"
          >
            {{ scope.row[column.key] }}
          </span>
          <!--Tooltip 文字提示-->
          <el-tooltip
            v-else-if="column.type === 'tooltip'"
            effect="dark"
            :content="scope.row.serviceArea"
            placement="top-start"
          >
            <el-button type="text">{{ scope.row[column.key] }}</el-button>
          </el-tooltip>
          <!-- 操作按钮 @click="btn.event && btn.event(scope.row,scope.$index) || ''" -->
          <div
            v-else-if="column.key === 'operationsModel'"
            class="opration-btn"
          >
            <el-button
              v-for="(btn, btnIndex) in tableData.btnList"
              v-show="!btn.isShow || (btn.isShow && btn.isShow(scope.row))"
              :key="btnIndex"
              :size="btn.size || 'mini'"
              :type="btn.type"
              :class="btn.mode || ''"
              @click="(btn.event && btn.event(scope.row)) || ''"
              :disabled="
                typeof btn.disabled === 'string'
                  ? btn.disabled
                  : typeof btn.disabled === 'function'
                  ? btn.disabled(scope.row)
                  : false
              "
            >
              <i :class="btn.btnClass"></i>
              {{ btn.label }}
            </el-button>
          </div>
          <span v-else :class="column.className">{{
            String(scope.row[column.key])
              ? column.event
                ? column.event(scope.row[column.key])
                : scope.row[column.key]
              : "无"
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      v-if="tableData.page"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="tableData.page.currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="tableData.page.pageSize"
      :total="tableData.page.total"
      @size-change="tableData.page.handleSizeChange"
      @current-change="tableData.page.handleCurrentChange"
      class="page_list"
    ></el-pagination> -->
    <el-pagination
      v-if="tableData.page"
      :current-page.sync="tableData.page.currentPage"
      :page-size="tableData.page.pageSize"
      :total="tableData.page.total"
      @current-change="tableData.page.handleCurrentChange"
      class="page_list"
      background
      layout="prev, pager, next"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Object,
    maxHeight: Number
  },
  data () {
    return {
      // localUrl: require('@/assets/default')
    }
  },
  methods: {
    handleLink (row, key, value) {
      this.$emit('handleLink', row, key, value)
    },
    currentChange (data) {
      this.$emit('currentChange', data)
    },
    handleCurrentChange (data) {
      this.$emit('handleCurrentChange', data)
    }
  }
}
</script>

<style lang="scss">
.table_list {
  span {
    margin-left: 0 !important;
  }
  .primary {
    color: #409eff;
  }
  .success {
    color: #67c23a;
  }
  .info {
    color: #909399;
  }
  .warning {
    color: #e6a23c;
  }
  .danger {
    color: #f56c6c;
  }
  .el-table__fixed-header-wrapper {
    z-index: auto !important;
  }
  .el-table__fixed-body-wrapper {
    z-index: auto !important;
  }
  .page_list {
    margin-top: 20px;
    text-align: right;
    padding: 0;
    // display: inline-block;
  }
  .grade_star {
    font-size: 20px;
    color: red;
  }
  .status1 {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #60d726;
    margin-bottom: 2px;
    margin-right: 10px;
  }
  .status2 {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #d4d4d4;
    margin-bottom: 2px;
    margin-right: 10px;
  }
  .imgAndTop {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    img {
      margin-left: 50px;
    }
  }
  .top {
    position: absolute;
    top: 45%;
    left: 1%;
    width: 30px;
    height: 20px;
    list-style: 16px;
    font-size: 12px;
    text-align: center;
    display: inline-block;
    border: 1px solid #4791ff;
    border-radius: 2px;
    color: #4791ff;
    padding-right: 2px;
  }
}
</style>
