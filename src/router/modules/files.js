const _import = require('../_import_' + process.env.NODE_ENV)

// 新闻管理
const routes = [
  {
    path: '/files',
    name: '下载管理',
    component: _import('files/index'),
    meta: {
      hideSide: true,
      title: '下载管理',
      activeModule: '下载管理'
    }
  },
  {
    path: '/files/addDowns',
    name: '新增产品下载信息',
    component: _import('files/addDowns'),
    meta: {
      hideSide: true,
      title: '新增产品下载信息',
      activeModule: '新增产品下载信息'
    }
  }
]

export default routes
