<template>
  <div class="user-chat">
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- 消息列表 -->
    <van-cell-group class="chat-content">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>
    <div class="send-message">
      <van-field v-model="message" center clearable placeholder="请输入内容">
        <van-button size="small" type="primary" slot="button">发送</van-button>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

// 建立连接
const socket = io("http://ttapi.research.itcast.cn");
socket.on("connect", function () {
  console.log("连接建立成功了");
});
// socket.on("event", function () {});
socket.on("disconnect", function () {
  console.log("断开连接了");
});

export default {
  name: "UserChat",
  data() {
    return {
      message: "",
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='css' scoped>
.chat-content {
  position: fixed;
  bottom: 53px;
  top: 46px;
  right: 0;
  left: 0;
  overflow: auto;
}
.send-message {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>