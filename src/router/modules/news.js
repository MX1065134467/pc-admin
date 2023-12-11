const _import = require('../_import_' + process.env.NODE_ENV)

// 新闻管理
const routes = [
  {
    path: '/news',
    name: '新闻管理',
    component: _import('news/index'),
    meta: {
      hideSide: true,
      title: '新闻管理',
      activeModule: '新闻管理'
    }
  },
  {
    path: '/news/addNews',
    name: '新建新闻',
    component: _import('news/addNews'),
    meta: { title: '新建' },
    hidden: true
  },
  {
    path: '/news/viewNews',
    name: '查看新闻',
    component: _import('news/viewNews'),
    meta: { title: '详情' },
    hidden: true
  }
]

export default routes
