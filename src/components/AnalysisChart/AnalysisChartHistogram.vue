<template>
  <div class="chart" :style="chartStyle"></div>
</template>

<script>
// 主题
import Tools from '../../utils/tools';

const echarts = require('echarts/lib/echarts'); // echarts核心包

export default {
  name: 'AnalysisChartHistogram',
  mixins: [],
  components: {},
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '500px',
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    chartStyle() {
      const height = Tools.pxToVw(this.height);
      const width = Tools.pxToVw(this.width);
      return { height, width };
    },
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  destroyed() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons', { renderer: 'svg' });
      const colorList = ['#afa3f5', '#00d488', '#f1bb4c', '#FDB4B9', '#854cff', '#5f45ff', '#02cdff', '#314976', '#f47a75', '#009db2', '#024b51'];
      const { name, total, data } = this.chartData;
      this.chart.setOption({
        title: [
          {
            text: '缺勤统计',
            subtext: name,
            x: 'center',
            textStyle: {
              fontSize: 16,
              color: '#000',
            },
          },
          {
            text: total,
            textStyle: {
              fontSize: 16,
              color: 'black',
            },
            textAlign: 'center',
            x: '49%',
            y: '54%',
          },
        ],
        legend: {
          top: '68',
          left: 'center',
          data,
        },
        tooltip: {
          trigger: 'item',
          extraCssText: 'text-align: left;',
          formatter(parms) {
            return `${parms.marker + parms.data.name}</br>数量：${parms.data.value}</br>占比：${parms.percent}%`;
          },
        },
        series: [{
          name: '缺勤统计数据图表分析',
          type: 'pie',
          center: ['50%', '56%'],
          radius: ['24%', '50%'],
          clockwise: true,
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              color(params) {
                const index = params.dataIndex % colorList.length;
                return colorList[index];
              },
            },
          },
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter(parms) {
                return parms.data.name;
              },
            },
          },
          labelLine: {
            normal: {
              length: 15,
              smooth: true,
            },
          },
          data,
        }],
      });
      window.onresize = () => {
        this.chart.resize();
      };
    },
  },
};
</script>

<style lang="less" scoped>
</style>
