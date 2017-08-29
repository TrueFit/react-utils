import {httpFactory} from './http_config';

import HttpCache from './http_cache';
const cache = new HttpCache();


// verbs
export const get = (url, params, headers, cacheTimeout) => {
  const cacheEnabled = httpFactory.config.cacheGetRequests;
  if (cacheEnabled && cache.exists(url, params, headers)) {
    return Promise.resolve(cache.get(url, params, headers));
  }

  return httpFactory.create(headers).get(url, {params})
    .then(response => {
      if (cacheEnabled) {
        cache.store(url, params, headers, cacheTimeout, response);
      }

      return response;
    });
};

export const post = (url, data, headers) =>
  httpFactory.create(headers).post(url, data);

export const put = (url, data, headers) =>
  httpFactory.create(headers).put(url, data);

export const httpDelete = (url, params, headers) =>
  httpFactory.create(headers).delete(url, {params});
