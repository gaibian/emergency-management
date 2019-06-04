
import Layout from '@/layout'
export const Account = {
  path: '/account',
  component: Layout,
  meta: { title: '账号管理', icon: 'car-admin' },
  children: [
    {
      path: 'accountInfo',
      name: 'Account',
      component: () => import('@/views/account/account-info.vue'),
      meta: { title: '账号信息', icon: 'car-info' },
    }] }