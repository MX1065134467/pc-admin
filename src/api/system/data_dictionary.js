/*
 * @Author: your name
 * @Date: 2021-05-13 10:10:57
 * @LastEditTime: 2021-05-19 10:02:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\12\src\api\system\account_manage.js
 */
import base from '../base'
import axios from '@/utils/http'

// 字典管理
const dataDictionary = {
  // 字典列表查询
  getList (params) {
    return axios.post(`${base.baseUrl}/sysCode/selectAll`, params)
  },
  // 添加字典
  addCode (params) {
    return axios.post(`${base.baseUrl}/sysCode/create`, params)
  },
  // 编辑字典
  editCode (params) {
    return axios.post(`${base.baseUrl}/sysCode/update`, params)
  },
  // 删除字典
  deleteCode (id) {
    return axios.get(`${base.baseUrl}/sysCode/delete?id=${id}`)
  },
  // 字典项列表查询
  getDictionaryEntry (params) {
    return axios.post(`${base.baseUrl}/sysCode/selectById`, params)
  },
  // 添加字典项
  addDictionaryEntry (params) {
    return axios.post(`${base.baseUrl}/sysCode/add`, params)
  }
}
export default dataDictionary
