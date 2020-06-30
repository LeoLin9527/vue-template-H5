<template>
    <van-action-sheet
      v-model="opened"
      :close-on-popstate="true"
      :close-on-click-action="true"
      v-bind="$attrs"
      v-on="$listeners">
    </van-action-sheet>
</template>

<script>
import { ActionSheet } from 'vant';

export default {
  name: 'BottomPopSheetIndex',
  mixins: [],
  components: {
    [ActionSheet.name]: ActionSheet,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {};
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
  watch: {
  },
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

</style>
