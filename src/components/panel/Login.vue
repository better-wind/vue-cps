<template>
  <div class="main-view">
    <HeaderChuck></HeaderChuck>
    <div class="user-view">
      <div class="title">
        想去CPS后台
      </div>
      <div class="body">
        <div class="item">
          <input type="text" placeholder="手机号" v-model="inputPhone">
        </div>
        <div class="item">
          <input type="password" placeholder="密码" v-model="inputPwd">
        </div>
        <div class="sign">
          <a href="http://www.xiangqu.com/user/findPassword" target="_blank"><span>忘记密码?</span></a>
        </div>
        <div class="menu">
          <button @click="doLogin()">登录</button>
          <button class="black"><a href="http://www.xiangqu.com/register" target="_blank">注册</a></button>
        </div>
        <div class="msg">
          {{ errorMsg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import HeaderChuck from '../chuck/HeaderChuck'
export default {
  name: 'login',
  data () {
    return {
      inputPhone: '',
      inputPwd: '',
      errorMsg: ''
    }
  },
  methods: {
    doLogin () {
      const reg = /^\d{11}$/g
      this.errorMsg = ''
      if (!reg.test(this.inputPhone)) {
        this.errorMsg = '请输入正确的手机号码'
        return false
      }
      if (!this.inputPwd) {
        this.errorMsg = '请输入密码'
        return false
      }
      alert('Login')
    }
  },
  components: {HeaderChuck}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/common/control";
  .user-view{
    width: 270px;
    height: 274px;
    margin: 146px auto 0;
    border: 1px solid $borderColor;
    background-color: $panelColor;
    font-size: 14px;
    .title{
      margin-top: $baseMargin*2;
      text-align: center;
    }
    .body{
      width: 202px;
      margin:0 auto;
      input{
        width: 200px;
        height: 34px;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: 1px solid $borderColor;
        text-indent: $baseMargin/2;
        border-radius: 2px;
      }
      button{
        width: 96px;
        height: 34px;
        border: 1px solid $borderColor;
        border-radius: 4px;
        background-color: $baseColor;
        &.black{
          a{
            color: $baseColor;
          }
          border: 1px solid $headbgColor;
          background-color: $headbgColor;
        }
      }
      .item{
        margin-top: $baseMargin;
      }
      .sign{
        font-size: 12px;
        height: 14px;
        line-height: 24px;
        text-align: right;
        a{
          color: $greyColor;
        }

      }
      .menu{
        margin-top: $baseMargin;
      }
      .msg{
        text-align: center;
        line-height: 40px;
        color:$greyColor;
      }
    }
  }
</style>
