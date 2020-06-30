<template>
  <div>
    <van-popup v-model="openSideMenu.opened" position="left" @click-overlay="closeSideMenu" class="side-menu">
      <div class="side-menu-body">
        <div class="side-menu-body-background"></div>
        <div class="side-menu-header">
          <!--slogan-->
          <div class="side-menu-slogan">
            <div class="side-menu-slogan-outer">
              <div class="side-menu-slogan-inner">
                <div v-for="(slogan,index) in sloganList" :key="`SL${index}`">
                  <div class="side-menu-slogan-inner-element">
                    <span v-for="(item,index) in sloganLetter(slogan)" :key="`SLI${index}`">{{item}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--头像-->
          <div class="side-menu-avatar">
            <van-image
              round
              lazy-load
              :src="user.avatar"
              class="side-menu-avatar-size">
            </van-image>
            <div class="side-menu-avatar-title">
              <p class="side-menu-avatar-title-name">{{user.userName}}
                <small class="side-menu-avatar-title-number">({{user.userRole}})</small>
              </p>
            </div>
          </div>
          <!--主菜单-->
          <side-menu-main :main-menu-lists="mainMenu"></side-menu-main>
        </div>
        <!--菜单列表-->
        <side-menu-module :list-menu-module="listMenu"></side-menu-module>
      </div>
      <div class="van-hairline--top">
        <!--底部-->
        <van-row class="side-menu-footer">
          <van-col v-waves span="7" @click="logoutHandle" class="side-menu-footer-close">
            <svg-icon-index icon-class="close" class="side-menu-footer-close-icon"></svg-icon-index>
            <span class="side-menu-footer-close-name">退出</span>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Popup, Image as VanImage, Col, Row,
} from 'vant';
import { mapActions } from 'vuex';
import SideMenuMain from './SideMenuMain.vue';
import SideMenuModule from './SideMenuModule.vue';

export default {
  name: 'SideMenuIndex',
  mixins: [],
  components: {
    SideMenuModule,
    SideMenuMain,
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  props: {
    openSideMenu: {
      type: Object,
      required: true,
      default: () => ({ opened: false }),
    },
    user: {
      type: Object,
      required: true,
    },
    mainMenu: {
      type: Array,
      required: true,
    },
    listMenu: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sloganList: ['让世界爱上中国造', '格力电器中国制造'],
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
    ...mapActions('login', ['logoutAction']),
    closeSideMenu() {
      this.$emit('on-close-side-menu');
    },
    sloganLetter(slogan) {
      return [...slogan];
    },
    logoutHandle() {
      this.logoutAction();
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";
  .side-menu {
    width: @side-menu-width;
    height: 100vh;
    background: @side-menu-background-color;
    &-body{
      height: calc(100% - 46px);
      overflow: auto;
      position: relative;
      &-background{
        display: block;
        width: 100%;
        height: 120px;
        position: absolute;
        top: -36px;
        left: 0;
        background: @side-menu-slogan-background-color;
        border-radius: 0 0 100% 100%;
        z-index: 0;
      }
      .side-menu-header{
        padding: 10px 12px;
        background: @side-menu-header-background-color;
        .side-menu-slogan {
          position: relative;
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          font-weight: 900;
          text-align: center;
          margin: 6px 0 22px 0;
          letter-spacing: 14px;
          color: @side-menu-slogan-text-color;
          &-outer{
            position: absolute;
            width: 100%;
            height: 20px;
            line-height: 20px;
            left: 8px;
            top: 0;
            overflow: hidden;
          }
          &-inner{
            animation: letterScroll 4s ease-in-out infinite;
            animation-direction: alternate;
            &-element{
              & span{
                display: inline-block;
                animation: letterRollup 4s cubic-bezier(0.6,0,0.7,0.2) infinite;
              }
              & span:nth-of-type(2){
                animation-delay: .08s;
              }
              & span:nth-of-type(3){
                animation-delay: .16s;
              }
              & span:nth-of-type(4){
                animation-delay: .24s;
              }
              & span:nth-of-type(5){
                animation-delay: .32s;
              }
              & span:nth-of-type(6){
                animation-delay: .4s;
              }
              & span:nth-of-type(7){
                animation-delay: .48s;
              }
              & span:nth-of-type(8){
                animation-delay: .52s;
              }
            }
          }
        }
        .side-menu-avatar {
          display: flex;
          align-items: center;
          flex-direction: column;
          &-size {
            width: 50px;
            height: 50px;
            box-shadow: 0 0 8px 3px rgba(0,0,0,.2);
          }
          &-title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            &-name {
              font-size: 14px;
              font-weight: bold;
              line-height: 22px;
            }
            &-number {
              color: @side-menu-avatar-name-color;
            }
          }
        }
      }
    }
    &-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 46px;
      line-height: 46px;
      &-close{
        display: flex;
        justify-content: center;
        align-items: center;
        &-icon{
          font-size: 24px
        }
        &-name{
          font-size: 14px;
          margin-left: 2px;
        }
      }
    }
  }
  @keyframes letterScroll {
    0%,42%{
      transform: translateY(0);
    }
    58%,100%{
      transform: translateY(-20px);
    }
  }
  @keyframes letterRollup {
    60%{
      transform: rotateX(0deg);
      color: #2979FF;
    }
    99%{
      transform: rotateX(90deg);
      color: #1DE9B6;
    }
    100%{
      transform: rotateX(0deg);
      color: @side-menu-slogan-text-color;
    }
  }
</style>
