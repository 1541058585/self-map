import OlMap from './OlMap.js'
import { HeatmapOverlayExtend } from '@/api/tianditu-map/HeatmapOverlayExtend.js';
import HeatmapVectorLayer from './HeatmapVectorLayer.js'
import { Vector as VectorSource } from 'ol/source.js';
import { containsCoordinate, containsXY } from 'ol/extent.js'
import { intersectsCoordinate } from 'ol/geom/Geometry.js'
import { assign } from 'ol/obj.js';
import HeatmapOverlay from './HeatmapOverlay.js';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import AnimationOverlay from './AnimationOverlay.js';

import TestData from './TestData.js';

export default class GisMap extends OlMap {
  constructor(opt0ptions) {
    const options = opt0ptions !== {} ? opt0ptions : {};
    const baseOptions = assign({}, options);
    super(baseOptions);
    this.searchKey = '';
    this.minZoom = 6;
    this.zoom = 6
    this.heatmapOverlay = null;
    this.markers = [];
    this.animationOverlay = []; // 传统方式
    this.animationOverlayObject = null; // 对象的方式
  }
  initMap(layerType) {
    if (layerType !== null) {
      this.layerType = layerType;
    }
    this._createMap();

    let coor = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection: 'EPSG:4326',
      target: document.getElementById('coordinate')
    })
    this.map.addControl(coor);
    let config = {
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
      max: 260,
      min: 0,
      data: TestData.pointData
    };
    // 方法的差异性
    // data2.data.forEach((item) => {
    //       let marker = this._addIconMarkersVector(item, `/static/images/png/1.png`, this);
    //       this.markers.push(marker);
    //   });
    // data2.data.forEach((item) => {
    //   let marker = this._addIconMarkersVector(item, `/static/images/png/2.png`, this);
    //   this.markers.push(marker);
    // });
    // data2.data.forEach((item) => {
    //   let marker = this._addIconMarkersVector(item, `/static/images/png/3.png`, this);
    //   this.markers.push(marker);
    // });

    // data2.data.forEach((item) => {
    //           let marker = this._addIconMarkers(item, `/static/images/png/1.png`, this);
    //           this.markers.push(marker);
    //       });
    // data2.data.forEach((item) => {
    //       let marker = this._addIconMarkers(item, `/static/images/png/2.png`, this);
    //       this.markers.push(marker);
    //     });
    // data2.data.forEach((item) => {
    //   let marker = this._addIconMarkers(item, `/static/images/png/3.png`, this);
    //   this.markers.push(marker);
    // });
    // 方法重新
    // let single1111 = {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, longitude: `91.718333`, latitude: `29.630278`, value: 250};
    // let marker = this._addIconMarkersVector(single1111, `/static/images/png/3.png`, this);

    // this.heatmapOverlay = new HeatmapOverlay({
    //   config: config,
    //   map: this.map
    // });
    // this.heatmapOverlay.setDataSet(data2);
    // this.heatmapOverlay.toggle(true); // true 关闭
    // this.heatmapOverlay.toggle(true);

    // let single = {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, longitude: `91.718333`, latitude: `29.630278`, value: 250};
    // let marker = this._addIconMarkersByName(single, '', `/static/images/png/1.png`, this);
    // this.markers.push(marker);
    // let markera = this._createMarkerAnimation(single, 'css_red_animation_overlay', '<p></p>', [-5, -6]);
    // this.animationOverlay.push(markera);

    // let single2 = {id: `OtherPollutionInfo@85`, name: `狮泉河镇鑫源修理厂`, longitude: `84.384613`, latitude: `33.42997`, value: Math.floor(Math.random() * 120)};
    // let marker2 = this._addIconMarkersByName(single2, '', `/static/images/png/2.png`, this);
    // this.markers.push(marker2);
    // let markera2 = this._createMarkerAnimation(single2, 'css_yellow_animation_overlay', '<p></p>', [-5, -6]);
    // this.animationOverlay.push(markera2);

    // let single3 = {id: `Enteripse@121`, name: `阿里北控泷源水务有限公司`, longitude: `82.001953`, latitude: `33.010253`, value: 120};
    // let marker3 = this._addIconMarkersByName(single3, '', `/static/images/png/3.png`, this);
    // this.markers.push(marker3);
    // let markera3 = this._createMarkerAnimation(single3, 'css_green_animation_overlay', '<p></p>', [-5, -6]);
    // this.animationOverlay.push(markera3);

    // let rdm = Math.floor(Math.random() * 7);
    // let markerByGif = this._createMarkerAnimationByGif(single, `/static/images/gif/${rdm}.gif`, [-5, -5]);
    // this.animationOverlay.push(markerByGif);
    // // this.beforeDestroy();
    // data2.data.forEach((item) => {
    //     let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/${Math.floor(Math.random() * 7)}.gif`, [-5, -5]);
    //     this.animationOverlay.push(markerByGif);
    // });
    // this.beforeDestroy();
    // let options = {
    //   map: this.map,
    //   data: data
    // };
    // let animationOverlayObject = new AnimationOverlay(options);
    // animationOverlayObject.open();
    // animationOverlayObject.close();

    // this._addLayerImageWMS('/geoServer/mystyle/wms', { 'LAYERS': 'mystyle:ChinaAdmini' }, 2, 6);

    this.singleclickListener = (e) => {
      console.log(this.map.getLayers());
    };
    this.map.on('singleclick', this.singleclickListener);
  }
  // _addIconMarkersVector(data, icon, _this) {
  //   debugger
  // }
  setSearchKey(val) {
    this.searchKey = val;
  }
  getSearchKey() {
    return this.searchKey;
  }
  switchMap(layers) {
    if (this.tileLayerMap) {
      this.map.removeLayer(this.tileLayerMap);
      this.tileLayerMap = null
    }
    if (this.tileLayerCnName) {
      this.map.removeLayer(this.tileLayerCnName);
      this.tileLayerCnName = null
    }
    this.layerType = layers;
    this._addTileLayer();
    let view = this.map.getView();
    if (layers === 'TianDiTu_xizang') {
      view.setZoom(9);
    } else {
      view.setZoom(5);
    }
    this.map.updateSize();
  }
  beforeDestroy() {
    if (this.heatmapOverlay) {
      this.heatmapOverlay.toggleRemove();
      this.heatmapOverlay = null;
    }
    this.animationOverlay.forEach((item) => {
      this.map.removeOverlay(item);
    });
    this.animationOverlay = [];
    this.markers.forEach(item => {
      this.MarkerVectorLayer.getSource().getFeatures().forEach(item2 => {
        if (item2 === item) {
          this.MarkerVectorLayer.getSource().removeFeature(item);
        }
      });
    });
    this.markers = [];
    // this._beforeDestroy();
    this.map.un('singleclick', this.singleclickListener);
  }
}
