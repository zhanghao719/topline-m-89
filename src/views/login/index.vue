<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-cell-group>
      <van-field
        clearable
        left-icon="contact"
        placeholder="请输入手机号"
      />

      <van-field
        placeholder="请输入验证码"
        left-icon="contact"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          round
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <div class="login-btn-wrap">
      <van-button type="info">登录</van-button>
    </div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  props: {},
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

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background: #6db4fb;
    }
  }
}
</style>
