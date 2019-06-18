import http from '@/utils/http'
import qs from 'qs'
import base from '../base'

const aidIndex = {
  // 左侧栏目
  aidBase(params) {
    return http.get('url', {
      params: params
    })
  }
}

export default aidIndex
