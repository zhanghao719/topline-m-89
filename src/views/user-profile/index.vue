<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group>
      <van-cell is-link title="头像" @click="onSelectFile">
        <van-image
          class="avatar"
          round
          :src="user.photo"
        />
      </van-cell>
      <input
        type="file"
        hidden
        ref="file"
        @change="onFileChange"
      >
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" value="内容" />
      <van-cell is-link title="性别" :value="user.gender === 0 ? '男' : '女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from '@/api/user'
import { ImagePreview } from 'vant'

export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {} // 用户资料
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    },

    onSelectFile () {
      this.file.click()
    },

    onFileChange () {
      // 预览图片
      const fileObj = this.file.files[0]
      const fileData = URL.createObjectURL(fileObj)
      ImagePreview({
        images: [fileData], // 预览的图片列表
        onClose: this.savePhoto
      })
    },

    async savePhoto () {
      await this.$dialog.confirm({
        title: '头像选择',
        message: '确认使用该图片作为头像吗？'
      })

      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 错误的写法
      // await updateUserPhoto({
      //   photo: 文件对象
      // })

      try {
        // 通过 file-input 获取文件对象
        const fileObj = this.file.files[0]

        // 构造包含文件的表单对象
        const fd = new FormData()
        fd.append('photo', fileObj)

        // 请求提交
        await updateUserPhoto(fd)

        // 更新视图
        this.user.photo = URL.createObjectURL(fileObj)

        // 提示成功
        this.$toast.success('保存成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('保存失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
