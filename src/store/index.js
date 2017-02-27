import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginView: {
      isLogin: false,
      userInfo: '账号名称'
    }, // 用户信息
    popLayoutConfig: {}, // 弹窗控制
    productView: {}, // 商品
    orderView: {}, // 推广效果订单
    balanceView: {}, // 订单结算
    balanceNotice: [], // 订单结算公告
    menuConfig: {}, // 菜单信息
    isLoading: false, // 是否加载中
    errorMsg: {
      NUMBER: '请输入数字',
      paging: {
        LASTPAGE: '这是最后一页',
        FIRSTPAGE: '这是第一页',
        OVERPAGE: '页数超过总页数',
        LESSPAGE: '页数不能小于1'
      },
      product: {
        IDNUMBER: '请输入正确的商品ID'
      },
      COPY: {
        SUSCCESS: '复制成功',
        ERROR: '浏览器不支持,请手动复制'
      }
    } // 错误信息
  },
  mutations,  // 修改store方法
  actions    // 调用修改store方法
})
export default store
