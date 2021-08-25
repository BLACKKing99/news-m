<template>
  <div id="app">
    <!-- 一级路由出口,路由表中所有的 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["cachePages"]),
  },
};
</script>

<style lang="less">
</style>
