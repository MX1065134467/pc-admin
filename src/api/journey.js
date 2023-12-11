import base from './base'
import axios from '@/utils/http'

const api = {
  // 行程管理列表
  getLineList () {
    return axios.get(`${base.baseUrl}/line/list`)
  },
  // 联系人管理
  getLineperson () {
    return axios.get(`${base.baseUrl}/line/person/detail`)
  },
  addLinkMan (params) {
    return axios.post(`${base.baseUrl}/line/person/add`, params)
  },
  // 新增
  addLine (params) {
    return axios.post(`${base.baseUrl}/line/add`, params)
  },
  // 详情
  lineDetail (params) {
    return axios.get(`${base.baseUrl}/line/detail/${params}`)
  },
  // 编辑
  updateLine (params, params1) {
    return axios.put(`${base.baseUrl}/line/update/${params}`, params1)
  },
  // 删除
  deleteLine (params) {
    return axios.put(`${base.baseUrl}/line/update/delete/${params}`)
  },
  // 批量删除
  deleteLineMore (params) {
    return axios.put(`${base.baseUrl}/line/update/batch/delete`, params)
  },
  // 排序
  lineSort (params) {
    return axios.put(`${base.baseUrl}/line/sort`, params)
  }
}

export default api
