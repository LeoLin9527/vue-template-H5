<template>
  <van-row class="side-menu-main">
    <div v-for="(item,index) in mainMenuLists" :key="`MM${index}`">
        <van-col
          span="8"
          v-waves
          @click.native="navigateTo(item.path)"
          class="side-menu-main-item">
          <svg-icon-index
            :icon-class="item.iconClass"
            class="side-menu-main-item-icon">
          </svg-icon-index>
          <span class="side-menu-main-item-name">{{item.name}}</span>
        </van-col>
    </div>
  </van-row>
</template>

<script>
import { Col, Row } from 'vant';
import { mapMutations } from 'vuex';

export default {
  name: 'SideMenuMain',
  mixins: [],
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },
  props: {
    mainMenuLists: {
      type: Array,
      required: true,
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
    ...mapMutations('menu', ['TOGGLE_SIDE_MENU']),
    navigateTo(path) {
      this.$router.push({ path }).catch(() => {});
      this.TOGGLE_SIDE_MENU();
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
.side-menu-main{
  box-shadow: 0 0 8px 3px rgba(0,0,0,.2);
  border-radius: 6px;
  margin: 14px 0 20px;
  background: @side-menu-main-background-color;
  &-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0 18px;
    cursor: pointer;
    &-icon{
      font-size: 26px;
      color: @side-menu-main-icon-color;
    }
    &-name{
      margin-top: 4px;
      font-size: 12px;
      color: @side-menu-main-text-color;
    }
  }
}
</style>
