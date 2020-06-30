const state = {
  department: '',
};

const getters = {

};

const mutations = {
  SET_SELECT_DEPARTMENT: (state, department) => {
    state.department = department;
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
