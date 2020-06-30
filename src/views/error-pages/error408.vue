<template>
  <div class="error-page">
    <van-empty description="抱歉！网络请求超时" class="error-page-code">
      <template #image>
        <svg-icon-index icon-class="error408" class="error-page-icon"></svg-icon-index>
      </template>
      <van-button color="rgb(108, 99, 255)" plain v-waves>刷新试试</van-button>
    </van-empty>
  </div>
</template>

<script>
import { Empty, Button } from 'vant';

export default {
  name: 'error408',
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
