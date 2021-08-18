/*
    PostCSS 的配置文件
    PostCSS 是基于Node.js 运行的一个处理CSS的工具
*/

// postcss.config.js
module.exports = {
    // 配置要使用的相关插件
    plugins: {
        // 用来兼容不同浏览器的
        autoprefixer: {
            // borwsers：用来配置要兼容到的系统(浏览器)环境
            borwsers: ['Android >= 4.0', 'iOS >= 8']
        },
        'postcss-pxtorem': {
            // 转换的根元素基准值
            // 750 宽的设计稿  750/10 = 75
            // 375 宽的设计稿  375/10 = 37.5
            // Vant 组件库是基于 375 宽写的
            // 设计稿都是基于物理像素750
            rootValue: 37.5,

            // 配置需要转换的 CSS 属性
            propList: ['*'],
        },
    },
};