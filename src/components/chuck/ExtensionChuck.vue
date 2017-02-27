<template>
  <div>
    <div class="extension-view module-body">
      <div class="module-title">
        <div class="title" v-if="isExtension">推广效果</div>
        <div class="title" v-if="!isExtension">订单结算:{{ orderView.balanceAt | toDate}}</div>
        <div class="search" v-if="isExtension">
          <input type="text" v-model="inputProductId" placeholder="搜索商品ID">
          <button @click="productIdOrder()">搜索</button>
        </div>
      </div>
      <div class="list-chuck list-header">
        <div class="item item-col-1">
          商品
        </div>
        <div class="item item-col-2">
          商品ID
        </div>
        <div class="item item-col-3 item-two-col">
          <div class="col-item">销售价&nbsp;</div>
          <div class="col-item">/&nbsp;数量</div>
        </div>
        <div class="item item-col-6">
          退款金额
        </div>
        <div class="item item-col-4 item-two-col">
          <div class="col-item pre-4">分润点&nbsp;</div>
          <div class="col-item pre-6">/&nbsp;分成</div>
        </div>
        <div class="item item-col-5">
          订单状态
        </div>
      </div>
      <div class="list-chuck list-body">
        <div class="no-data" v-if="orderView.orders && orderView.orders.length == 0">
          <p>暂无数据</p>
        </div>
        <div v-for="(item,index) in orderView.orders" class="item-chuck">
          <div class="order-time">
            <div v-if="item.paidAtStr">付款时间:{{ item.paidAtStr }}</div>
            <div v-if="item.signedAtStr">确认时间:{{ item.signedAtStr }}</div>
            <div class="right">订单号：{{ item.orderNo }}</div>
          </div>
          <div class="order-item" v-for="(orderItem,orderIndex) in item.orderItems">
            <div class="item item-col-1">
              <div class="item-detail name-detail">
                <div class="img-view">
                  <img v-bind:src="orderItem.skuImg | toImg" alt="">
                </div>
                <div class="title-view">
                  <p>{{ orderItem.productName }}</p>
                </div>
              </div>
            </div>
            <div class="item item-col-2">
              <div class="item-detail center">
                {{ orderItem.productId }}
              </div>
            </div>
            <div class="item item-col-3">
              <div class="item-detail center item-two-col">
                <div class="col-item">￥{{ orderItem.price | toPrice }}&nbsp;</div>
                <div class="col-item">&nbsp;x{{ orderItem.amount }}</div>
              </div>
            </div>
            <div class="item item-col-6">
              <div  class="item-detail center left">
                <span v-if="orderItem.refundGoodsFee">￥{{ orderItem.refundGoodsFee | toPrice}}</span>
              </div>
            </div>
            <div class="item item-col-4">
              <div class="item-detail center item-two-col">
                <div class="col-item pre-4">{{ orderItem.unionCommissionRate | toPrice}}&nbsp;</div>
                <div class="col-item pre-6">&nbsp;￥{{ orderItem.balanceAmount | toPrice}}</div>
              </div>
            </div>
            <div class="item item-col-5">
              <div class="item-detail center">
                {{ orderItem.statusStr }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <PageChuck :paging="paging"></PageChuck>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import PageChuck from './PageChuck'
  export default {
    data () {
      return {
        paging: {
          link: '/extension',
          page: 0,
          size: 10,
          total: 0,
          totalPage: 0
        },
        opts: {},
        inputProductId: '',
        isExtension: true
      }
    },
    created () {
      this.pageInt()
    },
    computed: {
      ...mapState(['orderView'])
    },
    methods: {
      pageInt () {
        let opts = this.$route.query
        opts.page = opts.page ? opts.page : 0
        opts.size = opts.size ? opts.size : 10
        opts.productId = opts.productId ? opts.productId : ''
        opts.balanceId = opts.balanceId ? opts.balanceId : ''
        opts.suid = opts.suid ? opts.suid : ''
        this.opts = opts
        if (opts.balanceId) {
          const config = {
            selectIndex: 2
          }
          this.setMenu(config)
          this.isExtension = false
        } else {
          this.isExtension = true
        }
        this.getOrder(opts)
          .then(() => {
            this.getPaging(opts)
          })
      },
      ...mapActions(['getOrder', 'setMenu', 'setPop']),
      getPaging (opts) {
        const nPage = parseInt(opts.page) + 1
        this.paging = {
          link: '/extension',
          page: nPage,
          size: 10,
          total: this.orderView.total,
          totalPage: Math.ceil(this.orderView.total / 10),
          query: {
            productId: opts.productId,
            balanceId: opts.balanceId,
            suid: opts.suid
          },
          hasMsg: true,
          msg: [
            {
              str: '订单数',
              val: this.orderView.total
            },
            {
              str: '总分成',
              val: '￥' + (this.orderView.balanceTotal ? this.orderView.balanceTotal : 0)
            }
          ]
        }
//        if (opts.balanceId === '') {
//          const moreMsg = [
//            {
//              str: '订单数',
//              val: this.orderView.total || 0
//            },
//            {
//              str: '退款中',
//              val: this.orderView.refundTotal || 0
//            },
//            {
//              str: '总分成',
//              val: '￥' + this.orderView.balanceTotal || 0
//            }
//            {
//              str: '已付款',
//              val: this.orderView.paidTotal || 0
//            },
//            {
//              str: '已关闭',
//              val: this.orderView.closedTotal || 0
//            },
//            {
//              str: '交易成功',
//              val: this.orderView.successTotal || 0
//            }
//          ]
//          this.paging.msg = moreMsg
//        }
      },
      productIdOrder () {
        if (this.inputProductId) {
          const reg = /^\d+$/g
          if (!reg.test(this.inputProductId)) {
            const config = {
              isShow: true,
              isToast: true,
              toastConfig: {
                toastMsg: this.$store.state.errorMsg.product.IDNUMBER
              }
            }
            this.setPop(config)
            this.inputProductId = ''
            return false
          }
        }
        let opts = this.opts
        opts.productId = this.inputProductId
        this.getOrder(opts)
          .then(() => {
            this.getPaging(opts)
          })
      }
    },
    components: {PageChuck},
    watch: {
      '$route' (to, from) {
        if (to.fullPath !== from.fullPath) {
          this.pageInt()
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/style/control-panel";
    .extension-view{
      .item-col-1{
        width: 266px;
      }
      .item-col-6{
        width: 70px;
        text-align: left;
      }
      .item-col-2{
        width: 70px;
      }
      .item-col-3{
        width: 115px;
      }
      .item-col-4{
        width: 125px;
      }
      .item-col-5{
        width: 110px;
      }
      .module-title{
        position: relative;
        .search{
          position: absolute;
          top:12px;
          right:20px;
          width: 250px;
          height: 36px;
          padding-left: 0px;
          border:1px solid $borderColor;
          overflow: hidden;
          border-radius: 4px;
          input{
            width: 250px;
            height: 36px;
            box-sizing: content-box;
            border:none;
            text-indent: $baseMargin/2;
          }
          button{
            position: absolute;
            top:0;
            right:0;
            width: 50px;
            height: 36px;
            border:none;
            border-left:1px solid $borderColor;
            background-color: transparent;
          }
        }
      }
      .list-body{
            padding:0 $baseMargin;
            .item-chuck{
                margin:$baseMargin/2 0;
                box-sizing: border-box;
                border:1px solid $borderColor;
                .order-time{
                  line-height: 40px;
                  color: $greyColor;
                  background-color: rgb(247,247,247);
                  padding-left: $baseMargin/2;
                  border-bottom:1px solid $borderColor;
                  overflow: hidden;
                  div{
                    line-height: 40px;
                    float: left;
                    margin-right: 16px;
                    &.right{
                      float: right;
                    }
                  }
                }
                .order-item{
                    position: relative;
                    overflow: hidden;
                    padding: $baseMargin/2 0;
                }
                .item{
                    .item-detail{
                        height: 76px;
                        color: rgb(0,0,0);
                        text-align: center;
                        &.center{
                            line-height: 76px;
                        }
                       &.left{
                         text-align: left;
                       }
                        &.name-detail{
                            text-align: left;
                            position: relative;
                            overflow: hidden;
                            .img-view{
                                float: left;
                                margin-left: $baseMargin/2;
                                width: 76px;
                                height: 76px;
                                line-height: 76px;
                                text-align: center;
                                /*background-color: rgb(221,221,221);*/
                                font-size:0;
                                img{
                                    vertical-align: middle;
                                    max-width: 76px;
                                    max-height: 76px;
                                }
                            }
                            .title-view{
                                float: left;
                                margin-left: $baseMargin;
                                width: 150px;
                                height: 76px;
                                p{
                                    line-height: 18px;
                                }
                            }
                        }

                    }

                }
            }
        }
    }
</style>

