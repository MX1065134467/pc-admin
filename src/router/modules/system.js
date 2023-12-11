/*
 * @Author: your name
 * @Date: 2021-05-17 16:38:49
 * @LastEditTime: 2021-05-24 12:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\router\modules\system.js
 */
const _import = require('../_import_' + process.env.NODE_ENV)

// 系统管理
const routes = [
  {
    path: '/system',
    name: '系统管理',
    rediredct: '/system/system_user',
    component: _import('system/account_manage/index'),
    meta: {
      hideSide: true,
      title: '系统管理',
      activeModule: '系统管理'
    }
  },
  {
    path: '/system/system_role',
    name: '角色管理',
    component: _import('system/role_manage/index'),
    meta: { title: '角色管理' }
  },
  {
    path: '/system/system_user',
    name: '用户管理',
    component: _import('system/account_manage/index'),
    meta: { title: '用户管理' }
  },
  {
    path: '/system/system_authority',
    name: '权限管理',
    component: _import('system/authority_manage/index'),
    meta: { title: '权限管理' }
  },
  {
    path: '/system/system_operation',
    name: '日志管理',
    component: _import('system/log_manage/index'),
    meta: { title: '日志管理' }
  },
  {
    path: '/system/system_code',
    name: '字典管理',
    component: _import('system/data_dictionary/index'),
    meta: { title: '字典管理' }
  },
  {
    path: '/system/addDictionaryEntry/:id',
    name: '字典详情',
    component: _import('system/data_dictionary/insert/addDictionaryEntry'),
    meta: { title: '字典详情', hidden: true }
  }
]

export default routes
