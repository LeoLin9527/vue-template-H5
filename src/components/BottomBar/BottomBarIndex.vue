<template>
  <div>
    <van-tabbar
      v-model="activated"
      v-bind="$attrs"
      v-on="$listeners"
      class="bottom-bar">
      <van-tabbar-item v-for="(item,index) in bottomBarOptions" :key="`BTO${index}`" :name="item.name" class="bottom-bar-tab">
        <span class="bottom-bar-tab-title">{{item.title}}</span>
        <template #icon="props">
          <svg-icon-index :icon-class="item.icon" class="bottom-bar-tab-icon"></svg-icon-index>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'BottomBarIndex',
  mixins: [],
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  props: {
    active: {
      type: String,
      required: true,
    },
    bottomBarOptions: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
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

  },
};
</script>

<style lang="less" scoped>
.bottom-bar{
  &-tab{
    &-title{}
    &-icon{
      font-size: 24px;
    }
  }
}
  /deep/ .van-tabbar-item__icon{
    margin-bottom: 1px
  }
</style>
