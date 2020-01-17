<template>
  <div class="comment-reply">
    <van-nav-bar title="0 条回复">
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- 当前评论 -->
    <comment-item :comment="comment" />
    <!-- /当前评论 -->
    <van-cell title="所有回复" />
    <!-- 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        :comment="comment"
        v-for="(comment, index) in list"
        :key="index"
      />
    </van-list>
    <!-- /回复列表 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments } from '@/api/comment'

export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(), // 源id，文章id或评论id
        offset: this.offset,
        limit: this.limit
      })

      // 2. 将数据添加到列表
      const { results } = data.data
      this.list.push(...results)

      // 3. 关闭 loading
      this.loading = false

      // 4. 判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id // 更新获取下一页数据的标记
      } else {
        this.finished = true // 没有数据了，结束
      }
    }
  }
}
</script>

<style scoped></style>
