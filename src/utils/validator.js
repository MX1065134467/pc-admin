//  validatePassword 密码验证；
const validatePassword = (rule, value, callback) => {
  const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$%&_=])[A-Za-z\d#$%&_=]{8,20}$/
  if (value !== '') {
    if (value.length < 8) {
      callback(new Error('请输入至少8位的密码'))
      return false
    } else if (value.length > 18) {
      callback(new Error('密码长度不能超过20位'))
      return false
    } else if (!regPassword.test(value)) {
      callback(new Error('密码必须包含字母、数字和特殊字符(#$%&_=)'))
      return false
    } else {
      callback()
    }
  } else {
    return callback(new Error('密码不能为空'))
  }
}

// validateLongitude 经度验证；
const validateLongitude = (rule, value, callback) => {
  var reg = /^\d+\.?\d{0,6}$/
  if (value === '') {
    return callback(new Error('经度值不能为空'))
  } else if (value < -180 || value > 180 || isNaN(value)) {
    callback(new Error('请输入-180到180之间的经度值'))
  } else if (!reg.test(value)) {
    callback(new Error('最多允许6位小数'))
  } else {
    callback()
  }
}

// validateLatitude 纬度验证；
const validateLatitude = (rule, value, callback) => {
  var reg = /^\d+\.?\d{0,6}$/
  if (value === '') {
    return callback(new Error('纬度值不能为空'))
  } else if (value < -90 || value > 90 || isNaN(value)) {
    callback(new Error('请输入-90到90之间的纬度值'))
  } else if (!reg.test(value)) {
    callback(new Error('最多允许6位小数'))
  } else {
    callback()
  }
}

// validatePhone 手机号验证；
const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

// validateBankNum 银行账户验证；
const validateBankNum = (rule, value, callback) => {
  if (value) {
    if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
      callback(new Error('银行账户有误，请重填'))
      return false
    } else {
      callback()
    }
  } else {
    return callback(new Error('银行账户不能为空'))
  }
}

// validateStablePhone 座机号验证
const validateStablePhone = (rule, value, callback) => {
  if (value) {
    const phoneNum = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
    if (!phoneNum.test(value)) {
      callback(new Error('座机号码有误，请重填'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validateIdCard 身份证验证（兼容18/15位）；
const validateIdCard = (rule, value, callback) => {
  if (value) {
    const regIdCard = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
    if (!regIdCard.test(value)) {
      callback(new Error('身份证号填写有误'))
      return false
    } else {
      callback()
    }
  } else {
    return callback(new Error('身份证号不能为空'))
  }
}

// validateEmail 邮箱格式验证；
const validateEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  }, 100)
}

//  validateNum 只能为数字
const validateNum = (rule, value, callback) => {
  const age = /^[0-9]*$/
  if (!age.test(value)) {
    callback(new Error('只能为数字'))
  } else {
    callback()
  }
}

// validateSort 排序值验证；
const validateSort = (rule, value, callback) => {
  if (value !== '') {
    if (value <= 0) {
      callback(new Error('排序值填写错误，请重填正整数'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validateCarCard 车牌号验证；（兼容新能源车牌）
const validateCarCard = (rule, value, callback) => {
  if (value) {
    const CarCard = /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/
    if (!CarCard.test(value)) {
      callback(new Error('车牌号有误，请重填'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validatePostal 中国邮编验证
const validatePostal = (rule, value, callback) => {
  if (value) {
    const Postal = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
    if (!Postal.test(value)) {
      callback(new Error('邮政编码有误，请重填'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validateUsername 用户名验证，4到16位（字母，数字，下划线，减号）
const validateUsername = (rule, value, callback) => {
  const name = /^[a-zA-Z0-9_-]{4,16}$/.test(value)
  if (!name) {
    callback(new Error('用户名有误，请输入4到16位（字母，数字，下划线，减号）'))
  } else {
    callback()
  }
}

// validateUserCode 统一社会信用代码验证；
const validateUserCode = (rule, value, callback) => {
  if (value) {
    const Code = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/
    if (!Code.test(value)) {
      callback(new Error('统一社会信用代码输入有误'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validateChina 中文/汉字验证
const validateChina = (rule, value, callback) => {
  if (value) {
    const Code = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
    if (!Code.test(value)) {
      callback(new Error('只能输入中文/汉字'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validateEnglish 英文验证
const validateEnglish = (rule, value, callback) => {
  if (value) {
    const Code = /^[a-zA-Z]+$/
    if (!Code.test(value)) {
      callback(new Error('只能输入英文'))
      return false
    } else {
      callback()
    }
  } else {
    callback()
  }
}

//  validatePrice 价格验证，保留两位小数
const validatePrice = (rule, value, callback) => {
  const reg = /^\d+.?\d{0,2}$/
  if (!value) {
    callback(new Error('请输入价格'))
  } else if (!Number(value)) {
    callback(new Error('请输入数字值'))
  } else {
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('小数点后最多只能输入两位'))
    }
  }
}

export {
  validatePassword, // 密码验证
  validateLongitude, // 经度验证
  validateLatitude, // 纬度验证
  validatePhone, // 手机号验证
  validateBankNum, // 银行账户验证
  validateStablePhone, // 座机号验证
  validateIdCard, // 身份证验证
  validateEmail, // 邮箱格式验证
  validateNum, // 只能为数字
  validateSort, // 排序值验证
  validateCarCard, // 车牌号验证（兼容新能源）
  validateUsername, // 用户名验证 4到16位（字母，数字，下划线，减号）
  validateUserCode, // 统一社会信用代码验证
  validateChina, // 中文/汉字验证
  validateEnglish, // 英文验证
  validatePostal, // 中国邮政编码验证
  validatePrice // 价格验证（保留两位小数）
}
