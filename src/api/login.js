/*
 * @Author: your name
 * @Date: 2021-05-17 17:18:57
 * @LastEditTime: 2021-05-17 17:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\api\login.js
 */
import base from './base'
import axios from '@/utils/http'

const api = {
  // 登录
  login (params) {
    return axios.post(`${base.baseUrl}/login/login/anon`, params)
  },
  // 退出
  logout () {
    return axios.post(`${base.baseUrl}/login/logout`)
  },
  // 个人信息
  viewPerson () {
    return axios.get(`${base.baseUrl}/sysUser/viewPerson`)
  },
  // 修改个人信息
  updatePerson (params) {
    return axios.post(`${base.baseUrl}/sysUser/updatePerson`, params)
  },
  // 上传图片
  upload (params) {
    return axios.post(`${base.baseUrl}/sysUser/upload`, params)
  }
}

export default api

// export function login(data) {
//   return request({
//     url: '/v1.0/login/login/anon',
//     method: 'post',
//     data,
//     headers: { showLoading: false }
//   })
// }

// export function logout() {
//   return request({
//     url: '/v1.0/login/logout',
//     method: 'post',
//     headers: { showLoading: false }
//   })
// }
