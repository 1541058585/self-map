import Map from 'ol/Map.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Point from 'ol/geom/Point.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import { Cluster, BingMaps, OSM, Vector as VectorSource } from 'ol/source.js';
import Overlay from 'ol/Overlay';
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { defaults as defaultInteractions, DragAndDrop } from 'ol/interaction.js';
import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import Stamen from 'ol/source/Stamen.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import { getWidth, getTopLeft, getCenter as getExtentCenter } from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';
/*
 * AUTHOR：CYQ
 * DESCRIBE: 基类js 禁止修改，如需增加内容，请以继承的方式实现自身的业务逻辑，例如：class BusinessMap extends OlMap
 *  提示:如果非不得已，需要修改基类的方法，请在修改前请，查询你要修改的方法，在系统其它地方是否在使用，并保证相关使用的正常。
 *  基类只提供方法，不实现业务
 *  _方法名()  : 类的私有方法，外部禁止直接调用，可以以继承的方式调用
 *  versions: 1.1
 *  版本纪要 : 1.0 升级到1.1
 *  版本差异：新增系统类型，新增自适应区域（可以使用自定义默认地图范围），当前版本支持的地图有:1.默认天地图，2.四川天地图，3.西藏天地图，4.高德地图
 */
export default class OlMap {
  /**
   *  配置：systemType：系统类型(区分不同系统之间地图功能的差异性，开放和提供给实现类使用)
   *  target：id
   *  tmapkey: key,
   *  center: 中心点
   *  zoom: 地图初始化等级
   *  minZoom: 地图可以缩小的等级
   *  fitExtent： 地图使用范围
   *  layerType: 叠加不同底图  底图类型 列如：'', 'TianDiTu_sichuan' . 'TianDiTu_xizang', 'GaoDeDiTu'，‘BaiDuDiTu’，
   *  projection：坐标系
   * */
  constructor(systemType, target, tmapkey, center, zoom, minZoom, fitExtent, layerType, projection) {
    if (systemType) { // 系统类型
      this.$type = systemType;
    } else {
      this.$type = '';
    }
    if (fitExtent) { // 自适应区域
      this.$fitExtent = fitExtent
    } else {
      this.$fitExtent = [-180.0, -90.0, 180.0, 90.0] // 默认范围;
    }
    this.$extentFlag = false; // 默认不限制地图可视化范围
    if (target) { this.target = target } else { this.target = 'ol-map' }
    if (tmapkey) { this.T_MAP_KEY = tmapkey; } else { this.T_MAP_KEY = null; }
    if (center) { this.center = center } else { this.center = [104.08, 30.67] } // 中心点
    if (zoom) { this.zoom = zoom } else { this.zoom = 8 }
    if (projection) { this.projection = projection } else { this.projection = 'EPSG:4326' }
    this.layers = [
      { name: '平面地图', id: 'vec_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
      { name: '遥感影像', id: 'img_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
      { name: '地形地图', id: 'ter_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
      { name: '三维', id: 'sw_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 0 }
    ];
    this.loading = {
      text: '正在初始化地图.....',
      flag: false
    };
    if (minZoom) {
      this.minZoom = minZoom;
    } else {
      this.minZoom = 8;
    }
    this.maxZoom = 18;
    this.map = null;
    this.tileLayerMap = null; // 底图
    this.tileLayerCnName = null;// 对应底图的文字
    if (layerType) {
      this.layerType = layerType;
    } else {
      this.layerType = ''; // 底图类型 列如：'', 'TianDiTu_sichuan' . 'TianDiTu_xizang', 'GaoDeDiTu'，‘BaiDuDiTu’
    }
    this.toolBox = true; // 工具栏
    this.doubleClickZoom = new DoubleClickZoom();
    this.mouseWheelZoom = new MouseWheelZoom();
    this.overlayPopup = null;
    this.source = new VectorSource({ wrapX: false });
    this.MarkerVectorLayer = null; // 所有的的marker 的点位使用同一个对象，避免地图重复的增加对象，减轻内存消耗
    this.polygonLayer = [] // 面的Feature
    this.lineLayer = [] // 线的Feature
    this.mouseOverPopupFlag = false; // 鼠标移入弹窗的状态
    /**
     * @private
     * @type {wmsLayer}
     */
    this.wmsLayer = [];
    /**
     * @private
     * @type {HeatmapLayer}
     */
    this.HeatmapLayer = null;
  };
  /**
   * @private
   * 创建地图
   */
  _createMap() {
    let dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [
        GPX,
        GeoJSON,
        IGC,
        KML,
        TopoJSON
      ]
    });
    let doubleClickZoom = this.doubleClickZoom;
    let mouseWheelZoom = this.mouseWheelZoom;
    let view = null;
    if (this.$extentFlag) {
      view = new View({
        extent: this.$fitExtent, // 限制地图可视化范围
        projection: this.projection,
        center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      });
    } else {
      view = new View({
        projection: this.projection,
        center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      });
    }
    this.map = new Map({
      interactions: defaultInteractions({
        doubleClickZoom: false,
        mouseWheelZoom: false
      }).extend([ dragAndDropInteraction ]),
      target: this.target,
      layers: [],
      view: view
    });
    this._addTileLayer();
    this._addInteraction();
    this.map.getView().fit(this.$fitExtent, this.map.getSize());// 自适应区域
    this.MarkerVectorLayer = new VectorLayer({
      name: 'marker-vector-layer',
      style: function (feature) {
        return feature.get('style');
      },
      source: this.source,
      zIndex: 2 // 将按照Z-index然后按位置对层进行排序
    })
    this.map.addLayer(this.MarkerVectorLayer);
    window.addEventListener('resize', () => {
      let view = this.map.getView();
      view.setMinZoom(this.minZoom);
      setTimeout(() => {
        this.map.updateSize();
      }, 1000);
    });
    this._setZoom(this.zoom, this.center);
    this.map.updateSize();
  }
  /**
   * @private
   * 添加事件
   **/
  _addInteraction() {
    this.map.addInteraction(this.doubleClickZoom);
    this.map.addInteraction(this.mouseWheelZoom);
    this.mouseOverPopupFlag = true;
  }
  /**
   * @private
   * 移除事件
   **/
  _removeInteraction() {
    this.map.removeInteraction(this.doubleClickZoom);
    this.map.removeInteraction(this.mouseWheelZoom);
    this.mouseOverPopupFlag = false;
  }
  /**
   * @private
   * 创建地图图标样式，openlayers 不支持gif 需要以其它的方式实现
   **/
  _createStyle(src, img, name) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.95], // 控制标注图片和文字之间的距离
        opacity: 0.75, // 透明度
        crossOrigin: 'anonymous', // 已crossOrigin加载图像的属性。请注意，crossOrigin如果使用WebGL渲染器或者要使用Canvas渲染器访问像素数据，则必须提供 值。有关更多详细信息，请参阅https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image。
        src: src, // 图像源URI。
        offset: [0, 0]
      }),
      text: new Text({
        textAlign: 'center', // 对齐方式
        textBaseline: 'middle', // 文本基线
        offsetX: 0, // x偏移量
        offsetY: -18, // Y偏移量
        font: 'normal 12px 微软雅黑', // 字体样式
        text: name, // 文本内容
        fill: new Fill({ // 填充样式
          color: '#ffffff'
        })
      })
    })
  };
  /**
   * @private
   * 添加带图标的marker点
   **/
  _addIconMarkers(data, icon, _this) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: data.name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createStyle(icon, undefined, ''));
    } else {
      iconFeature.set('style');
    }
    iconFeature.setId(data.id);
    iconFeature.data = data;
    this.MarkerVectorLayer.getSource().addFeature(iconFeature);
    return iconFeature;
  };
  /**
   * @private
   * 添加带图标，带文字的maerker
   **/
  _addIconMarkersByName(data, name, icon, _this) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createStyle(icon, undefined, name));
    } else {
      iconFeature.set('style');
    }
    iconFeature.setId(data.id);
    iconFeature.data = data;
    this.MarkerVectorLayer.getSource().addFeature(iconFeature);
    return iconFeature;
  };
  /**
   * @private
   * 创建地图带样式的动画效果，className:样式名称
   **/
  _createMarkerAnimation(data, className, html, offset) {
    let olMarker = document.createElement('div');
    olMarker.id = `${data.id}`;
    olMarker.style.width = '10px';
    olMarker.style.height = '10px';
    olMarker.className = className;
    let coordinates = [data.longitude, data.latitude];
    let overlay = new Overlay({
      className: className,
      element: olMarker,
      positioning: 'animation-overlay',
      stopEvent: false,
      offset: offset,
      zIndex: 1
    });
    if (coordinates) {
      olMarker.innerHTML = html;
      overlay.setPosition(coordinates);
      overlay.data = data;
      this.map.addOverlay(overlay);
      this.map.updateSize();
    }
    return overlay;
  }
  /**
   * @private
   * 创建大图标样式
   **/
  _createBigStyle(src, img, name) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.95], // 控制标注图片和文字之间的距离
        opacity: 1, // 透明度
        crossOrigin: 'anonymous', // 已crossOrigin加载图像的属性。请注意，crossOrigin如果使用WebGL渲染器或者要使用Canvas渲染器访问像素数据，则必须提供 值。有关更多详细信息，请参阅https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image。
        src: src, // 图像源URI。
        offset: [0, 0]
      }),
      text: new Text({
        textAlign: 'center', // 对齐方式
        textBaseline: 'middle', // 文本基线
        offsetX: 0, // x偏移量
        offsetY: -22, // Y偏移量
        font: 'normal 16px 微软雅黑', // 字体样式
        text: name, // 文本内容
        fill: new Fill({ // 填充样式
          color: '#ffffff'
        })
      })

    });
  };
  /**
   * @private
   * 创建大图标marker
   **/
  _addBigIconMarkers(data, name, icon) {
    let iconFeature = new Feature({
      geometry: new Point([data.longitude, data.latitude]),
      name: name,
      population: 4000,
      rainfall: 500
    });
    if (icon) {
      iconFeature.set('style', this._createBigStyle(icon, undefined, name));
    } else {
      iconFeature.set('style');
    }
    iconFeature.data = data;
    let source = new VectorSource({ features: [iconFeature] });
    let marker = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source
    });
    marker.setZIndex(1);
    this.map.addLayer(marker);
    return marker;
  };
  /**
   * @private
   * 添加地图事件
   **/
  _registerEvent(_this, _event, callback) {
    if (callback) {
      _this.map.on(_event, (e) => {
        callback(e);
      });
    }
  };
  _registerClickEvent(_this, callback) {
    if (callback) {
      _this.map.on('click', (e) => {
        callback(e);
      });
    }
  };
  _registerDblclickEvent(_this, callback) {
    if (callback) {
      _this.map.on('dblclick', (e) => {
        callback(e);
      });
    }
  };
  _setInputValue(id, value) {
    document.getElementById(id).value = value.toFixed(6);
  };
  _setCenter(data) {
    let view = this.map.getView();
    view.setCenter([data.longitude, data.latitude]);
  };
  _setZoom(zoom, center) {
    let view = this.map.getView();
    // 为视图设置动画。可以为视图的中心，缩放（或分辨率）和旋转设置动画，以便在视图状态之间平滑过渡。例如，要将视图设置为新的缩放级别：
    view.animate({ zoom: zoom }, { center: center });
  }
  /**
   * @private
   * 开启地图弹窗
   **/
  _showPopup(coordinates, html, offset) {
    let container = document.getElementById('popup');
    if (container) {
      container.style.display = 'block';
      let content = document.getElementById('popup-content');
      this.overlayPopup = new Overlay({
        element: container,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: offset
      });
      // console.log(coordinates)
      if (coordinates) {
        content.innerHTML = html;
        this.overlayPopup.setPosition(coordinates);
        this.map.addOverlay(this.overlayPopup);
      }
      let closer = document.getElementById('popup-closer');
      if (closer) {
        closer.onclick = () => {
          this.overlayPopup.setPosition(undefined);
          closer.blur();
          // let view = this.map.getView();
          // view.setCenter(this.center);
          // view.setZoom(this.zoom);
          // return false;
        };
      }
      if (container) {
        container.onmouseenter = () => {
          this._removeInteraction();
        }
        container.onmouseleave = () => {
          this._addInteraction();
        }
      }
    }
  };
  /**
   * @private
   * 关闭地图弹窗
   **/
  _hidePopup() {
    let closer = document.getElementById('popup-closer');
    if (closer) {
      let container = document.getElementById('popup');
      container.style.display = 'none';
    }
  };
  /**
   * 得到最大最小经纬度
   * */
  _findMaxAndMinLngLat(dataArray) {
    let maxLng = dataArray[0].longitude;
    let minLng = dataArray[0].longitude;
    let maxLat = dataArray[0].latitude;
    let minLat = dataArray[0].latitude;
    dataArray.forEach((i, res) => {
      if (res.longitude > maxLng) maxLng = res.longitude;
      if (res.longitude < minLng) minLng = res.longitude;
      if (res.latitude > maxLat) maxLat = res.latitude;
      if (res.latitude < minLat) minLat = res.latitude;
    });
    return { maxLng: maxLng, minLng: minLng, maxLat: maxLat, minLat: minLat };
  };
  /**
   * 计算地图中心点
   * */
  _computeMapCenter(json) {
    // let longitude = (parseFloat(json.maxLng) + parseFloat(json.minLng)) / 2;
    // let latitude = (parseFloat(json.maxLat) + parseFloat(json.minLat)) / 2;
    return { longitude: this.center[0], latitude: this.center[1] };
  };
  /**
   *  解析面数据，线数据
   *  polygon: '89.373779|29.355726,90.972290|28.498793,91.796265|29.201918,90.483398|29.756727,89.769287|29.800673,89.373779|29.355726',
   *  LineString: '88.373779|28.355726,91.972290|28.498793,90.796265|29.201918,92.483398|29.756727'
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
  /*
  * 展示面
  * **/
  _showSinglePolygon(data, polygon) {
    let _points = this._transPoints(polygon);
    _points = [_points];
    let feature = new Feature({
      geometry: new Polygon(_points),
      name: data.name
    });
    feature.setId(data.id);
    feature.set('style', this._createPolygonStyle(feature));
    feature.data = data;
    let source = new VectorSource({
      features: [feature]
    });
    let layer = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source,
      zIndex: 1 // 将按照Z-index然后按位置对层进行排序
    });
    this.map.addLayer(layer);
    this.polygonLayer.push(layer);
    return layer;
  }
  _createPolygonStyle(feature) {
    let styles = [
      new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.2)'
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
  /*
 * 展示线
 * **/
  _showPolyLineString(data, LineStr) {
    let _points = this._transPoints(LineStr)
    let feature = new Feature({ // 线
      geometry: new LineString(_points),
      name: data.name
    });
    feature.setId(data.id);
    feature.set('style', this._createPolyLineStyle(feature));
    feature.data = data;
    let source = new VectorSource({
      features: [feature]
    });
    let vector = new VectorLayer({
      style: function (feature) {
        return feature.get('style');
      },
      source: source,
      zIndex: 1 // 将按照Z-index然后按位置对层进行排序
    });
    // 将所有矢量图层添加进去
    this.map.addLayer(vector);
    this.lineLayer.push(vector);
    return vector;
  }
  _createPolyLineStyle(feature) {
    let styles = [
      new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        })
      })
    ]
    return styles;
  }
  _getTileUrl(type) {
    let rdm = Math.floor(Math.random() * 7)
    let code = this.map.getView().getProjection().getCode(); // 返回地图投影类型信息。例如：code = "EPSG:4326"。
    let codeType = code === 'EPSG:4326' ? 'w' : 'c'
    // let url = `http://t${rdm}.tianditu.gov.cn/DataServer?T=${type}_${codeType}&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`
    let url = `/olMap/DataServer?T=${type}_${codeType}&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`
    return url
  }
  _getTileUrlCnName(type) {
    let rdm = Math.floor(Math.random() * 7)
    let code = this.map.getView().getProjection().getCode(); // 返回地图投影类型信息。例如：code = "EPSG:4326"。
    let codeType = code === 'EPSG:4326' ? 'w' : 'c'
    // let url = `http://t${rdm}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`
    let url = `/olMap/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${this.T_MAP_KEY}`
    return url
  }
  switchMapLayers(type) { // 切换
    this.map.removeLayer(this.tileLayerMap);
    this.map.removeLayer(this.tileLayerCnName);
    if (this.layerType === 'xizang') { // 西藏
      let _vecURLs = '';
      let _cvaURLs = '';
      if (type === 'vec') {
        _vecURLs = `/olMap/${type}_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${type}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
        _cvaURLs = `/olMap/cva_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      }
      if (type === 'img') {
        _vecURLs = `/olMap/${type}_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${type}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
        _cvaURLs = `/olMap/cia_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      }
      if (type === 'ter') {
        _vecURLs = `/olMap/${type}_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${type}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
        _cvaURLs = `/olMap/cta_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      }
      this.tileLayerMap = this._addTileLayerWmts(_vecURLs, 'vec_c', 0);
      this.tileLayerCnName = this._addTileLayerWmts(_cvaURLs, 'cva_c', 1);
      this.map.addLayer(this.tileLayerMap);
      this.map.addLayer(this.tileLayerCnName);
    } else { // 默认
      this.tileLayerMap = new TileLayer({
        title: 'vec_c',
        source: new XYZ({
          url: this._getTileUrl(type)
        }),
        zIndex: 0
      });
      this.tileLayerCnName = new TileLayer({
        title: 'cva_c',
        source: new XYZ({
          url: this._getTileUrlCnName(type)
        }),
        zIndex: 1
      });
      this.map.addLayer(this.tileLayerCnName);
      this.map.addLayer(this.tileLayerMap);
      let layer = this.tileLayerMap;
      layer.getSource().refresh();
    }
  }
  _addTileLayer() {
    if (this.layerType === 'TianDiTu_xizang') { // 西藏  // olMap === http://211.92.244.108:81
      let _vecURLs = `/olMap/vec_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      let _cvaURLs = `/olMap/cva_c/wmts?"+"SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&`;
      this.tileLayerMap = this._addTileLayerWmts(_vecURLs, 'vec_c', 0);
      this.tileLayerCnName = this._addTileLayerWmts(_cvaURLs, 'cva_c', 1);
      this.map.addLayer(this.tileLayerMap);
      this.map.addLayer(this.tileLayerCnName);
    } else if (this.layerType === 'TianDiTu_sichuan') { // olMap === http://www.scgis.net.cn
      let _vecURLs = `/olMap/imap/imapserver/defaultrest/services/sctilemap/WMTS`;
      this.tileLayerMap = this._addTileLayerWmts(_vecURLs, 'vec_c', 0);
      this.map.addLayer(this.tileLayerMap);
    } else if (this.layerType === 'GaoDeDiTu') { // 高德地图 olMap === http://webst0{1-4}.is.autonavi.com
      // 新版地址 http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7
      // 老版本地址 http://webst0{1-4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}
      let url = `/olMap/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8`;
      this.tileLayerMap = this._addUrlTileLayer(url, 0);
      this.map.addLayer(this.tileLayerMap);
    } else if (this.layerType === 'BaiDuDiTu') { // 百度地图
      let url = `http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8`;
      this.tileLayerMap = this._addUrlTileLayer(url, 0);
      this.map.addLayer(this.tileLayerMap);
    } else { // 默认天地图 // olMap === http://t5.tianditu.gov.cn
      let number = Math.round(Math.random() * 7);
      this.tileLayerMap = new TileLayer({
        title: 'vec_c',
        source: new XYZ({
          url: this._getTileUrl('vec')
        }),
        zIndex: 0
      });
      this.tileLayerCnName = new TileLayer({
        title: 'cva_c',
        source: new XYZ({
          url: this._getTileUrlCnName('vec')
        }),
        zIndex: 1
      });
      this.map.addLayer(this.tileLayerMap);
      this.map.addLayer(this.tileLayerCnName);
    }
  }
  _addUrlTileLayer(url, zIndex) {
    return new TileLayer({
      source: new XYZ({ url: url }),
      wrapX: false,
      zIndex: zIndex
    });
  }
  _addTileLayerWmts(url, name, zIndex) {
    let resolutions = new Array(20);
    let matrixIds = new Array(20);
    let projection = getProjection('EPSG:4326');
    let projectionExtent = projection.getExtent();
    let size = getWidth(projectionExtent) / 256;
    for (let z = 1; z < 20; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }
    return new TileLayer({
      title: name,
      source: new WMTS({
        url: url,
        layer: '0',
        matrixSet: 'EPSG:4326',
        format: 'image/png',
        projection: 'EPSG:4326',
        tileGrid: new WMTSTileGrid({
          tileSize: [256, 256],
          extent: [-180.0, -90.0, 180.0, 90.0], // 范围
          origin: [-180.0, 90.0],
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: 'default',
        wrapX: true
      }),
      zIndex: zIndex
    })
  }
  _addLayerImageWMS(url, params, zIndex, zoom) {
    let wmsSource = new ImageWMS({
      url: url,
      params: params
    });

    let wmsLayer = new ImageLayer({
      source: wmsSource,
      zIndex: zIndex
    });
    this.map.addLayer(wmsLayer);
    this.wmsLayer.push(wmsLayer);
    let view = this.map.getView();
    view.setZoom(zoom);
  }
  _returnNumber(zoom) {
    let num = 0;
    if (zoom === 8) {
      num = 1
    }
    if (zoom === 9) {
      num = 0.5
    }
    if (zoom === 10) {
      num = 0.25
    }
    if (zoom === 11) {
      num = 0.125
    }
    if (zoom === 12) {
      num = 0.0625
    }
    if (zoom === 13) {
      num = 0.03125
    }
    if (zoom === 14) {
      num = 0.0015625
    }
    if (zoom === 15) {
      num = 0.0078125
    }
    if (zoom === 16) {
      num = 0.0078125 / 2
    }
    return num;
  }
  _earthQuakesToHeatMap(heatData, radius, blur) {
    let features = [];
    heatData.forEach((item) => {
      let feature = new Feature({
        geometry: new Point([item.longitude, item.latitude]),
        id: item.id,
        name: item.name,
        value: item.value,
        weight: 1
      });
      feature.setProperties(item);
      features.push(feature);
    });
    let source = new VectorSource({
      features: features
    });
    this.HeatmapLayer = new HeatmapLayer({
      source: source,
      blur: blur,
      radius: radius,
      zIndex: 1,
      visible: true,
      shadow: 100000
    });
    this.map.addLayer(this.HeatmapLayer);
    let changeResolution = (e) => {
      let zoom = this.map.getView().getZoom();
      let Resolution = this.map.getView().getResolution();
      let Scale = 1 / Resolution * 72;
      let radius = Scale / 1000;
      let blur = Scale / 1000 * 2;
      if (this.HeatmapLayer) {
        this.HeatmapLayer.setRadius(Scale / 1000);
        this.HeatmapLayer.setBlur((Scale / 1000) * 2);
      }
    };
    this.map.getView().on('change:resolution', changeResolution);
    return changeResolution;
  };
  /**
   *  返回地图可视区域，以地理坐标表示
   * */
  _getBoundsCenter() {
    let mapExtent = this.map.getView().calculateExtent(this.map.getSize());
    let point = getExtentCenter(mapExtent);
    point = transform([point[0], point[1]], 'EPSG:3857', 'EPSG:4326');
    return point;
  }
  _setMinZoomAndMaxZoom(min, max) {
    let view = this.map.getView();
    view.setMinZoom(min);
    view.setMaxZoom(max);
  }
  _beforeDestroy() {
    if (this.wmsLayer.length > 0) {
      this.wmsLayer.forEach((item) => {
        this.map.removeLayer(item);
      });
      this.wmsLayer = [];
    }
    if (this.tileLayerMap) {
      this.map.removeLayer(this.tileLayerMap);
      this.tileLayerMap = null
    }
    if (this.tileLayerCnName) {
      this.map.removeLayer(this.tileLayerCnName);
      this.tileLayerCnName = null
    }
    if (this.overlayPopup) {
      this.map.removeOverlay(this.overlayPopup);
      this.overlayPopup = null;
    }
  }
}
