<template>
  <div>
    <Row>
      <Col span="24">
        <Card style="margin-bottom: 10px">
          <Form inline>
            <FormItem style="margin-bottom: 0">
              <Select v-model="searchConf.type" clearable placeholder="请选择类别" style="width: 100px">
                <Option :value="1">操作URL</Option>
                <Option :value="2">用户昵称</Option>
                <Option :value="3">用户ID</Option>
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
  </div>
</template>

<script>
import { getList, del } from '@/api/log'
import expandRow from './table_expand.vue'
import { getDate } from '@/libs/tools'

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
  name: 'SystemLog',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    expandRow
  },
  data() {
    return {
      columnsList: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '行为名称',
          align: 'center',
          key: 'action_name'
        },
        {
          title: '用户ID',
          align: 'center',
          key: 'uid',
          width: 120
        },
        {
          title: '用户昵称',
          align: 'center',
          key: 'nickname',
          width: 100
        },
        {
          title: '操作URL',
          align: 'center',
          key: 'url',
          width: 200
        },
        {
          title: '执行时间',
          align: 'center',
          width: 170,
          render: (h, params) => {
            return h('span', getDate(params.row.add_time, 'year'))
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 125,
          render: (h, params) => {
            return h('div', [
              deleteButton(this, h, params.row, params.index)
            ])
          }
        }
      ],
      tableData: [],
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
        keywords: vm.searchConf.keywords
      }
      getList(params).then(response => {
        vm.tableData = response.data.list
        vm.tableShow.listCount = response.data.count
      })
    }
  }
}
</script>
