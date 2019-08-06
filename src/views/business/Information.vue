<template>
    <div>
      <div v-html="entity.content"></div>
      <mt-cell  title="发布者" :value="entity.publisher"></mt-cell>
      <mt-cell  title="发布时间" :value="entity.releaseTime"></mt-cell>
      <mt-cell  title="有效期至" :value="entity.validityEndTime"></mt-cell>
      <mt-cell  title="点击率" :value="entity.clickAmount"></mt-cell>
    </div>
</template>

<script>
  import {queryInformationDetail} from '@/services'
  export default {
    name: 'Information',
    data () {
      return {
        entity: {
          content: '',
          publisher: '',
          releaseTime: '',
          validityEndTime: '',
          clickAmount: 0
        }
      }
    },
    mounted () {
      this.queryInformationDetail()
    },
    methods: {
      queryInformationDetail () {
        let param = {
          content: this.$route.query.id
        }
        queryInformationDetail(param).then(data => {
          if (data.code === 200) {
            let content = data.content
            this.entity = content
          }
        })
      }

    }
  }
</script>

<style scoped>

</style>
