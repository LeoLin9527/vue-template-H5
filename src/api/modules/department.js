import request from '../../utils/request';

/**
 * @desc 部门/分厂页相关接口
 * @author Jonny Wei
 * @date 2020/1/15
 */
const feature = 'department';

const department = {
  /**
  * @desc 部分分厂列表
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
   * @desc 分厂班次出勤列表
   * @author 180496
   * @date 2020/5/19
   */
  shiftOfDepartment(data) {
    return request({
      url: `/${feature}/shiftOfDepartment`,
      method: 'post',
      data,
      cache: false,
      cacheExpire: 30 * 1000,
    });
  },

  /**
   * @desc 分厂下班组出勤列表
   * @author 180496
   * @date 2020/5/19
   */
  team(data) {
    return request({
      url: `/${feature}/team`,
      method: 'post',
      data,
      cache: false,
      cacheExpire: 30 * 1000,
    });
  },

  /**
   * @desc 分厂下车间出勤列表
   * @author 180496
   * @date 2020/5/19
   */
  workshop(data) {
    return request({
      url: `/${feature}/workshop`,
      method: 'post',
      data,
      cache: false,
      cacheExpire: 30 * 1000,
    });
  },
};

export default department;
