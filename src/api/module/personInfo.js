// 人员信息的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const personInfo = {
  personList(form) {
    return http.get('/person/list', {
      params: form
    })
  },
  personAdd(params) {
    return http.post('/person/create', params)
  },
  personDeletes(ids) {
    return http.post(`/person/deleteBatch/${ids}`)
  },
  personFindId(id) {
    return http.get(`/person/findById/${id}`)
  },
  personUpdate(id, form) {
    return http.post(`/person/update/${id}`, form)
  }
}

export default personInfo
