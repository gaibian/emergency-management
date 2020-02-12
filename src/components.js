import Vue from 'vue'

// import '@/icons' // 导入icon图标 并注册为全局的icon组件
// 注册全局的组件调用 => 可以直接在函数式组件里调用
import countTo from 'vue-count-to'
Vue.component('count-to', countTo)
