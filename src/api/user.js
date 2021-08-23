

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

// 关注用户
export const addFollow = (userId) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/user/followings',
        data: {
            target: userId
        }
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 取消关注用户
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/user/followings/${target}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}



// 获取用户资料
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: `app/v1_0/user/profile`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 编辑用户资料
export const editorUserInfo = (data) => {
    return request({
        method: 'PATCH',
        url: `app/v1_0/user/profile`,
        data
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
// 编辑用户照片资料
export const editorUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: `app/v1_0/user/photo`,
        data
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}




