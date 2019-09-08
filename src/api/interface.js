import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: 'InterfaceList/index',
    method: 'get',
    params
  })
}

export const changeStatus = (status, hash) => {
  return axios.request({
    url: 'InterfaceList/changeStatus',
    method: 'get',
    params: {
      status,
      hash
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: 'InterfaceList/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'InterfaceList/edit',
    method: 'post',
    data
  })
}

export const del = (hash) => {
  return axios.request({
    url: 'InterfaceList/del',
    method: 'get',
    params: {
      hash
    }
  })
}

export const refresh = () => {
  return axios.request({
    url: 'InterfaceList/refresh',
    method: 'get'
  })
}
