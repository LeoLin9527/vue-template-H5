const getters = {
  sideMenu: state => state.menu.isOpenSideMenu,
  user: state => state.login.userInfo,
  role: state => state.login.userRole,
  access_routers: state => state.permission.accessRouters,
  cachedViews: state => state.menu.cachedViews,
};
export default getters;
