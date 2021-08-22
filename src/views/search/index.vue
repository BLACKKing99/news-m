<template>
  <div class="search-Container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-inp">
      <van-search
        v-model="searchtText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    </form>
    <search-result
      v-if="isResultShow"
      class="search-result"
      :searchtText="searchtText"
    ></search-result>
    <!-- 搜索结果 -->

    <search-suggestion
      v-else-if="searchtText"
      :searchtText="searchtText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 联想建议 -->

    <search-history
      v-else
      :searchHistory="searchHistory"
      @search="onSearch"
      @update-history="deleteAllHistory"
    ></search-history>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from "./children/Search-suggestion.vue";
import SearchHistory from "./children/Search-history.vue";
import SearchResult from "./children/Search-result.vue";

import { setItem, getItem } from "@/util/storage";
// import { getSearchHistory } from "@/api/search";
import { mapState } from "vuex";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchtText: "",
      isResultShow: false, //控制搜索结果的显示状态
      searchHistory: getItem("search-history") || [],
    };
  },

  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },

  computed: {
    ...mapState(["user"]),
  },

  created() {
    this.loadSearchHisory();
  },
  watch: {
    searchHistory() {
      setItem("search-history", this.searchHistory);
    },
  },
  methods: {
    onSearch(value) {
      // 把输入框设置成你要搜索的文本
      console.log();
      this.searchtText = value;
      console.log(this.searchHistory);
      // 触发搜索历史记录
      if (this.searchHistory.indexOf(value) !== -1) {
        this.searchHistory.splice(this.searchHistory.indexOf(value), 1);
      }

      this.searchHistory.unshift(value);

      // 如果用户已登录，则存储到线上，如果没登录，则存储到本地
      // 登录状态下，后端接口会自动存储搜索记录
      setItem("search-history", this.searchHistory);

      // 展示结结果
      this.isResultShow = true;
    },
    async loadSearchHisory() {
      // let localHistory = getItem("search-history");
      // if (this.user) {
      //   const { data } = await getSearchHistory();
      //   const res = data.data.keywords;
      //   localHistory = [...new Set([...localHistory, ...res])];
      // }
      // this.searchHistory = getItem("search-history");
    },
    deleteAllHistory(value) {
      this.searchHistory = value;
    },
  },
};
</script>
<style lang='less' scoped>
.search-Container {
  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow: auto;
  }
}
</style>