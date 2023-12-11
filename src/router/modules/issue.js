const _import = require('../_import_' + process.env.NODE_ENV)

// 问题管理
const routes = [
  {
    path: '/issue',
    name: '问题管理',
    component: _import('issue/index'),
    meta: {
      hideSide: true,
      title: '问题管理',
      activeModule: '问题管理'
    }
  }
]

export default routes
