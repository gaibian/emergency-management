// 绑定vue原型上的全局属性和方法
import Vue from 'vue'
import api from '@/api'

class vuePrototype {
    constructor() {
        this.smallName = '新的名字'
    }
    smallFun(num) {
        let n = 8
        n += num
        return n
    }
}

Vue.prototype.$api = api
Vue.prototype.$prototype = new vuePrototype()