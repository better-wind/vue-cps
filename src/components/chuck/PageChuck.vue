<template>
  <div class="paging-view">
    <div v-if="paging.hasMsg" class="paging-msg">
      <div class="item-msg">
        <span v-for="(item,index) in paging.msg" v-bind:class="{single:paging.msg.length == 2}">
          {{ item.str }}:&nbsp;{{ item.val }}
        </span>
      </div>
    </div>
    <div class="paging-control">
      <div class="paging-content">
        <button v-bind:class="{notallowed:preNot == true}" @click="prePage()">&lt;</button>
        <button @click="clickPage(item.page)" class="padding" v-for="(item,index) in prePageList">
          {{ item.page }}
        </button>
        <button class="spec padding">{{ currentPage }}</button>
        <button @click="clickPage(item.page)" class="padding" v-for="(item,index) in nextPageList">
          {{ item.page }}
        </button>
        <button v-bind:class="{notallowed:nextNot == true}" @click="nextPage()">&gt;</button>
        <span>&nbsp;&nbsp;到第 </span>
        <input type="text" v-model="inputPage" @keydown="goPage($event)">
        <span> 页&nbsp;&nbsp;共{{ paging.totalPage }}页，{{ paging.total }}条记录</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        inputPage: '',
        prePageList: [],
        nextPageList: [],
        PageList: [],
        currentPage: 1,
        preNot: false,
        nextNot: false
      }
    },
    created () {
    },
    props: ['paging'],
    methods: {
      goPage (ev) {
        let isReady = true
        let errorMsg = ''
        if (ev.keyCode === 13) {
          const reg = /^\d+$/g
          if (!reg.test(this.inputPage)) {
            errorMsg = this.$store.state.errorMsg.NUMBER
            isReady = false
          }
          if (this.inputPage === '0') {
            errorMsg = this.$store.state.errorMsg.paging.LESSPAGE
            isReady = false
          }
          if (this.inputPage > this.paging.totalPage) {
            errorMsg = this.$store.state.errorMsg.paging.OVERPAGE
            isReady = false
          }
          if (!isReady) {
            this.showToast(errorMsg)
            return false
          }
          const query = {
            page: this.inputPage - 1,
            size: this.paging.size
          }
          this.linkTo(query)
        }
      },
      clickPage (ev) {
        const query = {
          page: ev - 1,
          size: this.paging.size
        }
        this.linkTo(query)
      },
      prePage () {
        if (this.paging.page === 1) {
          this.showToast(this.$store.state.errorMsg.paging.FIRSTPAGE)
          return false
        }
        const query = {
          page: this.paging.page - 2,
          size: this.paging.size
        }
        this.linkTo(query)
      },
      nextPage () {
        if (this.paging.page >= this.paging.totalPage) {
          this.showToast(this.$store.state.errorMsg.paging.LASTPAGE)
          return false
        }
        const query = {
          page: this.paging.page,
          size: this.paging.size
        }
        this.linkTo(query)
      },
      showToast (msg) {
        const config = {
          isShow: true,
          isToast: true,
          toastConfig: {
            toastMsg: msg
          }
        }
        this.setPop(config)
      },
      linkTo (query) {
        if (this.paging.query) {
          for (let i in this.paging.query) {
            query[i] = this.paging.query[i]
          }
        }

        this.$router.push({
          path: this.paging.link,
          query: query
        })
      },
      setPagNum () {
        this.currentPage = this.paging.page
        const page = this.paging.page
        const totalPage = this.paging.totalPage
        this.preNot = false
        this.nextNot = false
        if (page === 1) {
          this.preNot = true
          if (page > totalPage) {
            this.nextNot = true
            this.prePageList = []
            this.nextPageList = []
            return false
          }
          const pageNum = totalPage > 2 ? 3 : totalPage
          let nextList = []
          for (let i = pageNum; i > 1; i--) {
            const item = {
              page: i
            }
            nextList.unshift(item)
          }
          this.prePageList = []
          this.nextPageList = nextList
        }
        if (page > 1 && page < totalPage) {
          let preItemList = []
          let nextItemList = []
          const val = page / 3
          const mod = page % 3
          if (mod === 0) {
            preItemList = [
              {
                page: val * 3 - 2
              },
              {
                page: val * 3 - 1
              }
            ]
            nextItemList = []
          }
          if (mod === 1) {
            preItemList = []
            nextItemList = []
            if ((val * 3 + 1) <= totalPage) {
              nextItemList.push({
                page: val * 3 + 1
              })
            } else {
              preItemList.push(
                {
                  page: val * 3 - 1
                },
                {
                  page: val * 3 - 2
                }
              )
            }
            if ((val * 3 + 2) <= totalPage) {
              nextItemList.push(
                {
                  page: val * 3 + 2
                }
              )
            } else {
              preItemList.push(
                {
                  page: val * 3 - 1
                }
              )
            }
          }
          if (mod === 2) {
            preItemList = [
              {
                page: val * 3 - 1
              }
            ]
            nextItemList = [
              {
                page: val * 3 + 1
              }
            ]
          }
          this.prePageList = preItemList
          this.nextPageList = nextItemList
        }
        if (page === totalPage) {
          this.nextNot = true
          const pageNum = totalPage > 2 ? 2 : 1
          let preList = []
          for (let i = pageNum; i > 0; i--) {
            const item = {
              page: totalPage - i
            }
            if (item.page) {
              preList.push(item)
            }
          }
          this.prePageList = preList
          this.nextPageList = []
        }
      },
      ...mapActions(['setPop'])
    },
    watch: {
      paging () {
        this.setPagNum()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/common/control";
.paging-view{
  position: relative;
  height:70px;
  overflow: hidden;
  background-color: rgb(247,247,247);
  .paging-msg{
    float: left;
    width: 190px;
    height: 70px;
    overflow: hidden;
    .item-msg{
      width: 150px;
      height: 50px;
      margin:$baseMargin/2 auto 0;
      span{
        display: inline-block;
        width: 140px;
        line-height: 24px;
        box-sizing: border-box;
        color: $greyColor;
        /*&.single{*/
          /*width: 220px;*/
        /*}*/
      }
    }
  }
  .paging-control{
    float: right;
    width: 550px;
    height: 70px;
    .paging-content{
      margin:17px 0 0 0;
      height: 36px;
      padding-right: $baseMargin;
      text-align: right;
      /*background-color: rgb(255,0,56);*/
      button{
        box-sizing: content-box;
        width: 34px;
        height: 34px;
        background-color: $baseColor;
        border: 1px solid $borderColor;
        color: $greyColor;
        &.spec{
          color: $baseColor;
          background-color: $specialColor;
        }
        &.padding{
          margin: 0 $baseMargin/5;
        }
        &.notallowed{
          cursor:not-allowed
        }
      }
      input{
        width: 58px;
        height: 32px;
        box-sizing: content-box;
        border: 1px solid $borderColor;
      }
      span{
        color:$greyColor;
      }
    }
  }
}

</style>
