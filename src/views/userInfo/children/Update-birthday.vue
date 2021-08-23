<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onBirthdayFinsh"
    />
  </div>
</template>

<script>
import { editorUserInfo } from "@/api/user";
import dayjs from "dayjs";
import { Toast } from "vant";
export default {
  name: "UpdateBirthday",
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  components: {},

  computed: {},

  methods: {
    async onBirthdayFinsh(value) {
      value = dayjs(value).format("YYYY-MM-DD");
      Toast.loading({
        message: "修改中",
        forbidClick: true,
      });
      await editorUserInfo({
        birthday: value,
      });
      Toast.success("修改成功");
      this.$emit("input", value);
      this.$emit("close");
    },
  },
};
</script>
<style lang='css' scoped>
</style>