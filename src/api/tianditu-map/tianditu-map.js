import T from '@/api/tianditu-map/T.js';
/**
 * AUTHOR：CYQ
 * DESCRIBE: 基类js 禁止修改，如需增加内容，请以继承的方式实现自身的业务逻辑，例如：class BusinessMap extends TianDiTuMap
 *  提示:如果非不得已，需要修改基类的方法，请在修改前请，查询你要修改的方法，在系统其它地方是否在使用，并保证相关使用的正常。
 *  基类只提供方法，不实现业务
 *  _方法名()  : 类的私有方法，外部禁止直接调用，可以以继承的方式调用
 *  versions: 0.1
 *  ECMAScript 6 规则 Class 的基本语法
 *  备注信息: 天地图现目前没有找到 npm 引入api 的方式，依照之前的惯例在 index.html 引入。
 *  ` <script src="https://api.tianditu.gov.cn/api?v=4.0&tk=2ce94f67e58faa24beb7cb8a09780552" type="text/javascript"></script>`
 **/
export default class TianDiTuMap {
  constructor(target, defaultCenter, defaultZoom, defaultProjection) {
    /**
     * [地图对象]
     * @type {[type]}
     */
    this.map = null;

    /**
     * [地图DOM 节点ID]
     * @type {[type]}
     */
    this.target = target || 'tMap';

    /**
     * [地图初始中心点]
     * @type {Object}
     */
    this.center = defaultCenter || [104.08, 30.67];

    /**
     * [地图初始级别]
     * @type {Number}
     */
    this.zoom = defaultZoom || 11;

    /**
     * [地图初始投影]
     * @type {String}
     */
    this.projection = defaultProjection || 'EPSG:4326' || 'EPSG:900913';
  };
  _createMap() {
    // 初始化地图
    this.map = new T.Map(this.target, { projection: this.projection });
    // 设置中心点 和 层级
    this.map.centerAndZoom(new T.LngLat(this.center[0], this.center[1]), this.zoom);
    // 允许鼠标滚轮缩放地图  - disableScrollWheelZoom:禁止鼠标滚轮缩放地图
    this.map.enableScrollWheelZoom();
    // 禁止键盘操作地图
    this.map.disableKeyboard();
  };
}
