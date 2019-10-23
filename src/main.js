import Vue from 'vue'

import iView from 'view-design'

import './styles/index.less'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from '@/locale'
import config from '@/config'

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
