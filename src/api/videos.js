import base from './base'
import axios from '../utils/http'

const api = {
  // // 视频上传
  // chunkUploadVideo (params) {
  //   return axios.post(`${base.baseUrl}/video/chunkUploadVideo`, params)
  // },
  // 视频列表
  getList (params) {
    return axios.get(`${base.baseUrl}/video/getList`, { params })
  },
  // 上线、下线
  updateStatus (params) {
    return axios.get(`${base.baseUrl}/video/updateStatus`, { params })
  },
  // 置顶、取消置顶
  updateIsTop (params) {
    return axios.get(`${base.baseUrl}/video/updateIsTop`, { params })
  },
  // 删除、批量视频
  delete (params) {
    return axios.post(`${base.baseUrl}/video/delete`, params)
  },
  // 上下移动
  move (params) {
    return axios.get(`${base.baseUrl}/video/move`, { params })
  },
  // 图片上传
  uploadImg (params) {
    return axios.post(`${base.baseUrl}/video/uploadImg`, params)
  },
  // 图片上传
  addVideo (params) {
    return axios.post(`${base.baseUrl}/video/add`, params)
  },
  // 视频编辑
  update (params) {
    return axios.post(`${base.baseUrl}/video/update`, params)
  }
}

export default api
