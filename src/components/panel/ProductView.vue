<!--商品管理-->
<template>
  <div class="main-view">
    <HeaderChuck></HeaderChuck>
    <div class="control-view">
      <MenuChuck></MenuChuck>
      <div class="split-border-menu"></div>
      <div class="split-border"></div>
      <div class="module-view panel">
        <ProductChuck></ProductChuck>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import HeaderChuck from '../chuck/HeaderChuck'
  import MenuChuck from '../chuck/MenuChuck'
  import ProductChuck from '../chuck/ProductChuck'
  export default {
    data () {
      return {
      }
    },
    created () {
      const config = {
        selectIndex: 0
      }
      this.setMenu(config)
    },
    methods: {
      ...mapActions(['setMenu'])
    },
    components: {HeaderChuck, MenuChuck, ProductChuck}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "../../assets/style/control-panel";

</style>
