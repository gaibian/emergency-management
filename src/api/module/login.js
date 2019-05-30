import http from '@/utils/http'
import base from '../base'
export default function login (data){
  return http.get('url',data)
}

