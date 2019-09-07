<template>
  <Layout style="height: 100%">
    <Menu mode="horizontal" theme="dark" :active-name="$route.name">
      <div class="wiki-logo"></div>
      <div class="wiki-nav">
        <MenuItem name="list" to="/wiki/list">
          <Icon type="md-list-box" />
          接口列表
        </MenuItem>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-contact" />
            {{app_id}}
          </template>
          <MenuItem name="4-1" @click.native="logout">
            <Icon type="md-exit" />
            用户登出
          </MenuItem>
        </Submenu>
      </div>
    </Menu>
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
    <Footer class="wiki-footer-center">&copy; Powered By <Tag color="primary">ApiAdmin</Tag></Footer>
  </Layout>
</template>

<script>
export default {
  name: 'Wiki',
  data() {
    return {
      app_id: sessionStorage.getItem('ApiAdmin_AppInfo')
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('wiki/logout').then(() => {
        sessionStorage.removeItem('ApiAdmin_AppInfo')
        location.reload()
      })
    }
  }
}
</script>

<style lang="less">
.wiki-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 2%;
}

.wiki-nav {
  width: 300px;
  margin: 0 0 0 auto;
}

.wiki-footer-center {
  text-align: center;
}

.wiki-content-con {
  overflow: hidden;
  padding: 0 50px;
}
</style>
