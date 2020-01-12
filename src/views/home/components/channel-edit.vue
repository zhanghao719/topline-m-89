<template>
  <div class="channel-edit">
    <van-cell class="channel-header" title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
      >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="channel in userChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
    <van-cell class="channel-header" title="推荐频道" :border="false" />
    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  // 简单写法
  // props: ['userChannels'],

  // 建议写法，Props 验证
  // 参考文档：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道
    }
  },
  computed: {
    remainingChannels () {
      const channels = []
      const { allChannels, userChannels } = this
      allChannels.forEach(item => {
        // 当前的遍历项是否属于我的频道，如果不是，那就收集到 channels
        // userChannels 是否包含 item
        // find 会遍历数组，它会对每个元素执行 c.id === item.id 条件判定
        // 如果 true，则返回该元素，如果直到遍历结束都没有符合条件的元素，则返回 undefined
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 40px;
  .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
  }
}
</style>
