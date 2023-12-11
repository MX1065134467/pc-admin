/*
 * @Author: your name
 * @Date: 2021-05-13 10:10:57
 * @LastEditTime: 2021-05-19 15:35:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\12\src\api\system\account_manage.js
 */
import base from '../base'
import axios from '@/utils/http'

// 权限
const authorityManage = {
  // 权限列表查询
  getList (params) {
    return axios.post(`${base.baseUrl}/sysAuthority/selectAll`, params)
  },
  // 添加权限
  addAuthority (params) {
    return axios.post(`${base.baseUrl}/sysAuthority/create`, params)
  },
  // 删除权限
  deleteAuthority (id) {
    return axios.get(`${base.baseUrl}/sysAuthority/delete?id=${id}`)
  },
  // 编辑权限
  editAuthority (params) {
    return axios.post(`${base.baseUrl}/sysAuthority/update`, params)
  },
  // 停用启用权限
  updateStatus (id, status) {
    return axios.get(
      `${base.baseUrl}/sysAuthority/updateStart?id=${id}&status=${status}`
    )
  }
}
export default authorityManage
