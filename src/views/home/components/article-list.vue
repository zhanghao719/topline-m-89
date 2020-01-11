<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
  // props: ['channel'],
  props: {
    // 参考文档：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
    channel: {
      type: Object, // 必须是对象
      required: true // 必须传递该数据
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 用于获取下一页数据的页码（时间戳）
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })

      // 2. 把数据添加到列表中
      const { results } = data.data
      this.list.push(...results)

      // 3. 停止本次的 loading
      this.loading = false

      // 4. 判断数据是否加载结束
      if (results.length) {
        this.timestamp = data.data.pre_timestamp // 更新获取下一页数据的时间戳
      } else {
        this.finished = true // 没有数据了，设置加载结束
      }
    }
  }
}
</script>

<style scoped></style>
