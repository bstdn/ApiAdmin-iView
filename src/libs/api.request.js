import axios from 'axios'
import iView from 'iview'
import { getToken } from '@/libs/util'
import store from '@/store'
import config from '@/config'

export const baseUrl = (process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro) + '/admin'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  interceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      const res = response.data
      if (res.code !== 0) {
        if (res.code === -14) {
          iView.Modal.confirm({
            title: '重新登录',
            content: '你已被登出，可以取消继续留在该页面，或者重新登录',
            okText: '重新登录',
            onOk: () => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            }
          })
        } else {
          iView.Message.error(res.msg)
        }
        throw new Error(res.msg)
      } else {
        return response.data
      }
    }, error => {
      return Promise.reject(error)
    })
  }

  request(options) {
    const instance = axios.create()
    const apiAuth = getToken()
    if (apiAuth === false) {
      options = Object.assign({
        baseURL: this.baseUrl,
        headers: {}
      }, options)
    } else {
      options = Object.assign({
        baseURL: this.baseUrl,
        headers: {
          apiAuth
        }
      }, options)
    }
    this.interceptors(instance)
    return instance(options)
  }
}

const api_axios = new HttpRequest(baseUrl)

export default api_axios
