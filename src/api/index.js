// api接口统一的出口

// 登录模块接口
import login from './module/login'

// 急救首页模块
import aidIndex from './module/aidIndex'

// 车辆信息模块
import carAdmin from './module/carAdmin'

// 人员信息模块
import personInfo from './module/personInfo'

// 打卡记录模块
import punchInRecord from './module/punchInRecord'

// 车辆告警模块
import carWare from './module/carWare'

// 设备类型模块
import deviceType from './module/deviceType'

// 中心信息模块
import centerAdmin from './module/centerAdmin'
// 用户信息模块
import userAdmin from './module/userAdmin'
// 角色信息模块
import roleAdmin from './module/roleAdmin'
// 权限模块
import powerAdmin from './module/powerAdmin'
// 数据主机模块
import hostAdmin from './module/hostAdmin'
export {
  login,
  aidIndex,
  carAdmin,
  userAdmin,
  roleAdmin,
  powerAdmin,
  personInfo,
  centerAdmin,
  punchInRecord,
  carWare,
  deviceType,
  hostAdmin
}

