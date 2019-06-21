import http from '@/utils/http'
// eslint-disable-next-line no-unused-vars
import base from '../base'

const login = {
  login(data) {
    return http.post('/auth/login', data)
  },
  logout() {
    return http.post('/auth/logout')
  },
  regsiter(data) {
    return http.post('/auth/regsiter', data)
  }
}
export default login
