import axios from '@/libs/api.request'

export const getHash = () => {
  return axios.request({
    url: 'Index/getHash',
    method: 'get'
  })
}
