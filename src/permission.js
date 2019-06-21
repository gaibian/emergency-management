import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 把前端的路由表存储到后端 由后端返回
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch('permission/generateRoutes', [])
        router.addRoutes(accessRoutes)
        next()
      }
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      // console.log(hasRoles)
      // if(hasRoles) {
      //   next()
      // }else{
      //   console.log('进来了')
      //   const accessRoutes = await store.dispatch('permission/generateRoutes', [])
      //     router.addRoutes(accessRoutes)
      //     next()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // const hasToken = getToken()
  // 不是登录页进来的话，还是需要动态的加载路由的
})

router.afterEach(() => {
  NProgress.done()
})
