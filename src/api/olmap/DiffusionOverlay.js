import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import { asArray } from 'ol/color.js';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';

export default class DiffusionOverlay {
  constructor(opt0ptions) {
    this.map = opt0ptions.map;
    this.color = opt0ptions.color;
    this.data = opt0ptions.data;
    this.polygonLayer = [];
    this.initDiffusion();
  }
  initDiffusion() {
    console.log(this.data);
    let num = 0;
    if (this.data !== {}) {
      this.data.ImpactRegions.forEach((item) => {
        num++;
        let polygon = [];
        item.forEach((item2) => {
          let transPoint = transform([item2.X, item2.Y], 'EPSG:900913', 'EPSG:4326');
          polygon.push(`${transPoint[0]}|${transPoint[1]}`);
        });
        polygon.push(polygon[0])
        console.log(polygon.toString());
        let data = { id: '1', name: `${num}` };
        if (num === 1) {
          this.showSinglePolygon(data, polygon.toString(), 1, '#1fca04', 0.8);
        }
        if (num === 2) {
          this.showSinglePolygon(data, polygon.toString(), 2, '#fff72b', 0.8);
        }
        if (num === 3) {
          this.showSinglePolygon(data, polygon.toString(), 3, '#ff0834', 0.8);
        }
      })
    }
  }
  showSinglePolygon(data, polygon, zIndex, color, opacity) { // 方法重新
    let _points = this._transPoints(polygon);
    _points = [_points];
    let feature = new Feature({
      geometry: new Polygon(_points),
      name: data.name
    });
    feature.setId(data.id);
    let highAlpColor = asArray(color);
    highAlpColor = highAlpColor.slice();
    highAlpColor[3] = opacity;
    feature.set('style', this._createPolygonStyleSetColor(feature, highAlpColor));
    feature.data = data;
    let source = new VectorSource({
      features: [feature]
    });
    let layer = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source,
      zIndex: zIndex // 将按照Z-index然后按位置对层进行排序
    });
    this.map.addLayer(layer);
    this.polygonLayer.push(layer);
    return layer;
  }
  _createPolygonStyleSetColor(feature, color) {
    let styles = [
      new Style({
        fill: new Fill({
          color: color
        }),
        text: new Text({
          text: feature.get('name'),
          font: 'normal 16px 微软雅黑', // 字体样式
          fill: new Fill({ // 填充样式
            color: '#484848'
          })
        })
      })
    ];
    return styles;
  }
  /**
   *  解析面数据
   *  polygon: '89.373779|29.355726,90.972290|28.498793,91.796265|29.201918,90.483398|29.756727,89.769287|29.800673,89.373779|29.355726',
   * **/
  _transPoints(points) {
    let arr = points.split(',');
    let point = [];
    arr.forEach(item => {
      let newPoint = item.split('|');
      point.push(newPoint)
    });
    let _points = point.map(item => {
      item = [Number(item[0]), Number(item[1])]
      return item;
    });
    return _points;
  }
}
