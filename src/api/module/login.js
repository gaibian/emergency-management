import http from '@/utils/http'
import base from '../base'

const login = {
  login(data) {
    return http.post('/auth/login',data)
  },
  logout() {
    return http.post('/auth/logout')
  }
}
export default login


