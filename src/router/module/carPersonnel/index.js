
import Layout from '@/layout'
export const carPersonnel = {
  path: '/car-personnel',
  component: Layout,
  meta: { title: '车载工作人员', icon: 'personnel' },
  children: [{
    path: 'carPersonnelInfo',
    name: 'carPersonnelInfo',
    component: () => import('@/views/car-personnel/car-personnel-info.vue'),
    meta: { title: '人员信息', icon: 'peoples' }
  }] }
