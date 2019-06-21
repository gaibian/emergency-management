// 中心任务记录的api
import http from '@/utils/http'
const taskRecord = {
  // 左侧栏目
  zteTaskList(form) { // 获取任务记录列表
    return http.get('/zteTask/list', {
      params: form
    })
  },
  zteTaskAdd(params) { // 添加任务记录列表数据
    return http.post('/zteTask/create', params)
  },
  zteTaskFindId(id) { // 查询任务记录列表数据
    return http.get(`/zteTask/findById/${id}`)
  }
}

export default taskRecord
