import base from './base'
import axios from '@/utils/http'

const api = {
  // 列表
  getResumeList (params) {
    return axios.get(`${base.baseUrl}/resume/list`, { params })
  },
  // 按钮
  getBtnList () {
    return axios.get(`${base.baseUrl}/resume/position/type/list`)
  },
  // 删除
  deleteresume (id) {
    return axios.put(`${base.baseUrl}/resume/update/delete/${id}`)
  },
  // 批量删除
  batchDeleteresume (params) {
    return axios.put(`${base.baseUrl}/resume/update/batch/delete`, params)
  },
  // 简历下载
  resumeDown (params) {
    return axios.post(`${base.baseUrl}/resume/download`, params, { responseType: 'blob' })
  },
  // 简历批量下载
  BatchResumeDown (params) {
    return axios.post(`${base.baseUrl}/resume/batch/download`, params, { responseType: 'blob' })
  },
  // 详情
  getdetail (id) {
    return axios.get(`${base.baseUrl}/resume/detail/${id}`)
  }
}

export default api
