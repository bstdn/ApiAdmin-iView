<template>
  <Content class="wiki-content-con">
    <Alert class="margin-top-15" type="warning" style="line-height: 30px; font-size: 16px;" show-icon>特别说明： 此算法文档会根据业务发展需求发生变更，为了服务的稳定运行，请及时关注此文档！</Alert>
    <div class="wiki-layout-con">
      <Card>
        <Divider orientation="left">简介</Divider>
        <p>当前算法主要服务于获取身份令牌（AccessToken）所进行的身份认证秘钥（signature）的计算。在请求高级接口的时候，系统会验证应用的合法性，也就是验证AccessToken。所以AccessToken是请求API的必要参数。</p>
        <p>在请求获取AccessToken的接口时候，服务器会对用户合法性（signature）进行核验，具体的接口请求字段，请参看具体的接口文档。</p>
        <Divider orientation="left">一、获取app_id和app_secret</Divider>
        <p>目前获取应用ID和应用秘钥是由系统管理员发放，如果你还没有请联系管理员。<b>请注意：app_secret非常重要请妥善保管</b></p>
        <Divider orientation="left">二、准备加密对象，并且根据字段名降序排序</Divider>
        <pre>
//排序好后应当是如下所示的数据
{
  "app_id":"服务器颁发的应用ID",
  "app_secret":"服务器颁发的应用秘钥",   //请注意，此字段只是在计算加密串的时候在被加入，API请求请勿传递此字段值
  "device_id":"设备唯一ID",
  "rand_str":"随机字符串",
  "timestamp":当前系统时间戳
}</pre>
        <Divider orientation="left">三、生成原始串</Divider>
        <p>将上面的数据构建成HTTP查询字符串，如下所示:</p>
        <p>app_id=服务器颁发的应用ID&app_secret=服务器颁发的应用秘钥&device_id=设备唯一ID&rand_str=随机字符串&amp;timestamp=当前系统时间戳</p>
        <Divider orientation="left">四、计算秘钥</Divider>
        <p>将第三步生成的字符串进行哈希计算（md5）获得最终身份认证秘钥。</p>
      </Card>
      <ABackTop :height="100" :bottom="80" :right="60" container=".wiki-layout-con" />
    </div>
  </Content>
</template>

<script>
import ABackTop from '@/components/main/components/a-back-top'

export default {
  name: 'WikiCalculation',
  components: {
    ABackTop
  }
}
</script>

<style lang="less">
.wiki-layout-con {
  margin-top: 15px;
  height: ~"calc(100% - 78px)";
  overflow: auto;
}

p {
  line-height: 26px;
}
</style>
