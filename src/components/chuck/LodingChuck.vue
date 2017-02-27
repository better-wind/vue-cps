<template>
  <div v-if="isLoading" class="loading-view">

  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['isLoading'])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/common/control";
.loading-view{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
