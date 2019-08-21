import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import routers from '@/router/routers'
import router from '@/router'

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

const state = {
  breadCrumbList: [],
  tagNavList: [],
  homeRoute: {},
  local: localRead('local')
}

const getters = {
  menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.userInfo.access)
}

const mutations = {
  setBreadCrumb(state, route) {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
  },
  setHomeRoute(state, routes) {
    state.homeRoute = getHomeRoute(routes, 'home')
  },
  setTagNavList(state, list) {
    let tagList = []
    if (list) {
      tagList = [...list]
    } else tagList = getTagNavListFromLocalstorage() || []
    if (tagList[0] && tagList[0].name !== 'home') tagList.shift()
    const homeTagIndex = tagList.findIndex(item => item.name === 'home')
    if (homeTagIndex > 0) {
      const homeTag = tagList.splice(homeTagIndex, 1)[0]
      tagList.unshift(homeTag)
    }
    state.tagNavList = tagList
    setTagNavListInLocalstorage([...tagList])
  },
  closeTag(state, route) {
    const tag = state.tagNavList.filter(item => routeEqual(item, route))
    route = tag[0] ? tag[0] : null
    if (!route) return
    closePage(state, route)
  },
  addTag(state, { route, type = 'unshift' }) {
    const router = getRouteTitleHandled(route)
    if (!routeHasExist(state.tagNavList, router)) {
      if (type === 'push') state.tagNavList.push(router)
      else {
        if (router.name === 'home') state.tagNavList.unshift(router)
        else state.tagNavList.splice(1, 0, router)
      }
      setTagNavListInLocalstorage([...state.tagNavList])
    }
  },
  setLocal(state, lang) {
    localSave('local', lang)
    state.local = lang
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
