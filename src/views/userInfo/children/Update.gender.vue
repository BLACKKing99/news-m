<template>
  <div class="update-gender">
    <van-picker
      title="选择性别"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onUpdateGender"
    />
  </div>
</template>

<script>
import { editorUserInfo } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
  },
  components: {},

  computed: {},

  methods: {
    async onUpdateGender(value, index) {
      Toast.loading({
        message: "等待中",
        forbidClick: true,
      });
      await editorUserInfo({
        gender: index,
      });
      Toast.success("修改成功");
      this.$emit("input", index);
      this.$emit("close");
    },
  },
};
</script>
<style lang='css' scoped>
</style>