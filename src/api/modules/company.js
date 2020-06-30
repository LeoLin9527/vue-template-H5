import request from '../../utils/request';

/**
 * @desc 公司页相关接口
 * @author Jonny Wei
 * @date 2020/1/15
 */
const feature = 'company';

const company = {
  /**
  * @desc 公司列表
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
  * @desc 公司下分厂出勤列表
  * @author 180496
  * @date 2020/5/19
  */
  departments(data) {
    return request({
      url: `/${feature}/departments`,
      method: 'post',
      data,
      cache: false,
      cacheExpire: 30 * 1000,
    });
  },

};

export default company;
