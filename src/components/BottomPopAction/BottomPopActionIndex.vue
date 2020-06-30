<template>
  <van-popup
    class="bottom-pop-action"
    v-model="opened"
    position="bottom"
    round
    :close-on-popstate="true"
    :closeable="false">
    <div style="position: relative;height: 44px" v-if="title">
      <div class="bottom-pop-action-header">{{title}}
        <svg-icon-index
          icon-class="close2"
          class="bottom-pop-action-header-icon"
          @click="closeBottomPop"></svg-icon-index>
      </div>
    </div>
    <div v-for="(item,index) in actions" :key="`BPA${index}`">
      <button
        type="button"
        v-waves
        class="bottom-pop-action-item"
        :class="{'bottom-pop-action-item-active': index === clickIndex}"
        @click="selectItem(item,index)">
        <span class="bottom-pop-action-item-name">{{item.name}}</span>
      </button>
    </div>
    <div class="bottom-pop-action-footer" v-if="cancelText">
      <div class="bottom-pop-action-footer-cancel--gap"></div>
      <button
        v-waves
        type="button"
        class="bottom-pop-action-footer-cancel"
        @click="closeBottomPop">{{cancelText}}</button>
    </div>
    <van-loading class="bottom-pop-action-loading" v-show="loading"></van-loading>
  </van-popup>
</template>

<script>
import { Popup, Loading } from 'vant';

export default {
  name: 'BottomPopActionIndex',
  mixins: [],
  components: {
    [Popup.name]: Popup,
    [Loading.name]: Loading,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultIndex: {
      type: Number,
      default: -1,
    },
    cancelText: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clickIndex: -1,
    };
  },
  computed: {
    opened: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit('update:open', val);
      },
    },
  },
  watch: {},
  created() {
    this.clickIndex = this.defaultIndex;
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    closeBottomPop() {
      this.opened = false;
    },
    selectItem(item, index) {
      this.clickIndex = index;
      this.$emit('select', item);
      this.closeBottomPop();
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";

  .bottom-pop-action {
    min-height: 20%;
    max-height: 80%;
    &-header{
      width: 100%;
      height: 44px;
      line-height: 44px;
      position: fixed;
      top: auto;
      left: 0;
      border-radius: 20px 20px 0 0;
      background: #fff;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      z-index: 3;
      &-icon{
        height: 44px;
        line-height: inherit;
        font-size: 20px;
        color: #c8c9cc;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 16px;
      }
    }
    &-item{
      display: block;
      width: 100%;
      height: 50px;
      padding: 0;
      background-color: #fff;
      border: none;
      cursor: pointer;
      &-name{
        font-size:16px;
        line-height: 20px;
      }
      &-active{
        color: @bottom-pop-action-item-active-color;
      }
    }
    &-footer{
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 3;
      &-cancel--gap{
        display: block;
        height: 8px;
        background-color: #f7f8fa;
      }
      &-cancel{
        display: block;
        width: 100%;
        height: 50px;
        font-size: 14px;
        line-height: 20px;
        background-color: #fff;
        border: none;
        cursor: pointer;
      }
    }
    &-loading{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      position: absolute;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 5;
      color: @bottom-pop-action-loading-color;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
</style>
