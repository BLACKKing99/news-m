// 获取搜索结果
import request from "../util/request";


export const getDetail = (id) => {
    return request({
        method: 'GET',
        url: `app/v1_0/articles/${id}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 添加收藏文章

export const addCollectDetail = (detailId) => {
    return request({
        method: 'POST',
        url: `app/v1_0/article/collections`,
        data: {
            target: detailId
        }
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 添加收藏文章

export const cancelCollectDetail = (targetId) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/article/collections/${targetId}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 添加点赞文章

export const addGoodJobDetail = (detailId) => {
    return request({
        method: 'POST',
        url: `app/v1_0/article/likings`,
        data: {
            target: detailId
        }
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 取消点赞文章

export const cancelGoodJobDetail = (targetId) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/article/likings/${targetId}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 获取评论或评论回复

export const getComments = (params) => {
    return request({
        method: 'GET',
        url: `app/v1_0/comments`,
        params
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 对评论或评论回复点赞

export const addCommentLike = (target) => {
    return request({
        method: 'POST',
        url: `app/v1_0/comment/likings`,
        data: {
            target
        }
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}



// 取消对评论或评论回复点赞

export const cancelCommentLike = (target) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/comment/likings/${target}`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 添加评论或评论回复

export const addCommentsBack = (data) => {
    return request({
        method: 'POST',
        url: `app/v1_0/comments`,
        data
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}






