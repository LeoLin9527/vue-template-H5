<template>
  <div class="error-page">
    <van-empty description="格力君未找到相关内容" class="error-page-code">
      <template #image>
        <svg-icon-index icon-class="search_empty" class="error-page-icon"></svg-icon-index>
      </template>
      <van-button color="rgb(108, 99, 255)" plain v-waves @click="refreshHandle">刷新试试</van-button>
    </van-empty>
  </div>
</template>

<script>
import { Empty, Button } from 'vant';

export default {
  name: 'SearchEmpty',
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button,
  },
  methods: {
    refreshHandle() {
      this.$emit('refresh-try');
    },
  },
};
</script>

<style lang="less" scoped>
  .error-page {
    width: 100%;
    .error-page-code {
      width: 100%;
      /deep/ .van-empty__image {
        width: auto;
        height: auto;
      }
    }
    .error-page-icon {
      font-size: 200px;
    }
  }

</style>
