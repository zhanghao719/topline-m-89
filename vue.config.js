/**
 * Vue CLI 打包配置文件
 * 参考文档：
 */

module.exports = {
  // 部署应用包时的基本 URL，默认是 /
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  // 配置参考：https://cli.vuejs.org/zh/config/#publicpath
  // https://lipengzhou.github.io/topline-m-89/
  // publicPath: '/topline-m-89/'
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  }
}
