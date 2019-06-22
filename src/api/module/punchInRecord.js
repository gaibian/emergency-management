// 打卡记录的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const punchInRecord = {
  punchInRecordList(form) {
    return http.get('/clockRecord/page', {
      params: form
    })
  },
  punchInRecordDeletes(ids) { // 删除列表数据
    return http.post(`/clockRecord/deleteBatch/${ids}`)
  }
}

export default punchInRecord
