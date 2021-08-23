<template>
  <div class="Post-comment">
    <van-field
      v-model.trim="message"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      border="none"
      size="small"
      class="post-btn"
      @click="onPostComment"
      :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentsBack } from "@/api/detail";
import { Toast } from "vant";
export default {
  name: "PostComment",
  data() {
    return {
      message: "",
    };
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    art_id: {
      type: [Number, String, Object],
      required: false,
    },
  },
  components: {},

  computed: {},

  methods: {
    async onPostComment() {
      const { data } = await addCommentsBack({
        target: this.target, //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message, //评论内容
        art_id: this.art_id ? this.art_id.toString() : null, //  文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      });

      this.$emit("post-success", data.data.new_obj);

      Toast.success("发布成功");

      this.message = "";
    },
  },
};
</script>
<style lang='less' scoped>
.Post-comment {
  padding: 10px;
  display: flex;
  align-items: center;
  .post-btn {
    border: none;
    width: 50px;
    font-size: 14px;
  }
}
</style>