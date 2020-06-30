<template>
  <div>
    <van-pull-refresh
      v-model="isDownLoading"
      pulling-text="下拉刷新..."
      loosing-text="松开刷新"
      loading-text="更新中..."
      :success-text="!isUpError?'更新成功':''"
      success-duration="1000"
      @refresh="onRefresh">
      <van-list
        v-model="isUpLoading"
        :finished="upFinished"
        :immediate-check="check"
        :error.sync="isUpError"
        :offset="200"
        loading-text="加载中..."
        error-text="网络错误，点击重试"
        finished-text="已经到底了"
        @load="onLoad">
        <list-item v-for="(item,index) in list" :key="`LI${index}`" :list-item="item"
                   @click.native.stop="onClickListAction(item.id)">
          <template #action>
            <van-button
              square
              v-for="(button,index) in itemAction"
              :key="`BA${index}`"
              :text="button.text"
              :type="button.type"
              :color="button.color"
              @click.stop="onClickListItemAction(item)"
              class="action-button">
            </van-button>
          </template>
        </list-item>
      </van-list>
    </van-pull-refresh>
    <search-empty v-if="upFinished && list.length === 0" @refresh-try="onRefresh"></search-empty>
  </div>
</template>

<script>
import { Button, List, PullRefresh } from 'vant';
import ListItem from './ListItem.vue';
import SearchEmpty from '../SearchEmpty/SearchEmpty.vue';

export default {
  name: 'ListIndex',
  mixins: [],
  components: {
    SearchEmpty,
    ListItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Button.name]: Button,
  },
  props: {
    downLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
    upLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
    upFinished: {
      type: Boolean,
      required: true,
      default: false,
    },
    upError: {
      type: Boolean,
      required: true,
      default: false,
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    itemAction: {
      type: Array,
      default: () => [],
    },
    check: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isDownLoading: false,
      isUpLoading: false,
      isUpError: false,
    };
  },
  computed: {},
  watch: {
    downLoading(newVal) {
      this.isDownLoading = newVal;
    },
    upLoading(newVal) {
      this.isUpLoading = newVal;
    },
    upError(newVal) {
      this.isUpError = newVal;
    },
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    onRefresh() {
      this.$emit('on-refresh-list');
    },
    onLoad() {
      this.$emit('on-load-list');
    },
    onClickListAction(id) {
      this.$emit('on-click-list-action', id);
    },
    onClickListItemAction(item) {
      this.$emit('on-click-list-item-action', item);
    },
  },
};
</script>

<style lang="less" scoped>
  .action-button {
    height: 100%;
  }
  /deep/ .van-list__finished-text{
    font-size: 12px;
  }
</style>
