const _import = require('../_import_' + process.env.NODE_ENV)

// 简历管理
const routes = [
  {
    path: '/resume',
    name: '简历管理',
    rediredct: '/resume/index',
    component: _import('resume/index'),
    meta: {
      title: '简历管理',
      hideSide: true,
      activeModule: '简历管理'
    }
  },
  {
    path: '/resume/detail',
    name: '校招简历详情',
    component: _import('resume/detail'),
    meta: {
      hideSide: true,
      title: '简历详情(校招)',
      activeModule: '校招简历详情'
    }
  },
  {
    path: '/resume/societyDetail',
    name: '社招简历详情',
    component: _import('resume/societyDetail'),
    meta: {
      hideSide: true,
      title: '简历详情(社招)',
      activeModule: '社招简历详情'
    }
  }
]

export default routes
