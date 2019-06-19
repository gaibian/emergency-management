
import Layout from '@/layout'
export const Account = {
  path: '/account',
  component: Layout,
  meta: { title: '权限管理', icon: 'car-admin' },
  children: [
    {
      path: 'accountInfo',
      name: 'accountInfo',
      component: () => import('@/views/account/account-info.vue'),
      meta: { title: '用户信息', icon: 'accountNumber' }
    },{
      path: 'role',
      name: 'roleAdmin',
      component: () => import('@/views/account/role.vue'),
      meta: { title: '角色信息', icon: 'accountNumber' }
    },{
      path: 'power',
      name: 'power',
      component: () => import('@/views/account/power.vue'),
      meta: { title: '权限信息', icon: 'accountNumber' }
    }] 
}