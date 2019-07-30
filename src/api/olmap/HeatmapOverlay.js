
import Heatmap from 'heatmap.js'
import { DomUtil } from '@/utils/dom-util.js'
import Point from 'ol/geom/Point.js';
import { getBottomLeft, getBottomRight } from 'ol/extent.js';
import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Circle as CircleStyle, Fill, Style } from 'ol/style.js';

/**
 * AUTHOR：CYQ
 * TIME: 2019-07-25
 * DESCRIBE:
 *  let config = {
      radius: 0.5,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      visible: true,
      latField: 'latitude',
      lngField: 'longitude',
      valueField: 'value'
    };
 let data2 = {
      max: 500,
      min: 100,
      data: data
    };
 this.heatmapOverlay = new HeatmapOverlay({
      config: config,
      map: this.map
    });
 this.heatmapOverlay.setDataSet(data2);
 // this.heatmapOverlay.toggle(true); // true 关闭
 this.heatmapOverlay.toggle(false);
 this.heatmapOverlay.onRemove();//完全释放对象，并释放内存
 * **/
export default class HeatmapOverlay {
  constructor(opt0ptions) {
    const options = opt0ptions !== {} ? opt0ptions : {};
    this.conf = options.config;
    this._map = options.map;
    this.listener = 'pointermove'; // 'moveend' ||'pointermove' 一个消耗性能低一个消耗性能严重。
    this.el = DomUtil.create('div', 'canvas-zoom-map');
    this.heatmap = null;
    this.moveendListener = null;
    this.onAdd();
    this.latlngs = [];
    this.WFSVectorSource = null;
  }
  onAdd() {
    this.el.style.top = 0;
    this.el.style.left = 0;
    this.el.style.border = 0;
    // this.el.style.backgroundColor = 'red';
    // this.el.style.opacity = '0.3';
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
    this._map.on(this.listener, this.moveendListener);
    this._map.getView().on('change:resolution', this.moveendListener);
    this._div = this.el;
  }
  setDataSet(data) {
    this.WFSVectorSource = new VectorSource();
    this.WFSVectorLayer = new VectorLayer({
      source: this.WFSVectorSource,
      zIndex: 1
    });
    this._map.addLayer(this.WFSVectorLayer);
    if (this.conf.visible) {
      data.data.forEach((item) => {
        let feature = new Feature({
          geometry: new Point([item.longitude, item.latitude]),
          value: item.value
        });
        feature.setStyle(new Style({
          image: new CircleStyle({
            radius: 0,
            fill: new Fill({ color: `#00F` })
          })
        }));
        this.WFSVectorSource.addFeature(feature);
      });
    }
    this._max = data.max || this._max; // 权重最大值
    this._min = data.min || this._min; // 权重最小值
    let latField = this.conf.latField || 'lat'; // 经度
    let lngField = this.conf.lngField || 'lng'; // 纬度
    let valueField = this.conf.valueField || 'count'; // 值

    if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
      return false;
    }
    // let currentBounds = (this._map.getView().calculateExtent());
    // console.log(currentBounds);
    // let mapExtent = this._map.getView().calculateExtent(this._map.getSize());
    // console.log(mapExtent);
    // let point = transform([getCenter(mapExtent)[0], getCenter(mapExtent)[1]], 'EPSG:3857', 'EPSG:4326');
    // console.log(point);

    let d = data.data;
    let dlen = d.length; // 数据和数据长度

    this.latlngs = [];
    this.heatmap.removeData(); // 移除heatmap里面的数据

