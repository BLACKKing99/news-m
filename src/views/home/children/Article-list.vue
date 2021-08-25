<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(value, index) in articleList"
          :key="index"
          :articleItem="value"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsRecommend } from "@/api/article";
import ArticleItem from "../../../components/Article-item.vue";
import { debounce } from "lodash";
export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [], //加载列表
      loading: false, //控制加载中的状态
      finished: false, //加载结束中的状态
      refreshing: false, //下拉刷新状态
      tiemstamp: null,
      scrollTop: 0, //列表滚动到顶部的距离
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArticleItem,
  },
  mounted() {
    const articleList = this.$refs["article-list"];
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop;
    }, 50);
  },

  activated() {
    // 进入缓存被激活
    this.$refs["article-list"].scrollTop = this.scrollTop;
  },
  deactivated() {
    // 离开缓存被激活
  },
  computed: {},

  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 请求数据
      const { data } = await getNewsRecommend({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳   相当于页码
        with_top: 1, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      });
      const res = data.data.results;
      this.articleList.push(...res);
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (res) {
        this.timestamp = data.data.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      // 清空列表数据

      // 重新加载数据
      const { data } = await getNewsRecommend({
        channel_id: this.channel.id,
        timestamp: Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳   相当于页码
        with_top: 1, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      });
      const res = data.data.results;
      // 往顶部追加数据
      this.articleList.unshift(...res);
      // 将 loading 设置为 true，表示处于加载状态
      console.log(222);
      this.refreshing = false;
    },
  },
};
</script>
<style lang='less' scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: scroll;
}
</style>