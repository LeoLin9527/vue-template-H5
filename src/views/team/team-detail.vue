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


    <!--科室/班组下人员详情列表-->
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

  </div>
</template>

<script>
import TopNavBarIndex from 'Components/TopNavBar/TopNavBarIndex.vue';
import CalendarBarIndex from 'Components/CalendarBar/CalendarBarIndex.vue';
import ListIndex from 'Components/List/ListIndex.vue';

export default {
  name: 'TeamChart',
  mixins: [],
  components: {
    ListIndex,
    CalendarBarIndex,
    TopNavBarIndex,
  },
  props: {},
  data() {
    return {
      title: '软件开发二室详细出勤',
      date: new Date(),
      downLoading: false,
      upLoading: false,
      upFinished: false,
      upError: false,
      lists: [],
      listItemButtons: [
        {
          text: '排岗与上岗证',
          type: 'info',
          color: '#fc3962',
        },
      ],
    };
  },
  computed: {
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
        const res = await this.$api.team.staff();
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
  },
};
</script>

<style lang="less" scoped>

</style>
