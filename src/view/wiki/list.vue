<template>
  <Content class="wiki-content-con">
    <Card class="margin-top-15">
      <div>
        <h3 class="line-height-16">接口状态说明：</h3>
        <p class="line-height-16"><Tag color="warning">测试</Tag>系统将不过滤任何字段，也不进行AccessToken的认证，但在必要的情况下会进行UserToken的认证！</p>
        <p class="line-height-16"><Tag color="primary">启用</Tag>系统将严格过滤请求字段，并且进行全部必要认证！</p>
        <p class="line-height-16"><Tag color="error">禁用</Tag>系统将拒绝所有请求，一般应用于危机处理！</p>
      </div>
    </Card>
    <div class="wiki-layout-con">
      <Spin size="large" fix v-if="show_loading" />
      <Collapse>
        <Panel v-bind:key="index" v-for="(item, index) in groupInfo" :name="index.toString()">
          {{item.name}}【{{item.create_time}}】 <span style="float: right;margin-right: 20px">接口数量{{item.api_info ? item.api_info.length : 0}} | 项目热度{{item.hot}}</span>
          <p slot="content" v-if="item.api_info">
            <span v-bind:key="api_index" v-for="(api_item, api_index) in item.api_info" @click="showApiDetail(api_item.hash)" style="cursor: pointer">
              <Alert :type="api_item.method | methodAlert">
                <h3>/api/{{api_item.hash}}</h3>
                <template slot="desc">
                  <Tag :color="api_item.method | methodType">{{api_item.method | methodText}}</Tag>
                  {{api_item.info}}
                </template>
              </Alert>
            </span>
          </p>
          <p slot="content" v-else style="text-align: center">
            <span>暂无接口</span>
          </p>
        </Panel>
      </Collapse>
      <ABackTop :height="100" :bottom="80" :right="60" container=".wiki-layout-con" />
    </div>
    <Drawer :title="api_detail.info" v-model="show_detail" width="820" @on-close="closeDrawer">
      <Tabs type="card">
        <TabPane label="接口说明">
          <Form :label-width="80">
            <FormItem label="接口地址">
              <Tag :color="api_detail.method | methodType">{{api_detail.method | methodText}}</Tag>
              <Alert class="url">{{url}}</Alert>
            </FormItem>
            <FormItem label="请求头部">
              <Table border :columns="header_columns" :data="header_data" />
            </FormItem>
            <FormItem label="请求参数">
              <Table border :columns="request_columns" :data="detail_info.request" />
            </FormItem>
            <FormItem label="返回参数">
              <Table border :columns="response_columns" :data="detail_info.response" />
            </FormItem>
            <FormItem label="返回示例" v-if="code">
              <div style="width: 100%" v-highlight>
                <pre><code>{{code}}</code></pre>
              </div>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="接口测试">
          <Card style="width:100%">
            <div style="text-align:center">
              <img width="120px" src="https://cn.vuejs.org/images/logo.png">
              <h3>在线测试功能，即将到来</h3>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </Drawer>
  </Content>
</template>

<script>
import highlight from '@/directive/highlight'
import { apiGroup, detail } from '@/api/wiki'
import ABackTop from '@/components/main/components/a-back-top'

