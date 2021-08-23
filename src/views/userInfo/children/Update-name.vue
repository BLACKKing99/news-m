<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      @click-left="$emit('close')"
      @click-right="onClickFinsh"
      left-text="取消"
      right-text="完成"
    />
    <div class="amend-name">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editorUserInfo } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "updateName",
  data() {
    return {
      message: this.userInfoName,
    };
  },
  props: {
    userInfoName: {
      type: String,
      required: true,
    },
  },
  components: {},

  computed: {},

  methods: {
    async onClickFinsh() {
      try {
        this.$toast.loading({
          message: "修改中",
          forbidclick: true,
        });

        //   请求提交
        await editorUserInfo({
          name: this.message,
        });
        Toast.success("修改成功");

        this.$emit("update-name", this.message);

        this.$emit("close");
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          Toast.fail("昵称已存在");
        }
      }
    },
  },
};
</script>
<style lang='less' scoped>
.amend-name {
  padding: 10px;
}
</style>