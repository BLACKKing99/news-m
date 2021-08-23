<template>
  <div>
    <van-cell
      class="article-item"
      :to="{
        name: 'detail',
        params: {
          detailId: articleItem.art_id,
        },
      }"
    >
      <div slot="title" class="article-title van-multi-ellipsis--l2">
        {{ articleItem.title }}
      </div>
      <div slot="label">
        <div class="label-image" v-if="articleItem.cover.type === 3">
          <van-image
            class="center-img"
            fit="cover"
            v-for="img in articleItem.cover.images"
            :key="img"
            :src="img"
          />
        </div>
        <div class="labl-wrap">
          <span>{{ articleItem.aut_name }}</span
          >&nbsp; <span>{{ articleItem.comm_count }}评论</span>&nbsp;
          <span>{{ articleItem.pubdate | relativeTime }}</span
          >&nbsp;
        </div>
      </div>
      <van-image
        v-if="articleItem.cover.type === 1"
        class="right-img"
        fit="cover"
        :src="articleItem.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "article-item",
  data() {
    return {};
  },
  props: {
    articleItem: {
      type: Object,
      required: true,
    },
  },
  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='less' scoped>
/deep/.article-item {
  .article-title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .label-image {
    display: flex;
    flex-wrap: nowrap;
    .center-img {
      padding: 15px 0;
      width: 116px;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
    .right-img {
      width: 116px;
      height: 73px;
    }
  }
}
</style>