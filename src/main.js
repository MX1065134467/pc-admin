import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import loading from '@/utils/loading'
import { IMAGE_URL } from '../config'
import BaiduMap from 'vue-baidu-map'
import VueClipboard from 'vue-clipboard2'
// fade/zoom 等
// import 'element-ui/lib/theme-chalk/base.css'
// import Video from 'video.js'
// import 'video.js/dist/video-js.css'
// import VideoPlayer from 'vue-video-player'
// import uploader from 'vue-simple-uploader'
// import hls from 'videojs-contrib-hls'

// Vue.prototype.$video = Video
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(hls)
// Vue.use(VideoPlayer)
Vue.use(VueClipboard)
// Vue.use(uploader)
Vue.config.productionTip = false
Vue.prototype.IMAGEURL = IMAGE_URL
Vue.prototype.$loading = loading
Vue.use(BaiduMap, {
  ak: 'AkZyWsvUeKq3FBciMM0v4V1OG6mKKrBk'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
