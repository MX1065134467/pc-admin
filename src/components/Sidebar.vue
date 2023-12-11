<template>
  <div class="sidebar" ref="scrollBox">
    <div class="logo">
      <img src="../assets/images/Logo-ex.png" alt="" />
    </div>
    <el-menu unique-opened router>
      <!-- :default-active="currentPath" -->
      <component
        class="menu-item"
        v-for="menu in menuList"
        :key="menu.id"
        :index="'/' + menu.levelCode"
        @click="change(menu)"
        :is="
          menu.children && menu.children.length > 0
            ? 'el-submenu'
            : 'el-menu-item'
        "
      >
        <template slot="title">
          <!-- <i :class="[menu.icon]"></i> -->
          <!-- <i v-else class="el-icon-menu"></i> -->
          <img :src="currentMenu === menu.authorityName ? menu.icon1 : menu.icon" class="titleicon" />
          <span class="menuName" @click="handleNav(menu.authorityName)">{{
            menu.authorityName
          }}</span>
        </template>
        <template v-if="menu.children && menu.children.length > 0">
          <el-menu-item
             @click="handleItem(menu)"
            class="menu-item-child"
            v-for="item in menu.children"
            :key="item.id"
            :index="'/' + menu.levelCode + '/' + item.levelCode"
            >{{ item.authorityName }}</el-menu-item
          >
        </template>
      </component>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {},
  props: {
    // currentPath: {
    //   type: String,
    //   required: true
    // }
  },
  data () {
    return {
      menuList: [],
      currentMenu: ''
    }
  },
  computed: {},
  created () {
    this.currentMenu = sessionStorage.getItem('currentMenu') ? sessionStorage.getItem('currentMenu') : ''
    const menu = JSON.parse(sessionStorage.getItem('menuList'))
    menu.forEach(item => {
      if (item.authorityName === '职位管理') {
        item.icon = require('@/assets/icon/' + '职位1' + '.png')
        item.icon1 = require('@/assets/icon/' + '职位2' + '.png')
      } else if (item.authorityName === '简历管理') {
        item.icon = require('@/assets/icon/' + '简历1' + '.png')
        item.icon1 = require('@/assets/icon/' + '简历2' + '.png')
      } else if (item.authorityName === '行程管理') {
        item.icon = require('@/assets/icon/' + '行程1' + '.png')
        item.icon1 = require('@/assets/icon/' + '行程2' + '.png')
      } else if (item.authorityName === '新闻管理') {
        item.icon = require('@/assets/icon/' + '新闻1' + '.png')
        item.icon1 = require('@/assets/icon/' + '新闻2' + '.png')
      } else if (item.authorityName === '问题管理') {
        item.icon = require('@/assets/icon/' + '问题1' + '.png')
        item.icon1 = require('@/assets/icon/' + '问题2' + '.png')
      } else if (item.authorityName === '系统管理') {
        item.icon = require('@/assets/icon/' + '系统1' + '.png')
        item.icon1 = require('@/assets/icon/' + '系统2' + '.png')
      } else if (item.authorityName === '视频管理') {
        item.icon = require('@/assets/icon/' + '视频1' + '.png')
        item.icon1 = require('@/assets/icon/' + '视频2' + '.png')
      } else if (item.authorityName === '下载管理') {
        item.icon = require('@/assets/icon/' + '下载管理1' + '.png')
        item.icon1 = require('@/assets/icon/' + '下载管理2' + '.png')
      }
    })
    this.menuList = menu
    console.log(this.menuList)
    // this.menuList.push(this.system)
  },
  mounted () {},
  methods: {
    handleNav (name) {
      console.log(1111)
      // this.$router.push({
      //   path: '/position/positionList'
      // })
    },
    change (e) {
      console.log(e, 'e')
      this.currentMenu = e.authorityName
      sessionStorage.setItem('currentMenu', e.authorityName)
    },
    handleItem (e) {
      console.log(e, 'e')
      this.currentMenu = e.authorityName
      sessionStorage.setItem('currentMenu', e.authorityName)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  .logo {
    width: 108px;
    height: 35px;
    margin: 15px auto 20px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-menu {
    border-right: none;
    background-color: #fff;
    .titleicon {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    .menuName {
      margin-right: 50%;
    }
  }
}
.sidebar::-webkit-scrollbar {
  display: none;
}
::v-deep .menu-item-child {
  padding-left: 0 !important;
}
</style>
