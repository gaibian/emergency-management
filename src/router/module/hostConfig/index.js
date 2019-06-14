
import Layout from '@/layout'
export const hostConfig = {
  path: '/host-config',
  component: Layout,
  meta: { title: '主机配置', icon: 'hostConfig' },
  children: [{
    path: 'hostList',
    name: 'hostList',
    component: () => import('@/views/hostConfig/hostList.vue'),
    meta: { title: '主机列表', icon: 'hostConfig' }
  }] }
