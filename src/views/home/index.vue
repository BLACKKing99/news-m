<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        type="info"
        class="search-btn"
        round
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs v-model="active">
      <van-tab
        :title="value.name"
        v-for="(value, index) in tabList"
        :key="index"
      >
        <article-list :channel="value"> </article-list>
      </van-tab>
      <!-- 汉堡按钮定位把列表最后位置挡住了，解决办法就是最后添加一个站位元素    相当于占位符-->
      <div slot="nav-right" class="warp-nav-placeholder"></div>
      <div slot="nav-right" class="nav-right" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      class="channer-edit-popup"
      get-container="body"
      style="height: 100%"
    >
      <popup-item
        :tabList="tabList"
        :active="active"
        @closeEditorChannel="isChannelEditShow = false"
        @update-active="updateActive"
      ></popup-item>
    </van-popup>
  </div>
</template>

<script>
import { getLoadChannels } from "@/api/user";
import { mapState } from "vuex";
import { getItem } from "@/util/storage";

import ArticleList from "./children/Article-list";
import PopupItem from "./children/Popup-item";

export default {
  name: "home",
  data() {
    return {
      active: 0, //控制被激活的标签
      tabList: {},
      isChannelEditShow: false,
    };
  },
  created() {
    this.loadChannels();
  },
  components: {
    ArticleList,
    PopupItem,
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    async loadChannels() {
      let channels = [];
      // const { data } = await getLoadChannels();
      // this.tabList = data.data.channels;
      if (this.user) {
        // 已登录
        const { data } = await getLoadChannels();
        channels = data.data.channels;
      } else {
        // 没有登录
        const localChannels = getItem("userChannels");
        // 如果有本地存储则使用
        if (localChannels) {
          channels = localChannels;
        } else {
          const { data } = await getLoadChannels();
          channels = data.data.channels;
        }
      }
      this.tabList = channels;
    },
    updateActive(index) {
      this.active = index;
    },
  },
};
</script>
<style lang='less' scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
    .search-btn {
      background: #5babfb;
      border: none;
      width: 277px;
      height: 32px;
    }
  }
  .warp-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .nav-right {
    position: fixed;
    right: 0;
    height: 44px;
    width: 33px;
    line-height: 44px;
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>