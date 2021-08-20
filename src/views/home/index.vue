<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        type="info"
        class="search-btn"
        round
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs v-model="active">
      <van-tab
        :title="value.name"
        v-for="(value, index) in tabList"
        :key="index"
      >
        <article-list :channel="value"> </article-list
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getLoadChannels } from "@/api/user";
import ArticleList from "./children/Article-list.vue";
export default {
  name: "home",
  data() {
    return {
      active: 0, //控制被激活的标签
      tabList: {},
    };
  },
  created() {
    this.loadChannels();
  },
  components: {
    ArticleList,
  },

  computed: {},

  methods: {
    async loadChannels() {
      const { data } = await getLoadChannels();
      this.tabList = data.data.channels;
    },
  },
};
</script>
<style lang='less' scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
    .search-btn {
      background: #5babfb;
      border: none;
      width: 277px;
      height: 32px;
    }
  }
}
</style>