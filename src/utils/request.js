/**
 * @desc 对 axios 二次封装
 * 主要加入缓存机制/连续请求取消机制/请求超时后自动再次请求机制/错误处理
 * @author Jonny Wei
 * @date 2020/1/15
 */

import axios from 'axios';
import { Toast } from 'vant';
import Tools from './tools';
import router from '../router/index';


// 错误处理
const errorHandle = (status, otherError) => {
  switch (status) {
    case 401:
      router.push('/401');
      break;
    case 403:
      router.push('/401');
      break;
    case 404:
      router.push('/404');
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      router.push('/500');
      break;
    case 20003:
    case 20004:
    case 20005:
    case 20007:
    case 20009:
      Toast.setDefaultOptions({ duration: 6000 });
      Toast(otherError);
      break;
    default:
      console.log('response other err -->', otherError);
  }
};

// 超时重新请求
const timeoutHandle = (service, err) => {
  const { config } = err;
  if (!config || !config.retry) return Promise.reject(err);
  config.retryCount = config.retryCount || 0;
  if (config.retryCount >= config.retry) {
    router.push('/408');
    return Promise.reject(err);
  }
  config.retryCount += 1;
  const backoff = new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  }));
  return backoff.then(() => service(config));
};


const pending = []; // 声明一个数组用于存储每个请求的取消函数和标识
const removePending = (cancelKey) => {
  for (let p = 0; p < pending.length; p += 1) {
    // 当前请求在数组中存在时执行函数体
    if (pending[p].cancelKey === cancelKey) {
      pending[p].cancel({ result: `cancel request ${cancelKey}` });
      pending.splice(p, 1);
    }
  }
};

// 清除过期的缓存
Tools.clearStorageOfUseless();

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截
service.interceptors.request.use(
  (request) => {
    request.headers['X-INTERFACE-TOKEN'] = Tools.getCookie('_wmis_token');
    request.retry = 2;
    request.retryDelay = 1000;
    // console.log('请求request拦截', request);
    const {
      url, method, data, params, cacheMode, cache, cacheExpire,
    } = request;
    const cancelKey = `${url}&${method}`;
    removePending(cancelKey);
    request.cancelToken = new axios.CancelToken((c) => {
      pending.push({ cancelKey, cancel: c });
    });
    const getKey = data ? `${url}?cacheParams=${data}` : `${url}?cacheParams=${params}`;
    // 是否设置了当前请求需不需要缓存 key为url+参数：同一url参数变了也会去请求后端接口而不取缓存
    if (cache) {
      const cacheData = Tools.getStorage(cacheMode, getKey);
      // 判断缓存数据是否存在
      if (cacheData) {
        const curTime = Tools.getExpireTime();
        const source = axios.CancelToken.source();
        request.cancelToken = source.token;
        // 判断缓存数据是否过期，如果没过期就停止请求返回缓存
        if (cacheExpire === 'no' || curTime - cacheData.cacheTime < cacheExpire) {
          // 取消没过期的请求并返回缓存数据
          source.cancel(cacheData);
        } else {
          Tools.removeStorage(cacheMode, getKey);
        }
      }
    } else {
      Tools.removeStorage(cacheMode, getKey);
    }
    return request;
  },
  (error) => {
    // do something with request error
    console.log(`request err -->, ${error}`); // for debug
    return Promise.reject(error);
  },
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // console.log('响应response拦截', response);
    const {
      url, method, data, params, cacheMode, cache, cacheExpire,
    } = response.config;
    const cancelKey = `${url}&${method}`;
    removePending(cancelKey);
    if (cache) {
      const cacheData = {
        cacheTime: Tools.getExpireTime(),
        cacheExpire,
        params,
        data,
        result: response.data,
      };
      const setKey = data ? `${url}?cacheParams=${data}` : `${url}?cacheParams=${params}`;
      Tools.setStorage(cacheMode, setKey, cacheData);
    }
    const res = response.data;
    if (response.status === 200 && (res.success || res.JsonCode === 0)) {
      return res;
    }
    errorHandle(res.code, res.message);

    return Promise.reject(new Error(res.message || 'Error'));
  },
  (error) => {
    // console.log('响应error拦截', error);
    // 返回缓存的数据
    if (axios.isCancel(error)) {
      return Promise.resolve(error.message.result);
    }
    // 超时处理
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      timeoutHandle(service, error);
    }
    // 请求已发出但不在 2xx 范围，需要错误处理
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
    } else {
      console.log('断网错误处理');
    }
    console.log(`response err -->, ${error}`); // for debug
    return response ? Promise.reject(response) : Promise.reject(error);
  },
);

export default service;
