/**
 * 文章频道接口模块
 */
import request from '@/utils/request'

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
