import { login, logout } from '@/api/wiki'
import { setToken, removeToken } from '@/libs/util'

const state = {
}

const mutations = {
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const { data } = res
        setToken(data.apiAuth)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken()
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
