const state = {
  isOpenSideMenu: false,
  cachedViews: [],
};

const getters = {};

const mutations = {
  TOGGLE_SIDE_MENU: (state) => {
    state.isOpenSideMenu = !state.isOpenSideMenu;
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    if (view.meta.cached) {
      state.cachedViews.push(view.name);
    }
    // console.log(state.cachedViews);
  },
};

const actions = {
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
