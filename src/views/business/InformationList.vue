<template>
  <!--  :top-method="loadTop"-->
  <div style="width: 100%;height: 100%">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" ref="loadmore">
      <ul id="dataList" class="data-list">
        <li v-for="item in dataList" :key="item.id">
          <img class="pd-img" :src="item.coverImage"/>
          <p class="pd-name">{{item.title}}</p>
          <p class="pd-price">{{item.clickAmount}} 元</p>
          <p class="pd-sold">已售{{item.clickAmount}}件</p>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import {queryInformationList} from '@/services'

  export default {
    name: 'InformationListMint',
    data () {
      return {
        topStatus: '',
        allLoaded: false,
        dataList: [],
        total: 0,
        pages: 0,
        param: {
          page: {
            pageNum: 0,
            pageSize: 10
          },
          content: {
            // 当 key 和 value 是同一个字符时可以简写为 contCatalogId
            contCatalogId: ''
          }
        }
      }
    },
    mounted () {
      // this.queryInformationList()
    },
    methods: {
      handleTopChange (status) {
        this.topStatus = status
      },
      loadTop () {
        console.warn('执行上拉刷新----------')
        // this.param.page.pageNum += 1
        // if (this.param.page.pageNum > this.pages) {
        //   this.allLoaded = true
        //   this.$refs.loadmore.onTopLoaded()
        // } else {
        //   this.queryInformationList(_ => {
        //     // 加载更多数据
        //     this.$refs.loadmore.onTopLoaded()
        //   })
        // }
      },
      // 加载更多数据
      loadBottom () {
        console.warn('执行下拉刷新============')
        this.param.page.pageNum += 1

        this.queryInformationList(_ => {
          // 若数据已全部获取完毕
          if (this.param.page.pageNum > this.pages) {
            this.allLoaded = true
          }
          // 加载更多数据
          this.$refs.loadmore.onBottomLoaded()
        })
      },
      queryInformationList (callBack) {
        queryInformationList(this.param).then(data => {
          if (data.code === 200) {
            let content = data.content
            this.pages = content.pages
            this.total = content.total
            this.dataList = this.dataList.concat(content.list)
            if (callBack instanceof Function) {
              callBack()
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .data-list {
    margin-bottom: 50px;
  }

  .data-list li {
    position: relative;
    padding: 10px 8px 10px 120px;
    border-bottom: 1px solid #eee;
  }

  .data-list .pd-img {
    position: absolute;
    left: 18px;
    top: 18px;
    width: 80px;
    height: 80px;
  }

  .data-list .pd-name {
    font-size: 16px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }

  .data-list .pd-price {
    margin-top: 8px;
    color: red;
  }

  .data-list .pd-sold {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }
</style>
