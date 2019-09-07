import axios from '@/libs/wiki.request'

export const login = (data) => {
  return axios.request({
    url: 'Api/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return axios.request({
    url: 'Api/logout',
    method: 'get'
  })
}
