import axios from '@/libs/api.request'

export const getList = (params) => {
  return axios.request({
    url: 'Log/index',
    method: 'get',
    params
  })
}

export const del = (id) => {
  return axios.request({
    url: 'Log/del',
    method: 'get',
    params: {
      id
    }
  })
}
