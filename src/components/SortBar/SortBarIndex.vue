<template>
  <div>
    <van-tabs v-model="activated"
              :border="border"
              :title-inactive-color="titleColor"
              :title-active-color="titleActiveColor"
              @click="clickTab"
              v-bind="$attrs"
              v-on="$listeners"
              class="sort-bar">
      <van-tab v-for="(item,index) in obj" :key="`ST${index}`" :name="item.id">
        <template #title>
          <div class="sort-bar-tab">
            <span class="sort-bar-tab-title" :style="{fontWeight: activated === item.id ? 'bold' : 'normal'}">{{item.title}}</span>
            <svg-icon-index icon-class="up_small_arrow" class="sort-bar-tab-icon"  v-show="!item.showDefaultArrow && item.showArrow"></svg-icon-index>
            <svg-icon-index icon-class="down_small_arrow" class="sort-bar-tab-icon" v-show="!item.showDefaultArrow && !item.showArrow"></svg-icon-index>
            <svg-icon-index icon-class="sort_default" class="sort-bar-tab-icon-default" v-show="item.showDefaultArrow"></svg-icon-index>
          </div>
        </template>
        <div>
          <slot></slot>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';

export default {
  name: 'SortBarIndex',
  mixins: [],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props: {
    active: {
      type: String,
      required: true,
      default: '0',
    },
    sortBarOptions: {
      type: Array,
      required: true,
      default: () => [],
    },
    border: {
      type: Boolean,
      default: false,
    },
    titleColor: {
      type: String,
      default: '#323233',
    },
    titleActiveColor: {
      type: String,
      default: '#000',
    },
  },
  data() {
    return {
      obj: this.sortBarOptions,
    };
  },
  computed: {
    activated: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit('update:active', val);
      },
    },
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    clickTab(name) {
      this.obj.map((item) => {
        if (item.id === name) {
          item.showDefaultArrow = false;
          item.showArrow = !item.showArrow;
          this.$emit('click-sort', item);
        } else {
          [item.showDefaultArrow, item.showArrow] = [true, false];
        }
        return item;
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .sort-bar {
    margin-bottom: 12px;
    &-tab {
      display: flex;
      justify-content: center;
      align-items: center;
      &-title {
        margin: 0;
        padding: 0;
        font-size: 12px;
      }
      &-icon {
        font-size: 12px;
      }
      &-icon-default {
        font-size: 10px;
        color: #000;
        font-weight: bold;
        padding-left: 2px;
      }
    }
  }
  /deep/ .van-tabs--line .van-tabs__wrap{
    padding-bottom: 4px;
    height: 36px;
  }

  /deep/ .van-tabs__nav--line{
    padding-bottom: 12px;
  }

  /deep/ .van-tabs__line{
    &::after{
      content: "";
      display: flex;
      width: 4px;
      height: 3px;
      background-color:#ff0000;
    }
    left: -7px;
    background:linear-gradient(180deg,#ff0000,rgba(255, 0, 0, 0.5) 1px,rgba(255, 0, 0, 0.5), rgba(255, 25, 66, 0.1));
  }
</style>
