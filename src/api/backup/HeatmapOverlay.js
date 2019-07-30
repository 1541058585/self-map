
import Heatmap from 'heatmap.js'
import { DomUtil } from '@/utils/dom-util.js'
import Point from 'ol/geom/Point.js';
import { getCenter } from 'ol/extent.js';
import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import Feature from 'ol/Feature';

export default class HeatmapOverlay {
  constructor(opt0ptions) {
    const options = opt0ptions !== {} ? opt0ptions : {};
    this.conf = options.config;
    this._map = options.map;
    this.el = DomUtil.create('div', 'canvas-zoom-map');
    this.heatmap = null;
    this.moveendListener = null;
    this.onAdd();
    this.latlngs = [];
  }
  onAdd() {
    this.el.style.top = 0;
    this.el.style.left = 0;
    this.el.style.border = 0;
    this.el.style.backgroundColor = 'red';
    this.el.style.opacity = '0.3';
    this.el.style.width = `${this._map.getSize()[0]}px`;
    this.el.style.height = `${this._map.getSize()[1]}px`;

    this.conf.container = this.el; // 增加属性

    this.conf.valueField = this.conf.valueField || 'count';
    this.conf.latField = this.conf.latField || 'lat';
    this.conf.lngField = this.conf.lngField || 'lng';

    this.heatmap = Heatmap.create(this.conf);

    document.querySelector('.ol-viewport').appendChild(this.el);

    this.el.style.position = 'absolute';

    this.moveendListener = (e) => {
      this._reset();
    }
    this._map.on('moveend', this.moveendListener);

    this._div = this.el;
  }
  setDataSet(data) {
    this._max = data.max || this._max; // 权重最大值
    this._min = data.min || this._min; // 权重最小值
    let latField = this.conf.latField || 'lat'; // 经度
    let lngField = this.conf.lngField || 'lng'; // 纬度
    let valueField = this.conf.valueField || 'count'; // 值

    if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
      return false;
    }
    let currentBounds = (this._map.getView().calculateExtent());
    // console.log(currentBounds);
    let mapExtent = this._map.getView().calculateExtent(this._map.getSize());
    // console.log(mapExtent);
    // let point = transform([getCenter(mapExtent)[0], getCenter(mapExtent)[1]], 'EPSG:3857', 'EPSG:4326');
    // console.log(point);

    let d = data.data;
    let dlen = d.length; // 数据和数据长度

    this.latlngs = [];
    this.heatmap.removeData(); // 移除heatmap里面的数据

    while (dlen--) { // 处理数据
      let entry = d[dlen]; // 单个对象
      let pointLatLng = [entry[this.conf.lngField], entry[this.conf.latField]];
      this.latlngs.push({ latlng: pointLatLng, count: entry.count }); // 提供给heatmap使用

      // var point = this._getContainerPoint(latlng);// 处理成画布数据
    }
    console.log(this.latlngs)
    this._update();
  }
  _reset() {
    if (this._map !== undefined) {
      let size = this._map.getSize();
      this.el.style.width = `${size[0]}px`;
      this.el.style.height = `${size[1]}px`;
      this.heatmap._renderer.setDimensions(size[0], size[1]);
    }
  }
  _update() {
    let bounds, zoom, scale;
    let generatedData = { max: this._max, min: this._min, data: [] };

    bounds = (this._map.getView().calculateExtent());
    zoom = (this._map.getView().getZoom());
    scale = Math.pow(2, zoom); // Math.pow(x,n)方法,表示x的n次幂

    if (this.latlngs.length === 0) {
      if (this.heatmap) {
        this.heatmap.removeData(); // 移除heatmap里面的数据
      }
      return false;
    }

    let latLngPoints = []; // 新的数组对象
    let radiusMultiplier = this.conf.scaleRadius ? scale : 1; // 半径
    let localMax = 0;
    let localMin = 0;
    let len = this.latlngs.length;

    // -----更新视图，乘以半径
    // debugger
    while (len--) {
      let entry = this.latlngs[len];
      let value = entry[this.conf.valueField];
      let latlng = entry.latlng;

      // if (!bounds.contains(latlng)) {
      //   continue;
      // }
      localMax = Math.max(value, localMax); // 取最大，
      localMin = Math.min(value, localMin); // 取最小

      let point = this._map.getPixelFromCoordinate(latlng);
      // console.log(point);
    }
    let iconFeature = new Feature({
      geometry: new Point([80.976563, 32.995605])
    });
    console.log()
    let a = this._map.getPixelFromCoordinate(iconFeature);
    console.log(a);
  }
  /**
   * 移除叠加物，释放覆盖物对象所占用的内存。
   * */
  onRemove() {
    document.querySelector('.ol-viewport').removeChild(this._div);
    this._map.un('moveend', this.moveendListener)
  }
  /**
   * 判断是否支持Canvas.(H5画布元素)
   * 备注：Internet Explorer 8 以及更早的版本不支持 <canvas> 元素。
   * */
  isSupportCanvas() {
    let elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }
}
