<template>
  <div class="header-view">
      <div class="message-view">
        <div class="logo">
          <!--<img src="/union-dev/xq-union/dist-dev/Group.png" alt="">-->
          <img src="../../assets/img/Group.png" alt="">
        </div>
        <div  v-if="loginView.isLogin" class="name" >
          {{ loginView.userInfo.phone }} <span class="icon"></span>
          <div class="menu">
            <button @click="outLogin()">退出</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data () {
      return {
        isShowMenu: false
      }
    },
    computed: {
      ...mapState(['loginView'])
    },
    methods: {
      outLogin () {
        this.setOutLogin()
      },
      ...mapActions(['setOutLogin'])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/common/control";
  .header-view{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 48px;
    background-color: $headbgColor;
    z-index: 9;
    .message-view{
      width: 980px;
      height: 48px;
      margin: 0 auto;
      position: relative;
      div{
        float: left;
        line-height: 48px;
        img{
          vertical-align: middle;
          transition: all .5s;
          opacity: 1;
          &:hover{
            opacity: .8;
          }
        }
        &.name{
          position: relative;
          float: right;
          color: $greyColor;
          width: 100px;
          text-align: center;
          cursor: pointer;
          transition: all .5s;
          .icon{
            display: inline-block;
            width: 9px;
            height: 6px;
            background: url('../../assets/img/down.png') no-repeat;
            background-size: 100%;
            transition: all .5s;
            opacity: .8;
          }
          &:hover{
            color: $baseColor;
            .menu{
              opacity: 1;
              top:48px;
            }
            .icon{
              opacity: 1;
              transform: rotate(180deg);
            }
          }
          .menu{
            position: absolute;
            top:48px;
            left:0;
            width: 100px;
            height: 30px;
            line-height: 30px;
            background-color: $headbgColor;
            border-radius: 2px;
            transition: all .5s;
            top:0px;
            opacity: 0;
            button{
              width: 100px;
              height: 30px;
              border:none;
              color: $baseColor;
              background-color: transparent;
            }
          }
        }
      }
    }
  }
</style>
