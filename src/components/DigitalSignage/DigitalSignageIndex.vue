<template>
  <div>
    <van-row class="digital-signage">
      <van-col span="8" v-waves v-for="(item,index) in obj" :key="`digital${index}`" class="digital-signage-item">
        <van-row>
          <van-col span="24" class="digital-signage-item-count">
            <count-to :startVal="0" :endVal="item.number" :duration="3000"></count-to>
          </van-col>
          <van-col span="24">
            <p class="digital-signage-item-name">{{item.name}}</p>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import { Col, Row } from 'vant';

export default {
  name: 'DigitalSignageIndex',
  mixins: [],
  components: {
    countTo,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  props: {
    digitalList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      obj: [
        {
          name: '实际在册',
          number: 0,
        },
        {
          name: '实际出勤',
          number: 0,
        },
        {
          name: '出勤率',
          number: 0,
        },
      ],
    };
  },
  computed: {},
  watch: {
    digitalList(newVal) {
      if (newVal.length === 0) {
        this.obj = [
          {
            name: '实际在册',
            number: 0,
          },
          {
            name: '实际出勤',
            number: 0,
          },
          {
            name: '出勤率',
            number: 0,
          },
        ];
      } else {
        this.obj = newVal;
      }
    },
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {},
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";

  .digital-signage {
    margin: 14px;
    background: @digital-signage-background-color;
    border-radius: 8px;
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px;
      &:nth-child(1) {
        border-radius: 8px 0 0 8px;
      }
      &:nth-child(3) {
        border-radius: 0 8px 8px 0;
      }
      &:last-child .digital-signage-item-count::after {
        content: '%';
      }
      &-count {
        font-size: @digital-signage-count-size;
        font-weight: bold;
        margin-top: 10px;
        color: @digital-signage-count-color;
      }
      &-name {
        font-size: @digital-signage-text-size;
        color: @digital-signage-text-color;
      }
    }
  }
</style>
