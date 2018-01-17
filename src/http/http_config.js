import _ from 'lodash';
import axios from 'axios';
import addSuccess from './addSuccess';

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

    const instance = axios.create(config);
    instance.interceptors.response.use(addSuccess);

    if (this.configureInstance) {
      this.configureInstance(instance);
    }

    return instance;
  }
}
export const httpFactory = new HttpFactory();

export const configureHttp = (config, configureInstance) => {
  httpFactory.config = config;
  httpFactory.configureInstance = configureInstance;
};
