import axios from 'axios'
import iView from 'iview'
import { getToken } from '@/libs/util'
import store from '@/store'

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
      if (res.code !== 20000) {
        if (res.code === 50014) {
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
          iView.Message.error(res.message)
        }
        throw new Error(res.message)
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

export default HttpRequest
