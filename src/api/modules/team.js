import request from '../../utils/request';

/**
 * @desc 班组科室相关接口
 * @author Jonny Wei
 * @date 2020/1/15
 */
const feature = 'team';

const team = {
  /**
   * @desc 班组列表
   * @author 180496
   * @date 2020/6/2
   */
  list(params) {
    return request({
      url: `/${feature}/list`,
      method: 'get',
      params,
      cache: true,
      cacheExpire: 90 * 1000,
    });
  },
  /**
   * @desc 出勤统计
   * @author 180496
   * @date 2020/5/19
   */
  statistic(params) {
    return request({
      url: `/${feature}/statistic`,
      method: 'get',
      params,
      cache: true,
      cacheExpire: 30 * 1000,
    });
  },
  /**
   * @desc 班组班次出勤列表
   * @author 180496
   * @date 2020/5/19
   */
  shiftOfTeam(data) {
    return request({
      url: `/${feature}/shiftOfTeam`,
      method: 'post',
      data,
      cache: false,
      cacheExpire: 30 * 1000,
    });
  },
  /**
  * @desc 班组下小组配置
  * @author 180496
  * @date 2020/6/2
  */
  group(data) {
    return request({
      url: `/${feature}/group`,
      method: 'post',
      data,
      cache: true,
      cacheExpire: 30 * 1000,
    });
  },
  /**
  * @desc 班组详情--人员信息
  * @author 180496
  * @date 2020/6/2
  */
  staff(data) {
    return request({
      url: `/${feature}/staff`,
      method: 'post',
      data,
      cache: true,
      cacheExpire: 30 * 1000,
    });
  },
  /**
  * @desc 班组点名列表
  * @author 180496
  * @date 2020/6/3
  */
  call(data) {
    return request({
      url: `/${feature}/call`,
      method: 'post',
      data,
      cache: true,
      cacheExpire: 30 * 1000,
    });
  },
};

export default team;
