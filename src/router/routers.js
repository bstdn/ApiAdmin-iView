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
        name: 'OwnIndex',
        meta: {
          hideInMenu: true,
          title: '个人中心',
          notCache: true,
          icon: 'md-home',
          access: 'admin/User/own'
        },
        component: () => import('@/view/single-page/own/index')
      }
    ]
  },
  {
    path: '/system',
    name: 'SystemSetting',
    meta: {
      icon: 'ios-build',
      title: '系统配置',
      access: ['admin/Menu/index', 'admin/User/index', 'admin/Auth/index', 'admin/Log/index']
    },
    component: Main,
    children: [
      {
        path: 'menu',
        name: 'SystemMenu',
        meta: {
          icon: 'md-menu',
          title: '菜单维护',
          access: 'admin/Menu/index'
        },
        component: () => import('@/view/system/menu')
      },
      {
        path: 'user',
        name: 'SystemUser',
        meta: {
          icon: 'ios-people',
          title: '用户管理',
          access: 'admin/User/index'
        },
        component: () => import('@/view/system/user')
      },
      {
        path: 'auth',
        name: 'SystemAuth',
        meta: {
          icon: 'md-lock',
          title: '权限管理',
          access: 'admin/Auth/index'
        },
        component: () => import('@/view/system/auth')
      },
      {
        path: 'log',
        name: 'SystemLog',
        meta: {
          icon: 'md-clipboard',
          title: '操作日志',
          access: 'admin/Log/index'
        },
        component: () => import('@/view/system/log')
      }
    ]
  },
  {
    path: '/401',
    name: 'Error401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401')
  },
  {
    path: '/500',
    name: 'Error500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500')
  },
  {
    path: '*',
    name: 'Error404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404')
  }
]
