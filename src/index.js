const GLOBAL_KEY = 'cachest-';

/**
 * 判断保存的内容是否过期
 * @param {String} content 保存的字符串
 */
function checkExpire (content) {

  // 保存时，没有设置过期时间，认为不会过期
  if (!content.expire) {
    return false;
  }

  return new Date().getTime() - content.timestamp > content.expire;
}

// 用户数据缓存
export default {
  // 设置数据，expire为过期时间，单位为毫秒
  set(key, value, expire) {
    if (typeof key !== 'string') {
      throw new Error('Property [key] require string type');
    }

    if (expire !== undefined && typeof expire !== 'number') {
      throw new Error('Property [expire] require number type');
    }

    const result = {
      data: value
    };
    if (expire) {
      result.timestamp = new Date().getTime();
      result.expire = expire;
    }

    localStorage.setItem(GLOBAL_KEY + key, JSON.stringify(result));
  },
  // 获取数据
  get(key) {
    let content = localStorage.getItem(GLOBAL_KEY + key);
    if (!content) {
      return null;
    }
    content = JSON.parse(content);
    const expired = checkExpire(content);
    return expired ? null : content.data;
  },
  // 删除数据
  del(key) {
    localStorage.removeItem(GLOBAL_KEY + key);
  },
  // 清空所有数据
  clear() {
    const len = localStorage.length;
    const keys = [];
    for (let index = 0; index < len; index++) {
      const key = localStorage.key(index);
      if (key.indexOf(GLOBAL_KEY) === 0) {
        keys.push(key);
      }
    }
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  },
  // 获取所有保存的键值
  keys() {
    const len = GLOBAL_KEY.length;
    const keys = [];
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      if (key.indexOf(GLOBAL_KEY) === 0) {
        const pureKey = key.slice(len);
        this.get(pureKey) && keys.push(pureKey);
      }
    }

    return keys;
  },
  // 获取数量
  size() {
    return this.keys().length;
  },
  // 是否过期
  isExpire(key) {
    let content = localStorage.getItem(GLOBAL_KEY + key);
    // 如果不存在，当做已过期处理
    if (!content) {
      return true;
    }

    return checkExpire(JSON.parse(content));
  }
};
