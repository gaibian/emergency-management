
import Layout from '@/layout'
export const carArticle = {
  path: '/car-article',
  component: Layout,
  meta: { title: '车载物品管理', icon: 'excel' },
  children: [{
    path: 'carArticleInfo',
    name: 'carArticleInfo',
    component: () => import('@/views/car-article/car-article-info.vue'),
    meta: { title: '车辆物品实时信息', icon: 'excel' }
  },
  {
    path: 'carArticleChange',
    name: 'carArticleChange',
    component: () => import('@/views/car-article/car-article-change.vue'),
    meta: { title: '车辆物品变动记录', icon: 'excel' }
  },
  {
    path: 'carArticleWarn',
    name: 'carArticleWarn',
    component: () => import('@/views/car-article/car-article-warn.vue'),
    meta: { title: '车辆物品告警信息', icon: 'excel' }
  }] }
