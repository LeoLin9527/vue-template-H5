<template>
  <div>
    <!--顶部导航栏-->
    <top-nav-bar-index
      :fixed="true"
      :border="false"
      icon-class-left="left_arrow"
      @click-left="backHandle">
      {{title}}
    </top-nav-bar-index>

    <!--顶部日历选择器-->
    <calendar-bar-index
      :date.sync="date"
      :fixed="true"
      :border="false">
    </calendar-bar-index>

    <van-sticky>
      <!--选项Tab栏-->
      <tab-bar-index
        :active.sync="tabActive"
        :tab-bar-options="tabBarOptions"
        :key="`tab${sortBarOptionsChange}`">
      </tab-bar-index>

      <!--筛选排序栏-->
      <sort-bar-index
        :active.sync="sortActive"
        :sort-bar-options="sortBarOptions"
        @click-sort="clickSortHandle"
        :key="`sort${sortBarOptionsChange}`">
      </sort-bar-index>
    </van-sticky>


    <!--部门/分厂下班组或车间出勤列表-->
    <list-index
      :downLoading="downLoading"
      :upLoading="upLoading"
      :upFinished="upFinished"
      :upError="upError"
      :list="lists"
      :itemAction="listItemButtons"
      @on-refresh-list="refreshListsHandle"
      @on-load-list="loadListsHandle"
      @on-click-list-action="clickListHandle"
      @on-click-list-item-action="clickListItemHandle">
    </list-index>

    <!--底部标签导航-->
    <bottom-bar-index
      :active.sync="bottomBarActive"
      :bottom-bar-options="bottomBarOptions"
      :fixed="true"
      :border="true"
      z-index="88"
      :active-color="'#1989fa'"
      :inactive-color="'#000'"
      :placeholder="true"
      @change="changeUnitHandle">
    </bottom-bar-index>
  </div>
</template>

<script>
import { Sticky } from 'vant';
import TopNavBarIndex from 'Components/TopNavBar/TopNavBarIndex.vue';
import CalendarBarIndex from 'Components/CalendarBar/CalendarBarIndex.vue';
import TabBarIndex from 'Components/TabBar/TabBarIndex.vue';
import SortBarIndex from 'Components/SortBar/SortBarIndex.vue';
import ListIndex from 'Components/List/ListIndex.vue';
import BottomBarIndex from 'Components/BottomBar/BottomBarIndex.vue';


const sortBarOptionsOfTeam = [
  {
    id: 'S001',
    title: '实际在册',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S002',
    title: '实际出勤',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S003',
    title: '缺勤人数',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S004',
    title: '出勤率',
    showDefaultArrow: true,
    showArrow: false,
  },
];
const sortBarOptionsOfWorkshop = [
  {
    id: 'S001',
    title: '人力配置',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S002',
    title: '实际出勤',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S003',
    title: '出勤率',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S004',
    title: '定编标准',
    showDefaultArrow: true,
    showArrow: false,
  },
  {
    id: 'S005',
    title: '差异人力',
    showDefaultArrow: true,
    showArrow: false,
  },
];

const listItemButtonsOfTeam = [
  {
    text: '详细',
    type: 'info',
    color: '#fc3962',
  },
  {
    text: '小组',
    type: 'warning',
    color: '#ffe300',
  },
];

const listItemButtonsOfWorkshop = [
  {
    text: '具体人力',
    type: 'info',
    color: '#fc3962',
  },
  {
    text: '岗位明细',
    type: 'warning',
    color: '#ffe300',
  },
];


export default {
  name: 'DepartmentDetail',
  mixins: [],
  components: {
    BottomBarIndex,
    ListIndex,
    SortBarIndex,
    TabBarIndex,
    CalendarBarIndex,
    TopNavBarIndex,
    [Sticky.name]: Sticky,
  },
  props: {},
  data() {
    return {
      title: '计算机中心详细出勤',
      date: new Date(),
      downLoading: false,
      upLoading: false,
      upFinished: false,
      upError: false,
      lists: [],
      listItemButtons: listItemButtonsOfTeam,
      sortBarOptionsChange: false,
      tabActive: 'T001',
      sortActive: 'S001',
      bottomBarActive: 'team',
      tabBarOptions: [
        {
          id: 'T001',
          title: '白',
        },
        {
          id: 'T002',
          title: '中',
        },
        {
          id: 'T003',
          title: '晚',
        },
        {
          id: 'T004',
          title: '全',
        },
      ],
      bottomBarOptions: [
        {
          name: 'team',
          title: '班组出勤',
          icon: 'team',
        },
        {
          name: 'workshop',
          title: '车间出勤',
          icon: 'workshop',
        },
      ],
    };
  },
  computed: {
    sortBarOptions() {
      return this.sortBarOptionsChange === true ? sortBarOptionsOfWorkshop : sortBarOptionsOfTeam;
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
    // 返回上一级路由
    backHandle() {
      this.$router.go(-1);
    },
    // 刷新列表
    async refreshListsHandle() {
      this.upFinished = false;
      this.downLoading = true;
      this.lists = [];
      await this.loadListsHandle();
    },
    // 加载列表
    async loadListsHandle() {
      this.upLoading = true;
      if (this.upError) {
        this.upError = false;
      }
      if (this.upFinished) {
        this.upFinished = false;
      }
      try {
        let res = {};
        if (!this.sortBarOptionsChange) {
          res = await this.$api.department.team();
        } else {
          res = await this.$api.department.workshop();
        }
        const { rows, total } = res.data;
        this.lists = [...this.lists, ...rows];
        if (this.lists.length === 0 || this.lists.length >= total) {
          this.upFinished = true;
        }
      } catch (e) {
        this.upError = true;
        console.log('Error', e);
      } finally {
        this.downLoading = false;
        this.upLoading = false;
      }
    },
    // 点击列表项
    clickListHandle(id) {
      console.log('班组id ', id);
    },
    // 点击列表项滑动按钮
    clickListItemHandle(id) {
      console.log('班组id ', id);
    },
    // 点击底部标签栏切换
    async changeUnitHandle(active) {
      console.log(active);
      this.sortBarOptionsChange = !this.sortBarOptionsChange;
      this.lists = [];
      await this.loadListsHandle();
      if (this.sortBarOptionsChange) {
        this.listItemButtons = listItemButtonsOfWorkshop;
      } else {
        this.listItemButtons = listItemButtonsOfTeam;
      }
    },

    // 点击筛选
    clickSortHandle(sort) {
      console.log(sort);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
