<template>
  <div class="error-page">
    <van-empty description="糟糕！服务端遇到点问题" class="error-page-code">
      <template #image>
        <svg-icon-index icon-class="error500" class="error-page-icon"></svg-icon-index>
      </template>
      <van-button color="rgb(108, 99, 255)" plain v-waves @click="$router.push('/')">返回首页瞧瞧</van-button>
    </van-empty>
  </div>
</template>

<script>
import { Empty, Button } from 'vant';

export default {
  name: 'error500',
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button,
  },
};
</script>

<style lang="less" scoped>
  .error-page {
    width: 100%;
    height: 100vh;
    background: white;
    .error-page-code {
      width: 100%;
      height: 70vh;
      background: white;
      /deep/ .van-empty__image {
        width: auto;
        height: auto;
      }
    }
    .error-page-icon{
      font-size: 200px;
    }
  }

</style>
