// 用户的api
import qs from 'qs'

import http from '@/utils/http'
const userAdmin = {
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
  },
  // 用户关联角色
  userGrant(id,data) {
    return http.post(`/userExpand/grant/${id}`,qs.stringify(data))
  }
}

export default userAdmin
