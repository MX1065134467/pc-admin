/*
 * @Author: your name
 * @Date: 2021-05-17 18:14:44
 * @LastEditTime: 2021-05-18 09:11:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\api\system\log_manage.js
 */
import base from '../base'
import axios from '@/utils/http'

// 日志
const logManage = {
  // 日志列表查询
  getList (params) {
    return axios.post(`${base.baseUrl}/sysLog/selectByParam`, params)
  },
  // 查看
  viewLog (id) {
    return axios.post(`${base.baseUrl}/sysLog/selectById/?id=${id}`)
  }
}
export default logManage
