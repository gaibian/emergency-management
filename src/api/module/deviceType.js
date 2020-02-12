// 设备类型的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const deviceTypeInfo = {
  deviceTypePage(form) {
    return http.get('/deviceType/page', {
      params: form
    })
  },
  deviceTypeAdd(params) {
    return http.post('/deviceType/create', params)
  },
  deviceTypeDeletes(ids) {
    return http.post(`/deviceType/deleteBatch/${ids}`)
  },
  deviceTypeFindId(id) {
    return http.get(`/deviceType/findById/${id}`)
  },
  deviceTypeUpdate(id, form) {
    return http.post(`/deviceType/update/${id}`, form)
  }
}

export default deviceTypeInfo
