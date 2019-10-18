<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="md-person" />
        个人信息
      </p>
      <div>
        <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
          <FormItem label="用户账号" prop="username">
            <div style="display: inline-block;width: 300px">
              <Input v-model="username" disabled />
            </div>
          </FormItem>
          <FormItem label="用户昵称" prop="nickname">
            <div style="display: inline-block;width: 300px">
              <Input v-model="formItem.nickname" placeholder="请输入昵称" />
            </div>
          </FormItem>
          <FormItem label="用户头像" prop="headImg">
            <div class="demo-upload-list" v-if="formItem.head_img">
              <img :src="formItem.head_img">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleImgRemove()" />
              </div>
            </div>
            <input v-if="formItem.head_img" v-model="formItem.head_img" type="hidden" name="image">
            <Upload
              v-if="!formItem.head_img"
              type="drag"
              :action="uploadUrl"
              :headers="uploadHeader"
              :format="['jpg','jpeg','png']"
              :max-size="5120"
              :on-success="handleImgSuccess"
              :on-format-error="handleImgFormatError"
              :on-exceeded-size="handleImgMaxSize"
              style="display: inline-block;width: 58px"
            >
              <div style="width: 58px;height: 58px;line-height: 58px">
                <Icon type="md-camera" size="20" />
              </div>
            </Upload>
          </FormItem>
          <FormItem label="原密码" prop="oldPassword">
            <div style="display: inline-block;width: 300px">
              <Input
                type="password"
                v-model="formItem.oldPassword"
                placeholder="请输入现在使用的密码，如需修改密码则必填"
              />
            </div>
          </FormItem>
          <FormItem label="新密码" prop="password">
            <div style="display: inline-block;width: 300px">
              <Input type="password" v-model="formItem.password" placeholder="请输入新密码，至少6位字符" />
            </div>
          </FormItem>
          <FormItem label="确认新密码" prop="rePassword">
            <div style="display: inline-block;width: 300px">
              <Input type="password" v-model="rePassword" placeholder="请再次输入新密码" />
            </div>
          </FormItem>
          <div>
            <Button type="text" style="width: 100px" @click="cancel">取消</Button>
            <Button type="primary" style="width: 100px" :loading="saveLoading" @click="confirmSubmit">保存</Button>
          </div>
        </Form>
      </div>
    </Card>
    <Modal v-model="confirmSub" width="360">
      <p slot="header" style="color: #f60;text-align: center">
        <Icon type="information-circled" />
        <span>确定要提交么</span>
      </p>
      <div style="text-align: center">
        <p>个人信息修改后，将会退出系统重新登录，请明确后修改！</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="submit" :loading="saveLoading">确定修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { own } from '@/api/user'
import { baseUrl } from '@/libs/api.request'
import { getToken } from '@/libs/util'

export default {
  name: 'OwnIndex',
  data() {
    const checkPassword = (rule, value, callback) => {
      const password = this.formItem.password
      if (password !== this.rePassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    const checkOldPassword = (rule, value, callback) => {
      const password = this.formItem.password
      if (password) {
        if (!this.formItem.oldPassword) {
          callback(new Error('初始密码不得为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      confirmSub: false,
      uploadUrl: baseUrl + '/Index/upload',
      uploadHeader: { 'apiAuth': getToken() },
      saveLoading: false,
      rePassword: '',
      username: '',
      formItem: {
        nickname: '',
        head_img: '',
        oldPassword: '',
        password: ''
      },
      ruleValidate: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        password: [
          { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
          { max: 32, message: '最多输入32个字符', trigger: 'blur' }
        ],
        rePassword: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        oldPassword: [
          { validator: checkOldPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'logout'
    ]),
    ...mapMutations('app', [
      'closeTag'
    ]),
    cancel() {
      this.closeTag({
        name: 'user_center'
      })
    },
    confirmSubmit() {
      this.confirmSub = true
    },
    submit() {
      const vm = this
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          vm.saveLoading = true
          own(vm.formItem).then(response => {
            vm.$Message.success(response.msg)
            vm.logout().then(() => {
              vm.$router.push({
                name: 'login'
              })
            })
            vm.saveLoading = false
          }).catch(() => {
            vm.saveLoading = false
          })
        }
      })
    },
    init() {
      const userInfo = this.$store.state.user.userInfo
      this.username = userInfo.username
      this.formItem.nickname = userInfo.nickname
      this.formItem.head_img = userInfo.userData.head_img
    },
    handleImgFormatError(file) {
      this.$Notice.warning({
        title: '文件类型不合法',
        desc: file.name + '的文件类型不正确，请上传jpg或者png图片。'
      })
    },
    handleImgRemove() {
      this.formItem.head_img = ''
    },
    handleImgSuccess(response) {
      if (response.code === 0) {
        this.$Message.success(response.msg)
        this.formItem.head_img = response.data.fileUrl
      } else {
        this.$Message.error(response.msg)
      }
    },
    handleImgMaxSize(file) {
      this.$Notice.warning({
        title: '文件大小不合法',
        desc: file.name + '太大啦请上传小于5M的文件。'
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less">
.own-space {
  &-btn-box {
    margin-bottom: 10px;

    button {
      padding-left: 0;

      span {
        color: #2D8CF0;
        transition: all .2s;
      }

      span:hover {
        color: #0C25F1;
        transition: all .2s;
      }
    }
  }

  &-tra {
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: -3px;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, .1);
    background-color: white;
    z-index: 100;
  }

  &-input-identifycode-con {
    position: absolute;
    width: 200px;
    height: 100px;
    right: -220px;
    top: 50%;
    margin-top: -50px;
    border-radius: 4px;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, .1);
  }
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;

  img {
    width: 100%;
    height: 100%;
  }

  &-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  &:hover .demo-upload-list-cover {
    display: block;
  }

  &-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
</style>
