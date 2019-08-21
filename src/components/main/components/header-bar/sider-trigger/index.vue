<template>
  <a type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']" @click="handleChange"><Icon :type="icon" :size="size" /></a>
</template>

<script>
export default {
  name: 'SiderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange() {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>

<style lang="less">
.trans {
  transition: transform .2s ease;
}

@size: 40px;
.sider-trigger-a {
  padding: 6px;
  width: @size;
  height: @size;
  display: inline-block;
  text-align: center;
  color: #5c6b77;
  margin-top: 12px;

  i {
    .trans;
    vertical-align: top;
  }

  &.collapsed i {
    transform: rotateZ(90deg);
    .trans;
  }
}
</style>
