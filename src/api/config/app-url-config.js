import app from '@/utils/axios.js';
/**
 * ConfigServer中心的数据 配置有些默认的参数
 * */
export default class AppUrlConfig {
    static configServer() {
        let configObject = app.get(`${app.configUrl}`).then(res => {
            return res.AppConfig;
        });
        return configObject;
    }
    static get900913Json() {
      let configObject = app.get(`/static/900913.json`).then(res => {
        return res;
      });
      return configObject;
    }
}
