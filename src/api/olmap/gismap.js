import OlMap from './olmap.js'
import { HeatmapOverlayExtend } from '@/api/tianditu-map/HeatmapOverlayExtend.js';
import HeatmapVectorLayer from './HeatmapVectorLayer.js'
import { Vector as VectorSource } from 'ol/source.js';
import HeatmapOverlay from './HeatmapOverlay.js';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

export default class GisMap extends OlMap {
  constructor(systemType, target, tmapkey, center, zoom, minZoom, fitExtent, layerType, projection) {
    super(systemType, target, tmapkey, center, zoom, minZoom, fitExtent, layerType, projection);
    this.minZoom = 6;
    this.zoom = 6
    this.heatmapOverlay = null;
  }
  initMap() {
    this._createMap();

    let coor = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection: 'EPSG:4326',
      target: document.getElementById('coordinate')
    })
    this.map.addControl(coor);
    let config = {
      radius: 0.8,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      visible: true,
      latField: 'latitude',
      lngField: 'longitude',
      valueField: 'value'
    };
    let data = [
      // {id: `Enteripse@114`, name: `西藏天佑德青稞酒业有限责任公司`, longitude: `82.177735`, latitude: `32.731934`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@114`, name: `西藏天佑德青稞酒业有限责任公司`, longitude: `82.177735`, latitude: `32.731934`, value: Math.floor(Math.random() * 500)},
      // {id: `OtherPollutionInfo@82`, name: `医疗废物处理中心--热解焚化炉`, longitude: `81.435242`, latitude: `33.090305`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@107`, name: `西藏高争建材股份有限公司`, longitude: `82.954102`, latitude: `33.083496`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@124`, name: `阿里垃圾焚烧处理厂`, longitude: `81.210938`, latitude: `33.083496`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@109`, name: `西藏鑫茂矿业有限公司`, longitude: `81.503907`, latitude: `33.112793`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@122`, name: `阿里污水处理厂（一期）`, longitude: `81.679688`, latitude: `33.317871`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@123`, name: `西藏现代妇产医院有限公司`, longitude: `82.236328`, latitude: `32.76123`, value: Math.floor(Math.random() * 500)},
      // {id: `OtherPollutionInfo@71`, name: `阿里地区污水处理厂（一期）`, longitude: `81.547852`, latitude: `33.507385`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@117`, name: `西藏藏医学院藏药有限公司`, longitude: `81.09375`, latitude: `33.024902`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@119`, name: `国网西藏电力有限公司羊八井地热发电公司`, longitude: `81.005859`, latitude: `33.083496`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@113`, name: `西藏高原之宝牦牛乳业股份有限公司`, longitude: `80.800782`, latitude: `33.273926`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@120`, name: `阿里污水处理厂（二期）`, longitude: `82.778321`, latitude: `32.717285`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@108`, name: `阿里康达机动车检测有限公司`, longitude: `81.313477`, latitude: `33.112793`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@112`, name: `尼木县铜业开发有限责任公司`, longitude: `81.503906`, latitude: `32.995605`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@125`, name: `西藏自治区危险废物处置中心`, longitude: `81.708985`, latitude: `33.27301`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@110`, name: `西藏华泰龙矿业开发有限公司`, longitude: `91.718333`, latitude: `29.630278`, value: Math.floor(Math.random() * 500)},
      // {id: `OtherPollutionInfo@84`, name: `民用航空阿里站`, longitude: `83.521729`, latitude: `32.583389`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@115`, name: `西藏天地绿色饮品发展有限公司`, longitude: `81.240235`, latitude: `33.054199`, value: Math.floor(Math.random() * 500)},
      // {id: `OtherPollutionInfo@83`, name: `保康医疗废物处理有限公司--焚化炉`, longitude: `81.37207`, latitude: `33.185119`, value: Math.floor(Math.random() * 500)},
      // {id: `Enteripse@105`, name: `西藏自治区移动通信有限责任公司(阿里分公司)`, longitude: `82.096252`, latitude: `33.233128`, value: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@85`, name: `狮泉河镇鑫源修理厂`, longitude: `84.384613`, latitude: `33.42997`, value: Math.floor(Math.random() * 120)},
      {id: `Enteripse@111`, name: `西藏墨竹工卡元泽选矿有限公司`, longitude: `81.401368`, latitude: `33.391113`, value: 120},
      {id: `Enteripse@121`, name: `阿里北控泷源水务有限公司`, longitude: `82.001953`, latitude: `33.010253`, value: 120},
      {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, longitude: `80.976563`, latitude: `32.995605`, value: 250}
    ];
    let data2 = {
      max: 260,
      min: 0,
      data: data
    };
    this.heatmapOverlay = new HeatmapOverlay({
      config: config,
      map: this.map
    });
    this.heatmapOverlay.setDataSet(data2);
    // this.heatmapOverlay.toggle(true); // true 关闭
    this.heatmapOverlay.toggle(false)
  }
}
