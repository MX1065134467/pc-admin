import base from './base'
import axios from '@/utils/http'

const api = {
  // 问题管理列表
  selectAll (params) {
    return axios.post(`${base.baseUrl}/news/selectAll`, params)
  },
  // 置顶、取消置顶
  upOrDown (params) {
    return axios.get(`${base.baseUrl}/news/upOrDown`, { params })
  },
  // 上线、下线
  update (params) {
    return axios.get(`${base.baseUrl}/news/update`, { params })
  },
  // 上移、下移
  move (params) {
    return axios.get(`${base.baseUrl}/news/move`, { params })
  },
  // 图片上传
  upload (params) {
    return axios.post(`${base.baseUrl}/news/upload`, params)
  },
  // 新增
  create (params) {
    return axios.post(`${base.baseUrl}/news/create`, params)
  },
  // 编辑
  edit (params) {
    return axios.post(`${base.baseUrl}/news/edit`, params)
  },
  // 详情
  selectById (params) {
    return axios.get(`${base.baseUrl}/news/selectById`, { params })
  },
  // 删除
  delete (params) {
    return axios.get(`${base.baseUrl}/news/delete`, { params })
  },
  // 批量删除
  batchDelete (params) {
    return axios.post(`${base.baseUrl}//news/batchDelete`, params)
  }
}

export default api
