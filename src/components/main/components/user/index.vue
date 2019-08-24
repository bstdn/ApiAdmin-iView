<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvatar" />
      <Icon :size="18" type="md-arrow-dropdown" />
      <DropdownMenu slot="list">
        <DropdownItem name="user_center">个人中心</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.logout()
          break
        case 'user_center':
          this.$router.push({
            name: 'user_center'
          })
          break
      }
    }
  }
}
</script>

<style lang="less">
.user {
  &-avatar-dropdown {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;

    .ivu-badge-dot {
      top: 16px;
    }
  }
}
</style>
