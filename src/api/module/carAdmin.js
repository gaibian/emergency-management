// 车辆管理的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const carAdmin = {
  // 左侧栏目
  carList(form) { // 获取列表
    return http.get('/carInfo/list', {
      params: form
    })
  },
  carAdd(params) { // 添加列表数据
    return http.post('/carInfo/create', params)
  },
  carDeletes(ids) { // 删除列表数据
    return http.post(`/carInfo/deleteBatch/${ids}`)
  },
  carFindId(id) { // 查询列表数据
    return http.get(`/carInfo/findById/${id}`)
  },
  carUpdate(id, form) { // 更新列表数据
    return http.post(`/carInfo/update/${id}`, form)
  }
}

export default carAdmin
