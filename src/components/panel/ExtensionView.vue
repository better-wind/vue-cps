<!--推广管理-->
<template>
  <div class="main-view">
    <HeaderChuck></HeaderChuck>
    <div class="control-view">
      <MenuChuck></MenuChuck>
      <div class="split-border-menu"></div>
      <div class="split-border"></div>
      <div class="module-view panel">
        <ExtensionChuck></ExtensionChuck>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import HeaderChuck from '../chuck/HeaderChuck'
  import MenuChuck from '../chuck/MenuChuck'
  import ExtensionChuck from '../chuck/ExtensionChuck'
  export default {
    data () {
      return {
      }
    },
    created () {
      const config = {
        selectIndex: 1
      }
      this.setMenu(config)
    },
    methods: {
      ...mapActions(['setMenu'])
    },
    components: {HeaderChuck, MenuChuck, ExtensionChuck}
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/control-panel";
</style>
