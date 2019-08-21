import { login, getInfo, logout } from '@/api/user'
import { setToken, getToken, removeToken } from '@/libs/util'

const state = {
  userInfo: {},
  token: getToken()
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password
      }).then(res => {
        const { data } = res
        commit('setToken', data.token)
        setToken(data.token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getInfo({ state, commit }) {
    if (JSON.stringify(state.userInfo) !== '{}') {
      return state.userInfo
    } else {
      return new Promise((resolve, reject) => {
        try {
          getInfo(state.token).then(res => {
            const { data } = res
            commit('setUserInfo', data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('setUserInfo', {})
        commit('setToken', '')
        removeToken()
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('setToken', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
