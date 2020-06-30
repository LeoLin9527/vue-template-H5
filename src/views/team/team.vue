<template>
  <div>
    <!--顶部标题栏-->
    <top-nav-bar-index
      :fixed="true"
      :border="false"
      icon-class-left="menu"
      icon-class-right="more"
      @click-left="openSideMenuHandle"
      @click-right="openBottomSheetHandle('more')"
      @click-title="openBottomSheetHandle('team')">
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

    <!--班组出勤统计数据展示栏-->
    <digital-signage-index :digitalList="digitalList"></digital-signage-index>

    <!--选项Tab栏-->
    <tab-bar-index
      mode="router"
      :active.sync="tabActive"
      :tab-bar-options="tabBarOptions"
      threshold="3">
    </tab-bar-index>

    <!--子路由页面-->
    <transition name="transition-fade" mode="out-in">
      <keep-alive>
        <router-view :key="$route.path"/>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TopNavBarIndex from 'Components/TopNavBar/TopNavBarIndex.vue';
import BottomPopActionIndex from 'Components/BottomPopAction/BottomPopActionIndex.vue';
import CalendarBarIndex from 'Components/CalendarBar/CalendarBarIndex.vue';
import DigitalSignageIndex from 'Components/DigitalSignage/DigitalSignageIndex.vue';
import TabBarIndex from 'Components/TabBar/TabBarIndex.vue';

export default {
  name: 'Team',
  mixins: [],
  components: {
    TabBarIndex,
    DigitalSignageIndex,
    CalendarBarIndex,
    BottomPopActionIndex,
    TopNavBarIndex,
  },
  props: {},
  data() {
    return {
      title: '软件开发二室',
      isOpenedBottomSheet: false,
      bottomOptions: [],
      bottomLoading: false,
      bottomSheetMode: 'team',
      date: new Date(),
      digitalList: [],
      tabActive: this.$route.name,
      tabBarOptions: [
        {
          id: 'T001',
          title: '班次出勤',
          to: { name: 'teamList' },
        },
        {
          id: 'T002',
          title: '缺勤统计',
          to: { name: 'teamChart' },
        },
        {
          id: 'T003',
          title: '小组配置',
          to: { name: 'teamGroup' },
        },
        {
          id: 'T004',
          title: '技能工出勤',
          to: { name: 'teamWorker' },
        },
        {
          id: 'T005',
          title: '请假统计',
          to: { name: 'teamLeave' },
        },
      ],
      moreOptions: [
        {
          name: '新建小组',
          action: 'add',
        },
        {
          name: '分配人员',
          action: 'assign',
        },
        {
          name: '点　　名',
          action: 'call',
        },
      ],
      moreAction: 'add',
    };
  },
  computed: {

  },
  watch: {},
  async created() {
    await this.teamStatistic();
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
    // 打开底部选项
    async openBottomSheetHandle(name) {
      this.isOpenedBottomSheet = true;
      this.bottomLoading = true;
      if (name === 'team') {
        const { data } = await this.$api.team.list();
        this.bottomOptions = data;
      } else {
        this.bottomOptions = this.moreOptions;
      }
      this.bottomSheetMode = name;
      this.bottomLoading = false;
    },
    // 选择部门
    selectedTitleHandle(option) {
      if (this.bottomSheetMode === 'team') {
        this.title = option.name;
      } else {
        this.moreAction = option.action;
      }
    },
    // 获取班组出勤统计
    async teamStatistic() {
      try {
        const res = await this.$api.team.statistic();
        this.digitalList = res.data || [];
      } catch (e) {
        console.log('Error', e);
      }
    },
  },
};
</script>

<style lang="less" scoped>

</style>
