
import Layout from '@/layout'
export const dataAdmin = {
  path: '/data-admin',
  component: Layout,
  meta: { title: '主机数据管理', icon: 'firstAidCenter' },
  children: [{
    path: 'dataAna',
    name: 'dataAna',
    component: () => import('@/views/dataAdmin/dataAna.vue'),
    meta: { title: '数据解析', icon: 'firstAidCenter' }
  }, {
    path: 'dataOri',
    name: 'dataOri',
    component: () => import('@/views/dataAdmin/dataOri.vue'),
    meta: { title: '原始数据', icon: 'firstAidCenter' }
  }, {
    path: 'dataGps',
    name: 'dataGps',
    component: () => import('@/views/dataAdmin/dataGps.vue'),
    meta: { title: 'gps数据', icon: 'firstAidCenter' }
  }, {
    path: 'operRecord',
    name: 'operRecord',
    component: () => import('@/views/dataAdmin/operRecord.vue'),
    meta: { title: '主机操作记录', icon: 'firstAidCenter' }
  }, {
    path: 'dataConn',
    name: 'dataConn',
    component: () => import('@/views/dataAdmin/dataConn.vue'),
    meta: { title: '记录数据', icon: 'firstAidCenter' }
  }] }
