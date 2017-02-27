export default {
  // 跟 action 中方法对应
  LOADING_TOGGLE: (state, isLoading) => {
    state.isLoading = isLoading
  },
  SET_NOTICE: (state, rs) => {
    state.balanceNotice = rs.data
  },
  SET_LOGIN: (state, rs) => {
    state.loginView.isLogin = true
    state.loginView.userInfo = rs.data
  },
  OUT_LOGIN: (state, rs) => {
    state.loginView.isLogin = false
    state.loginView.userInfo = {}
    location.href = '/login.html?redirectUrl=' + location.href
  },
  SET_PRODUCT: (state, rs) => {
    state.productView = rs.data
  },
  SET_ORDER: (state, rs) => {
    state.orderView = rs.data
  },
  SET_BALANCE: (state, rs) => {
    state.balanceView = rs.data
  },
  SET_POP: (state, rs) => {
    state.popLayoutConfig = rs
  },
  SET_MENU: (state, rs) => {
    state.menuConfig = rs
  }
}
