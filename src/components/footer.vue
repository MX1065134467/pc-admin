<template>
  <div class="container">
   <div class="copyRight">Copyright © {{ new Date().getFullYear() }} 北京中电兴发科技有限公司</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
  .copyRight {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
