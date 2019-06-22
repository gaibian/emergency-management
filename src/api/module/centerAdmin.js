// 车辆管理的api

import http from '@/utils/http'
// eslint-disable-next-line no-unused-vars
import qs from 'qs'
// import base from '../base'

const centerAdmin = {
  // 左侧栏目
  centerTreeList(form) {
    return http.get('/centerInfo/tree', {
      params: form
    })
  },
  centerList(form) {
    return http.get('/centerInfo/list', {
      params: form
    })
  },
  centerAdd(params) {
    return http.post('/centerInfo/create', params)
  },
  centerDeletes(ids) {
    return http.post(`/centerInfo/deleteBatch/${ids}`)
  },
  centerFindId(id) {
    return http.get(`/centerInfo/findById/${id}`)
  },
  centerUpdate(id, form) {
    return http.post(`/centerInfo/update/${id}`, form)
  }
}

export default centerAdmin
