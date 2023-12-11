import base from './base'
import axios from '@/utils/http'

const api = {
  // 上传单个文件
  uploadSingleFile (params) {
    return axios.post(`${base.baseUrl}/file/uploadSingle/anon`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  // 删除单个文件
  deleteImg (params) {
    return axios.delete(`${base.baseUrl}/file/deleteSingle/anon`, { params })
  },
  // 批量上传文件
  uploadBatchImg (params) {
    return axios.post(`${base.baseUrl}/file/upload/anon`, params, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  // 批量删除图片
  batchDeleteImg (params) {
    return axios.post(`${base.baseUrl}/file/delete/anon`, params)
  }
}

export default api
