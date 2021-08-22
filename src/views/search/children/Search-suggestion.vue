<template>
  <div class="Search-suggestion">
    <van-cell
      icon="search"
      v-for="(value, index) in suggestions"
      :key="index"
      @click="$emit('search', value)"
      ><div slot="title" v-html="highlight(value)"></div
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash"; //js常用的工具函数包

export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchtText: {
      type: String,
      required: true,
    },
  },
  components: {},

  computed: {},

  methods: {
    highlight(value) {
      let reg = new RegExp(this.searchtText, "gi");
      return value.replace(
        reg,
        `<span style="color:red">${this.searchtText}</span>`
      );
    },
  },
  watch: {
    //   属性名:要监视的数据的名称
    // 简写
    // searchtText() {
    //   console.log("hello");
    // },
    // 完整写法
    searchtText: {
      // 当数据发生变化时则会执行 handler 处理函数
      //   handler: debounce(async function () {
      //     const { data } = await getSearchSuggestions(this.searchtText);
      //     this.suggestions = data.data.options;
      //     if (data.data.options.length === 0) {
      //       this.suggestions.push("无搜索内容");
      //     }
      //   }, 500),
      handler() {
        //   发送请求
        const fn = debounce(async () => {
          const { data } = await getSearchSuggestions(this.searchtText);
          this.suggestions = data.data.options;
          // this.suggestions.forEach((value) => {
          //   value.replace(
          //     this.searchtText,
          //     `<span style="color:red">${this.searchtText}</span>`
          //   );
          // });
          if (data.data.options.length === 0) {
            this.suggestions.push("无搜索内容");
          }
        }, 500);
        fn();
      },

      //   async handler() {
      //     //   发送请求
      //     const { data } = await getSearchSuggestions(this.searchtText);
      //     this.suggestions = data.data.options;
      //     if (data.data.options.length === 0) {
      //       this.suggestions.push("无搜索内容");
      //     }
      //   },
      //   该回调将会在侦听开始之后被执行   就是没被渲染也会被执行
      immediate: true,
    },
  },
};
</script>
<style lang='css' scoped>
</style>