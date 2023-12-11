import base from './base'
import axios from '@/utils/http'

const api = {
  // 招聘类型
  getType () {
    return axios.get(`${base.baseUrl}/position/management/type/list`)
  },
  // 工作经验
  getExperience () {
    return axios.get(`${base.baseUrl}/work/experience/list`)
  },
  // 工作城市
  getWorkCity () {
    return axios.get(`${base.baseUrl}/work/city/list`)
  },
  // 学历
  getEducation () {
    return axios.get(`${base.baseUrl}/education/list`)
  },
  // 标签切换
  getTabs () {
    return axios.get(`${base.baseUrl}/resume/position/type/list`)
  },
  // 职位管理列表
  getPositionList (params1, params2, params3, params4) {
    return axios.get(`${base.baseUrl}/position/management/list?keyWord=${params1}&pageNo=${params2}&type=${params3}&intention=${params4}`)
  },
  // 职位管理详情
  getPositionDetail (params) {
    return axios.get(`${base.baseUrl}/position/management/detail/${params}`)
  },
  // 职位管理编辑
  updatePosition (params, params1) {
    return axios.put(`${base.baseUrl}/position/management/update/${params}`, params1)
  },
  // 上线、下线
  updateStatus (params, params1) {
    return axios.put(`${base.baseUrl}/position/management/update/status/${params}`, params1)
  },
  // 职位删除
  deletePosition (params) {
    return axios.put(`${base.baseUrl}/position/management/update/delete/${params}`)
  },
  // 批量删除
  deletePositionMore (params) {
    return axios.put(`${base.baseUrl}/position/management/update/batch/delete`, params)
  },
  // 职位新增
  addPosition (params) {
    return axios.post(`${base.baseUrl}/position/management/add`, params)
  }
}

export default api
