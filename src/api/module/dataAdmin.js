import http from '@/utils/http'
const dataAdmin = {
  // 数据解析
  analysisPage(form) { // 获取列表
    return http.get('/analysis/page', {
      params: form
    })
  },
  analysisDeletes(ids) { // 删除列表数据
    return http.post(`/analysis/deleteBatch/${ids}`)
  },
  analysisFindId(id) { // 查询列表数据
    return http.get(`/analysis/findById/${id}`)
  },
  // 原始解析
  originalPage(form) { // 获取列表
    return http.get('/original/page', {
      params: form
    })
  },
  originalDeletes(ids) { // 删除列表数据
    return http.post(`/original/deleteBatch/${ids}`)
  },
  originalFindId(id) { // 查询列表数据
    return http.get(`/original/findById/${id}`)
  },
  // gps
  gpsPage(form) { // 获取列表
    return http.get('/gps/page', {
      params: form
    })
  },
  gpsDeletes(ids) { // 删除列表数据
    return http.post(`/gps/deleteBatch/${ids}`)
  },
  gpsFindId(id) { // 查询列表数据
    return http.get(`/gps/findById/${id}`)
  },
  // 主机操作数据
  operRecordPage(form) { // 获取列表
    return http.get('/hostOperRecord/page', {
      params: form
    })
  },
  operRecordDeletes(ids) { // 删除列表数据
    return http.post(`/hostOperRecord/deleteBatch/${ids}`)
  },
  operRecordFindId(id) { // 查询列表数据
    return http.get(`/hostOperRecord/${id}`)
  },
  // json数据
  connPage(form) { // 获取列表
    return http.get('/hostConnData/page', {
      params: form
    })
  },
  connDeletes(ids) { // 删除列表数据
    return http.post(`/hostConnData/deleteBatch/${ids}`)
  },
  connFindId(id) { // 查询列表数据
    return http.get(`/hostConnData/${id}`)
  }
}

export default dataAdmin
