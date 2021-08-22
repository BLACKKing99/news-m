<template>
  <div class="Search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="deleteAll">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="value"
      v-for="(value, index) in searchHistory"
      :key="index"
      @click="deleteOne(value, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from "@/util/storage";
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false,
    };
  },
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  components: {},

  computed: {},

  methods: {
    deleteOne(value, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1);
        this.$toast.success("删除成功");
        // setItem("search-history", this.searchHistory);
      } else {
        this.$emit("search", value);
      }
    },
    deleteAll() {
      this.$dialog
        .confirm({
          title: "全部删除",
          message: "确认删除全部历史记录?",
        })
        .then(() => {
          this.$emit("update-history", []);
        });
    },
  },
};
</script>
<style lang='less' scoped>
</style>