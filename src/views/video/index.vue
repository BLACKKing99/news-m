<template>
  <div class="video-container">视频</div>
</template>

<script>
import { getVideo } from "@/api/video";
export default {
  name: "",
  data() {
    return {};
  },

  components: {},
  created() {
    this.loadGetVideo();
  },
  computed: {},

  methods: {
    async loadGetVideo() {
      const data = await getVideo();
    },
  },
};
</script>
<style lang='css' scoped>
</style>