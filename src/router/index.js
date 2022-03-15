import {
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Layout from '@/layout/index.vue'
import {SessionStorage} from '@/store/localstorage'
import {useTabsStore} from '@/store/tabs'

const routes = [
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect: '/home',
    meta: {
      title: "",
      tabbed: true,
      rank: 2
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "许可证管理后台",
          tabbed: true,
          rank: 1
        },
      },
      {
        path: "/gen-license",
        name: "GenLicense",
        component: () => import("@/views/gen-license/index.vue"),
        meta: {
          title: "生成 license",
          tabbed: true,
          rank: 1
        },
      },
      {
        path: "/license-list",
        name: "LicenseList",
        component: () => import("@/views/license_list/index.vue"),
        meta: {
          title: "许可证列表",
          tabbed: true,
          rank: 1
        },
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      tabbed: false
    },
  }
]

// 创建路由实例
export const router = createRouter({
  history: createWebHashHistory(),
  //routes: filterTree(ascending(constantRoutes)).concat(...remainingRouter),
  routes
});
const whiteList = ['/login']

// 跳转检查
router.beforeEach((to, _from, next) => {
  window.document.title = to.meta.title
  if(! whiteList.includes(to.path)) {
    // 需要检查权限
    const adminInfo = SessionStorage.get('info')
    if( adminInfo === null) {
      next({ path: "/login" });
    }
  }
  next()
})

// 跳转后
router.afterEach((to, from) => {
  //
  let saveFlag = true
  if(to.meta.tabbed) {
    let tabsStore = useTabsStore()
    tabsStore.opened.forEach( item => {
      if(item.fullPath == to.fullPath) {
        saveFlag = false
        tabsStore.currentSet(to.fullPath)
      }
    })
    if(saveFlag) {
      tabsStore.add({tag: {name: to.name, meta: to.meta}, params: to.params, fullPath: to.fullPath})
    }
  }
  //
})

export default router;
