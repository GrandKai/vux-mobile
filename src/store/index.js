import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const types = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  SET_ACCESS_TOKEN: 'setAccessToken',
  SET_REFRESH_TOKEN: 'setRefreshToken'
}

const state = {
  menus: [],
  accessToken: '',
  refreshToken: ''
}
const getters = {
  // getters 类似计算属性，它的依赖被缓存起来，当依赖改变时会被重新计算（从 session 中获取会不会导致不生效）
  menus: state => sessionStorage.getItem(state.menus) ? sessionStorage.getItem(state.menus) : state.menus,
  accessToken: state => sessionStorage.getItem(state.accessToken) ? sessionStorage.getItem(state.accessToken) : state.accessToken,
  refreshToken: state => sessionStorage.getItem(state.refreshToken) ? sessionStorage.getItem(state.refreshToken) : state.refreshToken
}
const actions = {
  login: ({commit}, menus) => {
    commit(types.LOGIN, menus)
  },
  logout: ({dispatch}) => {
    dispatch(types.LOGOUT)
  },
  setAccessToken: ({commit}, accessToken) => {
    commit(types.SET_ACCESS_TOKEN, accessToken)
  },
  setRefreshToken: ({commit}, refreshToken) => {
    commit(types.SET_REFRESH_TOKEN, refreshToken)
  }
}
const mutations = {
  [types.LOGIN]: (state, menus) => {
    state.menus = menus
  },
  [types.SET_ACCESS_TOKEN]: (state, accessToken) => {
    state.accessToken = accessToken
  },
  [types.SET_REFRESH_TOKEN]: (state, refreshToken) => {
    state.refreshToken = refreshToken
  }
}

// 多个组件共享状态
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
// 导出 store
export default store
