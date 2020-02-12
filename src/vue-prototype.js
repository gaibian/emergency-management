// 绑定vue原型上的全局属性和方法
import Vue from 'vue'
import api from '@/api'

class dataDictionary {
  constructor() {
    // 性别
    this.sexOptions = [{ name: '男', id: 1 }, { name: '女', id: 0 }]
    this.userSexOptions = [{ name: '男', id: 'Male' }, { name: '女', id: 'Female' }]
    // 职务
    this.postOptions = [{ name: '医生', id: 'DOCTOR' }, { name: '驾驶员', id: 'DRIVER' }, { name: '担架员', id: 'STRETCHER' }]
    // 状态
    this.statusOptions = [{ name: '启用', id: 1 }, { name: '禁用', id: 0 }]
    // 在职状态
    this.workStatusOptions = [{ name: '在职', id: 1 }, { name: '离职', id: 0 }]
    // 车辆状态
    this.carStatusOptions = [{ name: '未上班/下班', id: 0 }, { name: '任务中', id: 1 }, { name: '待命中', id: 2 }]
    this.cardStatusOptions = [{ name: '解绑', id: 0 }, { name: '绑定', id: 1 }]
    // 菜单层级
    this.menuTypeOptions = [{ name: '目录', id: 0 }, { name: '页面', id: 1 }, { name: '按钮', id: 2 }]
    // 设备类型
    this.dirverType = [{ name: '开关量', id: 1 }, { name: '模拟量', id: 2 }]
  }
}
// 全局的数据字典
class vuePrototype {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
  }
  copyArr(arr) {
    return arr.map((e) => {
      if (typeof e === 'object') {
        return Object.assign({}, e)
      } else {
        return e
      }
    })
  }
}
Vue.prototype.$api = api
// eslint-disable-next-line new-cap
Vue.prototype.$prototype = new vuePrototype()
// eslint-disable-next-line new-cap
Vue.prototype.$dic = new dataDictionary()
