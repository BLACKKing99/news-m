<template>
  <div class="Comment-list">
    <van-cell title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :commentInfo="item"
        @reply-comment="$emit('reply-comment', $event)"
      >
      </comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from "@/api/detail";
import CommentItem from "./Comment-item.vue";
export default {
  name: "CommentList",
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //页码
      limit: 10, //每页大小
    };
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "a",
    },
  },
  components: {
    CommentItem,
  },
  computed: {},

  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getComments({
        type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source.toString(), //源id，文章id或评论id
        offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit, //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      });
      const resultComment = data.data.results;

      this.$emit("update-comment-count", data.data.total_count);

      this.list.push(...resultComment);

      this.loading = false;

      if (resultComment.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>
<style lang='css' scoped>
</style>