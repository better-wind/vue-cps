<template>
  <div id="app">
    <router-view></router-view>
    <PopLayerChuck></PopLayerChuck>
    <LodingChuck></LodingChuck>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import LodingChuck from './components/chuck/LodingChuck'
import PopLayerChuck from './components/chuck/PopLayerChuck'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.setLogin()
  },
  methods: {
    ...mapActions(['setLogin'])
  },
  components: {LodingChuck, PopLayerChuck}
}
</script>

<style lang="scss" rel="stylesheet/scss" >
@import "assets/style/common/common";
@import "assets/style/control-panel";
.main-view{
  width: 980px;
  margin: 0 auto;
  .panel{
    min-height: 880px;
    margin-bottom: 100px;
    box-sizing: border-box;
    border:1px solid $borderColor;
    border-radius: 2px;
    margin-bottom:-10000px;
    padding-bottom:10000px;
  }
}
.list-chuck{
  position: relative;
  padding: 0 20px;
  overflow: hidden;
  .item{
    float: left;
    font-size: 14px;
    color: $greyColor;
    box-sizing: border-box;
    /*border-left:1px solid rgb(0,0,0);*/
  }
  .item-col-1{
    width: 296px;
  }
  .item-col-2{
    width: 100px;
  }
  .item-col-3{
    width: 120px;
  }
  .item-col-4{
    width: 100px;
  }
  .item-col-5{
    width: 140px;
  }
  .item-two-col{
    position: relative;
    overflow: hidden;
    .col-item{
      float: left;
      width: 50%;
      text-align: left;
      &.pre-4{
        width: 40%;
      }
      &.pre-6{
        width: 60%;
      }
      &:nth-child(1){
        text-align: right;
      }
    }
  }
}
.list-header{
  height: 50px;
  line-height: 50px;
  background-color: $panelSplitColor;
  font-weight: 500;
  .item{
    text-align: center;
    &.item-col-1{
      text-align: left;
    }
  }
}
.list-body{
  .item{
    text-align: center;
  }
  .no-data{
    line-height: 120px;
    font-size: 20px;
    color: $greyColor;
    text-align: center;
  }
}
</style>
