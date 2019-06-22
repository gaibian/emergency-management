// 车辆管理的api
import qs from 'qs'
import http from '@/utils/http'
const roleAdmin = {
  // 左侧栏目
  rolePage(form) {
    return http.get('/role/page', {
      params: form
    })
  },
  roleList(id){
    return http.get(`/role/list/${id}`)
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
  },
  // 角色关联资源
  roleGrant(id,form) {
    return http.post(`/role/grant/${id}`,qs.stringify(form))
  }
}

export default roleAdmin
