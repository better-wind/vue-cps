<template>
  <div class="menu-view panel">
    <div v-for="(item,index) in routerList">
      <router-link :to="{path:item.link}"  tag="div">
        <div @click="selectMenu(index)" v-bind:class="{current:index == menuConfig.selectIndex}" class="menu-item">
          {{ item.str }}
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data () {
      return {
        routerList: [
          {
            link: '/product',
            str: '商品',
            current: true
          },
          {
            link: '/extension',
            str: '推广效果'
          },
          {
            link: '/order',
            str: '订单结算'
          }
        ]
      }
    },
    computed: {
      ...mapState(['menuConfig'])
    },
    methods: {
      selectMenu (index) {
        const config = {
          selectIndex: index
        }
        this.setMenu(config)
      },
      ...mapActions(['setMenu'])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/common/control";
  .menu-view{
    float: left;
    width: 160px;
    background-color: $panelColor;
    height: 100%;
    .menu-item{
      line-height: 36px;
      text-align: center;
      border-bottom: 1px solid $borderColor;
      font-size: 14px;
      cursor: pointer;
      &.current{
        background-color: $specialColor;
        color:$baseColor;
        border-bottom: 1px solid $specialColor;
      }
    }
  }
</style>
