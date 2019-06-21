import Layout from '@/layout'
export const carArticle = {
  path: '/car-article',
  component: Layout,
  meta: { title: '车载物品', icon: 'goods' },
  children: [{
    path: 'carArticleInfo',
    name: 'carArticleInfo',
    component: () => import('@/views/car-article/car-article-info.vue'),
    meta: { title: '物品信息', icon: 'goods' }
  },
  {
    path: 'carArticleChange',
    name: 'carArticleChange',
    component: () => import('@/views/car-article/car-article-change.vue'),
    meta: { title: '物品变动记录', icon: 'goods' }
  },
  {
    path: 'carArticleWarn',
    name: 'carArticleWarn',
    component: () => import('@/views/car-article/car-article-warn.vue'),
    meta: { title: '物品告警记录', icon: 'goods' }
  },
  {
    path: 'carArticleWarninfo',
    name: 'carArticleWarninfo',
    component: () => import('@/views/car-article/car-article-warninfo.vue'),
    meta: { title: '物品告警信息', icon: 'goods' }
  }] }
