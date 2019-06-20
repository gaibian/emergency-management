// 绑定vue原型上的全局属性和方法
import Vue from 'vue'
import api from '@/api'

class dataDictionary {
    constructor() {
        // 性别
        this.sexOptions = [{name:'男',id:1},{name:'女',id:0}]
        this.userSexOptions = [{name:'男',id:'Male'},{name:'女',id:'Female'}]
        // 职务
        this.postOptions = [{name:'医生',id:'DOCTOR'},{name:'驾驶员',id:'DRIVER'},{name:'担架员',id:'STRETCHER'}]
        // 状态
        this.statusOptions = [{name:'启用',id:1},{name:'禁用',id:0}]
        // 在职状态
        this.workStatusOptions = [{name:'在职',id:1},{name:'离职',id:0}]
    }
}
//全局的数据字典
class vuePrototype {
    constructor() {
    }
    smallFun(num) {
        let n = 8
        n += num
        return n
    }
}
Vue.prototype.$api = api
Vue.prototype.$prototype = new vuePrototype()
Vue.prototype.$dic = new dataDictionary()