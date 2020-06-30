<template>
  <div class="side-menu-list">
    <div class="side-menu-list-inner">
      <div v-for="(listMenu,index) in listMenuModule" :key="`SMM${index}`" class="side-menu-module">
        <van-divider v-show="listMenu.title" class="side-menu-module-title">{{listMenu.title}}</van-divider>
        <div v-for="(item,index) in listMenu.obj" :key="`SML${index}`">
          <div v-waves @click="navigateTo(item.path)" class="side-menu-module-cell" >
            <svg-icon-index
              :icon-class="item.iconClass"
              :style="{fontSize:item.iconSize + 'px'}"
              class="side-menu-module-cell-icon">
            </svg-icon-index>
            <div class="side-menu-module-cell-title"><span>{{item.name}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Divider } from 'vant';

export default {
  name: 'SideMenuModule',
  mixins: [],
  components: {
    [Divider.name]: Divider,
  },
  props: {
    listMenuModule: {
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
  .side-menu-list{
    background: @side-menu-header-background-color;
    &-inner{
      border-radius: 20px 20px 0 0;
      box-shadow: 0 0 8px 3px rgba(0,0,0,.2);
      background: @side-menu-background-color;
    }
  }
  .side-menu-module {
    width: 100%;
    text-align: left;
    &-title{
      padding: 0 10px;
      font-size: 12px;
      margin:0;
    }
    &-cell{
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      overflow: hidden;
      line-height: 24px;
      &-icon{
        line-height: 24px;
        color: @side-menu-module-icon-color;
        font-size: 14px;
      }
      &-title{
        margin-left: 10px;
        color: @side-menu-main-text-color;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
</style>
