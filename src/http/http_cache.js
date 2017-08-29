import _ from 'lodash';
import equals from 'deep-equal';

export default class HttpCache {
  constructor() {
    this.cache = [];
  }

  areEqual(item1, item2) {
    return equals(item1.url, item2.url)
        && equals(item1.params, item2.params)
        && equals(item1.headers, item2.headers);
  }

  exists(url, params, headers) {
    return this.get(url, params, headers) !== null;
  }

  get(url, params, headers) {
    const item = _.find(this.cache, x => this.areEqual(x, {url, params, headers}));
    return item ? item.response : null;
  }

  store(url, params, headers, cacheTimeout, response) {
    const item = {url, params, headers, response};
    this.cache.push(item);

    setTimeout(() => {
      this.cache = this.cache.filter(x => !this.areEqual(x, item));
    }, cacheTimeout);
  }
}
