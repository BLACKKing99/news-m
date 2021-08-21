<template>
  <div class="popup-item">
    <van-cell center class="popup-item-cell" :border="false">
      <div slot="title" class="popup-item-title">我的频道</div>
      <van-button
        type="info"
        plain
        round
        size="mini"
        class="deitor-btn"
        @click="editorChannel"
        >{{ editor ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in tabList"
        :key="index"
        :icon="editor && index !== 0 ? 'close' : ''"
        :class="{ active: active === index }"
        :text="value.name"
        class="popup-grid-item"
        @click="onUserChannelClick(value, index)"
      />
    </van-grid>
    <van-cell center class="popup-item-cell" :border="false">
      <div slot="title" class="popup-item-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in recommendChannels"
        :key="index"
        :text="value.name"
        class="popup-grid-item"
        @click="onAdd(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllLoadChannels } from "@/api/user";
import { addUserChannel, deleteUserChannel } from "@/api/channel";
import { mapState } from "vuex";

import { setItem } from "@/util/storage";

export default {
  name: "PopupItem",
  data() {
    return {
      allChannels: [],
      editor: false,
    };
  },
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.allLoadChannels();
  },
  components: {},

  methods: {
    async allLoadChannels() {
      const { data } = await getAllLoadChannels();
      this.allChannels = data.data.channels;
    },
    async onAdd(channel) {
      this.tabList.push(channel);

      //TODO： 数据持久化
      if (this.user) {
        // 登录了，数据存储到线上
        await addUserChannel({
          channels: [
            {
              id: channel.id,
              seq: this.tabList.length,
            },
          ],
        });
      } else {
        // 如果没登录，数据存储到本地
        setItem("userChannels", this.tabList);
      }
    },
    editorChannel() {
      this.editor = !this.editor;
    },
    onUserChannelClick(value, index) {
      if (this.editor && index !== 0) {
        this.deleteChannel(value, index);
      } else {
        this.switchChannel(value, index);
      }

      // 如果是编辑状态，删除频道
      // 如果是非编辑状态,切换频道
    },
    async deleteChannel(value, index) {
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        this.$emit("update-active", this.active - 1);
      }
      this.tabList.splice(index, 1);

      // 数据持久化
      if (this.user) {
        // 登录了，数据存储到线上
        await deleteUserChannel(value.id);
      } else {
        // 如果没登录，数据存储到本地
        setItem("userChannels", this.tabList);
      }
    },
    switchChannel(value, index) {
      // 子组件传递事件给父组件
      this.$emit("update-active", index);
      this.$emit("closeEditorChannel");
      // closeEditorChannel
    },
  },
  computed: {
    // 频道推荐
    recommendChannels() {
      // 所有频道-我的频道 = 剩下的频道
      // 计算属性会观测内部依赖数据的变化而变化
      return this.allChannels.filter((channel) => {
        return !this.tabList.find((value) => {
          return value.id === channel.id;
        });
      });

      // for循环写法
      // let arr = [];

      // this.allChannels.forEach((value) => {
      //   let flag = false;
      //   for (let i = 0; i < this.tabList.length; i++) {
      //     if (this.tabList[i].name === value.name) {
      //       flag = true;
      //       break;
      //     }
      //   }
      //   if (!flag) {
      //     arr.push(value);
      //   }
      // });
      // return arr;
    },
    ...mapState(["user"]),
  },
};
</script>
<style lang='less' scoped>
.popup-item {
  padding-top: 54px;
  .popup-item-cell {
    .deitor-btn {
      padding: 0 15px;
    }
  }
  /deep/.van-icon {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 16px;
  }
  .popup-grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
}
</style>