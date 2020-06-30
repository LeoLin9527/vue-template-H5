<template>
  <div>
    <top-nav-bar-index
      v-bind="$attrs"
      v-on="$listeners"
      icon-class-left="left_arrow"
      icon-class-right="right_arrow"
      @click-title="openCalendarHandle"
      @click-left="preDateHandle"
      @click-right="nextDateHandle">
      {{calendarDate | formatCalendarDate}}
    </top-nav-bar-index>
    <van-calendar
      ref="calendar"
      v-model="isOpenCalendar"
      :show-confirm="false"
      :min-date="yearAgo"
      :default-date="calendarDate"
      :close-on-popstate="true"
      @confirm="confirmDateHandle">
    </van-calendar>
  </div>
</template>

<script>
import { Calendar } from 'vant';
import TopNavBarIndex from '../TopNavBar/TopNavBarIndex.vue';

export default {
  name: 'CalendarBarIndex',
  mixins: [],
  components: {
    TopNavBarIndex,
    [Calendar.name]: Calendar,
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      calendarDate: new Date(),
      isOpenCalendar: false,
    };
  },
  computed: {
    yearAgo() {
      const time = new Date();
      time.setFullYear(time.getFullYear() - 1);
      return time;
    },
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  filters: {
    formatCalendarDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
  },
  methods: {
    // 打开日历选择器
    openCalendarHandle() {
      this.isOpenCalendar = true;
    },
    // 选择前一天
    preDateHandle() {
      const timer = this.calendarDate;
      timer.setDate(timer.getDate() - 1);
      this.calendarDate = timer;
      this.$refs.calendar.onConfirm();
    },
    // 选择后一天
    nextDateHandle() {
      const timer = this.calendarDate;
      timer.setDate(timer.getDate() + 1);
      this.calendarDate = timer;
      this.$refs.calendar.onConfirm();
    },
    // 选择任意日期
    confirmDateHandle(date) {
      this.calendarDate = date;
      this.transferCalendar(date);
      this.isOpenCalendar = false;
    },
    // 向父组件传递日期
    transferCalendar(calendarDate) {
      this.$emit('update:date', calendarDate);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
