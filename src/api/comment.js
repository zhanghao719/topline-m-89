/**
 * 文章评论接口模块
 */
import request from '@/utils/request'

// 获取文章评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 发布评论
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
