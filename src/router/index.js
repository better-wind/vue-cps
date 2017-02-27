import Vue from 'vue'
import Router from 'vue-router'
import ProductView from './../components/panel/ProductView'
import OrderView from './../components/panel/OrderView'
import ExtensionView from './../components/panel/ExtensionView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/product'
    },
    {
      path: '/product',
      name: 'Product',
      component: ProductView
    },
    {
      path: '/order',
      name: 'Order',
      component: OrderView
    },
    {
      path: '/extension',
      name: 'Extension',
      component: ExtensionView
    }
  ]
})
