<template>
  <div class="Search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in resultList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  data() {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
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
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getSearchResult({
        page: this.page, //页码
        per_page: this.perage, //每页大小
        q: this.searchtText, //搜索字符
      });
      const results = data.data.results;
      this.resultList.push(...results);
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (results.length) {
        // 如果有 则更新页码
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>
<style lang='css' scoped>
</style>