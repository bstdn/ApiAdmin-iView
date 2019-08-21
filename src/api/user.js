import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/Login/index',
    method: 'post',
    data
  })
}

export const getInfo = (token) => {
  return axios.request({
    url: '/Login/getUserInfo',
    method: 'get',
    params: {
      token
    }
  })
}

export const logout = () => {
  return axios.request({
    url: '/Login/logout',
    method: 'get'
  })
}
