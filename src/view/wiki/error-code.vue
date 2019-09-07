<template>
  <Content class="wiki-content-con">
    <div class="wiki-layout-con">
      <template>
        <Table stripe :columns="columns" :data="data" />
      </template>
      <ABackTop :height="100" :bottom="80" :right="60" container=".wiki-layout-con" />
    </div>
  </Content>
</template>

<script>
import { errorCode } from '@/api/wiki'
import ABackTop from '@/components/main/components/a-back-top'

export default {
  name: 'WikiError',
  components: {
    ABackTop
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '英文标识',
          key: 'en_code'
        },
        {
          title: '错误码',
          key: 'code'
        },
        {
          title: '中文说明',
          key: 'chinese'
        }
      ],
      data: []
    }
  },
  created() {
    this.error()
  },
  methods: {
    error() {
      const vm = this
      errorCode().then(response => {
        vm.data = response.data.data
      })
    }
  }
}
</script>

<style lang="less">
.wiki-layout-con {
  margin-top: 15px;
  height: ~"calc(100% - 15px)";
  overflow: auto;
}
</style>
