// import parseTime, formatTime and set to filter

import Vue from 'vue'

export default (function() {
  Vue.filter('formatDate',(value) => {
    if (value === null) {
        return '空'
    } else {
        var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + '';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + '       ' + h + m + s;
    }
  })
})()