// 车辆告警的api

import http from '@/utils/http'
// import qs from 'qs'
// import base from '../base'

const carWare = {
  carWareList(form) {
    return http.get('/carAlarmInfo/page', {
      params: form
    })
  }
}

export default carWare
