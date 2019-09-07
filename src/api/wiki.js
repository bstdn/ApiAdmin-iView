import axios from '@/libs/wiki.request'

export const login = (data) => {
  return axios.request({
    url: 'Api/login',
    method: 'post',
    data
  })
}

export const apiGroup = () => {
  return axios.request({
    url: 'Api/groupList',
    method: 'get'
  })
}

export const errorCode = () => {
  return axios.request({
    url: 'Api/errorCode',
    method: 'get'
  })
}

export const detail = (params) => {
  return axios.request({
    url: 'Api/detail',
    method: 'get',
    params
  })
}

export const logout = () => {
  return axios.request({
    url: 'Api/logout',
    method: 'get'
  })
}
