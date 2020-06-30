<template>
  <div>
    <van-nav-bar
      :z-index="'88'"
      :placeholder="true"
      v-bind="$attrs"
      v-on="$listeners"
      class="top-nav-bar">
      <template #left v-if="iconClassLeft">
        <div v-waves class="top-nav-bar-icon-waves">
          <svg-icon-index
            :icon-class="iconClassLeft"
            class="top-nav-bar-icon">
          </svg-icon-index>
        </div>
      </template>
      <template #title>
        <a @click="onClickCenter">
          <slot></slot>
        </a>
      </template>
      <template #right v-if="iconClassRight || textRight">
        <div v-waves v-show="iconClassRight" class="top-nav-bar-icon-waves">
          <svg-icon-index
            :icon-class="iconClassRight"
            class="top-nav-bar-icon">
          </svg-icon-index>
        </div>
        <div v-waves v-show="textRight" class="top-nav-bar-right-text">
          <span>{{textRight}}</span>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'TopNavBarIndex',
  mixins: [],
  components: {
    [NavBar.name]: NavBar,
  },
  props: {
    iconClassLeft: {
      type: String,
      default: '',
    },
    iconClassRight: {
      type: String,
      default: '',
    },
    textRight: {
      type: String,
      default: '',
    },
  },
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
  methods: {
    onClickCenter() {
      this.$emit('click-title');
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";

  .top-nav-bar {
    display: flex;
    align-items: center;
    height: @top-nav-bar-height;
    max-height: @top-nav-bar-height;
    /deep/ .van-nav-bar__left {
      padding: 0 6px;
    }

    /deep/ .van-nav-bar__title {
      width: 76%;
      max-width: 76%;
    }

    /deep/ .van-nav-bar__right {
      padding: 0 6px;
    }

    /deep/ .van-nav-bar--fixed {
      top: auto;
    }
    &-icon-waves{
      display: flex;
      padding: 4px;
      border-radius: 50%;
    }
    &-icon {
      font-size: @top-nav-bar-icon-size;
      color: @top-nav-bar-icon-color;
    }
    &-right-text{
      margin-right: 4px;
      font-size: @top-nav-bar-right-text-size;
      color: @top-nav-bar-right-text-color;
      width: 36px;
      height: 36px;
      line-height: 36px;
      border-radius: 50%;
    }
  }
</style>
