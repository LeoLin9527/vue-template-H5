import Cookies from 'js-cookie';

/**
 * @desc 一些工具类函数
 * @author Jonny Wei
 * @date 2020/5/18
 */

class Tools {
  // 设置Cookie缓存
  static setCookie(key, cache, cookieExpires = 5) {
    Cookies.set(key, cache, { expires: cookieExpires });
  }

  // 获取Cookie缓存
  static getCookie(key) {
    return Cookies.get(key);
  }

  // 清除Cookie缓存
  static removeCookie(key) {
    Cookies.remove(key);
  }

  // 设置缓存
  static setStorage(mode = 'sessionStorage', key, cache) {
    window[mode].setItem(key, JSON.stringify(cache));
  }

  // 获取缓存
  static getStorage(mode = 'sessionStorage', key) {
    const data = window[mode].getItem(key);
    return JSON.parse(data);
  }

  // 清除缓存
  static removeStorage(mode = 'sessionStorage', key) {
    window[mode].removeItem(key);
  }

  // 获取当前时间
  static getExpireTime() {
    return new Date().getTime();
  }

  // 清空所有缓存
  static clearStorage(mode = 'sessionStorage') {
    window[mode].clear();
  }

  // 清除过期的缓存
  static clearStorageOfUseless(mode = 'sessionStorage') {
    const storage = mode !== 'localStorage' ? window.sessionStorage : window.localStorage;
    const { length } = storage;
    if (length > 0) {
      for (let i = 0; i < length; i += 1) {
        const curTime = new Date().getTime();
        const key = storage.key(i);
        const value = JSON.parse(storage.getItem(key));
        if (value && value.cacheTime + value.cacheExpire <= curTime) {
          storage.removeItem(key);
        }
      }
    }
  }

  // px转vw(主要用于style绑定时px自动转化的问题)
  static pxToVw(pixels) {
    let number = 0;
    if (/^[1-9]\d*$/gi.test(pixels)) {
      number = pixels / 375 * 100;
    } else if (/^(\d+)px$/gi.test(pixels)) {
      const pxValue = pixels.split('px')[0];
      number = pxValue / 375 * 100;
    } else {
      return pixels;
    }
    const precision = 5;
    const multiplier = 10 ** (precision + 1);
    const wholeNumber = Math.floor(number * multiplier);
    return `${Math.round(wholeNumber / 10) * 10 / multiplier}vw`;
  }
}

export default Tools;
