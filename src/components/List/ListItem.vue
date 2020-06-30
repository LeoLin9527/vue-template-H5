<template>
  <div>
    <van-swipe-cell v-waves class="list-item">
      <div class="list-item-con">
          <van-row class="list-item-header">
            <van-col span="22" class="list-item-header-left">
              <van-tag round plain type="danger" class="list-item-header-index" v-if="listItem.index">{{listItem.index}}</van-tag>
              <div class="list-item-header-title">{{listItem.name}}
                <span class="list-item-header-subtitle" v-if="listItem.subtitle">({{listItem.subtitle}})</span>
              </div>
            </van-col>
            <van-col span="2" class="list-item-header-right" v-if="listItem.shiftType">
              <van-tag :color="'#afb4db'" :text-color="'#6950a1'">{{listItem.shiftType}}</van-tag>
            </van-col>
          </van-row>
          <van-divider class="divider-top"></van-divider>
          <van-row class="list-item-body">
            <van-col :span="listItemBodyMainSpan">
              <van-row class="list-item-body-main">
                <div v-for="(item,index) in listItem.obj" :key="`LIBM${index}`">
                  <van-col :span="listItemBodyItemSpan" class="list-item-body-item">
                    <div class="list-item-body-item-value">{{item.value}}</div>
                    <div class="list-item-body-item-title">{{item.title}}</div>
                  </van-col>
                </div>
              </van-row>
            </van-col>
            <van-col :span="listItemBodyRightSpan" class="list-item-body-right-rate" v-if="listItem.rate">
              <div class="list-item-body-right-rate-value">{{listItem.rate}}</div>
              <div class="list-item-body-right-rate-title">{{listItem.rateTitle}}</div>
            </van-col>
            <van-col :span="listItemBodyRightSpan" class="list-item-body-right-call" v-if="listItem.call">
              <div class="list-item-body-right-call-value">{{listItem.call}}</div>
              <div class="list-item-body-right-call-title">{{listItem.callTitle}}</div>
            </van-col>
          </van-row>
          <van-row class="list-item-footer" v-if="listItem.remark">
            <van-divider class="divider-bottom"></van-divider>
            <van-row class="list-item-remark">
              <van-col span="3" class="list-item-remark-title">备注：</van-col>
              <van-col span="21" class="list-item-remark-value">{{listItem.remark}}</van-col>
            </van-row>
          </van-row>
        </div>
      <template #right>
        <slot name="action"></slot>
      </template>
    </van-swipe-cell>
    <div class="bottom-margin"></div>
  </div>
</template>

<script>
import {
  SwipeCell, Col, Row, Tag, Divider,
} from 'vant';

export default {
  name: 'ListItem',
  mixins: [],
  components: {
    [SwipeCell.name]: SwipeCell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Divider.name]: Divider,
  },
  props: {
    listItem: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    listItemBodyMainSpan() {
      return 24 - this.listItemBodyRightSpan;
    },
    listItemBodyRightSpan() {
      let span = 24;
      switch (this.listItem.obj.length) {
        case 0: span = 24; break;
        case 1: span = 12; break;
        case 2: span = 8; break;
        case 3: span = 6; break;
        default: span = 6; break;
      }
      return span;
    },
    listItemBodyItemSpan() {
      if (this.listItem.obj.length === 0) {
        return 0;
      }
      if (this.listItem.obj.length <= 3) {
        return 24 / this.listItem.obj.length;
      }
      return 8;
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

  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  .list-item {
    height: auto;
    background: @list-background-color;
    position: relative;
    box-sizing: border-box;
    border-radius: @list-border-radius;
    .list-item-con {
      padding: 12px 10px;
      .list-item-header {
        height: auto;
        display: flex;
        align-items: center;
        .list-item-header-left {
          display: flex;
          align-items: center;
          .list-item-header-index {
            margin: 0 6px 0 2px;
          }
          .list-item-header-title {
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
            color: @list-title-color;
            .list-item-header-subtitle {
              font-size: 13px;
              color: @list-subtitle-color;
            }
          }
        }
      }
      .list-item-body{
        display: flex;
        align-items: center;
        .list-item-body-main{
          .list-item-body-item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 6px 0 16px 0;
            .list-item-body-item-value{
              font-size: 14px;
              font-weight: bold;
              padding-bottom: 8px;
              color: @list-item-value-color;
            }
            .list-item-body-item-title{
              font-size: 12px;
              color: @list-item-title-color;
            }
          }
        }
        .list-item-body-right-rate{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 6px 0 16px 0;
          .list-item-body-right-rate-value{
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 8px;
          }
          .list-item-body-right-rate-value::after{
            content: '%';
          }
          .list-item-body-right-rate-title{
            font-size: 12px;
          }
        }
        .list-item-body-right-call{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 6px 0 16px 0;
          .list-item-body-right-call-value{
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 8px;
            color: @list-item-value-color;
          }
          .list-item-body-right-call-title{
            font-size: 12px;
            color: @list-item-title-color;
          }
        }
      }
      .list-item-footer{
        .list-item-remark{
          display: flex;
          justify-content: center;
          align-items: center;
          .list-item-remark-title{
            font-size: 12px;
            line-height: 18px;
          }
          .list-item-remark-value{
            display: flex;
            font-size: 12px;
            line-height: 18px;
            text-align: left;
          }
        }
      }
    }
  }
  /deep/ .van-cell{
    padding: 8px 13px;
  }
  .divider-top{
    margin: 8px 0 16px 0;
  }
  .divider-bottom{
    margin: 4px 0 12px 0;
  }
  .bottom-margin{
    margin: 12px 0;
  }
</style>
