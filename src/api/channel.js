import request from "../util/request"

// 添加用户指定频道
export const addUserChannel = (data) => {
    return request({
        method: 'PATCH',
        url: 'app/v1_0/user/channels',
        data,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 删除用户指定频道
export const deleteUserChannel = (channelId) => {
    return request({
        method: 'DELETE',
        url: 'app/v1_0/user/channels/' + channelId,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
