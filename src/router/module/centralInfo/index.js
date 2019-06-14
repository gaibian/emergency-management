
import Layout from '@/layout'
export const centralInfo = {
  path: '/central-info',
  component: Layout,
  meta: { title: '中心信息', icon: 'firstAidCenter' },
  children: [{
    path: 'centralinfo',
    name: 'centralinfo',
    component: () => import('@/views/central-info/central-info.vue'),
    meta: { title: '中心信息', icon: 'firstAidCenter' }
  }] }
