import http from '@/utils/http'
const hostAdmin = {
  // 左侧栏目
  hostPage(form) {  // 获取列表
    return http.get('/dataHost/page', {
      params: form
    })
  },
  hostList() {  // 获取列表
    return http.get('/dataHost/list')
  },
  hostAdd(params) {  // 添加列表数据
    return http.post('/dataHost/create', params)
  },
  hostDeletes(ids) {  // 删除列表数据
    return http.post(`/dataHost/deleteBatch/${ids}`)
  },
  hostFindId(id) {  // 查询列表数据
    return http.get(`/dataHost/findById/${id}`)
  },
  hostUpdate(id, form) {  //更新列表数据
    return http.post(`/dataHost/update/${id}`, form)
  },

  // => 主机绑定卡片
  hostBindList(form) { 
    return http.get('/hostbindCard/page', {
      params: form
    })
  },
  hostBindAdd(params) {  
    return http.post('/hostbindCard/create', params)
  },
  hostBindDeletes(ids) { 
    return http.post(`/hostbindCard/deleteBatch/${ids}`)
  },
  hostBindFindId(id) {  
    return http.get(`/hostbindCard/findById/${id}`)
  },
  hostBindUpdate(id, form) { 
    return http.post(`/hostbindCard/update/${id}`, form)
  },
  hostUnBind(id) {
    return http.get(`/hostbindCard/unbind/${id}`)
  },

  //=> 绑定卡片记录
  hostBindRecordList(form) { 
    return http.get('/bindCardRecord/page', {
      params: form
    })
  },
  hostBindRecordAdd(params) {  
    return http.post('/bindCardRecord/create', params)
  },
  hostBindRecordDeletes(ids) { 
    return http.post(`/bindCardRecord/deleteBatch/${ids}`)
  },
  hostBindRecordFindId(id) {  
    return http.get(`/bindCardRecord/findById/${id}`)
  },
  hostBindRecordUpdate(id, form) { 
    return http.post(`/bindCardRecord/update/${id}`, form)
  },

}

export default hostAdmin
