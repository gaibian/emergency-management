
import Layout from '@/layout'

export const centerInfo = {
  path: '/center-info',
  component: Layout,
  meta: { title: '中心信息', icon: 'firstAidCenter' },
  children: [{
    path: 'centerInfo',
    name: 'centerInfo',
    component: () => import('@/views/center-info/center-info.vue'),
    meta: { title: '中心信息', icon: 'firstAidCenter' }
  }] }
