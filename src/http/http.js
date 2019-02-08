import {httpFactory} from './http_config';

import HttpCache from './http_cache';
const cache = new HttpCache();


// verbs
export const get = (url, params, headers, cacheTimeout) => {
  const config = httpFactory.config();
  const cacheEnabled = config.cacheGetRequests;
  if (cacheEnabled && cache.exists(url, params, headers)) {
    return Promise.resolve(cache.get(url, params, headers));
  }

  return httpFactory.create(headers).get(url, {params})
    .then(response => {
      if (cacheEnabled) {
        cache.store(url, params, headers, cacheTimeout || config.defaultCacheTimeout, response);
      }

      return response;
    });
};

export const patch = (url, data, headers) =>
  httpFactory.create(headers).patch(url, data);

export const post = (url, data, headers) =>
  httpFactory.create(headers).post(url, data);

export const put = (url, data, headers) =>
  httpFactory.create(headers).put(url, data);

export const httpDelete = (url, params, headers) =>
  httpFactory.create(headers).delete(url, {params});

export const httpDeleteData = (url, data, headers) =>
  httpFactory.create(headers).delete(url, {data});
