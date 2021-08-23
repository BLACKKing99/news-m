<template>
  <div class="Comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${commentInfo.reply_count}条回复`">
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>

    <div class="detail-wrap">
      <comment-item :commentInfo="commentInfo"></comment-item>

      <!-- 回复列表 -->

      <comment-list
        :source="commentInfo.com_id"
        type="c"
        :list="commentReplyList"
      ></comment-list>
    </div>

    <van-tabbar class="tabbar-bottom">
      <van-button
        round
        size="small"
        class="writeComment"
        @click="isCommentReplyShow = true"
        >写评论</van-button
      >
    </van-tabbar>

    <!-- 发布评论回复 -->
    <van-popup v-model="isCommentReplyShow" position="bottom">
      <post-comment
        :target="commentInfo.com_id"
        :art_id="art_id"
        @post-success="onPostSuccess"
      ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./Comment-item.vue";
import CommentList from "./Comment-list.vue";
import PostComment from "./Post-comment.vue";
export default {
  name: "CommentReply",
  data() {
    return {
      isCommentReplyShow: false,
      commentReplyList: [],
    };
  },
  props: {
    commentInfo: {
      type: Object,
      required: true,
    },
    art_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  components: {
    CommentItem,
    CommentList,
    PostComment,
  },

  computed: {},

  methods: {
    onPostSuccess(value) {
      this.commentReplyList.unshift(value);

      this.commentInfo.reply_count++;

      this.isCommentReplyShow = false;
    },
  },
};
</script>
<style lang='less' scoped>
.tabbar-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  .writeComment {
    // flex: 1;
    width: 260px;
  }
}
.detail-wrap {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
</style>