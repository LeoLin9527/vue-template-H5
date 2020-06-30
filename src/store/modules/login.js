import _api from 'Api';
import Tools from 'Utils/tools';
import { resetRouter } from '../../router';

const state = {
  userNo: '',
  userInfo: {},
  userRole: '',
};

const getters = {};

const mutations = {
  SET_USER_NO: (state, userNO) => {
    state.userNo = userNO;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_USER_ROLE: (state, userRole) => {
    state.userRole = userRole;
  },
};

const actions = {
  identityGPlatformAction({ commit }, AuthCode) {
    return new Promise(async (resolve, reject) => {
      const { JsonCode, JsonMessage, OpenIDs } = await _api.login.identityGPlatform(AuthCode);
      if (JsonCode === 0) {
        const userNo = OpenIDs.find(item => item.OpenIDType === 'hr').OpenIDAlias;
        commit('SET_USER_NO', userNo);
        const oldUserNo = Tools.getStorage('localStorage', '_wmis_userno');
        if (userNo === oldUserNo) {
          Tools.setStorage('localStorage', '_wmis_userno_changed', false);
        } else {
          Tools.setStorage('localStorage', '_wmis_userno_changed', true);
          Tools.setStorage('localStorage', '_wmis_userno', userNo);
        }
        resolve();
      } else {
        reject(new Error(`Error: ${JsonCode} -- ${JsonMessage}`));
      }
    });
  },
  loginAction({ state }) {
    return new Promise(async (resolve) => {
      const { token = '' } = await _api.login.login({ userno: state.userNo, password: '123456' });
      Tools.setCookie('_wmis_token', token, 1);
      Tools.setStorage('localStorage', '_wmis_userno_changed', false);
      resolve();
    });
  },
  userAction({ commit }) {
    return new Promise(async (resolve) => {
      const { data, data: { roleList } } = await _api.login.user();
      commit('SET_USER_INFO', data);
      commit('SET_USER_ROLE', roleList[0].rolename);
      resolve(data);
    });
  },
  logoutAction() {
    // Tools.removeCookie('_wmis_token');
    // resetRouter();
    // window.XuntongJSBridge.call('close')
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
