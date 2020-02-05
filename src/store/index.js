/**
 * Vuex 容器
 *    获取方便
 *    响应式的
 * 本地存储
 *    持久化
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

const USER_KEY = 'user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // null、{ token, refresh_token, id: xxx }
    user: getItem(USER_KEY), // 当前登录用户状态（token）
    cachePages: ['TabBar']
    // user: JSON.parse(window.localStorage.getItem('user')) // 当前登录用户状态（token）
    // user: null // 当前登录用户状态（token）
  },
  mutations: {
    // 登录成功和退出登录都会调用
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      // 为了避免页面刷新数据丢失，我们这里使用本地存储进行 **持久化**
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    },

    // 添加缓存页面
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },

    // 移除缓存页面
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
