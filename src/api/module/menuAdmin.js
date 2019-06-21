// 车辆管理的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const carAdmin = {
  // 左侧栏目
  menuList(form) {  // 获取列表
    return http.get('/resource/list',{
        params:form
    })
  },
  menuAdd(params) {  // 添加列表数据
    return http.post('/resource/create', params)
  },
  menuDeletes(ids) {  // 删除列表数据
    return http.post(`/resource/deleteBatch/${ids}`)
  },
  menuFindId(id) {  // 查询列表数据
    return http.get(`/resource/findById/${id}`)
  },
  menuUpdate(id, form) {  //更新列表数据
    return http.post(`/resource/update/${id}`, form)
  }
}

export default carAdmin
