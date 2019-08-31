import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: 'InterfaceGroup/index',
    method: 'get',
    params
  })
}

export const changeStatus = (status, id) => {
  return axios.request({
    url: 'InterfaceGroup/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: 'InterfaceGroup/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'InterfaceGroup/edit',
    method: 'post',
    data
  })
}

export const del = (hash) => {
  return axios.request({
    url: 'InterfaceGroup/del',
    method: 'get',
    params: {
      hash
    }
  })
}
