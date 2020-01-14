<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultShow = false"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isSearchResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell
        icon="search"
        v-for="(item, index) in suggestions"
        :key="index"
      >
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" />
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      isSearchResultShow: false, // 是否展示搜索结果
      suggestions: [] // 联想建议
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('onSearch')

      // 展示搜索结果
      this.isSearchResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    },

    async onSearchInput () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }

      // 1. 请求获取数据
      const { data } = await getSuggestions(searchContent)

      // 2. 将数据添加到组件实例中
      this.suggestions = data.data.options

      // 3. 模板绑定
    },

    highlight (str) {
      const searchContent = this.searchContent
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color: #3296fa">${searchContent}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
