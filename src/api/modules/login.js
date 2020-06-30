import request from '../../utils/request';

/**
 * @desc 登录相关接口
 * @author Jonny Wei
 * @date 2020/1/15
 */

const login = {
  /**
   * G平台身份认证
   * @param data = AuthCode
   */
  identityGPlatform(data) {
    return request({
      // baseURL: 'https://oauth.gree.com/',
      // url: 'sso/api/ValidateAuthCode',
      url: '/identity',
      method: 'post',
      data,
      headers: {
        appid: '0044ed86-dece-4f06-ad88-41ca508b9169',
        appkey: '6b16b016-ff8b-45b8-8f71-3fdfc8920114',
      },
    });
  },
  /**
   * 用户登录
   * @param data
   */
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      data,
    });
  },
  /**
   * 用户信息
   */
  user() {
    return request({
      url: '/user',
      method: 'get',
      cache: true,
      cacheExpire: 'no',
      cacheMode: 'localStorage',
    });
  },


  /**
   * 用户登录-中间层测试
   * @param data
   */
  loginByNode(data) {
    return request({
      url: '/login',
      method: 'post',
      data,
      cache: false,
    });
  },
  getList() {
    return request({
      url: '/list',
      method: 'get',
      cache: true,
      cacheExpire: 30 * 1000,
    });
  },
  getList2(params) {
    return request({
      url: '/list2',
      method: 'get',
      params,
      cache: true,
      cacheExpire: 30 * 1000,
    });
  },
};

export default login;
