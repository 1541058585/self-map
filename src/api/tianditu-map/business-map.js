import TianDiTuMap from './tianditu-map.js'
import { HeatmapOverlayExtend } from './HeatmapOverlayExtend.js'

export default class BusinessMap extends TianDiTuMap {
  constructor(target, defaultCenter, defaultZoom, defaultProjection) {
    super(target, defaultCenter, defaultZoom, defaultProjection);
    this.heatmapOverlay = null;
  }
  initMap() {
    this._createMap();
    let config = {
      radius: 0.3,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };
    let data = [
      {id: `Enteripse@114`, name: `西藏天佑德青稞酒业有限责任公司`, lng: `82.177735`, lat: `32.731934`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@114`, name: `西藏天佑德青稞酒业有限责任公司`, lng: `82.177735`, lat: `32.731934`, count: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@82`, name: `医疗废物处理中心--热解焚化炉`, lng: `81.435242`, lat: `33.090305`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@107`, name: `西藏高争建材股份有限公司`, lng: `82.954102`, lat: `33.083496`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@124`, name: `阿里垃圾焚烧处理厂`, lng: `81.210938`, lat: `33.083496`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@109`, name: `西藏鑫茂矿业有限公司`, lng: `81.503907`, lat: `33.112793`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@122`, name: `阿里污水处理厂（一期）`, lng: `81.679688`, lat: `33.317871`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@123`, name: `西藏现代妇产医院有限公司`, lng: `82.236328`, lat: `32.76123`, count: Math.floor(Math.random() * 500)},
      {id: `OtherPollutionInfo@71`, name: `阿里地区污水处理厂（一期）`, lng: `81.547852`, lat: `33.507385`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@117`, name: `西藏藏医学院藏药有限公司`, lng: `81.09375`, lat: `33.024902`, count: Math.floor(Math.random() * 500)},
      {id: `Enteripse@119`, name: `国网西藏电力有限公司羊八井地热发电公司`, lng: `81.005859`, lat: `33.083496`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@113`, name: `西藏高原之宝牦牛乳业股份有限公司`, lng: `80.800782`, lat: `33.273926`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@120`, name: `阿里污水处理厂（二期）`, lng: `82.778321`, lat: `32.717285`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@108`, name: `阿里康达机动车检测有限公司`, lng: `81.313477`, lat: `33.112793`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@112`, name: `尼木县铜业开发有限责任公司`, lng: `81.503906`, lat: `32.995605`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@125`, name: `西藏自治区危险废物处置中心`, lng: `81.708985`, lat: `33.27301`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@110`, name: `西藏华泰龙矿业开发有限公司`, lng: `91.718333`, lat: `29.630278`, count: Math.floor(Math.random() * 500)},
     {id: `OtherPollutionInfo@84`, name: `民用航空阿里站`, lng: `83.521729`, lat: `32.583389`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@115`, name: `西藏天地绿色饮品发展有限公司`, lng: `81.240235`, lat: `33.054199`, count: Math.floor(Math.random() * 500)},
     {id: `OtherPollutionInfo@83`, name: `保康医疗废物处理有限公司--焚化炉`, lng: `81.37207`, lat: `33.185119`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@105`, name: `西藏自治区移动通信有限责任公司(阿里分公司)`, lng: `82.096252`, lat: `33.233128`, count: Math.floor(Math.random() * 500)},
     {id: `OtherPollutionInfo@85`, name: `狮泉河镇鑫源修理厂`, lng: `84.384613`, lat: `33.42997`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@111`, name: `西藏墨竹工卡元泽选矿有限公司`, lng: `81.401368`, lat: `33.391113`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@121`, name: `阿里北控泷源水务有限公司`, lng: `82.001953`, lat: `33.010253`, count: Math.floor(Math.random() * 500)},
     {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, lng: `80.976563`, lat: `32.995605`, count: Math.floor(Math.random() * 500)}
    ];
    console.log(data);
    let data2 = {
      max: 500,
      min: 100,
      data: data
    }
    this.heatmapOverlay = new HeatmapOverlayExtend(config);
    this.map.addOverLay(this.heatmapOverlay);
    this.heatmapOverlay.setDataSet(data2);
    this.map.setMaxZoom(13)
  }
}
