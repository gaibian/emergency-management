// 车辆物品管理的api
import http from '@/utils/http'
const taskNodeAdmin = {
  // 左侧栏目
//   articlePage(form) {  // 获取列表
//     return http.get('/articleInfo/page', {
//       params: form
//     })
//   },
//   articleList() {  // 获取列表
//     return http.get('/articleInfo/list')
//   },
  taskNodeAdd(params) { // 添加列表数据
    return http.post('/taskNode/create', params)
  },
//   articleDeletes(ids) { // 删除列表数据
//     return http.post(`/articleInfo/deleteBatch/${ids}`)
//   },
  taskNodeFindId(id) { // 查询列表数据
    return http.get(`/taskNode/findByTaskId/${id}`)
  },
  taskNodeUpdate(id, form) { // 更新列表数据
    return http.post(`/taskNode/update/${id}`, form)
  }
}

export default taskNodeAdmin
