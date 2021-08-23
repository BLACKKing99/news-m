<template>
  <div class="user-info">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="app-nav-bar"
    />
    <input
      type="file"
      ref="file"
      hidden
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link>
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="userInfo.photo"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userInfo.name"
      @click="isShowUserNmae = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="userInfo.gender === 1 ? '女' : '男'"
      @click="isShowGender = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="isShowBirthday = true"
    ></van-cell>

    <van-popup
      v-model="isShowUserNmae"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 当你传递给子组件的数据即要使用又要修改，例如这里的name 这种情况下我们可以使用v-model简写 -->

      <!-- :name="userInfo.name"
          @update-name="userInfo.name = $event"
     -->
      <!-- 
       v-model="userInfo.name"
          默认传递一个名字 value 的数据
          :value="userInfo.name"
          默认监听 input 事件 @input="userInfo.name = $event"
      -->

      <!-- 
        如果有多个数据需要保持同步,使用 .sync 修饰符 :xxx.sync = "xxx".
        :gender = "user.gender"
        @update-gender = "user.gender = $event"


        :gender.sync = "user.gender"
          不仅会执行下行代码
          :gender="user.gender"
          还会执行这行代码 @update:属性名事件需要自己传给父组件  @update:gender="user.gender = $event"

          格式为  @update:属性名="user.gender = $event

          我们一般常用的数据设计为 v-model绑定，一般不常用的数据设计为.sync(.sync需要子组件的支持)
       -->

      <!-- 修改昵称 -->
      <update-name
        @update-name="userInfo.name = $event"
        @close="isShowUserNmae = false"
        :userInfoName="userInfo.name"
        v-if="isShowUserNmae"
      ></update-name>
    </van-popup>
    <!-- 修改性别 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <update-gender
        @close="isShowGender = false"
        v-model="userInfo.gender"
      ></update-gender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="isShowBirthday" position="bottom">
      <update-birthday
        @close="isShowBirthday = false"
        v-model="userInfo.birthday"
      ></update-birthday>
    </van-popup>

    <!-- 修改用户头像 -->
    <van-popup
      v-model="isShowPhoto"
      position="bottom"
      :style="{ height: '100%' }"
      class="popup-photo"
    >
      <update-photo
        :previewFile="previewFile"
        @close="isShowPhoto = false"
        @update-photo="userInfo.photo = $event"
        v-if="isShowPhoto"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import UpdateName from "./children/Update-name.vue";
import UpdateGender from "./children/Update.gender.vue";
import UpdateBirthday from "./children/Update-birthday.vue";
import UpdatePhoto from "./children/Update-photo.vue";

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {},
      isShowUserNmae: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowPhoto: false,
      previewFile: null, //上传预览图片
    };
  },
  created() {
    this.loadUserProfile();
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },

  computed: {},

  methods: {
    async loadUserProfile() {
      const { data } = await getUserInfo();
      this.userInfo = data.data;
    },
    onFileChange() {
      // 展示弹出层
      this.isShowPhoto = true;

      // 在弹出层预览图片
      // console.log(this.$refs.file.value);
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0]);
      const file = this.$refs.file.files[0];
      this.previewFile = file;

      // 为了解决相同文件不触发 change 事件,所以在这里手动清空file的value

      this.$refs.file.value = "";
    },
  },
};
</script>
<style lang='css' scoped>
.van-popup {
  background-color: #f5f7f9;
}
.popup-photo {
  background-color: #000;
  display: flex;
  align-items: center;
}
</style>