<template>
  <div>
    <transition-group tag="div" name="fade">
      <div key='icon' v-show="showIcon" class="back-to-top" @click="backToTop">
        <svg-icon-index
          icon-class="back_to_top"
          class="back-to-top-icon">
        </svg-icon-index>
      </div>
      <div key='page' v-show="showPage" class="back-to-top">
        <div class="back-to-top-page">
          <span class="back-to-top-page-no">{{pager.pageNo}}</span>
          <span class="back-to-top-page-total">{{pager.total}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'BackToTopIndex',
  props: {
    visibilityHeight: {
      type: Number,
      default: 100,
    },
    backPosition: {
      type: Number,
      default: 0,
    },
    pager: {
      type: Object,
      default: () => ({
        pageNo: 1,
        total: 99,
      }),
    },
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false,
      isScrolling: false,
      scrollTimer: null,
    };
  },
  computed: {
    showIcon() {
      return (this.pager.pageNo > 1 && !this.isScrolling) || this.visible;
    },
    showPage() {
      return this.isScrolling;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.scrollTimer) {
      clearInterval(this.scrollTimer);
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight;
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
      }
      this.isScrolling = true;
      const t1 = document.documentElement.scrollTop;
      this.scrollTimer = setTimeout(() => {
        const t2 = document.documentElement.scrollTop;
        if (t1 === t2) {
          this.isScrolling = false;
        }
      }, 1000);
    },
    backToTop() {
      if (this.isMoving) return;
      const start = window.pageYOffset;
      let i = 0;
      this.isMoving = true;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition);
          clearInterval(this.interval);
          this.isMoving = false;
        } else {
          window.scrollTo(0, next);
        }
        i += 1;
      }, 16.7);
    },
    easeInOutQuad(t, b, c, d) {
      t /= (d / 2);
      if (t < 1) return c / 2 * t * t + b;
      t -= 1;
      return -c / 2 * (t * (t - 2) - 1) + b;
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~@/styles/var.less";

  .back-to-top {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 12px;
    bottom: 12px;
    text-align: center;
    cursor: pointer;
    z-index: 99999;
    width: 34px;
    height: 34px;
    line-height: 34px;
    border-radius: 50%;
    border: @back-to-top-border;
    background: @bock-to-top-background-color;
    transform-origin: center center;
    &-icon {
      color: @back-to-top-icon-color;
      font-size: 22px;
    }
    &-page{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-no{
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        color: @back-to-top-page-no-color;
        &::after {
          content: '';
          display: block;
          width: 26px;
          height: 1px;
          background: @back-to-top-inner-border-color;
        }
      }
      &-total{
        font-size: 12px;
        line-height: 14px;
        font-family: serif;
        color:@back-to-top-page-total-color;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transition: opacity .3s ease-out;
  }
</style>
