import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, setTitle } from '@/libs/util'
import { oneOf } from '@/libs/tools'

Vue.use(Router)

const router = new Router({
  // mode: 'history', // require service support
  routes: routes
})

const whiteList = ['/login', '/wiki/login']

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (getToken()) {
    if (to.path.indexOf('/wiki') === -1) {
      if (to.path === '/login') {
        next({ path: '/' })
        iView.LoadingBar.finish()
      } else {
        store.dispatch('user/getInfo').then(user => {
          if (to.meta && to.meta.access) {
            if (oneOf(to.meta.access, user.access)) {
              next()
            } else {
              next({ replace: true, name: 'error_401' })
            }
          } else {
            next()
          }
        }).catch(() => {
          setToken('')
          next(`/login?redirect=${to.path}`)
          iView.LoadingBar.finish()
        })
      }
    } else {
      if (to.path === '/wiki/login') {
        next({ path: '/wiki/list' })
        iView.LoadingBar.finish()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (to.path.indexOf('/wiki') === -1) {
        next(`/login?redirect=${to.path}`)
      } else {
        next(`/wiki/login?redirect=${to.path}`)
      }
      iView.LoadingBar.finish()
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
