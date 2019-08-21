<template>
  <div>
    <Button size="large" type="text" @click="backHome">返回首页</Button>
    <Button size="large" type="text" @click="backPrev">返回上一页({{ second }}s)</Button>
  </div>
</template>

<script>
export default {
  name: 'BackBtnGroup',
  data() {
    return {
      second: 5,
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: 'home'
      })
    },
    backPrev() {
      this.$router.go(-1)
    }
  }
}
</script>
