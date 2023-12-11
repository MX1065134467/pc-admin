/*
 * @Author: your name
 * @Date: 2021-05-13 10:10:57
 * @LastEditTime: 2021-05-24 15:07:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\12\src\api\system\account_manage.js
 */
import base from '../base'
import axios from '@/utils/http'

// 用户
const accountManage = {
  // 用户列表查询
  getList (params) {
    return axios.post(`${base.baseUrl}/sysUser/selectByParam`, params)
  },

  // 停用启用用户
  updateStatus (id, status) {
    return axios.get(
      `${base.baseUrl}/sysUser/updateStart?id=${id}&status=${status}`
    )
  },
  // 查看用户
  viewUser (id) {
    return axios.get(`${base.baseUrl}/sysUser/view/?id=${id}`)
  },

  // 新增用户
  addUser (params) {
    return axios.post(`${base.baseUrl}/sysUser/create`, params)
  },

  // 编辑用户
  editUser (params) {
    return axios.post(`${base.baseUrl}/sysUser/update`, params)
  },

  // 批量删除用户
  deleteArr (ids) {
    return axios.get(`${base.baseUrl}/sysUser/batchDelete/?ids=${ids}`)
  },

  // 删除用户
  deleteUser (id) {
    return axios.get(`${base.baseUrl}/sysUser/delete/?id=${id}`)
  },

  // 重置密码
  resetPwd (id) {
    return axios.get(`${base.baseUrl}/sysUser/resetPwd/?id=${id}`)
  },

  // 修改密码
  updatePwd (params) {
    return axios.post(`${base.baseUrl}/sysUser/updatePwd`, params)
  },

  // 查询角色
  getRole () {
    return axios.get(`${base.baseUrl}/sysUser/selectRole`)
  },

  // 上传图片
  upload (params) {
    return axios.post(`${base.baseUrl}/sysUser/upload`, params)
  },

  // 解锁
  unLock (id) {
    return axios.get(`${base.baseUrl}/sysUser/unlock/?id=${id}`)
  }
}
export default accountManage
