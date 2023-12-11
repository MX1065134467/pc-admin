import { Loading } from 'element-ui'

let loading = null

function startLoading (tips = '拼命加载中...') {
  loading = Loading.service({
    lock: true, // 是否锁定
    text: tips, // 显示在加载图标下方的加载文案
    background: 'rgba(255,255,255,.7)' // 遮罩背景色
  })
}

function endLoading () {
  if (loading) {
    loading.close()
  }
}

export default {
  startLoading,
  endLoading
}
