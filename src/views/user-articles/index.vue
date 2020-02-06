<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <!--
      router.push 会形成历史记录
      router.replace 也 push 的使用方式一样，但是不会形成历史记录
     -->
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.replace('/my')"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 标签列表 -->
    <van-tabs v-model="active">
      <van-tab title="我的收藏">
        <!-- <collect-article /> -->
      </van-tab>
      <van-tab title="我的历史">
        <!-- <history-article /> -->
      </van-tab>
      <van-tab title="我的作品">
        <!-- <user-article /> -->
      </van-tab>
    </van-tabs>
    <!-- /标签列表 -->

    <!-- 动态组件 -->
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>

<script>
// import UserArticle from './components/article'
// import CollectArticle from './components/collect'
// import HistoryArticle from './components/history'

export default {
  name: 'UserArticles',
  components: {
    UserArticle: () => import('./components/article'),
    CollectArticle: () => import('./components/collect'),
    HistoryArticle: () => import('./components/history')
  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2 // 我的作品
    }
    return {
      active // 控制激活的标签选项
    }
  },
  computed: {
    currentTabComponent () {
      return ['CollectArticle', 'HistoryArticle', 'UserArticle'][this.active]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  // 当组件被缓存之后不再触发 create、mount
  // 如果你想要当缓存页面由激活到停用或者是由停用→激活执行一些业务操作的时候，可以使用 activated、deactivated
  // 被 keep-alive 缓存的组件激活时调用。
  activated () {
    console.log('activated')
  },

  // 被 keep-alive 缓存的组件停用时调用。
  deactivated () {
    console.log('deactivated')
  },

  methods: {},
  // 当前页面路由跳转的时候会触发这个路由钩子函数
  // to   要去哪儿的信息
  // from 来自于哪里的信息
  // next 放行的方法
  //    next() 允许通过
  //    next(false) 不允许通过
  beforeRouteLeave (to, from, next) {
    console.log(to)
    // 如果跳转的是文章详情页，则把当前页面缓存起来，否则不缓存
    if (to.name === 'article') {
      this.$store.commit('addCachePage', 'UserArticles')
    } else {
      this.$store.commit('removeCachePage', 'UserArticles')
    }

    // 放行通过
    next()
  }
}
</script>

<style scoped lang="less">
.user-articles {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
