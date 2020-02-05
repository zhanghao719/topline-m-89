<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!--
      router-view 就是一个动态组件
     -->
    <!-- <router-view /> -->
    <!--
      keep-alive 是 Vue 本身内置的一个组件，专门用来缓存组件的
      官方文档：https://cn.vuejs.org/v2/api/#keep-alive
      默认缓存所有组件
      也可以通过 include 和 exclude 来配置组件缓存
        include 可以配置哪些组件缓存
        exclude 配置哪些组件不要缓存
     -->
    <keep-alive :include="$store.state.cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      cachePages: ['TabBar']
    }
  }
}
</script>

<style lang="less" scoped>
</style>
