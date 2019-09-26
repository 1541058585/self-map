import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import { asArray } from 'ol/color.js';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point.js';
import { getArea, getLength, getDistance } from 'ol/sphere.js';
import Overlay from 'ol/Overlay';

export default class DiffusionOverlay {
  constructor(opt0ptions) {
    this.circleCenter = opt0ptions.circleCenter;
    this.releaseDuration = opt0ptions.releaseDuration;
    this.EPSG3857 = 'EPSG:3857';
    this.EPSG4326 = 'EPSG:4326';
    this.map = opt0ptions.map;
    this.color = opt0ptions.color;
    this.data = opt0ptions.data;
    this.polygonLayer = [];
    this.source = new VectorSource({ wrapX: false });
    this.vectorLayer = null;
    this.polygonData = [];
    this.overlayPopupArray = [];
    this.init();
  }
  init() {
    this.vectorLayer = new VectorLayer({
      name: 'diffusion-vector-layer',
      style: function (feature) {
        return feature.get('style');
      },
      source: this.source,
      zIndex: 3
    })
    this.map.addLayer(this.vectorLayer);
  }
  updateDiffusion(data) {
    this.data = data;
    this.createDiffusion();
  }
  createDiffusion() {
    this.clearModel();
    let num = 0;
    if (this.data !== {}) {
      this.data.ImpactRegions.forEach((item) => {
        num++;
        let polygon = []
        if (item.length > 0) {
          item.forEach((item2) => {
            let transPoint = transform([item2.X, item2.Y], this.EPSG3857, this.EPSG4326);
            polygon.push(`${transPoint[0]}|${transPoint[1]}`);
          });
          polygon.push(polygon[0])
          let data = { id: `${num}`, name: `${num}` };
          if (num === 1) { // 橙色
            let reData = this._calculateRadius(this.data.SafeDistances[0]);
            let polygonCircle = this.drawCircle(this.circleCenter, reData.distance, this.color[0]);
            let lastCoordinate = polygonCircle.getGeometry().getLastCoordinate();
            let extent = polygonCircle.getGeometry().getExtent();
            this.map.getView().fit(extent, this.map.getSize());
            let html = this.getPopupHtml({
              title: '需要防护的区域',
              time: this.data.Time === 'SteadyState' ? this.releaseDuration : this.data.Time,
              radius: (this.data.SafeDistances[0] * 0.001).toFixed(2)
            });
            let overlay = this._createMarkerPopup({
              id: 1,
              longitude: lastCoordinate[0],
              latitude: lastCoordinate[1]
            }, html, [-10, -100], this.color[0]);
            this.overlayPopupArray.push(overlay);
            this.polygonData.push(polygon);
            this.showSinglePolygon(data, polygon.toString(), 2, this.color[0], 0.8);
          }
          if (num === 2) { // 红色
            let reData = this._calculateRadius(this.data.SafeDistances[1]);
            let polygonCircle = this.drawCircle(this.circleCenter, reData.distance, this.color[1]);
            let html = this.getPopupHtml({
              title: '危险区域',
              time: this.data.Time === 'SteadyState' ? this.releaseDuration : this.data.Time,
              radius: (this.data.SafeDistances[1] * 0.001).toFixed(2)
            });
            let overlay = this._createMarkerPopup({
              id: 1,
              longitude: reData.endStartPoint[0],
              latitude: reData.endStartPoint[1]
            }, html, [-10, -100], this.color[1]);
            this.overlayPopupArray.push(overlay);
            this.polygonData.push(polygon);
            this.showSinglePolygon(data, polygon.toString(), 1, this.color[1], 0.8);
          }
          if (num === 3) { // 绿色
            let reData = this._calculateRadius(this.data.SafeDistances[2]);
            this.drawCircle(this.circleCenter, reData.distance, this.color[2]);
            this.polygonData.push(polygon);
            this.showSinglePolygon(data, polygon.toString(), 3, this.color[2], 0.8);
          }
        }
      });
      // this.map.getLayers().array_.forEach((item) => {
      //   if (item.values_.name === 'diffusion-vector-layer') {
      //     console.log(item)
      //   }
      // });
    }
  }
  safeDistancesEnd(objectDistance) {
    this.clearModel();
    let safeDistances = objectDistance.SafeDistances;
    let time1 = objectDistance.Time1;
    let time2 = objectDistance.Time2;
    safeDistances.forEach((item, index) => {
      if (index === 0) { // 橙色
        let reData = this._calculateRadius(item);
        let polygonCircle = this.drawCircle(this.circleCenter, reData.distance, this.color[index]);
        let lastCoordinate = polygonCircle.getGeometry().getLastCoordinate();
        let extent = polygonCircle.getGeometry().getExtent();
        this.map.getView().fit(extent, this.map.getSize());
        let html = this.getPopupHtml({
          title: '需要防护的区域',
          time: time1 === 'SteadyState' ? this.releaseDuration : time1,
          radius: (item * 0.001).toFixed(2)
        });
        let overlay = this._createMarkerPopup({
          id: 1,
          longitude: lastCoordinate[0],
          latitude: lastCoordinate[1]
        }, html, [-10, -100], this.color[index]);
        this.overlayPopupArray.push(overlay);
      }
      if (index === 1) { // 红色
        let reData = this._calculateRadius(item);
        let polygonCircle = this.drawCircle(this.circleCenter, reData.distance, this.color[index]);
        let html = this.getPopupHtml({
          title: '危险区域',
          time: time2 === 'SteadyState' ? this.releaseDuration : time2,
          radius: (item * 0.001).toFixed(2)
        });
        let overlay = this._createMarkerPopup({
          id: 1,
          longitude: reData.endStartPoint[0],
          latitude: reData.endStartPoint[1]
        }, html, [-10, -100], this.color[index]);
        this.overlayPopupArray.push(overlay);
      }
    });
  }
  showSinglePolygon(data, polygon, zIndex, color, opacity) {
    let _points = this._transPoints(polygon);
    _points = [_points];
    let feature = new Feature({
      geometry: new Polygon(_points),
      name: data.name,
      zIndex: zIndex
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
          // text: feature.get('name'),
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
  _calculateRadius(safeDistances) {
    let startPoint = transform(this.circleCenter, this.EPSG4326, this.EPSG3857);
    let endX = startPoint[0] - safeDistances;
    let endPoint = [endX, startPoint[1]];
    let transStartPoint = transform([startPoint[0], startPoint[1]], this.EPSG3857, this.EPSG4326);
    let endStartPoint = transform([endPoint[0], endPoint[1]], this.EPSG3857, this.EPSG4326);
    let distance = 0.0;

    let dx = Math.pow(transStartPoint[0] - endStartPoint[0], 2);

    let dy = Math.pow(transStartPoint[1] - endStartPoint[1], 2);

    distance = Math.sqrt(dx + dy);

    return { distance: distance, transStartPoint: transStartPoint, endStartPoint: endStartPoint };
  };
  clearModel() {
    if (this.polygonLayer.length > 0) {
      this.polygonLayer.forEach((item) => {
        this.vectorLayer.getSource().removeFeature(item);
      });
      this.polygonLayer = [];
    }
    if (this.overlayPopupArray.length > 0) {
      this.overlayPopupArray.forEach((item) => {
        this.map.removeOverlay(item);
      });
      this.overlayPopupArray = [];
    }
  }
  getPopupHtml(data) {
    let colors = this.getColor(0);
    let content = `
                              <div class="marker-content">
                                   <div class="title">${data.title}</div>
                                   <div class="time">持续时间: ${data.time}min</div>
                                   <div class="radius">最大区域半径:${data.radius}km</div>
                               </div>
    `;
    return content;
  }
  getColor(num) {
    return this.color[num];
  }
  _createMarkerPopup(data, html, offset, color) {
    let olMarker = document.createElement('div');
    olMarker.id = `${data.id}`;
    olMarker.style.display = 'block';
    olMarker.style.position = 'absolute';
    olMarker.style.border = '1px solid #cccccc';
    olMarker.style.backgroundColor = `${color}`;
    olMarker.style.height = '80px';
    olMarker.style.width = '150px';
    olMarker.style.borderRadius = '15px 15px 15px 15px';
    olMarker.style.zIndex = '997';
    let coordinates = [data.longitude, data.latitude];
    let overlay = new Overlay({
      element: olMarker,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: offset
    });
    if (coordinates) {
      olMarker.innerHTML = html;
      overlay.setPosition(coordinates);
      overlay.data = data;
      this.map.addOverlay(overlay);
    }
    let markerContent = document.getElementById('marker-content');
    olMarker.onmouseover = (e) => {
      olMarker.style.zIndex = '998';
    }
    olMarker.onmouseleave = (e) => {
      olMarker.style.zIndex = '997';
    }
    return overlay;
  }
}
