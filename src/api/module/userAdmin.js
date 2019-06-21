// 车辆管理的api

import http from '@/utils/http'
const userAdmin = {
  // 左侧栏目
  userList(form) {
    return http.get('/userExpand/list', {
      params: form
    })
  },
  userAdd(params) {
    return http.post('/userExpand/create', params)
  },
  userDeletes(ids) {
    return http.post(`/userExpand/deleteBatch/${ids}`)
  },
  userFindId(id) {
    return http.get(`/userExpand/findById/${id}`)
  },
  userUpdate(id, form) {
    return http.post(`/userExpand/update/${id}`, form)
  },
  userRegsiter(data) {
    return http.post('/userExpand/regsiter', data)
  }
}

export default userAdmin
