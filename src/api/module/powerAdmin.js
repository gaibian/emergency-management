// 车辆管理的api

import http from '@/utils/http'
const powerAdmin = {
  // 左侧栏目
  powerList(form) {
    return http.get('/permission', {
      params: form
    })
  },
  powerAdd(params) {
    return http.post('/permission', params)
  },
  powerDeletes(ids) {
    return http.delete(`/permission/${ids}`)
  },
  powerFindId(id) {
    return http.get(`/permission/${id}`)
  },
  powerUpdate(id, form) {
    return http.put(`/permission/${id}`, form)
  }
}

export default powerAdmin
