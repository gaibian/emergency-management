
import Layout from '@/layout'
export const emergencyManagement = {
  path: '/emergency-management',
  component: Layout,
  meta: { title: '急救任务', icon: 'task' },
  children: [{
    path: 'emergency-managementinfo',
    name: 'emergency-managementinfo',
    component: () => import('@/views/emergency-management/emergency-managementinfo.vue'),
    meta: { title: '急救任务记录', icon: 'taskRecord' }
  },
  {
    path: 'emergency-managementintime',
    name: 'emergency-managementintime',
    component: () => import('@/views/emergency-management/emergency-managementintime.vue'),
    meta: { title: '急救任务实时信息', icon: 'taskRealTime' }
  }]
}
