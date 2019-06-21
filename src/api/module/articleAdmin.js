// 车辆物品管理的api
import http from '@/utils/http'
const articleAdmin = {
  // 左侧栏目
  articleList(form) { // 获取列表
    return http.get('/articleInfo/list', {
      params: form
    })
  },
  articleAdd(params) { // 添加列表数据
    return http.post('/articleInfo/create', params)
  },
  articleDeletes(ids) { // 删除列表数据
    return http.post(`/articleInfo/deleteBatch/${ids}`)
  },
  articleFindId(id) { // 查询列表数据
    return http.get(`/articleInfo/findById/${id}`)
  },
  articleUpdate(id, form) { // 更新列表数据
    return http.post(`/articleInfo/update/${id}`, form)
  }
}

export default articleAdmin
