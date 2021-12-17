import {
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Layout from '@/layout/index.vue'
import {SessionStorage} from '@/store/localstorage'

const routes = [
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect: '/home',
    meta: {
      title: "",
      showLink: true,
      rank: 2
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "D15设备许可证管理后台",
          showLink: true,
          rank: 1
        },
      },
      {
        path: "/gen-license",
        name: "GenLicense",
        component: () => import("@/views/gen-license/index.vue"),
        meta: {
          title: "生成D15 license",
          showLink: true,
          rank: 1
        },
      },
      {
        path: "/license-list",
        name: "LicenseList",
        component: () => import("@/views/license_list/index.vue"),
        meta: {
          title: "许可证列表",
          showLink: true,
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

export default router;
