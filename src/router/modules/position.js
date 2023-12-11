const _import = require('../_import_' + process.env.NODE_ENV)

// 职位管理
const routes = [
  {
    path: '/position',
    name: '职位管理',
    meta: { title: '职位管理' },
    component: _import('position/positionList')
  },
  {
    path: '/position/addPosition',
    name: '岗位新增',
    component: _import('position/addPosition'),
    meta: { title: '岗位新增' },
    hidden: true
  }
]

export default routes
