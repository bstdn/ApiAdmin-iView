import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: 'AppGroup/index',
    method: 'get',
    params
  })
}

export const changeStatus = (status, id) => {
  return axios.request({
    url: 'AppGroup/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: 'AppGroup/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'AppGroup/edit',
    method: 'post',
    data
  })
}

export const del = (hash) => {
  return axios.request({
    url: 'AppGroup/del',
    method: 'get',
    params: {
      hash
    }
  })
}
