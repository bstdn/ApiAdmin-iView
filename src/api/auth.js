import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: '/Auth/index',
    method: 'get',
    params
  })
}

export const changeStatus = (status, id) => {
  return axios.request({
    url: '/Auth/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: '/Auth/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: '/Auth/edit',
    method: 'post',
    data
  })
}

export const del = (id) => {
  return axios.request({
    url: '/Auth/del',
    method: 'get',
    params: {
      id
    }
  })
}

export const delMember = (params) => {
  return axios.request({
    url: '/Auth/delMember',
    method: 'get',
    params
  })
}

export const getGroups = () => {
  return axios.request({
    url: '/Auth/getGroups',
    method: 'get'
  })
}

export const getRuleList = (params) => {
  return axios.request({
    url: '/Auth/getRuleList',
    method: 'get',
    params
  })
}
