<template>
  <div class="main">
    <side-menu-index
      :user="userInfo"
      :slogan-list="sloganList"
      :main-menu="mainMenu"
      :list-menu="listMenu"
      :open-side-menu="{opened:sideMenu}"
      @on-close-side-menu="closeSideMenuHandle"></side-menu-index>
    <transition name="transition-fade" mode="out-in">
      <keep-alive>
        <router-view :key="$router.name"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SideMenuIndex from 'Components/SideMenu/SideMenuIndex.vue';
import avatar from '../assets/images/avatar.gif';

export default {
  name: 'company',
  mixins: [],
  components: { SideMenuIndex },
  props: {},
  data() {
    return {
      sloganList: ['让世界爱上中国造', '格力电器中国制造'],
      mainMenu: [
        {
          name: '集团公司',
          path: '/company',
          iconClass: 'company',
        }, {
          name: '部门分厂',
          path: '/department',
          iconClass: 'department',
        }, {
          name: '科室班组',
          path: '/team',
          iconClass: 'team',
        },
      ],
      listMenu: [
        {
          obj: [
            {
              name: '我的首页',
              path: '/',
              iconClass: 'home_page',
            },
          ],
        },
        {
          title: '集团公司',
          obj: [
            {
              name: '公司出勤',
              path: '/company',
              iconClass: 'company2',
            },
          ],
        },
        {
          title: '部门分厂',
          obj: [
            {
              name: '班次出勤',
              path: '/department/index/list',
              iconClass: 'shift',
            }, {
              name: '缺勤统计',
              path: '/department/index/chart',
              iconClass: 'pie',
            }, {
              name: '技能工出勤',
              path: '/department/index/worker',
              iconClass: 'worker',
            }, {
              name: '请假排名',
              path: '/department/index/leave',
              iconClass: 'leave',
            }, {
              name: '部门分厂详情',
              path: '/department/detail',
              iconClass: 'detail',
            },
          ],
        },
        {
          title: '科室班组',
          obj: [
            {
              name: '班次出勤',
              path: '/team/index/list',
              iconClass: 'shift',
            }, {
              name: '缺勤统计',
              path: '/team/index/chart',
              iconClass: 'pie',
            }, {
              name: '小组配置',
              path: '/team/index/group',
              iconClass: 'group_deploy',
            }, {
              name: '技能工出勤',
              path: '/team/index/worker',
              iconClass: 'worker',
            }, {
              name: '请假排名',
              path: '/team/index/leave',
              iconClass: 'leave',
            }, {
              name: '科室班组详情',
              path: '/team/detail',
              iconClass: 'detail',
            }, {
              name: '出勤点名',
              path: '/team/call',
              iconClass: 'call',
            }, {
              name: '人员分配',
              path: '/team/assign',
              iconClass: 'assign',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['sideMenu', 'cachedViews', 'user', 'role']),
    userInfo() {
      return {
        avatar,
        userName: this.user.username,
        userRole: this.role,
      };
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
    ...mapMutations('menu', ['TOGGLE_SIDE_MENU']),
    closeSideMenuHandle() {
      this.TOGGLE_SIDE_MENU();
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";

  .main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    font-family: @base-font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 16px;
    background-color: @app-background-color;
  }
</style>
