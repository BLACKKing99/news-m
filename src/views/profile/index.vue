<template>
  <div class="profile-container">
    <!-- 登录信息 -->
    <van-cell-group class="profile-info" v-if="user">
      <van-cell
        title="单元格"
        value="内容"
        center
        :border="false"
        class="base-info"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUserInfo.photo"
        >
        </van-image>
        <div slot="title" class="user-name">{{ currentUserInfo.name }}</div>
        <van-button size="small" round class="update-data" to="/userInfo"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div slot="text" class="count-text">
            <div class="count">{{ currentUserInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="count-text">
            <div class="count">{{ currentUserInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="count-text">
            <div class="count">{{ currentUserInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="count-text">
            <div class="count">{{ currentUserInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录信息 -->
    <div class="not-login" v-else>
      <div>
        <img
          src="~@/assets/profile/mobile.png"
          alt=""
          class="header-img"
          @click="
            $router.push({
              name: 'Login',
              query: {
                redirect: '/profile',
              },
            })
          "
        />
      </div>
      <div class="not-login-text">登录/注册</div>
    </div>
    <van-grid :column-num="2" class="nav-grid">
      <van-grid-item
        icon="shoucang"
        icon-prefix="icon"
        text="收藏"
        class="nav-collect"
      />
      <van-grid-item
        icon="lishi"
        icon-prefix="icon"
        text="历史"
        class="nav-history"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="" :border="false" />
    <van-cell title="小智同学" is-link to="/userChat" />
    <van-cell
      v-if="user"
      value="退出登录"
      class="login-out"
      center
      @click="outLogin"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentInfo } from "@/api/user";
export default {
  name: "profile",
  data() {
    return {
      currentUserInfo: {},
    };
  },

  components: {},
  created() {
    this.loadCurrentInfo();
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    async loadCurrentInfo() {
      const { data } = await getCurrentInfo();
      this.currentUserInfo = data.data;
    },
    outLogin() {
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗?",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        });
    },
  },
};
</script>
<style lang='less' scoped>
.profile-container {
  .profile-info {
    color: #fff;
    background-image: radial-gradient(
      circle farthest-corner at 10% 20%,
      rgba(97, 186, 255, 1) 0%,
      rgba(166, 239, 253, 1) 90.1%
    );
    .base-info {
      color: #fff;
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-right: 11px;
        width: 66px;
        height: 66px;
      }
      .user-name {
        font-size: 15px;
      }
      .update-data {
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;

        .count-text {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("~@/assets/profile/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .header-img {
      height: 66px;
      width: 66px;
    }
    .not-login-text {
      color: #fff;
      font-size: 14px;
    }
  }
  /deep/.nav-grid {
    .nav-collect {
      height: 70px;
      margin-bottom: 5px;
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
    .nav-history {
      height: 70px;
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
    .icon {
      font-size: 22px;
      color: #eb5253;
    }
  }
  .login-out {
    margin-top: 5px;
    height: 44px;
    .van-cell__value {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>