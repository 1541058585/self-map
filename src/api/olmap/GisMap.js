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

    // let single = {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, longitude: `91.718333`, latitude: `29.630278`, value: 250};
    // let rdm = Math.floor(Math.random() * 7);
    // let markerByGif = this._createMarkerAnimationByGif(single, `/static/images/gif/${rdm}.gif`, [-5, -5], data => {
    //   let html = `
    //     <div class="popup-title-content">
    //       <div class="popup-title">
    //         <a id="popup-name" title="${data.name != null ? data.name : ''}"  class="popup-name">${data.name != null ? data.name : ''}</a>
    //         <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
    //       </div>
    //     </div>`;
    //   this._showPopup([data.longitude, data.latitude], html, [22, 10]);
    // });
    // this.animationOverlay.push(markerByGif);
    // // this.beforeDestroy();
    // data2.data.forEach((item) => {
    //     let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/${Math.floor(Math.random() * 7)}.gif`, [-5, -5], data => {
    //       let html = `
    //         <div class="popup-title-content">
    //           <div class="popup-title">
    //             <a id="popup-name" title="${data.name != null ? data.name : ''}"  class="popup-name">${data.name != null ? data.name : ''}</a>
    //             <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
    //           </div>
    //         </div>`;
    //       this._showPopup([data.longitude, data.latitude], html, [22, 10]);
    //     });
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
    // this._addLayerImageWMS('/geoServer/zvanlasa/wms', { 'LAYERS': 'zvanlasa:GARDEN_PLAN' }, 2, 6);
    // this._setZoom(13, [103.70, 30.38]); // 设置 中心点位 ----OlMap.js
    this.singleclickListener = (e) => {
      console.log(this.map.getLayers());
      let pixel = this.map.getEventPixel(e.originalEvent);
      let feature = this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        return feature;
      });
      if (feature) {
        let data = feature.data;
        let html = `
              <div class="popup-title-content">
                <div class="popup-title">
                  <a id="popup-name" title="${data.name != null ? data.name : ''}"  class="popup-name">${data.name != null ? data.name : ''}</a>
                  <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
                </div>
              </div>`;
        let coordinates = [data.longitude, data.latitude];
        this._showPopup(coordinates, html, [5, -20]);
      }
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
    this.beforeDestroy();
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
  createMapByMarkerPNG(single) {
    this.beforeDestroy();
    let marker = this._addIconMarkersByName(single, '', `/static/images/png/1.png`, this);
    this.markers.push(marker);
    this._setZoom(8, [single.longitude, single.latitude]);
    this.map.on('singleclick', this.singleclickListener);
  }
  createMapByManyMarkerPNG(data) {
    this.beforeDestroy(); // 清空点位信息
    data.forEach((item) => { // 创建多个marker 点
      let marker = this._addIconMarkersByName(item, '', `/static/images/png/${Math.floor(Math.random() * 3)}.png`, this);
      this.markers.push(marker);
    });
    let json = this._findMaxAndMinLngLat(data); // 得到最大最小经纬度计算 ----OlMap.js
    let lnglatJson = this._computeMapCenter(json); // 计算地图中心点 ----OlMap.js
    this._setZoom(5, [lnglatJson.longitude, lnglatJson.latitude]); // 设置 中心点位 ----OlMap.js
    this.map.on('singleclick', this.singleclickListener);
  }
  createMarkerByCssPNG(data) {
    this.beforeDestroy(); // 清空点位信息
    data.forEach((item) => {
      if (item.id === '1') {
        let marker = this._addIconMarkersByName(item, '', `/static/images/png/1.png`, this);
        this.markers.push(marker);
        let markera = this._createMarkerAnimation(item, 'css_red_animation_overlay', '<p></p>', [-5, -6]);
        this.animationOverlay.push(markera);
      }
      if (item.id === '2') {
        let marker = this._addIconMarkersByName(item, '', `/static/images/png/2.png`, this);
        this.markers.push(marker);
        let markera = this._createMarkerAnimation(item, 'css_yellow_animation_overlay', '<p></p>', [-5, -6]);
        this.animationOverlay.push(markera);
      }
      if (item.id === '3') {
        let marker = this._addIconMarkersByName(item, '', `/static/images/png/3.png`, this);
        this.markers.push(marker);
        let markera = this._createMarkerAnimation(item, 'css_green_animation_overlay', '<p></p>', [-5, -6]);
        this.animationOverlay.push(markera);
      }
    })
    let json = this._findMaxAndMinLngLat(data); // 得到最大最小经纬度计算 ----OlMap.js
    let lnglatJson = this._computeMapCenter(json); // 计算地图中心点 ----OlMap.js
    this._setZoom(5, [lnglatJson.longitude, lnglatJson.latitude]); // 设置 中心点位 ----OlMap.js
    this.map.on('singleclick', this.singleclickListener);
  }
  createMarkerByGif(data) {
    this.beforeDestroy(); // 清空点位信息
    data.forEach((item) => {
      if (item.id === '1') {
        let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/1.gif`, [-20, -20], data => {
          let html = `
              <div class="popup-title-content">
                <div class="popup-title">
                  <a id="popup-name" title="${data.name != null ? data.name : ''}"  class="popup-name">${data.name != null ? data.name : ''}</a>
                  <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
                </div>
              </div>`;
          this._showPopup([data.longitude, data.latitude], html, [6, 0]);
        });
        this.animationOverlay.push(markerByGif);
      }
      if (item.id === '2') {
        let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/2.gif`, [-20, -20], data => {
          let html = `
              <div class="popup-title-content">
                <div class="popup-title">
                  <a id="popup-name" title="${data.name != null ? data.name : ''}"  class="popup-name">${data.name != null ? data.name : ''}</a>
                  <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
                </div>
              </div>`;
          this._showPopup([data.longitude, data.latitude], html, [6, 0]);
        });
        this.animationOverlay.push(markerByGif);
      }
      if (item.id === '3') {
        let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/3.gif`, [-20, -20], data => {
          let html = `
              <div class="popup-title-content">
                <div class="popup-title">
                  <a id="popup-name" title="${data.name != null ? data.name : ''}"  class="popup-name">${data.name != null ? data.name : ''}</a>
                  <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
                </div>
              </div>`;
          this._showPopup([data.longitude, data.latitude], html, [6, 0]);
        });
        this.animationOverlay.push(markerByGif);
      }
    });
    let json = this._findMaxAndMinLngLat(data); // 得到最大最小经纬度计算 ----OlMap.js
    let lnglatJson = this._computeMapCenter(json); // 计算地图中心点 ----OlMap.js
    this._setZoom(5, [lnglatJson.longitude, lnglatJson.latitude]); // 设置 中心点位 ----OlMap.js
  }
  addChinaAdmini() {
    this.beforeDestroy();
    this._addLayerImageWMS('/geoServer/mystyle/wms', { 'LAYERS': 'mystyle:ChinaAdmini' }, 2, 6);
    this._setZoom(5, this.center); // 设置 中心点位 ----OlMap.js
  }
  addHeatmapOverlay() {
    this.beforeDestroy();
    let data = [
      {id: `Enteripse@114`, name: `西藏天佑德青稞酒业有限责任公司`, longitude: `82.177735`, latitude: `32.731934`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@114`, name: `西藏天佑德青稞酒业有限责任公司`, longitude: `82.177735`, latitude: `32.731934`, value: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@82`, name: `医疗废物处理中心--热解焚化炉`, longitude: `81.435242`, latitude: `33.090305`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@107`, name: `西藏高争建材股份有限公司`, longitude: `82.954102`, latitude: `33.083496`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@124`, name: `阿里垃圾焚烧处理厂`, longitude: `81.210938`, latitude: `33.083496`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@109`, name: `西藏鑫茂矿业有限公司`, longitude: `81.503907`, latitude: `33.112793`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@122`, name: `阿里污水处理厂（一期）`, longitude: `81.679688`, latitude: `33.317871`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@123`, name: `西藏现代妇产医院有限公司`, longitude: `82.236328`, latitude: `32.76123`, value: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@71`, name: `阿里地区污水处理厂（一期）`, longitude: `81.547852`, latitude: `33.507385`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@117`, name: `西藏藏医学院藏药有限公司`, longitude: `81.09375`, latitude: `33.024902`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@119`, name: `国网西藏电力有限公司羊八井地热发电公司`, longitude: `81.005859`, latitude: `33.083496`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@113`, name: `西藏高原之宝牦牛乳业股份有限公司`, longitude: `80.800782`, latitude: `33.273926`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@120`, name: `阿里污水处理厂（二期）`, longitude: `82.778321`, latitude: `32.717285`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@108`, name: `阿里康达机动车检测有限公司`, longitude: `81.313477`, latitude: `33.112793`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@112`, name: `尼木县铜业开发有限责任公司`, longitude: `81.503906`, latitude: `32.995605`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@125`, name: `西藏自治区危险废物处置中心`, longitude: `91.708985`, latitude: `30.27301`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@110`, name: `西藏华泰龙矿业开发有限公司`, longitude: `91.718333`, latitude: `29.630278`, value: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@84`, name: `民用航空阿里站`, longitude: `83.521729`, latitude: `32.583389`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@115`, name: `西藏天地绿色饮品发展有限公司`, longitude: `81.240235`, latitude: `33.054199`, value: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@83`, name: `保康医疗废物处理有限公司--焚化炉`, longitude: `81.37207`, latitude: `33.185119`, value: Math.floor(Math.random() * 500)},
      {id: `Enteripse@105`, name: `西藏自治区移动通信有限责任公司(阿里分公司)`, longitude: `82.096252`, latitude: `33.233128`, value: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@85`, name: `狮泉河镇鑫源修理厂`, longitude: `84.384613`, latitude: `33.42997`, value: Math.floor(Math.random() * 120)},
      {id: `Enteripse@111`, name: `西藏墨竹工卡元泽选矿有限公司`, longitude: `81.401368`, latitude: `33.391113`, value: 120},
      {id: `Enteripse@121`, name: `阿里北控泷源水务有限公司`, longitude: `82.001953`, latitude: `33.010253`, value: 120},
      {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, longitude: `80.976563`, latitude: `32.995605`, value: 250}
    ]
    let json = this._findMaxAndMinLngLat(data); // 得到最大最小经纬度计算 ----OlMap.js
    let lnglatJson = this._computeMapCenter(json); // 计算地图中心点 ----OlMap.js
    this._setZoom(5, [lnglatJson.longitude, lnglatJson.latitude]); // 设置 中心点位 ----OlMap.js
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
      max: 300,
      min: 0,
      data: data
    };
    this.heatmapOverlay = new HeatmapOverlay({
      config: config,
      map: this.map
    });
    this.heatmapOverlay.setDataSet(data2);
    this.heatmapOverlay.toggle(false);
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
    if (this.wmsLayer.length > 0) {
      this.wmsLayer.forEach((item) => {
        this.map.removeLayer(item);
      });
      this.wmsLayer = [];
    }
    this.map.un('singleclick', this.singleclickListener);
  }
}
