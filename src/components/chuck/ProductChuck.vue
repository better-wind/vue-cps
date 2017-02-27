<template>
  <div>
    <div class="product-view module-body">
      <div class="module-title">
        <div class="title">商品</div>
      </div>
      <div class="list-chuck list-header">
        <div class="item item-col-1">
          商品
        </div>
        <div class="item item-col-2 item-price">
          销售价
        </div>
        <div class="item item-col-3 item-two-col">
          <div class="col-item">分润点&nbsp;</div>
          <div class="col-item">/&nbsp;分成</div>
        </div>
        <div class="item item-col-4 item-price">
          全平台零售价
        </div>
        <div class="item item-col-5">
          推广详情
        </div>
      </div>
      <div class="list-chuck list-body">
        <div class="no-data" v-if="productView.products && productView.products.length == 0">
          <p>暂无数据</p>
        </div>
        <div class="item-chuck" v-for="(item,index) in productView.products">
          <div class="item item-col-1">
            <div class="item-detail name-detail">
              <div class="img-view">
                <img v-bind:src="item.image | toImg" alt="">
              </div>
              <div class="title-view">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
          <div class="item item-col-2">
            <div class="item-detail">
              <div class="cols item-price" v-for="(skuItem,skuIndex) in item.skus">￥{{ skuItem.price | toPrice }}</div>
            </div>
          </div>
          <div class="item item-col-3">
            <div class="item-detail">
              <div class="cols item-two-col" v-for="(skuItem,skuIndex) in item.skus">
                <div class="col-item">{{ item.commissionRate | toPrice  }}&nbsp;</div>
                <div class="col-item">&nbsp;￥{{ skuItem.balanceAmount | toPrice  }}</div>
              </div>
            </div>
          </div>
          <div class="item item-col-4">
            <div class="item-detail item-price">
              ￥{{ item.price | toPrice  }}
            </div>
          </div>
          <div class="item item-col-5">
            <div class="item-detail">
              <button><a v-bind:href="item.prodUrl" target="_blank">查看商品详情</a></button>
              <button class="spec" @click="showArticles(index)">查看文章</button>
              <button class="spec" @click="showExtensionLink(index)">生成推广链接</button>
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
        popLayoutConfig: {
          isShow: false
        },
        paging: {
          link: '/product',
          page: 0,
          size: 10,
          total: 0,
          totalPage: 0
        }
      }
    },
    created () {
      this.pageInt()
    },
    computed: {
      ...mapState(['productView'])
    },
    methods: {
      showArticles (index) {
        const config = {
          isShow: true,
          isPop: true,
          popConfig: {
            popTitle: '推广文章详情',
            popType: 1,
            articlesList: this.productView.products[index].articles
          }
        }
        this.setPop(config)
      },
      showExtensionLink (index) {
        const opts = {
          productId: this.productView.products[index].productId
        }
        this.getPromotion(opts)
          .then((res) => {
            const config = {
              isShow: true,
              isPop: true,
              popConfig: {
                popTitle: '生成推广链接和二维码',
                popType: 0,
                products: {
                  productUrl: res.data.productUrl,
                  qrCode: res.data.qrCode
                }
              }
            }
            this.setPop(config)
          })
      },
      pageInt () {
        let opts = this.$route.query
        opts.page = opts.page ? opts.page : 0
        opts.size = opts.size ? opts.size : 10
        this.getProduct(opts)
          .then(() => {
            this.getPaging(opts)
          })
      },
      ...mapActions(['getProduct', 'getPromotion', 'setPop']),
      getPaging (opts) {
        const nPage = parseInt(opts.page) + 1
        this.paging = {
          link: '/product',
          page: nPage,
          size: 10,
          total: this.productView.total,
          totalPage: Math.ceil(this.productView.total / 10)
        }
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
.product-view{
  .item-col-2{
    width: 70px;
  }
  .item-col-3{
    width: 130px;
  }
  .item-col-4{
    width: 120px;
  }
  .list-body{
    padding: 0 $baseMargin;
    .item-chuck{
      position: relative;
      overflow: hidden;
      padding: 25px 0;
      /*margin:15px 0;*/
      border-bottom:2px solid $borderColor;
      .item{
        .item-detail{
          /*height: 120px;*/
          color: rgb(0,0,0);
          button{
            width: 100px;
            height: 30px;
            border:none;
            box-sizing: border-box;
            border:1px solid $borderColor;
            background-color: $baseColor;
            margin-bottom: 10px;
            a{
              color: rgb(0,0,0);
            }
            &.spec{
              margin:10px 0 0 0;
              border-color: $specialColor;
              background-color: $specialColor;
              color: $baseColor;
            }
          }
          .cols{
            margin-bottom: 16px;
          }
          &.center{
            line-height: 120px;
          }
          &.name-detail{
            text-align: left;
            position: relative;
            overflow: hidden;
            .img-view{
              float: left;
              width: 90px;
              height: 90px;
              line-height: 90px;
              text-align: center;
              /*background-color: rgb(221,221,221);*/
              overflow: hidden;
              font-size: 0;
              img{
                vertical-align:middle;
                max-width: 90px;
                max-height: 90px;
              }
            }
            .title-view{
              float: left;
              margin-left: $baseMargin;
              width: 160px;
              height: 120px;
              p{
                line-height: 18px;
              }
            }
          }
        }
      }
    }
  }
  .item-price{
    text-align: left;
    padding-left: $baseMargin;
  }
}
</style>

