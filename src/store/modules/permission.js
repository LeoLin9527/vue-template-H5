import { error404Router, rootHomeRouter, asyncRouterMap } from '../../router/routers';

const companyRoles = ['系统管理员', '公司领导'];
const teamRoles = ['班组长'];


const state = {
  accessRouters: [],
};

const getters = {};

const mutations = {
  SET_ACCESS_ROUTERS: (state, routers) => {
    // console.log(routers);
    state.accessRouters = routers;
  },
};

const actions = {
  /**
   * 根据当前用户的角色生成动态路由表
   * @param commit
   * @param role(角色)
   * @returns 过滤的动态路由accessedRoutes
   */
  generateRoutes({ commit }, role) {
    if (teamRoles.includes(role)) {
      const homeRouter = rootHomeRouter('/team');
      const asyncRouter = asyncRouterMap.filter(item => item.name === 'team') || [];
      const routers = [...homeRouter, ...asyncRouter, ...error404Router];
      commit('SET_ACCESS_ROUTERS', routers);
    } else {
      const homepage = companyRoles.includes(role) ? '/company' : '/department';
      const homeRouter = rootHomeRouter(homepage);
      const routers = [...homeRouter, ...asyncRouterMap, ...error404Router];
      commit('SET_ACCESS_ROUTERS', routers);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
