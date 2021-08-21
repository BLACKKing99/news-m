import request from "../util/request"


// 获取登录用户频道新闻推荐
export const getNewsRecommend = (params) => {
    return request({
        method: 'GET',
        url: 'app/v1_1/articles',
        params,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


