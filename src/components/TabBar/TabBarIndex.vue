<template>
  <div>
    <van-tabs v-model="activated"
              :border="border"
              :title-inactive-color="titleColor"
              :title-active-color="titleActiveColor"
              v-bind="$attrs"
              v-on="$listeners"
              class="tab-bar">
      <div v-if="modeMatch">
        <van-tab v-for="(item,index) in tabBarOptions" :key="`TBO1${index}`" :name="item.to.name" :to="item.to">
          <template #title>
            <div class="tab-bar-tab">
              <span :class="tabBarTabTitleClass(item.to.name)">{{item.title}}</span>
            </div>
          </template>
        </van-tab>
      </div>
      <div v-else>
        <van-tab v-for="(item,index) in tabBarOptions" :key="`TBO2${index}`" :name="item.id">
          <template #title>
            <div class="tab-bar-tab">
              <span :class="tabBarTabTitleClass(item.id)">{{item.title}}</span>
            </div>
          </template>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';

export default {
  name: 'TabBarIndex',
  mixins: [],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  props: {
    mode: {
      type: String,
      default: '',
    },
    active: {
      type: String,
      required: true,
      default: '0',
    },
    tabBarOptions: {
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
    };
  },
  computed: {
    modeMatch() {
      return this.mode === 'router';
    },
    activated: {
      get() {
        return this.mode === 'router' ? this.$route.name : this.active;
      },
      set(val) {
        this.$emit('update:active', val);
      },
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {

  },
  destroyed() {
  },
  methods: {
    tabBarTabTitleClass(name) {
      return this.activated === name ? 'tab-bar-tab-title active-tab-bar-title' : 'tab-bar-tab-title default-tab-bar-title';
    },
  },
};
</script>

<style lang="less" scoped>
  .tab-bar {
    margin-bottom: 12px;
    &-tab {
      display: flex;
      justify-content: center;
      align-items: center;
      &-title {
        margin: 0;
        padding: 0;
      }
    }
  }
  .active-tab-bar-title{
    font-weight: bold;
    font-size: 14px;
  }

  .default-tab-bar-title{
    font-weight: normal;
    font-size: 14px;
  }

  /deep/ .van-tabs--line .van-tabs__wrap {
    padding-bottom: 4px;
    height: 36px;
  }

  /deep/ .van-tabs__nav--line{
    padding-bottom: 12px;
  }

  /deep/ .van-tabs__line {
    width: 28px!important;
    &::after {
      content: "";
      display: flex;
      width: 4px;
      height: 3px;
      background-color: #ff0000;
    }
    background: linear-gradient(180deg, #ff0000, rgba(255, 0, 0, 0.5) 1px, rgba(255, 0, 0, 0.5), rgba(255, 25, 66, 0.1));
  }
</style>
