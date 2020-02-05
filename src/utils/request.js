/**
 * 基于 axios 的请求模块
 */

import axios from 'axios'
import jsonBig from 'json-bigint'

// 在非组件模块中直接加载获取容器
// 这里拿到的 store 和你在组件中访问 this.$store 是一个东西
import store from '@/store'
import router from '@/router'

// axios.create 方法创建一个和 axios 本身功能一样的一个对象
// 相关的复制了一个 axios，它的功能和 axios 是一样的，但是它可以拥有自己的拦截器、基础路径
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// axios 开放了自定义转换后端返回数据的 API
// data 就是后端返回的原始数据
request.defaults.transformResponse = [function (data) {
  try {
    // 现在我们定制使用 json-bigint 来帮我们处理转换原始的 JSON 格式字符串
    // 这个方法类似于 JSON.parse，只不过它能把数据中的超出 JS 安全整数范围的数字给处理成正确的
    // 它内部有自己的算法，它会把大数字转为一个对象，我们在使用的时候把对象.toString() 就得到字符串形式的 id 了
    // 如果转换成功则返回成功的结果给请求使用
    // 如果转换失败则进入 catch，返回一个空对象
    return jsonBig.parse(data)

    // 它默认是这样的
    // return JSON.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 请求配置对象，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state

  // 统一添加 token
  if (user) {
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称
    // 数据值后端要求提供：Bearer token数据
    //    注意：Bearer 后面有个空格
    // 老师，为啥？后端要求的
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // 当请求失败的时候会进入这个响应拦截中的错误处理函数
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) {
    // 1. 如果没有 refresh_token，则直接跳转登录页
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }

    // 2. 如果有，则请求更新 token
    try {
      // 这里为啥使用 axios 请求刷新 token？
      // 刷新 token 的接口要求把 refresh_token 放到请求头中，名字叫 Authorization
      // 如果我们使用 request 请求刷新 token，则会走 request 的请求拦截器，request 的请求拦截器中添加的是 token，不是 refresh_token
      // 如果 request 刷新 token 失败了，还会进入 request 自己的响应拦截器中，在这里会执行请求刷新 token 的操作
      // 而我们需要当刷新 token 失败之后直接跳转登录页，不需要在执行任何的处理了。
      // 所以：request 请求拦截器处理和响应拦截器不符合我们请求刷新 token 的要求，除非你在里面继续更多的判断逻辑
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 响应结果：{ message: ok, token: 'xxxxxxxxxxxxxx' }
      // user: { id, token, refresh_token }
      // 修改容器数据必须通过 mutation 来修改

      // 3. 如果刷新 token 成功了，则把新的 token 更新到容器中
      store.commit('setUser', {
        ...user, // { id, token, refresh_token }
        token: data.data.token // 更新 token
      })

      // 4. 把之前失败的请求继续发出去
      // error.config 获取到的是本次请求相关的配置对象，其中包含它的 method、url 等信息
      // console.log(error.config)

      // 把本次因为 token 无效过期的失败请求重新发送
      // 注意：这里使用 request，还是走原来的请求拦截器、响应拦截器
      // 注意：使用 return 把请求结果继续返回，真正的请求的代码才能拿到
      return request(error.config)
    } catch (err) {
      console.log('刷新 token 失败', err)
      redirectLogin()
    }
  }
  return Promise.reject(error)
})

function redirectLogin () {
  // 写法一：
  // router.push('/login?key=value&key=value')

  // 写法二：
  router.push({
    name: 'login',
    // query 参数会以 ?key=value&key=value 的格式添加到 url 后面
    // query 参数不需要配置路由规则，可以传递任意参数
    // query 是固定的语法格式，用来传递 ?key=value 查询字符串
    query: {
      // 这里使用查询参数把要跳转回来的路由地址传递给了登录页面
      // router.currentRoute 就是当前路由对象，好比我们在组件中的 this.$route
      // 当前路由对象的fullPath 就是当前路由的路径
      // redirect 是我自己起的一个名字
      redirect: router.currentRoute.fullPath
    }
  })
}

// 导出
export default request
