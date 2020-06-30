import Vue from 'vue';
import Router from 'vue-router';
import { Toast } from 'vant';
import Tools from 'Utils/tools';
import { constantRouterMap } from './routers';
import store from '../store';

Vue.use(Router);

const createRouter = () => new Router({
  routes: constantRouterMap,
  mode: 'history',
});

const router = createRouter();


router.beforeEach(async (to, from, next) => {
  if (to.query.authcode) {
    await store.dispatch('login/identityGPlatformAction', to.query);
  }
  const hasToken = Tools.getCookie('_wmis_token');
  const hasUserNo = Tools.getStorage('localStorage', '_wmis_userno');
  const hasChanged = Tools.getStorage('localStorage', '_wmis_userno_changed');
  if (!hasUserNo) {
    Toast.setDefaultOptions({ duration: 0 });
    Toast('获取用户身份失败,退出重新试试');
  } else if (hasUserNo && (hasChanged || !hasToken)) {
    await store.dispatch('login/loginAction');
    next('/');
  } else {
    const hasRoles = store.getters.role;
    if (hasRoles) {
      store.dispatch('menu/addCachedView', to);
      next();
    } else {
      await store.dispatch('login/userAction');
      store.dispatch('permission/generateRoutes', store.getters.role);
      router.addRoutes(store.getters.access_routers);
      next({ ...to, replace: true });
    }
  }
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
