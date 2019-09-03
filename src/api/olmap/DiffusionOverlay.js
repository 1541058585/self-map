import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import { asArray } from 'ol/color.js';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point.js';

export default class DiffusionOverlay {
  constructor(opt0ptions) {
    this.map = opt0ptions.map;
    this.color = opt0ptions.color;
    this.data = opt0ptions.data;
    this.polygonLayer = [];
    this.vectorLayer = null;
    this.polygonData = [];
    this.init();
  }
  init() {
    let source = new VectorSource({ wrapX: false });
    this.vectorLayer = new VectorLayer({
      name: 'diffusion-vector-layer',
      style: function (feature) {
        return feature.get('style');
      },
      source: source,
      zIndex: 3
    })
    this.map.addLayer(this.vectorLayer);
  }
  createDiffusion() {
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
        // console.log(polygon.toString());
        let data = { id: `${num}`, name: `${num}` };
        if (num === 1) {
          this.polygonData.push(polygon);
          this.showSinglePolygon(data, polygon.toString(), 1, '#1fca04', 0.8);
          let point = polygon[0].split('|');
          let coordinates = [point[0], point[1]];
          let radius = Number(this.data.SafeDistances[0]) / 122518.7141796344;
          this.drawCircle(coordinates, radius, '#1fca04');
        }
        if (num === 2) {
          this.polygonData.push(polygon);
          this.showSinglePolygon(data, polygon.toString(), 2, '#fff72b', 0.8);
          let point = polygon[0].split('|');
          let coordinates = [point[0], point[1]];
          let radius = Number(this.data.SafeDistances[1]) / 122518.7141796344;
          this.drawCircle(coordinates, radius, '#fff72b');
        }
        if (num === 3) {
          this.polygonData.push(polygon);
          this.showSinglePolygon(data, polygon.toString(), 3, '#ff0834', 0.8);
          let point = polygon[0].split('|');
          let coordinates = [point[0], point[1]];
          let radius = Number(this.data.SafeDistances[2]) / 123518.7141796344;
          this.drawCircle(coordinates, radius, '#ff0834');
        }
      });
      console.log(this.polygonData[0][0]);
    }
  }
  showSinglePolygon(data, polygon, zIndex, color, opacity) {
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
    this.vectorLayer.getSource().addFeature(feature);
    this.polygonLayer.push(feature);
    return feature;
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
  drawCircle(coordinates, radius, color) {
    let center = [Number(coordinates[0]), Number(coordinates[1])];
    let circle = new Circle(center, radius);
    let feature = new Feature({
      geometry: circle,
      labelPoint: new Point(center)
    });
    feature.set('style', this._createCircleStyle(feature, color));
    this.vectorLayer.getSource().addFeature(feature);
    this.polygonLayer.push(feature);
    this.map.render();
    return feature;
  };
  _createCircleStyle(feature, color) {
    return new Style({
      stroke: new Stroke({
        color: color,
        width: 2
      })
    });
  }
}
