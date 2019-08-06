<template>
  <div>
    <!--mescroll滚动区域的基本结构,为避免id重复导致的多次初始化,这里使用ref-->
    <div ref="mescroll" class="mescroll">
      <!--展示上拉加载的数据列表-->
      <ul id="dataList" class="data-list">
        <li v-for="pd in dataList" :key="pd.id">
          <img class="pd-img" :src="pd.coverImage"/>
          <p class="pd-name">{{pd.title}}</p>
          <p class="pd-price">{{pd.clickAmount}} 元</p>
          <p class="pd-sold">已售{{pd.clickAmount}}件</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {queryInformationList} from '@/services'
  // 引入mescroll.min.js 和 mescroll.min.css
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  export default {
    name: 'InformationList',
    components: {},
    data () {
      return {
        mescroll: null, // mescroll实例对象
        dataList: [],
        param: {
          page: {
            pageNum: 1,
            pageSize: 10
          },
          content: {
            contCatalogId: ''
          }
        }
      }
    },
    mounted () {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: {
          callback: this.upCallback,
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 // 每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
          noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据; 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          toTop: {
            // 回到顶部按钮
            src: '/static/mescroll/mescroll-totop.png', // 图片路径,默认null,支持网络图
            offset: 1000 // 列表滚动1000px才显示回到顶部按钮
          },
          empty: {
            // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: 'xxid', // 父布局的id (1.3.5版本支持传入dom元素)
            icon: '/static/mescroll/mescroll-empty.png', // 图标,默认null,支持网络图
            tip: '暂无相关数据~' // 提示
          }
        }
      })
    },
    methods: {
      queryInformationList (param, successCallback, errorCallback) {
        queryInformationList(param).then(data => {
          if (data.code === 200) {
            if (successCallback instanceof Function) {
              successCallback(data)
            }
          } else {
            if (errorCallback instanceof Function) {
              errorCallback(data)
            }
          }
        }).catch(e => {
          if (errorCallback instanceof Function) {
            errorCallback(e)
          }
        })
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback (page) {
        // 联网请求
        let contCatalogId = this.$route.query.id
        let param = {
          page: {
            pageNum: page.num,
            pageSize: page.size
          },
          content: {
            // 当 key 和 value 是同一个字符时可以简写为 contCatalogId
            contCatalogId: contCatalogId
          }
        }
        // 联网请求
        this.queryInformationList(param, data => {
          // 如果是第一页需手动制空列表
          console.log('是否是第一页：', page.num === 1)
          if (page.num === 1) this.dataList = []
          // 把请求到的数据添加到列表
          let arr = data.content.list
          this.dataList = this.dataList.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(_ => {
            this.mescroll.endSuccess(arr.length)
          })
        }, error => {
          console.error('数据请求失败！', error)
          this.mescroll.endErr()
        })
      },
      // 进入路由时,恢复列表状态
      beforeRouteEnter (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
        next(vm => {
          if (vm.mescroll) {
            // 恢复到之前设置的isBounce状态
            if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
            // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
            if (vm.mescroll.lastScrollTop) {
              vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
              setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
                vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
              }, 16)
            }
          }
        })
      },
      // 离开路由时,记录列表状态
      beforeRouteLeave (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
        if (this.mescroll) {
          this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
          this.mescroll.setBounce(true) // 允许bounce
          this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
          this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
        }
        next()
      }
    }
  }
</script>

<style scoped>
  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position: absolute;
    top: 224px;
    bottom: 0;
    height: auto;
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

