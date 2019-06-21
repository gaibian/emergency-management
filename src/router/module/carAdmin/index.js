
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
      meta: { title: '车辆信息', icon: 'car-info' }
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
    }, {
      path: 'carCollection',
      name: 'carCollection',
      component: () => import('@/views/car-admin/car-collection.vue'),
      meta: { title: '车辆实时采集点信息', icon: 'pointInfo' }
    }, {
      path: 'carWare',
      name: 'carWare',
      component: () => import('@/views/car-admin/car-ware.vue'),
      meta: { title: '车辆告警信息', icon: 'taskRealTime' }
    }] }
