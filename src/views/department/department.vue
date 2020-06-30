<template>
  <div>
    <!--顶部标题栏-->
    <top-nav-bar-index
      :fixed="true"
      :border="false"
      icon-class-left="menu"
      icon-class-right="team"
      @click-left="openSideMenuHandle"
      @click-right="openBottomSheetHandle('team')"
      @click-title="openBottomSheetHandle('department')">
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

    <!--部门/分厂出勤统计数据展示栏-->
    <digital-signage-index :digitalList="digitalList"></digital-signage-index>

    <!--选项Tab栏-->
    <tab-bar-index
      mode="router"
      :active.sync="tabActive"
      :tab-bar-options="tabBarOptions">
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
  name: 'DepartmentIndex',
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
      title: '计算机中心',
      isOpenedBottomSheet: false,
      bottomOptions: [],
      bottomLoading: false,
      bottomSheetMode: 'department',
      team: '',
      date: new Date(),
      digitalList: [],
      tabActive: this.$route.name,
      tabBarOptions: [
        {
          id: 'T001',
          title: '班次出勤',
          to: { name: 'departmentList' },
        },
        {
          id: 'T002',
          title: '缺勤统计',
          to: { name: 'departmentChart' },
        },
        {
          id: 'T003',
          title: '技能工出勤',
          to: { name: 'departmentWorker' },
        },
        {
          id: 'T004',
          title: '请假统计',
          to: { name: 'departmentLeave' },
        },
      ],
    };
  },
  computed: {
  },
  watch: {
  },
  async created() {
    await this.departmentStatistic();
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
      const { data } = await this.$api[name].list();
      this.bottomOptions = data;
      this.bottomSheetMode = name;
      this.bottomLoading = false;
    },
    // 选择部门
    selectedTitleHandle(option) {
      if (this.bottomSheetMode === 'department') {
        this.title = option.name;
      } else {
        this.team = option.name;
      }
      console.log(this.title, this.team);
    },
    // 获取分厂出勤统计
    async departmentStatistic() {
      try {
        const res = await this.$api.department.statistic();
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
