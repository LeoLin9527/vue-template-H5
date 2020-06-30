<template>
  <div class="search-bar">
    <div :class="fixed ? 'search-bar--fixed': 'search-bar'">
      <div style="width:100%">
        <van-search
          v-model="searchValue"
          :show-action="false"
          :background="'transparent'"
          @search="searchEmit"
          v-bind="$attrs"
          v-on="$listeners"
          style="height: 46px;padding-right: 10px;width: initial;">
        </van-search>
      </div>
      <div
        v-if="iconClassRight || textRight"
        @click.stop="searchEmit(searchValue)"
        class="search-bar-right">
        <div v-waves v-show="iconClassRight" class="search-bar-right-icon-waves">
          <svg-icon-index
            :icon-class="iconClassRight"
            class="search-bar-right-icon">
          </svg-icon-index>
        </div>
        <div v-waves v-show="textRight" class="search-bar-right-text">
          <span>{{textRight}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, NavBar } from 'vant';

export default {
  name: 'SearchBarIndex',
  mixins: [],
  components: {
    [Search.name]: Search,
    [NavBar.name]: NavBar,
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
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
    return {
      searchValue: '',
    };
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
    searchEmit(val) {
      this.$emit('on-search', val);
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  .search-bar{
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;
    line-height: 1.5;
    z-index: 1;
    text-align: center;
    background-color: @search-bar-background-color;
    user-select: none;
    &--fixed{
      position: fixed;
      top: auto;
      left: 0;
      width: 100%;
      z-index: 88;
      background-color: @search-bar-background-color;
      height: 46px;
      display: flex;
      align-items: center;
    }
    &-right{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 46px;
      line-height: 46px;
      margin: 0 10px 0 0;
      &-icon-waves{
        display: flex;
        padding: 4px;
        border-radius: 50%;
      }
      &-icon{
        font-size: 26px;
        color: @search-bar-right-icon-color;
      }
      &-text{
        font-size: 14px;
        color: @search-bar-right-text-color;
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
      }
    }
  }
</style>
