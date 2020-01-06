<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />

    <div class="box">hello</div>

    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
// import xxx from '@/xxx'

export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
// 注意：在 style 中使用 @ 别名，需要在前面加 ~
// @ 之后必须有 /
// 如果你加载的资源就是相对于当前目录，建议还是 ./
@import url("~@/styles/variables.less");

.box {
  color: @color-primary;
}
</style>
