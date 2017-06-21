import {httpFactory} from './http_config';

// verbs
export const get = (url, params, headers) =>
  httpFactory.create(headers).get(url, {params});

export const post = (url, data, headers) =>
  httpFactory.create(headers).post(url, data);

export const put = (url, data, headers) =>
  httpFactory.create(headers).put(url, data);

export const httpDelete = (url, params, headers) =>
  httpFactory.create(headers).delete(url, {params});
