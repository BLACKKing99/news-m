// 本地存储模块

export const getItem = (name) => {
    const data = window.localStorage.getItem(name)

    // data可能不是json格式字符串
    try {
        // 尝试把 data 转为 Javascript 对象
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}
export const setItem = (name, value) => {
    if (typeof value === 'object') {
    }
    window.localStorage.setItem(name, JSON.stringify(value))
}
export const removeItem = (name) => {
    window.localStorage.removeItem(name)
}