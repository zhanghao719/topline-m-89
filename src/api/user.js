/**
 * 用户请求相关模块
 */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  // 具体的请求代码
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    // headers: {
    // axios 会自动添加该请求头
    // 'Content-Type': 'application/json'
    // }, // 请求头参数
    // params: {}, // Query 查询参数
    data // Body 请求体参数
  })
}

// 获取验证码
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取当前登录用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取指定用户信息
export const getUserById = userId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`
  })
}