export default {
  name: 'WikiList',
  components: {
    ABackTop
  },
  directives: {
    highlight
  },
  filters: {
    methodAlert(method) {
      const map = {
        0: 'warning',
        1: 'success',
        2: 'info'
      }
      return map[method]
    },
    methodType(method) {
      const map = {
        0: 'warning',
        1: 'success',
        2: 'primary'
      }
      return map[method]
    },
    methodText(method) {
      const map = {
        0: '不限',
        1: 'GET',
        2: 'POST'
      }
      return map[method]
    }
  },
  data() {
    return {
      show_detail: false,
      show_loading: false,
      code: '',
      url: '',
      groupInfo: [],
      header_columns: [
        {
          title: '参数名称',
          key: 'field_name'
        },
        {
          title: '类型',
          render: (h, params) => {
            return h('Tag', {
              props: {
                'color': 'blue'
              }
            }, this.detail_info.dataType[params.row.data_type])
          }
        },
        {
          title: '字段状态',
          render: (h, params) => {
            if (params.row.is_must === 1) {
              return h('Tag', {
                props: {
                  'color': 'red'
                }
              }, '复杂认证')
            } else {
              return h('Tag', {
                props: {
                  'color': 'blue'
                }
              }, '简易认证')
            }
          }
        },
        {
          title: '字段说明',
          key: 'info',
          width: 290,
          render: (h, params) => {
            const text = params.row.info.substring(0, 20) + '...'
            if (params.row.info.length >= 20) {
              return h('Tooltip', {
                props: {
                  transfer: true,
                  maxWidth: 200
                }
              }, [
                text,
                h('div', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    wordWrap: 'break-word'
                  }
                }, params.row.info)
              ])
            } else {
              return h('span', params.row.info)
            }
          }
        }
      ],
      request_columns: [
        {
          title: '字段名称',
          key: 'field_name'
        },
        {
          title: '类型',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                'color': 'blue'
              }
            }, this.detail_info.dataType[params.row.data_type])
          }
        },
        {
          title: '字段属性',
          width: 110,
          render: (h, params) => {
            if (params.row.is_must === 1) {
              return h('Tag', {
                props: {
                  'color': 'red'
                }
              }, '必填')
            } else {
              return h('Tag', {
                props: {
                  'color': 'orange'
                }
              }, '选填')
            }
          }
        },
        {
          title: '默认值',
          key: 'default'
        },
        {
          title: '字段说明',
          key: 'info',
          width: 290,
          render: (h, params) => {
            const text = params.row.info.substring(0, 20) + '...'
            if (params.row.info.length >= 20) {
              return h('Tooltip', {
                props: {
                  transfer: true,
                  maxWidth: 200
                }
              }, [
                text,
                h('div', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    wordWrap: 'break-word'
                  }
                }, params.row.info)
              ])
            } else {
              return h('span', params.row.info)
            }
          }
        }
      ],
      response_columns: [
        {
          title: '字段名称',
          key: 'show_name'
        },
        {
          title: '类型',
          render: (h, params) => {
            return h('Tag', {
              props: {
                'color': 'blue'
              }
            }, this.detail_info.dataType[params.row.data_type])
          }
        },
        {
          title: '字段说明',
          key: 'info',
          width: 290,
          render: (h, params) => {
            const text = params.row.info.substring(0, 20) + '...'
            if (params.row.info.length >= 20) {
              return h('Tooltip', {
                props: {
                  transfer: true,
                  maxWidth: 200
                }
              }, [
                text,
                h('div', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    wordWrap: 'break-word'
                  }
                }, params.row.info)
              ])
            } else {
              return h('span', params.row.info)
            }
          }
        }
      ],
      detail_info: {},
      api_detail: {},
      header_data: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const vm = this
      apiGroup().then(response => {
        vm.groupInfo = response.data.data
      })
    },
    closeDrawer() {
      this.getList()
    },
    showApiDetail(hash) {
      const vm = this
      vm.show_loading = true
      detail({
        hash: hash
      }).then(response => {
        const res = response.data
        vm.detail_info = res
        vm.show_detail = true
        vm.show_loading = false
        vm.url = res.url
        vm.api_detail = res.apiList
        if (res.apiList.return_str) {
          vm.code = JSON.parse(res.apiList.return_str)
        }
        vm.header_data = [{
          is_must: res.apiList.access_token,
          field_name: 'access-token',
          info: 'APP认证秘钥【请在Header头里面传递】',
          data_type: 2
        }]
      })
    }
  }
}
</script>

<style lang="less">
.wiki-layout-con {
  margin-top: 15px;
  height: ~"calc(100% - 185px)";
  overflow: auto;
}

.line-height-16 {
  line-height: 30px;
}

.url {
  width: 90%;
  display: inline-block;
}
</style>
