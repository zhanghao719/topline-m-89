<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <van-nav-bar title="我的收藏/历史/作品" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->

    <van-tabs v-model="active">
      <van-tab title="我的收藏">内容 1</van-tab>
      <van-tab title="我的历史">内容 2</van-tab>
      <van-tab title="我的作品">
        <user-article />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'

export default {
  name: 'UserArticles',
  components: {
    UserArticle
  },
  props: {},
  data () {
    return {
      active: 0 // 控制激活的标签选项
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
