
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
  },
  {
    path: 'carPersonnelRecord',
    name: 'carPersonnelRecord',
    component: () => import('@/views/car-personnel/car-personnel-Record.vue'),
    meta: { title: '考勤刷卡记录', icon: 'checkWorkAttendance' }
}] }
