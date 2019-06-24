
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
    }, {
      path: 'role',
      name: 'roleAdmin',
      component: () => import('@/views/account/role.vue'),
      meta: { title: '角色信息', icon: 'accountNumber' }
    }, {
      path: 'menu',
      name: 'menuAdmin',
      component: () => import('@/views/account/menu.vue'),
      meta: { title: '资源列表', icon: 'accountNumber' }
    }
  ]
}
