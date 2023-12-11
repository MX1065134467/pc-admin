<template>
  <div class=''>
    <el-container>
      <el-aside width="200px">
        <Sidebar currentPath="/"></Sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <Navigation></Navigation>
        </el-header>
        <el-main class="main">
          <Breadcrumb />
          <transition name="fade-transform" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
        <el-footer class="footer">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from '@c/Sidebar'
import Navigation from '@c/Navigation'
import Footer from '@c/footer'
import Breadcrumb from '@c/Breadcrumb'
export default {
  name: '',
  components: { Sidebar, Navigation, Footer, Breadcrumb },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  beforeDestroy () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .main {
  background-color: #f5f5f5;
  padding: 16px 24px 0 24px;
  height: calc(100vh - 120px);
  /* fade-tranform*/
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-10px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
}
::v-deep .footer {
  padding: 0;
}
</style>
