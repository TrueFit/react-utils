import _ from 'lodash';
import equals from 'deep-equal';

export default class HttpCache {
  constructor() {
    this.cache = [];
  }

  exists(url, params, headers) {
    return _.find(this.cache, x => equals(x, {url, params, headers})) !== null;
  }

  get(url, params, headers) {
    const item = _.find(this.cache, x => equals(x, {url, params, headers}));
    return item ? item.response : null;
  }

  store(url, params, headers, cacheTimeout, response) {
    const item = {url, params, headers, response};
    this.cache.push(item);

    setTimeout(() => this.cache.filter(x => x === item), cacheTimeout);
  }
}
