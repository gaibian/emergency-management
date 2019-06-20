// 打卡记录的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const punchInRecord = {
  punchInRecordList(form) {
    return http.get('/clockRecord/list', {
      params: form
    })
  }
}

export default punchInRecord
