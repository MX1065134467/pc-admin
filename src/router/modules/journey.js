const _import = require('../_import_' + process.env.NODE_ENV)

// 行程管理
const routes = [
  {
    path: '/journey',
    name: '行程管理',
    component: _import('journey/index'),
    meta: {
      hideSide: true,
      title: '行程管理',
      activeModule: '行程管理'
    }
  }
]

export default routes
