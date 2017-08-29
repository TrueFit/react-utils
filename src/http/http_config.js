import _ from 'lodash';
import axios from 'axios';

class HttpFactory {
  config() {
    return this.config || {};
  }

  create(headers) {
    // allow the user to specify either a static object or a function to be executed
    let config = this.config || {};
    if (_.isFunction(config)) {
      config = config(headers);
    }

    if (headers) {
      config = {
        ...config,
        headers: {
          ...(config.headers || {}),
          ...headers,
        },
      };
    }

    return axios.create(config);
  }
}
export const httpFactory = new HttpFactory();

export const configureHttp = config => {
  httpFactory.config = config;
};
