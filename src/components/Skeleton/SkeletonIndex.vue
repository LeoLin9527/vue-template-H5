<template>
  <div class="skeleton">
    <div class="skeleton-top-nav">
      <div class="skeleton-top-nav-left"></div>
      <div class="skeleton-top-nav-title"></div>
      <div class="skeleton-top-nav-right"></div>
    </div>
    <div class="skeleton-top-nav">
      <div class="skeleton-top-nav-left"></div>
      <div class="skeleton-top-nav-title"></div>
      <div class="skeleton-top-nav-right"></div>
    </div>
    <div class="skeleton-digital-signage">
      <div v-for="index in 3" :key="`skeletonSignageItem${index}`" class="skeleton-digital-signage-item">
        <div class="skeleton-digital-signage-item-value"></div>
        <div class="skeleton-digital-signage-item-title"></div>
      </div>
    </div>
    <div class="skeleton-list">
      <div v-for="index in 6" :key="`skeletonList${index}`" class="skeleton-list-item">
        <div class="skeleton-list-item-title"></div>
        <div class="skeleton-list-item-row">
          <div v-for="index in 3" :key="`skeletonListItem${index}`" class="skeleton-list-item-col">
            <div class="skeleton-list-item-col-value"></div>
            <div class="skeleton-list-item-col-title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skeletonIndex',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {},
};
</script>

<style lang="less" scoped>
  .skeleton-background {
    background: #eeeff1;
  }

  .skeleton-stretch-animate{
    transform-origin: left;
    animation: skeleton-stretch .5s linear infinite alternate;
  }

  .skeleton-color-animate{
    animation: skeleton-color .8s ease-in-out infinite;
  }

  .skeleton {
    width: auto;
    padding: 8px;
    background: #fff;
    .skeleton-top-nav {
      height: 46px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4px;
      .skeleton-top-nav-left, .skeleton-top-nav-right {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        .skeleton-background;
        .skeleton-color-animate;
      }
      .skeleton-top-nav-title {
        width: 250px;
        height: 24px;
        border-radius: 16px;
        .skeleton-background;
        .skeleton-color-animate;
      }
    }
    .skeleton-digital-signage {
      padding: 14px 8px;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .skeleton-digital-signage-item {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .skeleton-digital-signage-item-value {
          width: 66px;
          height: 20px;
          margin: 6px 0;
          .skeleton-background;
          .skeleton-color-animate;
        }
        .skeleton-digital-signage-item-title {
          width: 66px;
          height: 14px;
          margin: 12px 0;
          .skeleton-background;
          .skeleton-color-animate;
        }
      }
    }
    .skeleton-list {
      padding: 8px 10px;
      .skeleton-list-item {
        margin: 12px 0;
        .skeleton-list-item-title {
          height: 18px;
          width: 45%;
          .skeleton-background;
          .skeleton-stretch-animate;
        }
        .skeleton-list-item-row{
          width: 100%;
          height: 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 12px 0;
          .skeleton-list-item-col{
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .skeleton-list-item-col-value {
              width: 66px;
              height: 20px;
              margin: 6px 0;
              .skeleton-background;
              .skeleton-stretch-animate;
            }
            .skeleton-list-item-col-title {
              width: 66px;
              height: 14px;
              margin: 12px 0;
              .skeleton-background;
              .skeleton-stretch-animate;
            }
          }
        }
      }
    }
  }

  @keyframes skeleton-stretch {
    from{
      transform: scaleX(1);
    }

    to{
      transform: scaleX(.3);
    }
  }

  @keyframes skeleton-color {
    50%{
      opacity: 0.6;
    }
  }
</style>
