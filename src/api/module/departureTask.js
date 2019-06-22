// 出车任务的api
import http from '@/utils/http'
const taskInfoAdmin = {
    taskInfoPage(form) {
    return http.get('/taskInfo/page', {
      params: form
    })
  },
  taskInfoAdd(params) {
    return http.post('/taskInfo/create', params)
  },
  taskInfoDeletes(ids) {
    return http.post(`/taskInfo/deleteBatch/${ids}`)
  },
  taskInfoFindId(id) {
    return http.get(`/taskInfo/findById/${id}`)
  },
  taskInfoUpdate(id, form) {
    return http.post(`/taskInfo/update/${id}`, form)
  }
}

export default taskInfoAdmin
