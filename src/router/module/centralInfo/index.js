
import Layout from '@/layout'
export const centralInfo = {
  path: '/center-info',
  component: Layout,
  meta: { title: '中心信息', icon: 'firstAidCenter' },
  children: [{
    path: 'centralInfo',
    name: 'centralInfo',
    component: () => import('@/views/central-info/central-info.vue'),
    meta: { title: '中心信息', icon: 'firstAidCenter' }
  }] }
