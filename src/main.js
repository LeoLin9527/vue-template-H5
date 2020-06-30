import Vue from 'vue';
import FastClick from 'fastclick';
import {
  Lazyload,
  Notify,
} from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';

/* 样式 */
import 'normalize.css';
/**
 * @desc 填坑之使用本地字体：
 * 由于分离打包等的影响使得本地字体未覆盖掉CDN@font-face的地址
 * 解决：用vant/es/icon/local.css替换vant/es/icon/index.css中的@font-face
 * 再次填坑
 * babel.config.js中使用按需引入样式后本地字体未覆盖掉CDN@font-face的地址
 * 解决：在vant/es/icon/index.less中，手动@import "index.css"; 替换掉@import '~@vant/icons/src/index.less';
 * @import "index.css";
 */
import './styles/index.less';
import 'vant/lib/icon/local.less';

/* 接口 */
import api from './api';

/* 指令 */
import waves from './directives/waves';

/* svg图标 */
import './icons';

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = (targetElement) => {
    targetElement.focus();
  };
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(waves);

Vue.use(Notify).use(Lazyload);

Vue.prototype.$api = api; // 将api挂载到vue的原型上，方便调用

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
