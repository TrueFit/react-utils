import {httpFactory} from './http_config';

// verbs
export const get = (url, params) =>
  httpFactory.create().get(url, {params});

export const post = (url, data) =>
  httpFactory.create().post(url, data);

export const put = (url, data) =>
  httpFactory.create().put(url, data);

export const httpDelete = (url, params) =>
  httpFactory.create().delete(url, {params});
