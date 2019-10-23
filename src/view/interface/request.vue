<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title" style="height: 32px">
            <Button type="primary" @click="alertAdd" icon="md-add">{{ $t('add_button') }}</Button>
          </p>
          <Alert show-icon>
            {{ apiInfo.info }} | {{ apiInfo.hash }} | {{ apiInfo.api_class }}
            <Icon type="ios-bulb-outline" slot="icon" />
            <span slot="desc" />
          </Alert>
          <div>
            <Table :columns="columnsList" :data="tableData" border disabled-hover />
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
        <span>{{formItem.id ? '编辑' : '新增'}}请求字段</span>
      </p>
      <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
        <FormItem label="字段名称" prop="field_name">
          <Input v-model="formItem.field_name" placeholder="请输入字段名称" />
        </FormItem>
        <FormItem label="数据类型" prop="data_type">
          <Select v-model="formItem.data_type" style="width: 200px">
            <Option v-for="(v, i) in tableShow.dataType" :value="i" :key="i"> {{v}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否必填">
          <RadioGroup v-model="formItem.is_must">
            <Radio label="0">不必填</Radio>
            <Radio label="1">必填</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="默认值" prop="default" v-if="formItem.is_must.toString() === '0'">
          <Input style="width: 300px" v-model="formItem.defaults" />
          <Tag color="error" class="margin-left-5">仅在字段非必填的情况下生效</Tag>
        </FormItem>
        <FormItem label="规则细节" prop="range">
          <Input v-model="formItem.range" type="textarea" placeholder="请输入符合要求的JSON字符串" />
        </FormItem>
        <FormItem label="字段说明" prop="info">
          <Input v-model="formItem.info" type="textarea" placeholder="请输入字段描述" />
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
import { getRequest, add, edit, del } from '@/api/fields'

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
        vm.formItem.field_name = currentRow.field_name
        vm.formItem.data_type = currentRow.data_type.toString()
        vm.formItem.defaults = currentRow.default
        vm.formItem.range = currentRow.range
        vm.formItem.is_must = currentRow.is_must.toString()
        vm.formItem.info = currentRow.info
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
          currentRow.loading = false
          vm.tableData.splice(index, 1)
          vm.$Message.success(response.msg)
        })
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
  name: 'InterfaceRequest',
  data() {
    return {
      hash: '',
      columnsList: [
        {
          title: '序号',
          type: 'index',
          width: 65,
          align: 'center'
        },
        {
          title: '字段名称',
          align: 'left',
          key: 'show_name',
          width: 200
        },
        {
          title: '数据类型',
          align: 'center',
          width: 100,
          render: (h, params) => {
            const type = params.row.data_type
            return h('Tag', {
              attrs: {
                color: 'primary'
              }
            }, this.tableShow.dataType[type])
          }
        },
        {
          title: '是否必须',
          align: 'center',
          width: 100,
          render: (h, params) => {
            if (params.row.is_must === 1) {
              return h('Tag', {
                attrs: {
                  color: 'error'
                }
              }, '必填')
            } else {
              return h('Tag', {
                attrs: {
                  color: 'primary'
                }
              }, '可选')
            }
          }
        },
        {
          title: '默认值',
          align: 'center',
          key: 'default',
          width: 160
        },
        {
          title: '字段说明',
          align: 'left',
          key: 'info'
        },
        {
          title: '操作',
          align: 'center',
          width: 205,
          render: (h, params) => {
            return h('div', [
              editButton(this, h, params.row, params.index),
              deleteButton(this, h, params.row, params.index)
            ])
          }
        }
      ],
      tableData: [],
      tableShow: {
        currentPage: 1,
        pageSize: 10,
        listCount: 0,
        dataType: {}
      },
      apiInfo: {},
      modalSetting: {
        show: false,
        loading: false,
        index: 0
      },
      formItem: {
        field_name: '',
        data_type: '2',
        defaults: '',
        range: '',
        is_must: '1',
        info: '',
        type: 0,
        id: 0
      },
      ruleValidate: {
        field_name: [
          { required: true, message: '字段名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.hash = this.$route.params.hash.toString()
    this.getList()
  },
  methods: {
    alertAdd() {
      this.modalSetting.show = true
    },
    submit() {
      this.formItem.hash = this.hash
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
      getRequest({
        page: vm.tableShow.currentPage,
        size: vm.tableShow.pageSize,
        hash: vm.hash
      }).then(response => {
        vm.tableData = response.data.list
        vm.tableShow.listCount = response.data.count
        vm.tableShow.dataType = response.data.dataType
        vm.apiInfo = response.data.apiInfo
      })
    },
    doCancel(data) {
      if (!data) {
        this.formItem.id = 0
        this.formItem.defaults = ''
        this.formItem.isMust = '1'
        this.$refs['myForm'].resetFields()
        this.modalSetting.loading = false
        this.modalSetting.index = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.api-box {
  max-height: 300px;
  overflow: auto;
  border: 1px solid #dddee1;
  border-radius: 5px;
  padding: 10px;
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
