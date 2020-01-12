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
        v-for="value in 8"
        :key="value"
        text="文字"
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
  computed: {},
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
