<template>
  <div>
    <!--顶部标题栏-->
    <top-nav-bar-index
      :fixed="true"
      :border="false"
      icon-class-left="menu"
      @click-left="openSideMenuHandle"
      @click-title="openBottomSheetHandle">
      {{title}}
    </top-nav-bar-index>
    <bottom-pop-action-index
      :open.sync="isOpenedBottomSheet"
      :actions="bottomOptions"
      :default-index="0"
      :loading="bottomLoading"
      title="请选择"
      cancel-text="取消"
      @select="selectedTitleHandle">
    </bottom-pop-action-index>

    <!--顶部日历选择器-->
    <calendar-bar-index
      :date.sync="date"
      :fixed="true"
      :border="true">
    </calendar-bar-index>

    <!--公司出勤统计数据展示栏-->
    <digital-signage-index :digitalList="digitalList"></digital-signage-index>

    <!--公司下分厂出勤列表-->
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

    <back-to-top-index :visibility-height="200" :back-position="0"></back-to-top-index>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TopNavBarIndex from 'Components/TopNavBar/TopNavBarIndex.vue';
import BottomPopActionIndex from 'Components/BottomPopAction/BottomPopActionIndex.vue';
import CalendarBarIndex from 'Components/CalendarBar/CalendarBarIndex.vue';
import DigitalSignageIndex from 'Components/DigitalSignage/DigitalSignageIndex.vue';
import ListIndex from 'Components/List/ListIndex.vue';
import BackToTopIndex from 'Components/BackToTop/BackToTopIndex.vue';

export default {
  name: 'CompanyIndex',
  mixins: [],
  components: {
    BackToTopIndex,
    ListIndex,
    DigitalSignageIndex,
    CalendarBarIndex,
    BottomPopActionIndex,
    TopNavBarIndex,
  },
  props: {},
  data() {
    return {
      title: '格力电器',
      isOpenedBottomSheet: false,
      bottomOptions: [],
      bottomLoading: false,
      date: new Date(),
      digitalList: [],
      downLoading: false,
      upLoading: false,
      upFinished: false,
      upError: false,
      lists: [],
      listItemButtons: [
        {
          text: '详细',
          type: 'info',
          color: '#fc3962',
        },
        {
          text: '近期',
          type: 'warning',
          color: '#ffe300',
        },
      ],
    };
  },
  computed: {
  },
  watch: {

  },
  async created() {
    await this.companyStatistic();
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    ...mapMutations('menu', ['TOGGLE_SIDE_MENU']),
    // 打开侧边栏菜单
    openSideMenuHandle() {
      this.TOGGLE_SIDE_MENU();
    },
    // 打开底部公司选项
    async openBottomSheetHandle() {
      this.isOpenedBottomSheet = true;
      this.bottomLoading = true;
      const { data = [] } = await this.$api.company.list();
      this.bottomOptions = Object.freeze(data);
      this.bottomLoading = false;
    },
    // 选择公司
    selectedTitleHandle(option) {
      console.log(option);
      this.title = option.name;
    },
    // 刷新公司下分厂出勤列表
    async refreshListsHandle() {
      this.upFinished = false;
      this.downLoading = true;
      this.lists = [];
      await this.loadListsHandle();
    },
    // 加载公司下分厂出勤列表
    async loadListsHandle() {
      this.upLoading = true;
      if (this.upError) {
        this.upError = false;
      }
      if (this.upFinished) {
        this.upFinished = false;
      }
      try {
        const res = await this.$api.company.departments();
        const { rows = [], total = 0 } = res.data;
        this.lists = Object.freeze([...this.lists, ...rows]);
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
      console.log('分厂id ', id);
    },
    // 点击列表项滑动按钮
    clickListItemHandle(id) {
      console.log('分厂id ', id);
    },
    // 获取公司出勤统计
    async companyStatistic() {
      try {
        const { data = [] } = await this.$api.company.statistic();
        this.digitalList = Object.freeze(data);
      } catch (e) {
        console.log('Error', e);
      }
    },
  },
};
</script>

<style lang="less" scoped>

</style>
