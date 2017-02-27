<template>
  <div v-if="popLayoutConfig.isShow" class="popLayout-view">
    <div v-if="popLayoutConfig.isPop" class="pop-view item-type">
      <div class="pop-title">
        {{ popLayoutConfig.popConfig.popTitle }}
      </div>
      <div class="pop-body">
        <div class="item-body">
          <!--生成推广链接和二维码-->
          <div v-if="popLayoutConfig.popConfig.popType === 0" class="er-body">
            <div class="link">
              <input type="text" readonly v-bind:value="popLayoutConfig.popConfig.products.productUrl" />
              <button @click="copyText($event)">复制链接</button>
            </div>
            <div class="er-img">
              <div class="img-wrap">
                <img v-bind:src="popLayoutConfig.popConfig.products.qrCode" alt="" >
              </div>
              <div class="btn-wrap">
                <button @click="uploadImg(popLayoutConfig.popConfig.products.qrCode)">下载到本地</button>
              </div>
            </div>
          </div>
          <!--文章-->
          <div v-if="popLayoutConfig.popConfig.popType === 1" class="art-body">
            <div class="no-art" v-if="popLayoutConfig.popConfig.articlesList.length == 0">暂时还没有推广文章</div>
            <div class="link" v-for="(item,index) in popLayoutConfig.popConfig.articlesList">
              <p>{{ item.articleTitle }}</p>
              <input type="text" readonly v-bind:value="item.articleUrl" />
              <button @click="copyText($event)">复制链接</button>
            </div>
          </div>
        </div>
        <div class="pop-menu">
          <button @click="closePop()">关闭</button>
        </div>
      </div>
    </div>
    <div v-if="popLayoutConfig.isToast" class="toast-view item-type">
      <div class="msg">{{ popLayoutConfig.toastConfig.toastMsg }}</div>
      <div class="toast-menu">
        <button @click="closePop">确&nbsp;认</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapState(['popLayoutConfig'])
    },
    methods: {
      uploadImg (src) {
        const opts = {
          image: src
        }
        location.href = '/union/product/download?image=' + opts.image
      },
      ...mapActions(['setPop', 'uploadPic']),
      closePop () {
        const config = {}
        this.setPop(config)
      },
      copyText (e) {
        const domInput = e.target.previousSibling
        domInput.select()
        try {
          document.execCommand('copy')
          alert(this.$store.state.errorMsg.COPY.SUSCCESS)
//          this.$store.state.errorMsg.COPY.SUSCCESS
        } catch (err) {
          alert(this.$store.state.errorMsg.COPY.ERROR)
//          this.$store.state.errorMsg.COPY.ERROR
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/common/control";
.popLayout-view{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  animation: show .2s;
  .item-type{
    position: absolute;
    top:50%;
    left:50%;
    background-color: rgb(247,247,247);
    box-shadow:5px 5px 10px 2px rgb(210,210,210);
    border-radius: 4px;
  }
  input{
    box-sizing: content-box;
    border: 1px solid $borderColor;
  }
  button{
    box-sizing: content-box;
    border: 1px solid $specialColor;
    a{
      color: $baseColor;
    }
  }
  .pop-view{
    width: 530px;
    height: 330px;
    margin-top: -150px;
    margin-left:-265px;
    .pop-title{
      height: 46px;
      padding-left: $baseMargin;
      line-height: 46px;
      color: $baseColor;
      background-color: $headbgColor;
    }
    .pop-body{
      width: 490px;
      height: 280px;
      margin: 0 auto;
      overflow: hidden;
      .item-body{
        height: 190px;
        margin-top: $baseMargin;
        input{
          width: 370px;
          height: 34px;
        }
        button{
          width: 100px;
          height: 34px;
          border: 1px solid $specialColor;
          color: $baseColor;
          background-color: $specialColor;
          margin-left: 5px;
          a{
            color: $baseColor;
          }
        }
        .link{
          padding: $baseMargin/10 0;
          p{
            margin-top: $baseMargin/2;
            line-height: 20px;
          }
        }
        .er-body{
          .er-img{
            position: relative;
            height: 124px;
            margin-top: $baseMargin * 1.5;
            overflow: hidden;
            div{
              float: left;
              &.img-wrap{
                display: inline-block;
                width: 124px;
                height: 124px;
                line-height: 124px;
                img{
                  width: 124px;
                  height: 124px;
                }
              }
              button{
                margin-top: $baseMargin/10;
                margin-left: $baseMargin;
              }
            }
          }
        }
        .art-body{
          width: 520px;
          height: 190px;
          overflow-y: scroll;
          .no-art{
            line-height: 30px;
            font-size: 14px;
            text-align: center;
          }
        }
      }
      .pop-menu{
        height: 50px;
        text-align: right;
        button{
          margin-top: $baseMargin;
          width: 80px;
          height: 34px;
          background-color: $baseColor;
          border: 1px solid $borderColor;
          margin-right: $baseMargin/4;
        }
      }
    }
  }
  .toast-view{
    width: 300px;
    height: 200px;
    margin-top: -150px;
    margin-left:-150px;
    .msg{
      line-height: 140px;
      font-size: 20px;
      text-align: center;
    }
    .toast-menu{
      height: 40px;
      text-align: center;
      button{
        width: 250px;
        height: 34px;
        color: $baseColor;
        background-color: $specialColor;
        font-size: 14px;

      }
    }
  }
}
@keyframes show
{
  0% {opacity: 0;}
  100% {opacity: 1;}
}
</style>
