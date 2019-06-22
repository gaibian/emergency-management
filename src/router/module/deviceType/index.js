
import Layout from '@/layout'
export const deviceType = {
  path: '/central-info',
  component: Layout,
  meta: { title: '设备类型信息', icon: 'task' },
  children: [{
    path: 'deviceTypeinfo',
    name: 'deviceTypeinfo',
    component: () => import('@/views/device-type/device-typeinfo.vue'),
    meta: { title: '设备类型信息', icon: 'task' }
  }] }
