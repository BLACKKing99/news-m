

import request from "../util/request";

// 非组件中获取vuex数据，必须通过这种方式
// import store from "@/store/"

export const login = (data) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/authorizations',
        data
    })
}


// 发送短信验证码


export const sendCode = (mobile) => {
    return request({
        method: 'GET',
        url: `app/v1_0/sms/codes/${mobile}`
    })
}

// 获取登录用户信息
export const getCurrentInfo = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 获取登录用户频道列表
export const getLoadChannels = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user/channels',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 获取登录用户所有频道列表
export const getAllLoadChannels = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/channels',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


