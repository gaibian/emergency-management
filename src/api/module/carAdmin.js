// 车辆管理的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const carAdmin = {
  // 左侧栏目
  carList(form) {
    return http.get('/carInfo/list', {
      params: form
    })
  },
  carAdd(params) {
    return http.post('/carInfo/create', params)
  },
  carDeletes(ids) {
    return http.post(`/carInfo/deleteBatch/${ids}`)
  },
  carFindId(id) {
    return http.get(`/carInfo/findById/${id}`)
  },
  carUpdate(id, form) {
    return http.post(`/carInfo/update/${id}`, form)
  }
}

export default carAdmin
