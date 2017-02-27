<template>
  <div>
    <div class="order-view module-body">
      <div class="module-title">
        <div class="title">订单结算</div>
        <div class="msg">
          <p v-for="(item,index) in balanceNotice">
            {{ item }}
          </p>
        </div>
      </div>
      <div class="list-chuck list-header">
        <div class="item item-col-1">
          结算时间
        </div>
        <div class="item item-col-2">
          分成
        </div>
        <div class="item item-col-3">
          订单记录
        </div>
        <div class="item item-col-4">
          结算记录
        </div>
      </div>
      <div class="list-chuck list-body">
        <div class="no-data" v-if="balanceView.balances && balanceView.balances.length == 0">
          <p>暂无数据</p>
        </div>
        <div v-for="(item,index) in balanceView.balances" class="item-chuck">
          <div class="item item-col-1 center">
            <div class="item-detail time center">
              {{ item.balanceCycle }}
            </div>
          </div>
          <div class="item item-col-2">
            <div class="item-detail center">
              ￥{{ item.balanceAmount }}
            </div>
          </div>
          <div class="item item-col-3">
            <div class="item-detail center">
              <button @click="showOrder(index)">查看订单</button>
            </div>
          </div>
          <div class="item item-col-4">
            <div class="item-detail center">
              <a v-bind:href="item.pictureUrl" target="_blank">
                <button class="spec">查看结算记录</button>
              </a>
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
          link: '/order',
          page: 0,
          size: 10,
          total: 0,
          totalPage: 0
        },
        opts: {}
      }
    },
    created () {
      this.pageInt()
      this.setNotice()
    },
    computed: {
      ...mapState(['balanceView', 'balanceNotice'])
    },
    methods: {
      pageInt () {
        let opts = this.$route.query
        opts.page = opts.page ? opts.page : 0
        opts.size = opts.size ? opts.size : 10
        opts.balanceId = opts.balanceId ? opts.balanceId : ''
        this.opts = opts
        this.getBalance(opts)
          .then(() => {
            this.getPaging(opts)
          })
      },
      ...mapActions(['getBalance', 'setNotice']),
      getPaging (opts) {
        const nPage = parseInt(opts.page) + 1
        this.paging = {
          link: '/order',
          page: nPage,
          size: 10,
          total: this.balanceView.total,
          totalPage: Math.ceil(this.balanceView.total / 10),
          query: {
            balanceId: opts.balanceId
          }
        }
      },
      showOrder (index) {
        const query = {
          page: 0,
          size: 10,
          productId: '',
          balanceId: this.balanceView.balances[index].id,
          suid: ''
        }
        this.$router.push({
          path: '/extension',
          query: query
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
.order-view{
    .list-chuck{
      .item{
            width: 190px;
        }
      .item-col-1{
            width: 186px;
        }
      .help-sign{

      }
    }
    .list-body{
        padding: 0 $baseMargin;
        .item-chuck{
            position: relative;
            overflow: hidden;
            border-bottom:2px solid $borderColor;
            .item{
                .item-detail{
                    height: 120px;
                    color: rgb(0,0,0);
                    text-align: center;
                    button{
                        width: 100px;
                        height: 30px;
                        border:none;
                        box-sizing: border-box;
                        border:1px solid $borderColor;
                        background-color: $baseColor;
                        margin-bottom: 10px;
                        &.spec{
                            margin:10px 0 0 0;
                            border-color: $specialColor;
                            background-color: $specialColor;
                            color: $baseColor;
                        }
                    }
                    &.center{
                        line-height: 120px;
                    }
                    &.time{
                        text-align: left;
                    }

                }

            }
        }

    }
}
</style>

