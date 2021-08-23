<template>
  <div class="Commetn-item">
    <van-cell class="Commetn-item-cell">
      <van-image
        slot="icon"
        round
        fit="cover"
        :src="commentInfo.aut_photo"
        class="comment-aut-photo"
      />
      <div slot="title" class="comment-user-info">
        <div class="comment-user-name">
          {{ commentInfo.aut_name }}
        </div>
        <div class="comment-user-content">
          {{ commentInfo.content }}
        </div>
      </div>
      <div slot="label" class="comment-time">
        <div>{{ commentInfo.pubdate | datetime }}</div>
        <div>
          <van-button
            size="mini"
            round
            class="comment-back-btn"
            @click="$emit('reply-comment', commentInfo)"
            ><span>{{ commentInfo.reply_count }}</span> 回复</van-button
          >
        </div>
      </div>
      <div class="comment-good-job">
        <van-icon
          :name="commentInfo.is_liking ? 'good-job' : 'good-job-o'"
          :class="{ active: commentInfo.is_liking }"
          @click="onCommentLike"
        /><span>{{ commentInfo.like_count }}</span>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, cancelCommentLike } from "@/api/detail";
import { mapState } from "vuex";
export default {
  name: "CommetnItem",
  data() {
    return {};
  },
  props: {
    commentInfo: {
      type: Object,
      required: true,
    },
  },
  components: {},
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    async onCommentLike() {
      if (this.user) {
        if (this.commentInfo.is_liking) {
          // 已点赞,则取消点赞
          await cancelCommentLike(this.commentInfo.aut_id);
          this.$toast.success("取消点赞成功");
          this.commentInfo.like_count--;
        } else {
          await addCommentLike(this.commentInfo.aut_id);
          this.$toast.success("点赞成功");
          this.commentInfo.like_count++;
        }
        this.commentInfo.is_liking = !this.commentInfo.is_liking;
      } else {
        this.$router.push("/login");
        Toast.success("请登录后操作");
      }
    },
  },
};
</script>
<style lang='less' scoped>
.Commetn-item {
  .Commetn-item-cell {
    .comment-aut-photo {
      width: 35px;
      height: 35px;
      margin-right: 13px;
    }
    .comment-user-info {
      display: flex;
      flex-direction: column;
      .comment-user-name {
        color: #406599;
      }
      .comment-user-content {
        font-size: 16px;
        color: #222222;
      }
    }
    .comment-time {
      display: flex;
      align-items: center;
      .comment-back-btn {
        background-color: #fff;
        margin-left: 10px;
      }
    }
    .van-cell__value {
      flex: 0.2;
    }
    .active {
      color: tomato;
    }
  }
}
</style>