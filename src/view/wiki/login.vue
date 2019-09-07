<template>
  <div class="wiki-login" @keydown.enter="handleSubmit">
    <div class="wiki-login-con">
      <div class="form-con">
        <span style="font-size: 20px;">ApiAdmin文档中心</span>
        <Form ref="loginForm" :model="form" :rules="rules" class="margin-top-15">
          <FormItem prop="username">
            <Input v-model="form.username" placeholder="请输入AppId">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person" />
                </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入AppSecret">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock" />
                </span>
            </Input>
          </FormItem>
          <FormItem style="margin-bottom: 15px;">
            <Button type="primary" long :loading="loading" @click="handleSubmit">登录</Button>
          </FormItem>
        </Form>
        <div class="wiki-login-tip">
          如没有账号请联系管理员
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WikiLogin',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'AppId不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'AppSecret不能为空', trigger: 'blur' }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('wiki/login', this.form).then(res => {
            sessionStorage.setItem('ApiAdmin_AppInfo', res.app_id)
            this.$router.push({ path: this.redirect || '/wiki/list' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.wiki-login {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  background-image: url('~@/assets/images/login-wiki.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  position: relative;

  &-con {
    margin: 0 auto;
    width: 388px;
    position: relative;
    top: 26%;

    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }

    .form-con {
      padding: 10px 0 0;
      text-align: center;
    }

    .wiki-login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
