import Util from '../assets/js/utils'
// 开始加载
const beginLoading = commit => {
  commit('LOADING_TOGGLE', true)
}
// 结束加载
const stopLoading = commit => {
  commit('LOADING_TOGGLE', false)
}
// 接口调用公共方法
const fetchLoading = (commit, fn, opts) => {
  return new Promise((resolve, reject) => {
    beginLoading(commit)
    Util.fetch(opts)
      .then(response => {
        stopLoading(commit)
        if (fn) {
          commit(fn, response)
          resolve()
        } else {
          resolve(response)
        }
      }, error => {
        stopLoading(commit)
        const config = {
          isShow: true,
          isToast: true,
          toastConfig: {
            toastMsg: '系统繁忙,请稍后再试'
          }
        }
        commit('SET_POP', config)
        console.error(error)
      })
  })
}
export default {
  // 设置弹窗
  setPop ({commit}, data) {
    commit('SET_POP', data)
  },
  // 设置菜单
  setMenu ({commit}, data) {
    commit('SET_MENU', data)
  },
  // 下载图片
  uploadPic ({commit}, data) {
    const opts = {
      type: 'GET',
      url: '/union/product/download',
      data: data
    }
    Util.fetch(opts)
      .then(response => {
        beginLoading(commit)
      }, error => {
        stopLoading(commit)
        console.error(error)
      })
  },
  // 公告
  setNotice ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/union/balance/notice',
      data: data
    }
    return fetchLoading(commit, 'SET_NOTICE', opts)
  },
  // 退出登录
  setOutLogin ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/ajax/logout',
      data: data
    }
    return fetchLoading(commit, 'OUT_LOGIN', opts)
  },
  // 用户信息
  setLogin ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/user/login/info',
      data: data
    }
    return fetchLoading(commit, 'SET_LOGIN', opts)
  },
  // 订单结算
  getBalance ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/union/balance/list',
      data: data
    }
    return fetchLoading(commit, 'SET_BALANCE', opts)
  },
  // 获取推广链接
  getPromotion ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/union/product/promotion',
      data: data
    }
    return fetchLoading(commit, '', opts)
  },
  // 推广效果
  getOrder ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/union/order/list',
      data: data
    }
    return fetchLoading(commit, 'SET_ORDER', opts)
  },
  // 商品
  getProduct ({commit}, data) {
    const opts = {
      type: 'POST',
      url: '/union/product/list',
      data: data
    }
    return fetchLoading(commit, 'SET_PRODUCT', opts)
  }
}
