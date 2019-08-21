import Vue from 'vue'

import iView from 'iview'

import './styles/index.less'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from '@/locale'
import config from '@/config'

if (process.env.NODE_ENV !== 'production') {
  require('./mock')
}

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
