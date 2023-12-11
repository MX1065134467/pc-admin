const _import = require('../_import_' + process.env.NODE_ENV)

// 新闻管理
const routes = [
  {
    path: '/videos',
    name: '视频管理',
    component: _import('videos/index'),
    meta: {
      hideSide: true,
      title: '视频管理',
      activeModule: '视频管理'
    }
  },
  {
    path: '/videos/addVideos',
    name: '新增视频',
    component: _import('videos/addVideos'),
    meta: {
      hideSide: true,
      title: '新增视频',
      activeModule: '新增视频'
    }
  }
]

export default routes
