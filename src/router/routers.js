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
    path: '/apps',
    name: 'AppSetting',
    meta: {
      icon: 'md-cloud',
      title: '应用接入',
      access: ['admin/AppGroup/index', 'admin/App/index']
    },
    component: Main,
    children: [
      {
        path: 'appsGroup',
        name: 'AppGroup',
        meta: {
          icon: 'ios-archive',
          title: '应用分组',
          access: 'admin/AppGroup/index'
        },
        component: () => import('@/view/app/group')
      },
      {
        path: 'appsList',
        name: 'AppList',
        meta: {
          icon: 'md-list-box',
          title: '应用列表',
          access: 'admin/App/index'
        },
        component: () => import('@/view/app/list')
      }
    ]
  },

  {
    path: '/interface',
    name: 'InterfaceSetting',
    meta: {
      icon: 'ios-link',
      title: '接口管理',
      access: ['admin/InterfaceGroup/index', 'admin/InterfaceList/index']
    },
    component: Main,
    children: [
      {
        path: 'interfaceGroup',
        name: 'InterfaceGroup',
        meta: {
          icon: 'md-archive',
          title: '接口分组',
          access: 'admin/InterfaceGroup/index'
        },
        component: () => import('@/view/interface/group')
      },
      {
        path: 'interfaceList',
        name: 'InterfaceList',
        meta: {
          icon: 'md-infinite',
          title: '接口列表',
          access: 'admin/InterfaceList/index'
        },
        component: () => import('@/view/interface/list')
      },
      {
        path: 'request/:hash',
        name: 'InterfaceRequest',
        meta: {
          title: '请求参数',
          hideInMenu: true
        },
        component: () => import('@/view/interface/request')
      },
      {
        path: 'response/:hash',
        name: 'InterfaceResponse',
        meta: {
          title: '返回参数',
          hideInMenu: true
        },
        component: () => import('@/view/interface/response')
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
