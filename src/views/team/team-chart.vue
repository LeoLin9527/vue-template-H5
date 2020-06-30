<template>
  <!--班组缺勤统计-->
  <analysis-chart-pie :chart-data="chartData" class="department-chart"></analysis-chart-pie>
</template>

<script>
import AnalysisChartPie from 'Components/AnalysisChart/AnalysisChartPie.vue';

export default {
  name: 'TeamChart',
  mixins: [],
  components: { AnalysisChartPie },
  props: {},
  data() {
    return {
      chartData: {
        name: '计算机中心',
        total: 7788,
        data: [
          { value: 335, name: '调休' },
          { value: 310, name: '病假' },
          { value: 234, name: '事假' },
          { value: 135, name: '出差' },
          { value: 1548, name: '旷工' },
        ],
      },
    };
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

  },
};
</script>

<style lang="less" scoped>
.department-chart{
  margin-top: 22px;
}
</style>
