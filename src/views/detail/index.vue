<template>
  <div class="detail-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      @click-left="$router.back()"
      left-arrow
    >
    </van-nav-bar>
    <div class="detail-wrap">
      <h1 class="detail-title">{{ detail.title }}</h1>
      <van-cell center>
        <div slot="title">{{ detail.aut_name }}</div>
        <van-image
          slot="icon"
          fit="cover"
          round
          :src="detail.aut_photo"
          class="detail-user-img"
        />
        <div slot="label">{{ detail.pubdate | relativeTime }}</div>
        <div>
          <van-button
            type="info"
            size="mini"
            round
            class="follow-btn"
            :icon="detail.is_followed ? 'success' : 'plus'"
            :plain="detail.is_followed"
            @click="onFollow"
            :loading="isFollowLoading"
            >{{ detail.is_followed ? "已关注" : "关注" }}</van-button
          >
        </div>
      </van-cell>
      <div
        class="detail-content markdown-body"
        v-html="detail.content"
        ref="detail-content"
      ></div>
      <van-tabbar class="tabbar-bottom">
        <van-button
          round
          size="small"
          class="writeComment"
          @click="isCommentBackShow = true"
          >写评论</van-button
        >
        <van-icon
          name="comment-o"
          :info="totalCommentCount"
          class="comment"
          @click="isShowComment = true"
        />
        <van-icon
          :name="detail.is_collected ? 'star' : 'star-o'"
          class="collect"
          :class="{ active: detail.is_collected }"
          @click="onCollect"
        />
        <van-icon
          :name="detail.attitude === 1 ? 'good-job' : 'good-job-o'"
          :class="{ active: detail.attitude === 1 }"
          class="good-job"
          @click="onGoodJob"
        />
        <van-icon name="share" class="share" @click="isShowShare = true" />
      </van-tabbar>
      <comment-list
        :source="detailId"
        :list="commentLists"
        @update-comment-count="totalCommentCount = $event"
        @reply-comment="onReplyComment"
      ></comment-list>
    </div>

    <!-- 发布评论 -->
    <van-popup v-model="isCommentBackShow" position="bottom"
      ><post-comment
        :target="detailId"
        @post-success="onPostSuccess"
      ></post-comment
    ></van-popup>

    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <comment-reply
        v-if="isReplyShow"
        :commentInfo="presentComment"
        :art_id="detailId"
        @close="isReplyShow = false"
      ></comment-reply
    ></van-popup>

    <van-popup
      v-model="isShowComment"
      position="bottom"
      closeable
      :style="{ height: '50%' }"
    >
      <comment-list
        :source="detailId"
        :list="commentLists"
        @update-comment-count="totalCommentCount = $event"
        @reply-comment="onReplyComment"
      ></comment-list>
    </van-popup>
    <van-share-sheet
      v-model="isShowShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import "./markdown-css.css";
import {
  getDetail,
  addCollectDetail,
  cancelCollectDetail,
  addGoodJobDetail,
  cancelGoodJobDetail,
} from "@/api/detail";
import { addFollow, deleteFollow } from "@/api/user";

import { ImagePreview, Toast } from "vant";

import { mapState } from "vuex";
import CommentList from "./children/Comment-list.vue";
import PostComment from "./children/Post-comment.vue";
import CommentReply from "./children/Comment-reply.vue";

// 在组件中获取动态路由的参数：
// 方式二:this.$router.params.detailId
// 方式二:props传参  推荐 this.detailId
export default {
  name: "detailIndex",
  data() {
    return {
      detail: {},
      isFollowLoading: false, //关注用户loading状态
      isGoodJob: false,
      isCommentBackShow: false,
      commentLists: [],
      totalCommentCount: 0,
      isReplyShow: false,
      presentComment: {},
      isShowComment: false, //用来留言框弹出
      isShowShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  props: {
    detailId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  components: {
    CommentList,
    PostComment,
    CommentReply,
  },
  created() {
    this.loadDetail();
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    async loadDetail() {
      const { data } = await getDetail(this.detailId);
      this.detail = data.data;

      // 获取文章内容DOM容器
      const detailContent = this.$refs["detail-content"];

      // 数据改变影响视图更新(DOM) 不是立即的
      // 如果需要在修改数据之后马上操作该数据影响的视图DOM，需要把这个代码放到$nextTick中
      // 得到所有的img标签
      //  this.$nextTick()是Vue提供的一个方法
      this.$nextTick(() => {
        const imgs = detailContent.querySelectorAll("img");
        const imgPath = []; //收集所有图片的路径
        imgs.forEach((value, index) => {
          imgPath.push(value.src);
          value.onclick = function () {
            ImagePreview({
              images: imgPath,
              startPosition: index,
              loop: false,
            });
          };
        });
        // ImagePreview(imgs);
      });
    },
    async onFollow() {
      this.isFollowLoading = true;
      if (this.user) {
        if (this.detail.is_followed) {
          // 如果已关注，则取消关注
          await deleteFollow(this.detail.aut_id);
          this.$toast.success("取消关注成功");
        } else {
          // 如果没有关注，则添加关注
          await addFollow(this.detail.aut_id);
          this.$toast.success("关注成功");
        }
        this.detail.is_followed = !this.detail.is_followed;
      } else {
        this.$router.push("/login");
        Toast.success("请登录后操作");
      }
      this.isFollowLoading = false;
    },
    async onCollect() {
      if (this.user) {
        if (this.detail.is_collected) {
          // 已收藏，则取消收藏
          await cancelCollectDetail(this.detail.art_id);
          this.$toast.success("取消收藏成功");
        } else {
          // 没有收藏，则添加收藏
          await addCollectDetail(this.detail.art_id);
          this.$toast.success("收藏成功");
        }
        this.detail.is_collected = !this.detail.is_collected;
      } else {
        this.$router.push("/login");
        Toast.success("请登录后操作");
      }
    },
    async onGoodJob() {
      if (this.user) {
        if (this.detail.attitude === 1) {
          // 已点赞，则取消点赞
          await cancelGoodJobDetail(this.detailId);
          this.$toast.success("取消点赞成功");
          this.detail.attitude = -1;
        } else {
          // 为点赞，则添加点赞
          await addGoodJobDetail(this.detailId);
          this.$toast.success("点赞成功");
          this.detail.attitude = 1;
        }
        this.isGoodJob = !this.isGoodJob;
      } else {
        this.$router.push("/login");
        Toast.success("请登录后操作");
      }
    },
    onPostSuccess(value) {
      // 把评论数据放到评论列表中
      this.commentLists.unshift(value);

      // 更新评论总数量
      this.totalCommentCount++;
      // 关闭弹出层
      this.isCommentBackShow = false;
    },
    onReplyComment(value) {
      this.presentComment = value;

      this.isReplyShow = true;
    },
  },
};
</script>
<style lang='less' scoped>
.detail-container {
  .detail-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 50px;
    overflow: auto;
  }
  .detail-title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .detail-user-img {
    height: 35px;
    width: 35px;
    margin-right: 9px;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
  .tabbar-bottom {
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    .writeComment {
      flex: 1.5;
    }
    .comment {
      flex: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-info {
        margin-right: 10px;
      }
    }
    .collect {
      flex: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      color: rgb(241, 120, 6);
    }
    .good-job {
      flex: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-info {
        margin-right: 10px;
      }
    }
    .share {
      flex: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>