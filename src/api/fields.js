import axios from '@/libs/api.request'

export const getRequest = (params) => {
  return axios.request({
    url: 'Fields/request',
    method: 'get',
    params
  })
}

export const getResponse = (params) => {
  return axios.request({
    url: 'Fields/response',
    method: 'get',
    params
  })
}

export const upJson = (data) => {
  return axios.request({
    url: 'Fields/upload',
    method: 'post',
    data
  })
}

export const add = (data) => {
  return axios.request({
    url: 'Fields/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'Fields/edit',
    method: 'post',
    data
  })
}

export const del = (id) => {
  return axios.request({
    url: 'Fields/del',
    method: 'get',
    params: {
      id
    }
  })
}
