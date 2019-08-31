import axios from '@/libs/api.request'

export const getList = () => {
  return axios.request({
    url: 'Menu/index',
    method: 'get'
  })
}

export const changeStatus = (status, id) => {
  return axios.request({
    url: 'Menu/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: 'Menu/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'Menu/edit',
    method: 'post',
    data
  })
}

export const del = (id) => {
  return axios.request({
    url: 'Menu/del',
    method: 'get',
    params: {
      id
    }
  })
}
