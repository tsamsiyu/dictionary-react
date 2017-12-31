import axios from 'axios';
import { trim } from 'lodash';


class HttpService {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  buildUrl(url) {
    return this.baseUrl + '/' + trim(url, '/');
  }

  get(url, data) {
    return this.send(url, 'GET', data);
  }

  post(url, data) {
    return this.send(url, 'POST', data);
  }

  delete(url) {
    return this.send(url, 'DELETE');
  }

  put(url, data) {
    return this.send(url, 'PUT', data);
  }

  send(url, method, data = {}) {
    let params = {};
    url = this.buildUrl(url);
    if (method !== 'GET') {
      data._method = method;
      method = 'POST';
    } else {
      params = {...data};
      data = {};
    }

    return axios({
      url,
      method,
      data,
      params,
      headers: this.headers
    });
  }
}

export default HttpService;