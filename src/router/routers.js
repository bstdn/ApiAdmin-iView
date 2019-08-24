import Main from '@/components/main'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/index')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      },
      {
        path: '/user-center',
        name: 'user_center',
        meta: {
          hideInMenu: true,
          title: '个人中心',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/own/index')
      }
    ]
  },
  {
    path: '/system',
    name: 'system_setting',
    meta: {
      icon: 'ios-build',
      title: '系统配置'
    },
    component: Main,
    children: [
      {
        path: 'menu',
        name: 'menu_setting',
        meta: {
          icon: 'md-menu',
          title: '菜单维护'
        },
        component: () => import('@/view/system/menu')
      },
      {
        path: 'user',
        name: 'user_setting',
        meta: {
          icon: 'ios-people',
          title: '用户管理'
        },
        component: () => import('@/view/system/user')
      },
      {
        path: 'log',
        name: 'logs',
        meta: {
          icon: 'md-clipboard',
          title: '操作日志'
        },
        component: () => import('@/view/system/log')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404')
  }
]
