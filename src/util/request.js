import axios from 'axios'
import store from "@/store/"
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'


const refreshTokenReq = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/"
})

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',  //基础路径

    transformResponse: [function (data) {
        try {
            return JSONbig.parse(data)
        } catch (err) {
            console.log('转换失败', err);
            return data
        }
    }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // Do something before request is sent

    const { user } = store.state

    // 如果用户一登录,统一给接口设置 token 信息
    if (user) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }

    // 处理完之后把config返回
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// 响应拦截器
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error


    // 响应码超过2xx的都会经过这里

    const status = error.response.status


    if (status === 400) {
        // 客户端错误
        Toast.fail('客户端请求异常')
    } else if (status === 401) {
        // 没有token 权限
        // 如果没有user 或者 user.token 直接去登录
        const { user } = store.state
        if (!user || !user.token) {
            // 直接跳转登录页
            return redirectLogin()
        }

        // 如果有 refresh_token 之后把它更新到容器中
        try {
            const { data } = await refreshTokenReq({
                method: 'PUT',
                url: 'app/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }
            })
            // 拿到新得token 之后把它更新到容器中

            user.token = data.data.token
            store.commit('setUser', user)
        } catch (err) {
            // 刷新token都失败了，直接跳转登录页面
            redirectLogin()
        }

        // 把失败的请求重新发出去
        // error.config 是本次请求的相关配置对象
        // 他的请求拦截器中通过store容器访问 token 数据
        return request(error.config)
    } else if (status === 403) {
        // 没有权限
        Toast.fail('没有权限')
    } else if (status >= 500) {
        // 服务端异常
        Toast.fail('服务端异常')
    }

    // 抛出异常
    return Promise.reject(error);
});

function redirectLogin() {
    router.replace({
        name: 'Login',
        //传递查询参数,查询参数会以 ? 作为分隔符放到 url 后面 
        query: {
            // 数据名是自己起的
            redirect: router.currentRoute.fullPath //当前路由路径  router.currentRoute 和我们在组件中的this.$route 是一个东西
        }
    })
}

export default request