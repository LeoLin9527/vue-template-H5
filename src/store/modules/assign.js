const state = {
  newAssignList: [],
};

const getters = {};

const mutations = {
  SET_ASSIGN: (state, list) => {
    state.newAssignList = list;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
