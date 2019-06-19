// 车辆管理的api

import http from '@/utils/http'
const roleAdmin = {
  // 左侧栏目
  roleList(form) {
    return http.get('/role', {
      params: form
    })
  },
  roleAdd(params) {
    return http.post('/role', params)
  },
  roleDeletes(ids) {
    return http.delete(`/role/${ids}`)
  },
  roleFindId(id) {
    return http.get(`/role/${id}`)
  },
  roleUpdate(id, form) {
    return http.put(`/role/${id}`, form)
  }
}

export default roleAdmin
