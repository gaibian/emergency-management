// api接口统一的出口

// 登录模块接口
import login from './module/login'
// 急救首页模块
import aidIndex from './module/aidIndex'
// 车辆信息模块
import carAdmin from './module/carAdmin'

// 人员信息模块
import personInfo from './module/personInfo'

// 中心信息模块
import centerAdmin from './module/centerAdmin'
export {
  login,
  aidIndex,
  carAdmin,
  personInfo,
  centerAdmin
}

