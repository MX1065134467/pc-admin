/*
 * @Author: your name
 * @Date: 2021-05-14 10:29:20
 * @LastEditTime: 2021-05-18 09:19:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\api\system\role_manage.js
 */
import base from '../base'
import axios from '@/utils/http'

// 角色
const roleManage = {
  // 角色列表查询
  getList (params) {
    return axios.post(`${base.baseUrl}/sysRole/selectByParam`, params)
  },
  // 查看角色
  viewRole (id) {
    return axios.post(`${base.baseUrl}/sysRole/view/?id=${id}`)
  },
  // 停用启用
  updateStatus (id, status) {
    return axios.get(
      `${base.baseUrl}/sysRole/updateStart?id=${id}&status=${status}`
    )
  },
  // 新增角色
  addRole (params) {
    return axios.post(`${base.baseUrl}/sysRole/create`, params)
  },
  // 编辑角色
  editRole (params) {
    return axios.post(`${base.baseUrl}/sysRole/update`, params)
  },
  // 批量删除角色
  deleteArr (ids) {
    return axios.get(`${base.baseUrl}/sysRole/batchDelete/?ids=${ids}`)
  },
  // 删除角色
  deleteRole (id) {
    return axios.get(`${base.baseUrl}/sysRole/delete/?id=${id}`)
  },
  // 权限设置
  setRole (params) {
    return axios.post(`${base.baseUrl}/sysRole/authority`, params)
  },
  // 查询权限树
  getTree (roleId) {
    return axios.get(
      `${base.baseUrl}/sysRole/selectAuthority/?roleId=${roleId}`
    )
  }
}
export default roleManage
