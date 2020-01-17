<template>
  <div class="comment-reply">
    <van-nav-bar title="0 条回复">
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- 当前评论 -->
    <comment-item :comment="comment" />
    <!-- /当前评论 -->
    <van-cell title="所有回复" />
  </div>
</template>

<script>
import CommentItem from './comment-item'

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
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped></style>
