import base from './base'
import axios from '@/utils/http'

const api = {
  // 问题管理列表
  getQuestionList (params) {
    return axios.post(`${base.baseUrl}/question/selectAll`, params)
  },
  // 热门
  hotType () {
    return axios.get(`${base.baseUrl}/question/hot/type`)
  },
  // 问题类型
  getQuestionType () {
    return axios.get(`${base.baseUrl}/question/type/list`)
  },
  // 问题详情
  getQuestionDetail (params) {
    return axios.get(`${base.baseUrl}/question/selectById?id=${params}`)
  },
  // 编辑问题
  editQuestion (params) {
    return axios.post(`${base.baseUrl}/question/edit`, params)
  },
  // 上线、下线
  updateQuestionStatus (params, params1) {
    return axios.get(`${base.baseUrl}/question/update?id=${params}&status=${params1}`)
  },
  // 新增问题
  addQuestion (params) {
    return axios.post(`${base.baseUrl}/question/create`, params)
  },
  // 删除
  deleteQuestion (params) {
    return axios.get(`${base.baseUrl}/question/delete?id=${params}`)
  },
  // 批量删除
  deleteQuestionMore (params) {
    return axios.get(`${base.baseUrl}/question/batchDelete?ids=${params}`)
  }
}

export default api
