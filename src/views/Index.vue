<template>
  <div>
    <grid :cols="3">
      <grid-item :label="item.name" v-for="item in catalogs" :key="item.id"
                 :link="{'path': '/informationList', 'query': {'id': item.id}}">
        <img slot="icon" :src="item.image">
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import { queryCatalogList } from '@/services'
  export default {
    name: 'Index',
    data () {
      return {
        catalogs: []
      }
    },
    created () {
      this.queryGrip()
    },
    methods: {
      queryGrip () {
        queryCatalogList().then(data => {
          console.log('查询手机栏目列表：', data)
          if (data.code === 200) {
            let content = data.content
            this.catalogs = content
          }
        })
      }
    }
  }
</script>

<style>
  .weui-grid__icon {
    width: 50px !important;
    height: 50px !important;
  }
</style>
