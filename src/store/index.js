import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/util/storage'

Vue.use(Vuex)

const USER_KEY = "toutiao-user"

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),//当前登录用户的登录状态(token等数据)

    cachePages: ['LayOut'],
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 数据持久化
      setItem(USER_KEY, state.user)
    },

    // 添加缓存页面
    addCachePages(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓存页面
    removeCachePages(state, pageName) {
      if (state.cachePages.indexOf(pageName) !== -1) {
        state.cachePages.splice(state.cachePages.indexOf(pageName), 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
