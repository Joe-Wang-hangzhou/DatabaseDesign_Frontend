import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由（仅保留必要基础页面）
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/system/sqlConsole',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/sqlConsole/index'),
        name: 'SqlConsole',
        meta: { title: 'SQL语句控制台', icon: 'code' }
      }
    ]
  },
  {
    path: '/system/collegeofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/collegeofSc/index'),
        name: 'CollegeofSc',
        meta: { title: '学院', icon: 'education' }
      }
    ]
  },
  {
    path: '/system/classofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/classofSc/index'),
        name: 'ClassofSc',
        meta: { title: '班级', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/system/majorofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/majorofSc/index'),
        name: 'MajorofSc',
        meta: { title: '专业', icon: 'skill' }
      }
    ]
  },
  {
    path: '/system/studentofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/studentofSc/index'),
        name: 'StudentofSc',
        meta: { title: '学生', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/system/teacherofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/teacherofSc/index'),
        name: 'TeacherofSc',
        meta: { title: '教师', icon: 'user' }
      }
    ]
  },
  {
    path: '/system/courseofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/courseofSc/index'),
        name: 'CourseofSc',
        meta: { title: '课程', icon: 'education' }
      }
    ]
  },
  {
    path: '/system/enrollmentofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/enrollmentofSc/index'),
        name: 'EnrollmentofSc',
        meta: { title: '选课', icon: 'list' }
      }
    ]
  },
  {
    path: '/system/scoreofSC',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/scoreofSC/index'),
        name: 'ScoreofSC',
        meta: { title: '成绩', icon: 'chart' }
      }
    ]
  },
  {
    path: '/system/teachingofSc',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/system/teachingofSc/index'),
        name: 'TeachingofSc',
        meta: { title: '授课', icon: 'education' }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  }
]

// 动态路由，基于用户权限动态去加载（当前项目不再使用额外隐藏功能路由）
export const dynamicRoutes = []

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
