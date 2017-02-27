// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
// 图片链接转换
Vue.filter('toImg', data => {
  let sSrc = data
  if (data.indexOf('http://') < 0) {
    const aSrc = data.split('|')
    sSrc = 'http://xqproduct.xiangqu.com/' + aSrc[2] + '?imageView2/2/w/250/q/90/format/jpg/700x700/'
  }
  return sSrc
})
// 日期转换
Vue.filter('toDate', data => {
  const d = new Date(data)
  return d.getFullYear() + '年' +
    (d.getMonth() + 1) + '月'
})
// 价格转换 null
Vue.filter('toPrice', (data) => {
  return data ? data : 0
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
