import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import usePermissionStore from '@/store/modules/permission'
import { constantRoutes } from './router'

NProgress.configure({ showSpinner: false });

// 标记是否已初始化
let isInitialized = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  
  try {
    // 初始化侧边栏路由（只初始化一次）
    if (!isInitialized) {
      try {
        const permissionStore = usePermissionStore()
        if (permissionStore && permissionStore.sidebarRouters.length === 0) {
          permissionStore.setSidebarRouters(constantRoutes)
          permissionStore.setRoutes(constantRoutes)
        }
      } catch (e) {
        console.warn('Permission store initialization failed:', e)
      }
      isInitialized = true
    }
    
    // 不再动态更新标题，使用 index.html 中的固定标题
  } catch (e) {
    console.error('Route guard error:', e)
  }
  
  // 直接允许访问，不需要任何校验
  next()
})

router.afterEach(() => {
  NProgress.done()
})