    while (dlen--) { // 处理数据
      let entry = d[dlen]; // 单个对象
      let latlng = [entry[this.conf.lngField], entry[this.conf.latField]];
      this.latlngs.push({ latlng: latlng, count: entry.value }); // 提供给heatmap使用
    }
  }
  /**
   *  @private
   * */
  _reset() {
    if (this._map !== undefined) {
      let size = this._map.getSize();
      this.el.style.width = `${size[0]}px`;
      this.el.style.height = `${size[1]}px`;
      this.heatmap._renderer.setDimensions(size[0], size[1]);
      if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
        return false;
      }
      if (this.conf.visible) {
        this.draw(); // 绘制
      }
    }
  }
  /**
   * @更新位置
   * @private
   */
  _update() {
      let bounds, zoom, scale;
      let generatedData = { max: this._max, min: this._min, data: [] };

      bounds = (this._map.getView().calculateExtent());
      zoom = (this._map.getView().getZoom());
      scale = Math.pow(2, zoom); // Math.pow(x,n)方法,表示x的n次幂
      if (this.heatmap) {
        this.heatmap.removeData(); // 移除heatmap里面的数据
      }
      let latLngPoints = []; // 新的数组对象
      let radiusMultiplier = this.conf.scaleRadius ? scale : 1; // 半径
      let localMax = 0;
      let localMin = 0;
      let len = this.latlngs.length;

      this.WFSVectorSource.forEachFeatureIntersectingExtent((this._map.getView().calculateExtent()), (feature) => {
        // console.log(feature);
        let coordinates = feature.getGeometry().getCoordinates();
        // console.log(coordinates);
        let pixel = this._map.getPixelFromCoordinate(coordinates);
        // console.log(pixel);
        let value = feature.get('value');
        localMax = Math.max(value, localMax); // 取最大，
        localMin = Math.min(value, localMin); // 取最小
        // console.log(localMax);
        // console.log(localMin);
        let latlngPoint = { x: Math.round(pixel[0]), y: Math.round(pixel[1]) };
        // console.log(this.conf.valueField);
        latlngPoint[this.conf.valueField] = value;

        let radius = feature.get('radius');
        if (radius) {
          radius = radius * radiusMultiplier / 2;
        } else {
          radius = (this.conf.radius || 2) * radiusMultiplier / 2;
        }
        // console.log(radius);
        latlngPoint.radius = radius;
        latLngPoints.push(latlngPoint);
      });

      if (this.conf.useLocalExtrema) {
        generatedData.max = this._max;
        generatedData.min = this._min;
      } else {
        generatedData.max = localMax;
        generatedData.min = localMin;
      }
      generatedData.data = latLngPoints;

      this.heatmap.setData(generatedData);
  }
  /**
   *  @操作地图的时候绘制
   *  @private
   * */
  draw() {
    if (!this._map) { return; }

    if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
      return false;
    }
    // let currentBounds = (this._map.getView().calculateExtent(this._map.getSize()));
    // this.bounds = currentBounds;
    // let ne = this._map.getPixelFromCoordinate(getBottomLeft(currentBounds));
    // let sw = this._map.getPixelFromCoordinate(getBottomRight(currentBounds));
    this._update();
  }
  /**
   * @移除叠加物，释放覆盖物对象所占用的内存。
   * @private
   * */
  onRemove() {
    document.querySelector('.ol-viewport').removeChild(this._div);
    this._map.un(this.listener, this.moveendListener);
    this._map.getView().un('change:resolution', this.moveendListener);
    this.heatmap = null;
    this.moveendListener = null;
    this.latlngs = [];
    this.WFSVectorSource = null;
  }
  /**
   * @更改热力图的展现或者关闭
   * @private
   */
  toggle(falg) {
    if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
      return;
    }
    if (this.conf.visible === falg) {
      this.conf.visible = false;
    } else {
      this.conf.visible = true;
    };
    if (this.conf.visible) {
      this.conf.container.style.display = 'block';
    } else {
      this.conf.container.style.display = 'none';
    }
    return this.conf.visible;
  }
  setOptions(options) {
    if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
      return;
    }

    for (let key in options) {
      if (key === 'radius') {
        this.heatmap._store._cfgRadius = options[key] * 2;
      }
      if (key === 'opacity') {
        options[key] = options[key] / 100;
      }
    }
    this.heatmap.configure(options);
    if (this.data) {
      this.setDataSet(this.data); // 重新渲染
    }
  }
  /**
   * 得到画布元素
   * */
  getElement() {
    return this.conf.container;
  }
  /**
   * 画布的样式
   * -ms-transform:rotate(7deg);
   *-moz-transform:rotate(7deg);
   *-webkit-transform:rotate(7deg);
   *-o-transform:rotate(7deg);
   *transform:rotate(7deg); //统一标识语句，符合w3c标准
   * */
  CSS_TRANSFORM() {
    let div = document.createElement('div');
    let props = [
      'transform',
      'WebkitTransform',
      'MozTransform',
      'OTransform',
      'msTransform'
    ];

    for (let i = 0; i < props.length; i++) {
      let prop = props[i];
      if (div.style[prop] !== undefined) {
        return prop;
      }
    }
    return props[0];
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
