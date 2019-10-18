<template>
  <div>
    <Row>
      <Col span="24">
        <Card style="margin-bottom: 10px">
          <Form inline>
            <FormItem style="margin-bottom: 0">
              <Select v-model="searchConf.status" clearable placeholder="请选择状态" style="width: 100px">
                <Option :value="1">启用</Option>
                <Option :value="0">禁用</Option>
              </Select>
            </FormItem>
            <FormItem style="margin-bottom: 0">
              <Select v-model="searchConf.type" clearable placeholder="请选择类别" style="width: 100px">
                <Option :value="1">用户账号</Option>
                <Option :value="2">用户昵称</Option>
              </Select>
            </FormItem>
            <FormItem style="margin-bottom: 0">
              <Input v-model="searchConf.keywords" />
            </FormItem>
            <FormItem style="margin-bottom: 0">
              <Button type="primary" @click="search">{{ $t('find_button') }}/{{ $t('refresh_button') }}</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title" style="height: 32px">
            <Button type="primary" @click="alertAdd" icon="md-add">{{ $t('add_button') }}</Button>
          </p>
          <div>
            <Table :columns="columnsList" :data="tableData" border disabled-hover></Table>
          </div>
          <div class="margin-top-15" style="text-align: center">
            <Page
              :total="tableShow.listCount"
              :current="tableShow.currentPage"
              :page-size="tableShow.pageSize"
              @on-change="changePage"
              @on-page-size-change="changeSize"
              show-elevator
              show-sizer
              show-total
            />
          </div>
        </Card>
      </Col>
    </Row>
    <Modal v-model="modalSetting.show" width="668" :styles="{top: '30px'}" @on-visible-change="doCancel">
      <p slot="header" style="color: #2d8cf0">
        <Icon type="md-alert" />
        <span>{{formItem.id ? '编辑' : '新增'}}用户</span>
      </p>
      <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
        <FormItem label="用户账号" prop="username">
          <Input v-model="formItem.username" placeholder="请输入账号" />
        </FormItem>
        <FormItem label="用户昵称" prop="nickname">
          <Input v-model="formItem.nickname" placeholder="请输入昵称" />
        </FormItem>
        <FormItem label="用户密码" prop="password">
          <Input v-model="formItem.password" type="password" placeholder="用户密码" />
        </FormItem>
        <FormItem label="权限组" prop="group_id">
          <CheckboxGroup v-model="formItem.group_id">
            <Checkbox v-for="group in groupList" :key="group.id" :label="group.id + ''">{{ group.name }}</Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
        <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getGroups } from '@/api/auth'
import { getList, changeStatus, add, edit, del } from '@/api/user'

const editButton = (vm, h, currentRow, index) => {
  return h('Button', {
    props: {
      type: 'primary'
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        vm.formItem.id = currentRow.id
        vm.formItem.username = currentRow.username
        vm.formItem.nickname = currentRow.nickname
        vm.formItem.password = ''
        getGroups().then(response => {
          vm.groupList = response.data.list
        })
        vm.formItem.group_id = currentRow.group_id
        vm.modalSetting.show = true
        vm.modalSetting.index = index
      }
    }
  }, vm.$t('edit_button'))
}
const deleteButton = (vm, h, currentRow, index) => {
  return h('Poptip', {
    props: {
      confirm: true,
      title: '您确定要删除这条数据吗? ',
      transfer: true
    },
    on: {
      'on-ok': () => {
        del(currentRow.id).then(response => {
          vm.tableData.splice(index, 1)
          vm.$Message.success(response.msg)
        })
        currentRow.loading = false
      }
    }
  }, [
    h('Button', {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'error',
        placement: 'top',
        loading: currentRow.isDeleting
      }
    }, vm.$t('delete_button'))
  ])
}

export default {
  name: 'SystemUser',
  data() {
    return {
      columnsList: [
        {
          title: '序号',
          type: 'index',
          width: 65,
          align: 'center'
        },
        {
          title: '用户账号',
          align: 'center',
          key: 'username',
          minWidth: 120
        },
        {
          title: '用户昵称',
          align: 'center',
          key: 'nickname',
          width: 120
        },
        {
          title: '登录次数',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.userData === null ? '' : params.row.userData.login_times)
          },
          width: 90
        },
        {
          title: '最后登录时间',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.userData === null ? '' : params.row.userData.last_login_time)
          },
          width: 160
        },
        {
          title: '最后登录IP',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.userData === null ? '' : params.row.userData.last_login_ip)
          },
          width: 160
        },
        {
          title: '状态',
          align: 'center',
          width: 100,
          render: (h, params) => {
            const vm = this
            return h('i-switch', {
              attrs: {
                size: 'large'
              },
              props: {
                'true-value': 1,
                'false-value': 0,
                value: params.row.status
              },
              on: {
                'on-change': function(status) {
                  changeStatus(status, params.row.id).then(response => {
                    vm.$Message.success(response.msg)
                    vm.getList()
                  })
                }
              }
            }, [
              h('span', {
                slot: 'open'
              }, vm.$t('open_choose')),
              h('span', {
                slot: 'close'
              }, vm.$t('close_choose'))
            ])
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', [
              editButton(this, h, params.row, params.index),
              deleteButton(this, h, params.row, params.index)
            ])
          }
        }
      ],
      tableData: [],
      groupList: [],
      tableShow: {
        currentPage: 1,
        pageSize: 10,
        listCount: 0
      },
      searchConf: {
        type: '',
        keywords: '',
        status: ''
      },
      modalSetting: {
        show: false,
        loading: false,
        index: 0
      },
      formItem: {
        username: '',
        nickname: '',
        password: '',
        group_id: [],
        id: 0
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: (role, value, callback) => {
              if (this.formItem.id === 0 && value === '') {
                callback(new Error('用户密码不能为空'))
              }
              callback()
            }
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    alertAdd() {
      const vm = this
      getGroups().then(response => {
        vm.groupList = response.data.list
      })
      this.modalSetting.show = true
    },
    submit() {
      const vm = this
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          vm.modalSetting.loading = true
          if (vm.formItem.id === 0) {
            add(vm.formItem).then(response => {
              vm.$Message.success(response.msg)
              vm.getList()
              vm.cancel()
            }).catch(() => {
              vm.modalSetting.loading = false
            })
          } else {
            edit(vm.formItem).then(response => {
              vm.$Message.success(response.msg)
              vm.getList()
              vm.cancel()
            }).catch(() => {
              vm.modalSetting.loading = false
            })
          }
        }
      })
    },
    cancel() {
      this.modalSetting.show = false
    },
    doCancel(data) {
      if (!data) {
        this.formItem.id = 0
        this.$refs['myForm'].resetFields()
        this.modalSetting.loading = false
        this.modalSetting.index = 0
      }
    },
    changePage(page) {
      this.tableShow.currentPage = page
      this.getList()
    },
    changeSize(size) {
      this.tableShow.pageSize = size
      this.getList()
    },
    search() {
      this.tableShow.currentPage = 1
      this.getList()
    },
    getList() {
      const vm = this
      const params = {
        page: vm.tableShow.currentPage,
        size: vm.tableShow.pageSize,
        type: vm.searchConf.type,
        keywords: vm.searchConf.keywords,
        status: vm.searchConf.status
      }
      getList(params).then(response => {
        vm.tableData = response.data.list
        vm.tableShow.listCount = response.data.count
      })
    }
  }
}
</script>
