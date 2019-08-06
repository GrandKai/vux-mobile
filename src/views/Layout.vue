<template>
  <div style="height:100%;">
    <!-- 头部 -->
    <x-header slot="header" :right-options="{showMore: true}" @on-click-more="showMenus = true"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;">with more menu
    </x-header>
    <!-- 图片滚动栏 -->
    <swiper :list="swiperList" v-model="swiperIndex" :show-desc-mask="false"
            auto loop dots-position="center"
            @on-index-change="onSwiperIndexChange">
    </swiper>
    <!-- 搜索框 -->
    <search :auto-fixed="false" :results="results" v-model="searchValue"
            position="absolute" auto-scroll-to-top top="46px" height="500px" ref="search"
            @result-click="resultClick" @on-change="getResult"
            @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit"></search>

    <!-- 中间内容区域 -->
<!--    <view-box ref="viewBox">-->
      <router-view></router-view>
<!--    </view-box>-->

    <!-- 尾部 -->
    <tabbar v-model="tabbarIndex" slot="bottom"
            style="width:100%;position:absolute;left:0;bottom:0;z-index:100;">
      <tabbar-item link="/index">
        <!--          <img slot="icon" src="../assets/demo/icon_nav_button.png">-->
        <span slot="label">网站首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/informationListTest">
        <!--          <img slot="icon" src="../assets/demo/icon_nav_msg.png">-->
        <span slot="label">发布信息</span>
      </tabbar-item>
      <tabbar-item link="/home">
        <!--          <img slot="icon" src="../assets/demo/icon_nav_article.png">-->
        <span slot="label">游乐XX</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/informationListMint">
        <!--          <img slot="icon" src="../assets/demo/icon_nav_cell.png">-->
        <span slot="label">我的供求</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { login } from '@/services'

  export default {
    name: 'Layout',
    watch: {

      $route (to, from) {
        console.log('to path', to, ' from path: ' + from)
      }
    },
    data () {
      return {
        swiperIndex: 1,
        swiperList: [{
          url: 'http://www.baidu.com',
          img: 'https://n.sinaimg.cn/sinacn19/30/w1080h1350/20180619/ae8d-heauxvz7988630.jpg',
          title: '送你一朵fua'
        }, {
          url: 'http://www.baidu.com',
          img: 'https://n.sinaimg.cn/sinacn19/30/w1080h1350/20180619/ae8d-heauxvz7988630.jpg',
          title: '送你一辆车'
        }, {
          url: 'http://www.baidu.com',
          img: 'https://static.vux.li/demo/5.jpg', // 404
          title: '送你一次旅行',
          fallbackImg: 'https://n.sinaimg.cn/sinacn19/30/w1080h1350/20180619/7ad3-heauxvz7988929.jpg'
        }],
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false,
        results: [],
        searchValue: '',
        tabbarIndex: 0
      }
    },
    created () {
      this.initFirstPage()
      this.login()
    },
    methods: {
      ...mapActions(['setAccessToken', 'setRefreshToken']),
      login () {
        let param = {
          content: {
            username: 'GrandKai',
            password: '111111'
          }
        }
        // eslint-disable-next-line
        login(param).then(data => {
          // console.log('登录响应数据：', data)
          if (data.code === 200) {
            let content = data.content
            let accessToken = content.accessToken
            let refreshToken = content.refreshToken
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem('refreshToken', refreshToken)
            this.setAccessToken(accessToken)
            this.setRefreshToken(refreshToken)
          }
          // this.setAccessToken(data.accessToken)
        })
      },
      initFirstPage () {
        this.tabbarIndex = 0
        this.$router.push('/index')
      },
      onSwiperIndexChange (index) {
        this.swiperIndex = index
      },
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      }
    }
  }

  function getResult (val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>

<style scoped>
  .copyright {
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }

  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }

  .text-scroll p {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }

  .black {
    background-color: #000;
  }

  .title {
    line-height: 100px;
    text-align: center;
    color: #fff;
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .vux-indicator.custom-bottom {
    bottom: 30px;
  }

  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  .fadeInUp {
    animation-name: fadeInUp;
  }

  .swiper-demo-img img {
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
