<template>
  <div class="update-photh">
    <img :src="image" alt="" ref="image" class="update-image" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      class="toolBarPhoto"
      @click-left="$emit('close')"
      @click-right="updatePhoth"
    ></van-nav-bar>
  </div>
</template>

<script>
import { editorUserPhoto } from "@/api/user";
import { Toast } from "vant";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "UpdatePhoth",
  data() {
    return {
      image: window.URL.createObjectURL(this.previewFile),
      cropper: null, //裁切器实例
    };
  },
  props: {
    previewFile: {
      //   type: [Object, Array, String],
      required: true,
    },
  },
  components: {},
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      //   autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  computed: {},

  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file);
        });
      });
    },
    async updatePhoth() {
      Toast.loading({
        message: "修改中",
        forbidClick: true,
        duration: 0, //展示事件为0,表示持续展示
      });

      const file = await this.getCroppedCanvas();
      const fd = new FormData();
      fd.append("photo", file);
      // 如果要求 Content-Type 是 multipart/form-data, 则一定要提交FormFate数据对象，专门用于文件上传的,不能提交{}，没用
      //   const fd = new FormData();

      //   fd.append("photo", this.previewFile);

      await editorUserPhoto(fd);

      Toast.success("修改成功");

      // 修改父组件的头像
      this.$emit("update-photo", window.URL.createObjectURL(file));
      this.$emit("close");
    },
  },
};
</script>
<style lang='css' scoped>
.toolBarPhoto {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.update-image {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>