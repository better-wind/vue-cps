<!--订单结算-->
<template>
  <div class="main-view">
    <HeaderChuck></HeaderChuck>
    <div class="control-view">
      <MenuChuck></MenuChuck>
      <div class="module-view panel">
        <div class="split-border-menu"></div>
        <div class="split-border"></div>
        <OrderChuck></OrderChuck>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import HeaderChuck from '../chuck/HeaderChuck'
  import MenuChuck from '../chuck/MenuChuck'
  import OrderChuck from '../chuck/OrderChuck'
  export default {
    data () {
      return {
      }
    },
    created () {
      const config = {
        selectIndex: 2
      }
      this.setMenu(config)
    },
    methods: {
      ...mapActions(['setMenu'])
    },
    components: {HeaderChuck, MenuChuck, OrderChuck}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/control-panel";
</style>
