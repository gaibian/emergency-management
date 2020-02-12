import Cookies from 'js-cookie'
import Lockr from 'lockr'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 在浏览器上存储登录用户的信息
export function setUserInfo(data) {
  let d = {
    id: data.id,
    nickName: data.nickName,
    userName: data.userName,
    centerInfoId: data.centerInfoId
  }
  return Cookies.set('userInfo', d)
}

// 在浏览器上存储权限信息
export function setPower(data) {
  let power = data.roleList
  return Lockr.set('power', power)
}

export function getPower() {
  return Lockr.get('power')
}

export function removePower() {
  return Lockr.rm('power')
}

export function removeUserInfo() {
  return Cookies.remove('userInfo')
}
export function getUserInfo() {
  return Cookies.get('userInfo')
}

export function setDataDictionary(data) {
  return Lockr.set('dataDictionary',data)
}

export function getDataDictionary() {
  return Lockr.get('dataDictionary')
}

// 把需要下载的文件列表存入浏览器
export function setDownloadTable(data) {
  return Lockr.set('downloadTable',data)
}

export function getDownloadTable() {
  return Lockr.get('downloadTable')
}


// 视频下载列表的数据存储
export function setDownloadQueueTable(data) {
  return Lockr.set('downloadQueueTable',data)
}

export function getDownloadQueueTable() {
  return Lockr.get('downloadQueueTable')
}

// 发起视频下载任务的时候 需要计时 实时存在浏览器的缓存里
export function setTaskTime(num) {
  return Lockr.set('setTaskTime',num)
}

export function getTaskTime() {
  return Lockr.get('setTaskTime')
}