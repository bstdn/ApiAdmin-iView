import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: 'App/index',
    method: 'get',
    params
  })
}

export const changeStatus = (status, id) => {
  return axios.request({
    url: 'App/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: 'App/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'App/edit',
    method: 'post',
    data
  })
}

export const del = (id) => {
  return axios.request({
    url: 'App/del',
    method: 'get',
    params: {
      id
    }
  })
}

export const getAppInfo = (id) => {
  return axios.request({
    url: 'App/getAppInfo',
    method: 'get',
    params: {
      id
    }
  })
}

export const refreshAppSecretApi = () => {
  return axios.request({
    url: 'App/refreshAppSecret',
    method: 'get'
  })
}
