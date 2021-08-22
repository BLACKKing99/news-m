import request from "../util/request"


// 获取联想建议
export const getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: 'app/v1_0/suggestion',
        params: {
            q //联想建议关键词
        },
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// 获取搜索结果
export const getSearchResult = (params) => {
    return request({
        method: 'GET',
        url: 'app/v1_0/search',
        params
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 获取搜索历史记录
export const getSearchHistory = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/search/histories',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

// // 删除所有搜索历史记录
// export const getSearchHistory = () => {
//     return request({
//         method: 'GET',
//         url: 'app/v1_0/search/histories',
//         // headers: {
//         //     Authorization: `Bearer ${store.state.user.token}`
//         // }
//     })
// }


