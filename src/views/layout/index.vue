<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 子路由出口 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/answer">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayOut",
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    this.$store.commit("addCachePages", "LayOut");
  },
  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='css' scoped>
</style>