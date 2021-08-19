import axios from 'axios'
import store from "@/store/"

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'  //基础路径
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


export default request