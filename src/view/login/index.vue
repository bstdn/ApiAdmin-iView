<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card icon="md-log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <!-- eslint-disable -->
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
                <Icon slot="prepend" :size="16" type="ios-person" />
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input v-model="form.password" type="password" placeholder="请输入密码">
                <Icon slot="prepend" :size="14" type="md-lock" />
              </Input>
            </FormItem>
            <FormItem style="margin-bottom: 15px;">
              <Button type="primary" long @click="handleSubmit" :loading="loading">登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'admin',
        password: '111111'
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.form).then(() => {
            this.$router.push({
              name: 'home'
            })
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
.login {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/login-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;

  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 360px;

    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }

    .form-con {
      padding: 10px 0 0;
    }
  }
}
</style>
