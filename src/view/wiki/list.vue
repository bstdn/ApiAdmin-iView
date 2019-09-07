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
  </Content>
</template>

<script>
export default {
  name: 'WikiList'
}
</script>
