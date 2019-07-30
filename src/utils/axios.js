import axios from 'axios';

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
};

// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders);

/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  timeout: 30000, // 请求超时时间
  withCredentials: true
});
// 是否携带cookie信息
service.defaults.withCredentials = true;

/**
 * request拦截器
 */
service.interceptors.request.use(config => {
  // 如果token存在，则请求携带token
  // config.headers['Authorization'] = `123456`;
  return config;
});

/**
* response拦截器
*/
service.interceptors.response.use(
  response => {
    return response
  }, () => {
    // 模拟axios的response
    return {
      data: {
        code: -999999999,
        msg: '系统异常，请联系管理员',
        data: null
      }
    }
  }
);

const api = function (url, method = 'get', param) {
  return new Promise((resolve, reject) => {
    service({
      method: method,
      url,
      data: param,
      params: param
    }).then(res => {
        resolve(res.data)
    }).catch(error => {
        reject(error)
    });
  });
};
const download = function (url, method = 'get', param) {
  if (method === 'get') {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        params: param,
        responseType: 'blob'
      }).then(res => {
          resolve(res);
      })
      .catch(error => {
          reject(error);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        data: param,
        responseType: 'blob'
      }).then(res => {
          resolve(res);
      }).catch(error => {
          reject(error);
      });
    });
  }
}

const excelUpload = (url, param, method = 'post') => {
  if (method === 'get') {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        params: param,
        responseType: 'blob'
      }).then(res => {
          resolve(res);
      }).catch(error => {
          reject(error);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        data: param,
        responseType: 'blob'
      }).then(res => {
          resolve(res);
      }).catch(error => {
          reject(error);
      });
    });
  }
};

export default {
  getAxios() {
    return service;
  },
  baseApi(url, method, param) {
    return api(url, method, param);
  },
  // get请求
  get(url, param) {
    return api(url, 'get', param);
  },
  // post请求
  post(url, param) {
    return api(url, 'post', param);
  },
  // patch请求
  patch(url, param) {
    return api(url, 'patch', param);
  },
  // put请求
  put(url, param) {
    return api(url, 'put', param);
  },
  // delete请求
  delete(url, param) {
    return api(url, 'delete', param);
  },
  download(url, param = {}) {
    return download(url, 'post', param)
  },
  downloadGet(url, param = {}) {
    return download(url, 'get', param)
  },
  excelUpload(url, params = {}) {
    return excelUpload(url, params)
  },
  service,
  configUrl: '/static/config-server.json'
};
