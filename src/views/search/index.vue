<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isSearchResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
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

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchContent: '', // 搜索内容
      isSearchResultShow: false // 是否展示搜索结果
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
