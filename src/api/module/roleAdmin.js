// 车辆管理的api

import http from '@/utils/http'
const roleAdmin = {
  // 左侧栏目
  roleList(form) {
    return http.get('/role/page', {
      params: form
    })
  },
  roleAdd(params) {
    return http.post('/role/create', params)
  },
  roleDeletes(ids) {
    return http.post(`/role/deleteBatch/${ids}`)
  },
  roleFindId(id) {
    return http.get(`/role/findById/${id}`)
  },
  roleUpdate(id, form) {
    return http.post(`/role/update/${id}`, form)
  }
}

export default roleAdmin
