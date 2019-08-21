<template>
  <Layout style="height: 100%" class="main">
    <Sider v-model="collapsed" hide-trigger collapsible :width="256" :collapsed-width="64" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu ref="sideMenu" accordion :active-name="$route.name" :collapsed="collapsed" :menu-list="menuList" @on-select="turnToPage">
        <div class="logo-con">
          <img v-show="!collapsed" key="max-logo" :src="maxLogo">
          <img v-show="collapsed" key="min-logo" :src="minLogo">
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avatar="userAvatar" />
          <language v-if="$config.useI18n" style="margin-right: 10px;" :lang="local" @on-lang-change="setLocal" />
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;" />
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" :list="tagNavList" @input="handleClick" @on-close="handleCloseTag" />
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view />
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper" />
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { mapMutations } from 'vuex'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Language from './components/language'
import Fullscreen from './components/fullscreen'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import routers from '@/router/routers'
import { getNewTagList, routeEqual } from '@/libs/util'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    User,
    ABackTop,
    Language,
    Fullscreen
  },
  data() {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    userAvatar() {
      return this.$store.state.user.userInfo.avatar
    },
    cacheList() {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
    menuList() {
      return this.$store.getters['app/menuList']
    },
    local() {
      return this.$store.state.app.local
    }
  },
  watch: {
    '$route'(newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted() {
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    this.setLocal(this.$i18n.locale)
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: 'home'
      })
    }
  },
  methods: {
    ...mapMutations('app', [
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    turnToPage(route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange(state) {
      this.collapsed = state
    },
    handleCloseTag(res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage('home')
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick(item) {
      this.turnToPage(item)
    }
  }
}
</script>

<style lang="less">
.main {
  .logo-con {
    height: 64px;
    padding: 10px;

    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }

  .header-con {
    background: #fff;
    padding: 0 20px;
    width: 100%;
  }

  .main-layout-con {
    height: 100%;
    overflow: hidden;
  }

  .main-content-con {
    height: ~"calc(100% - 60px)";
    overflow: hidden;
  }

  .tag-nav-wrapper {
    padding: 0;
    height: 40px;
    background: #F0F0F0;
  }

  .content-wrapper {
    padding: 18px;
    height: ~"calc(100% - 80px)";
    overflow: auto;
  }

  .left-sider {
    .ivu-layout-sider-children {
      overflow-y: scroll;
      margin-right: -18px;
    }
  }
}

.ivu-menu-item > i {
  margin-right: 12px !important;
}

.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
  margin-right: 8px !important;
}

.collased-menu-dropdown {
  width: 100%;
  margin: 0;
  line-height: normal;
  padding: 7px 0 6px 16px;
  clear: both;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }

  & * {
    color: #515a6e;
  }

  .ivu-menu-item > i {
    margin-right: 12px !important;
  }

  .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
  }
}

.ivu-select-dropdown.ivu-dropdown-transfer {
  max-height: 400px;
}
</style>
