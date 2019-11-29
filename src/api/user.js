import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: 'Login/index',
    method: 'post',
    data
  })
}

export const getInfo = () => {
  return axios.request({
    url: 'Login/getUserInfo',
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: 'Login/logout',
    method: 'get'
  })
}

export const getList = (params) => {
  return axios.request({
    url: 'User/index',
    method: 'get',
    params
  })
}

export const changeStatus = (status, id) => {
  return axios.request({
    url: 'User/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export const add = (data) => {
  return axios.request({
    url: 'User/add',
    method: 'post',
    data
  })
}

export const edit = (data) => {
  return axios.request({
    url: 'User/edit',
    method: 'post',
    data
  })
}

export const del = (id) => {
  return axios.request({
    url: 'User/del',
    method: 'get',
    params: {
      id
    }
  })
}

export const own = (data) => {
  return axios.request({
    url: 'User/own',
    method: 'post',
    data
  })
}

export const getUsers = (params) => {
  return axios.request({
    url: 'User/getUsers',
    method: 'get',
    params
  })
}
