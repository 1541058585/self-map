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
import { transform, transformExtent, get as getProjection } from 'ol/proj.js';
// 过 ol.color.asArray 将原来16进制的颜色值，改为 r,g,b,a的数组
import { asArray } from 'ol/color.js';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';

import TestData from './TestData.js';
import AppUrlConfig from '@/api/config/app-url-config.js';
import DiffusionOverlay from './DiffusionOverlay';
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
    // let a = [11580130.329479408, 3586333.0507255998];
    // let b = transform(a, 'EPSG:900913', 'EPSG:4326');
    // console.log(b);
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
    //     <div class=popup-title-content>
    //       <div class=popup-title>
    //         <a id=popup-name title=${data.name != null ? data.name : ''}  class=popup-name>${data.name != null ? data.name : ''}</a>
    //         <a href=# id=popup-closer class=ol-popup-closer closer></a>
    //       </div>
    //     </div>`;
    //   this._showPopup([data.longitude, data.latitude], html, [22, 10]);
    // });
    // this.animationOverlay.push(markerByGif);
    // // this.beforeDestroy();
    // data2.data.forEach((item) => {
    //     let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/${Math.floor(Math.random() * 7)}.gif`, [-5, -5], data => {
    //       let html = `
    //         <div class=popup-title-content>
    //           <div class=popup-title>
    //             <a id=popup-name title=${data.name != null ? data.name : ''}  class=popup-name>${data.name != null ? data.name : ''}</a>
    //             <a href=# id=popup-closer class=ol-popup-closer closer></a>
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
    // this.create900913();
    let polygon = '104.07678563593637|30.607900241501582,104.07819110028329|30.60570236345123,104.07971722020571|30.60360827970004,104.081303684393|30.601566096036535,104.08292914792368|30.599557432515667,104.08457512825241|30.59756639280384,104.08622515770178|30.595578797584253,104.08789662260024|30.593609602525376,104.0895863550653|30.591656103147756,104.09129266008017|30.58971683059761,104.09301434508502|30.58779074843703,104.09475039275962|30.58587700303866,104.0964884060644|30.58396491203831,104.09823653480446|30.582061491716104,104.09999747231964|30.580169050650625,104.10177121550835|30.578287608180162,104.10355712893313|30.57641660718639,104.10535590541076|30.574556634088694,104.10716697037248|30.572707216193493,104.10899010864568|30.570868158162355,104.11082045461723|30.569035271212215,104.11265842816437|30.56720890654205,104.11450763798244|30.565392193153244,104.11636980622717|30.56358660379705,104.11824326191905|30.561790689565555,104.12012936898053|30.560005646834867,104.1220280901926|30.5582314334749,104.12394031493507|30.55646881595291,104.12586561596446|30.5547174163017,104.12780586431253|30.552978867755883,104.12975831119867|30.55125079314402,104.13171973174873|30.54953041579863,104.13369635704915|30.547823102375972,104.1356903543332|30.54613069866393,104.13770180424213|30.54445331763489,104.13973418908168|30.542793937835313,104.14178829355316|30.54115323602575,104.14386711378869|30.539533793660326,104.14597261852008|30.537937307459487,104.14810957953746|30.536367888533036,104.15028203122897|30.534828991724623,104.15249468955622|30.533324723248228,104.1547556628406|30.53186204741897,104.15706804142498|30.530443628012975,104.1594350211061|30.52907221973871,104.16188658530427|30.527773651801255,104.16445204827265|30.526573178238138,104.16718735293162|30.52551899209881,104.17023335122212|30.52473240811686,104.17492537675287|30.53218432057662,104.17370156881333|30.5345403300673,104.17230791918315|30.536749997291466,104.17080037078281|30.538861515025246,104.16920823786539|30.540900137056582,104.16756150385125|30.542891691165153,104.1658633645371|30.544838932564247,104.16411691026582|30.5467445253649,104.1623302245461|30.548615454887894,104.16050807296496|30.55045578443456,104.15865446509781|30.552268990018973,104.15677417273484|30.554059182384776,104.15486916460779|30.555828058144627,104.15294243684882|30.55757819848654,104.1509947741592|30.55931028013015,104.14902963403203|30.56102730261179,104.14704714673394|30.562729336166214,104.14504945468545|30.56441824769314,104.14304278897306|30.56609940310929,104.14102392472263|30.56777002610768,104.13899010074712|30.569427750492807,104.13694321289107|30.571074187879887,104.13488282150462|30.5727089709914,104.13280981596758|30.574332866143735,104.13072414665457|30.57594584183758,104.12862720230076|30.577549072872998,104.12651729952033|30.579141121139358,104.12439614806257|30.580723469811957,104.1222673814356|30.582299226086874,104.12013140711028|30.58386875174959,104.11798335947344|30.58542785843329,104.11582301094623|30.586976361405803,104.11364981177249|30.588513766559146,104.11146444236266|30.590040670817416,104.10926625487295|30.591556527679572,104.10705527101449|30.593061334992342,104.10483417172075|30.59455741166971,104.1026111067968|30.596051773280166,104.10037366679678|30.597533748977355,104.09812085921314|30.599002463668597,104.09585147907968|30.60045689147377,104.09356381897327|30.601895574091046,104.0912547358241|30.603315785584144,104.08894160355429|30.604732491177643,104.08660794828326|30.606131517500046,104.08423529987206|30.60749695784496,104.08180230099275|30.608810442833217,104.07924865274114|30.61002006748153,104.07678563593637|30.607900241501582';
    let data = { id: '1', name: '面的名字' }
    // this._showSinglePolygon(data, polygon);
    this.singleclickListener = (e) => {
      // console.log(this.map.getLayers());
      let pixel = this.map.getEventPixel(e.originalEvent);
      let feature = this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        return feature;
      });
      console.log(e.coordinate);
      let transPoint = transform(e.coordinate, 'EPSG:4326', 'EPSG:900913');
      console.log(transPoint);
      if (feature) {
        let data = feature.data;
        let html = `
              <div class=popup-title-content>
                <div class=popup-title>
                  <a id=popup-name title=${data.name != null ? data.name : ''}  class=popup-name>${data.name != null ? data.name : ''}</a>
                  <a href=# id=popup-closer class=ol-popup-closer closer></a>
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
              <div class=popup-title-content>
                <div class=popup-title>
                  <a id=popup-name title=${data.name != null ? data.name : ''}  class=popup-name>${data.name != null ? data.name : ''}</a>
                  <a href=# id=popup-closer class=ol-popup-closer closer></a>
                </div>
              </div>`;
          this._showPopup([data.longitude, data.latitude], html, [6, 0]);
        });
        this.animationOverlay.push(markerByGif);
      }
      if (item.id === '2') {
        let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/2.gif`, [-20, -20], data => {
          let html = `
              <div class=popup-title-content>
                <div class=popup-title>
                  <a id=popup-name title=${data.name != null ? data.name : ''}  class=popup-name>${data.name != null ? data.name : ''}</a>
                  <a href=# id=popup-closer class=ol-popup-closer closer></a>
                </div>
              </div>`;
          this._showPopup([data.longitude, data.latitude], html, [6, 0]);
        });
        this.animationOverlay.push(markerByGif);
      }
      if (item.id === '3') {
        let markerByGif = this._createMarkerAnimationByGif(item, `/static/images/gif/3.gif`, [-20, -20], data => {
          let html = `
              <div class=popup-title-content>
                <div class=popup-title>
                  <a id=popup-name title=${data.name != null ? data.name : ''}  class=popup-name>${data.name != null ? data.name : ''}</a>
                  <a href=# id=popup-closer class=ol-popup-closer closer></a>
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
  addGardenPlan() {
    this.beforeDestroy();
    this._addLayerImageWMS('/geoServer/zvanlasa/wms', { 'LAYERS': 'zvanlasa:GARDEN_PLAN' }, 2, 6);
    this._setZoom(13, [103.70, 30.38]); // 设置 中心点位 ----OlMap.js
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
  create900913() {
    AppUrlConfig.get900913Json().then(res => {
      res.forEach((item) => {
        let transPoint = transform([item.X, item.Y], 'EPSG:900913', 'EPSG:4326');
        let transJson = { longitude: transPoint[0], latitude: transPoint[1] }
        let marker = this._addIconMarkersByName(transJson, '', `/static/images/png/3.png`, this);
        this.markers.push(marker);
      });
    });
  }
  createAtmosphereModel() { // 创建大气扩散模型
    let polygonArray = [];
    // AppUrlConfig.getAtmosphere().then(res => {
    //   let num = 0;
    //   res.forEach((item) => {
    //     console.log(item.ImpactRegions[0]);
    //     num++;
    //     let polygon = [];
    //     item.ImpactRegions[0].forEach((item2) => {
    //       let transPoint = transform([item2.X, item2.Y], 'EPSG:900913', 'EPSG:4326');
    //       polygon.push(`${transPoint[0]}|${transPoint[1]}`);
    //       // let transJson = { longitude: transPoint[0], latitude: transPoint[1] }
    //       // let marker = this._addIconMarkersByName(transJson, '', `/static/images/png/${num}.png`, this);
    //       // this.markers.push(marker);
    //     });
    //     polygon.push(polygon[0])
    //     // console.log(polygon.toString());
    //     let data = { id: '1', name: `${num}` };
    //     if (num === 1) {
    //       this.showSinglePolygon(data, polygon.toString(), 3, '#ff0834', 0.8);
    //     }
    //     if (num === 2) {
    //       this.showSinglePolygon(data, polygon.toString(), 2, '#fff72b', 0.8);
    //     }
    //     if (num === 3) {
    //       this.showSinglePolygon(data, polygon.toString(), 1, '#1fca04', 0.8);
    //     }
    //   });
    // });

    // AppUrlConfig.getAtmosphere().then(res => {
    //   console.log(res);
    //   let num = 0;
    //   res[0].ImpactRegions.forEach((item) => {
    //         num++;
    //         let polygon = [];
    //         item.forEach((item2) => {
    //           let transPoint = transform([item2.X, item2.Y], 'EPSG:900913', 'EPSG:4326');
    //           polygon.push(`${transPoint[0]}|${transPoint[1]}`);
    //         });
    //         polygon.push(polygon[0])
    //         console.log(polygon.toString());
    //         let data = { id: '1', name: `${num}` };
    //         if (num === 1) {
    //           this.showSinglePolygon(data, polygon.toString(), 1, '#1fca04', 0.8);
    //         }
    //         if (num === 2) {
    //           this.showSinglePolygon(data, polygon.toString(), 2, '#fff72b', 0.8);
    //         }
    //         if (num === 3) {
    //           this.showSinglePolygon(data, polygon.toString(), 3, '#ff0834', 0.8);
    //         }
    //   })
    // });

    AppUrlConfig.getAtmosphere().then(res => {
      let param = {
        map: this.map,
        color: ['#ff0834', '#ff8c35', '#1fca04'],
        data: res[0]
      }
      let diffusionOverlay = new DiffusionOverlay(param);
      diffusionOverlay.createDiffusion();
    });
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
