
import Layout from '@/layout'
export const carAdmin = {
  path: '/car-admin',
  component: Layout,
  meta: { title: '车辆管理', icon: 'car-admin' },
  children: [
    {
      path: 'carAdmin',
      name: 'carAdmin',
      component: () => import('@/views/car-admin/car-info.vue'),
      meta: { title: '车辆信息', icon: 'car-info' },
    },
    {
      path: 'gisInfo',
      name: 'gisInfo',
      component: () => import('@/views/car-admin/GIS-info.vue'),
      meta: { title: 'GIS实时信息', icon: 'car-location' }
    },
    {
      path: 'wheelPath',
      name: 'wheelPath',
      component: () => import('@/views/car-admin/wheel-path.vue'),
      meta: { title: '行车轨迹', icon: 'car-locus' }
    },] }