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

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (!token && to.name === 'login') {
    next()
  } else if (token && to.name === 'login') {
    next({
      name: 'home'
    })
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
      next({
        name: 'login'
      })
    })
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
