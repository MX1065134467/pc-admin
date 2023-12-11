/*
 * @Author: your name
 * @Date: 2021-05-18 09:22:33
 * @LastEditTime: 2021-05-24 10:07:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \integratedmanagementsysteme:\zdxf\公司官网\ichinae_officialwebsiteManage\src\utils\index.js
 */
// 验证手机号
export const checkPhone = (rule, value, callback) => {
  if (!rule.required) {
    if (value === '') {
      return callback()
    }
  }
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 验证身份证
export const checkIdCard = (rule, value, callback) => {
  if (!rule.required) {
    if (value === '') {
      return callback()
    }
  }
  const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
  // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的身份证'))
  } else {
    callback()
  }
}

// 验证固定电话
export const fixedPhone = (rule, value, callback) => {
  if (!rule.required) {
    if (value === '') {
      return callback()
    }
  }
  const reg = /^0\d{2,3}-?\d{7,8}$/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的固定号码，如02988735263'))
  } else {
    callback()
  }
}

// 验证邮箱
export const checkEmail = (rule, value, callback) => {
  if (!rule.required) {
    if (value === '') {
      return callback()
    }
  }
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
// 只允许输入英文字母
export const checkLetter = (rule, value, callback) => {
  if (!rule.required) {
    if (value === '') {
      return callback()
    }
  }
  const reg = /^[a-zA-Z]+$/
  if (!reg.test(value)) {
    return callback(new Error('只允许输入英文字母'))
  } else {
    callback()
  }
}

// 判断url最后是否指定参数
export function isUrlFinallyParameter (parameter, location = 1) {
  const url = window.location.href
  const arr = url.split('/')
  return arr[arr.length - location] === parameter
}
