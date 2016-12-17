import axios from 'axios';

class HttpFactory {
  create() {
    return axios.create(this.config);
  }
}
export const httpFactory = new HttpFactory();

export const configureHttp = config => {
  httpFactory.config = config;
};
