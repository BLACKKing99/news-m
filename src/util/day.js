//  初始化dayjs相关的配置

import Vue from 'vue'
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'



dayjs.extend(relativeTime)



dayjs.locale('zh-cn')

// 把处理相对时间的代码包装起来为全局过滤器然后就可以在组建的任何模板中使用了
// 所谓的过滤器其实就是一个可以在模板中调用的函数而已
//  在组件的模板中使用过滤器：{{ xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中



Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})


Vue.filter('datetime', (value, format = "YYYY-MM-DD HH:MM:SS") => {
    return dayjs(value).format(format)
})


// dayjs('2020-50-13 15:38:30').from(dayjs())