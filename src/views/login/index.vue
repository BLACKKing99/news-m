<template>
  <div class="login-container">
    <van-nav-bar
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
      class="app-nav-bar"
    />
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRule.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="cluster-o"
        placeholder="请输入验证码"
        :rules="formRule.code"
      >
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCodeShow"
            @finish="isCodeShow = false"
          />
          <van-button
            v-else
            size="mini"
            type="info"
            class="send-code"
            @click.prevent="onSendCode"
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div class="login-btn-wrap">
        <van-button type="info" block class="login-btn">登录</van-button>
      </div>
    </van-form>

    <div class="van-multi-ellipsis--l2">账号:18150337985,验证码:246810.</div>
  </div>
</template>

<script>
import { login, sendCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      formRule: {
        mobile: [
          { required: true, message: "请填写用户名" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      time: 1000 * 60,
      isCodeShow: false,
      isSendCodeLoading: false,
    };
  },

  components: {},

  computed: {},

  methods: {
    async onLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true, //是否禁止背景点击
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
      });
      try {
        const res = await login(this.user);
        Toast.success("登录成功");
        // 将token放到Vuex中
        this.$store.commit("setUser", res.data.data);

        this.$router.back();
      } catch (err) {
        Toast.fail("登录失败");
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: top,
        });
      }
    },
    async onSendCode() {
      try {
        // 校验手机号码
        await this.$refs["login-form"].validate("mobile");

        // 请求发送验证码,发送验证码请求
        await sendCode(this.user.mobile);

        // 验证通过->请求发送验证码->用户接收->输入验证码

        // 请求发送验证码->显示倒计时
        this.isCodeShow = ture;

        // 倒计时结束->显示发送按钮
        // 使用finish事件处理
      } catch (err) {
        let message = "";
        if (err && err.response && err.response.status === 429) {
          message = "发送太频繁了,请稍后重试";
        } else if (err.name === "mobile") {
          message = err.message;
        } else {
          message = "发送失败,请重试";
        }
        Toast({
          message,
          position: top,
        });
      }
    },
  },
};
</script>
<style lang='less' scoped>
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border: none;
      .van-button__text {
        font-size: 16px;
      }
    }
  }
  .send-code {
    width: 76px;
    height: 23px;
    padding: 5px;
  }
  .van-multi-ellipsis--l2 {
    font-size: 14px;
    padding: 20px;
    text-align: center;
    color: #ccca;
  }
}
</style>