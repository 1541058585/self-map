<template>
  <div class="ol-map">
    <div class="left">
        <ul class="menu">
          <li @click="switchMap('OSM')">openlayers地图OSM形式</li>
          <li @click="switchMap('XYZ')">openlayers地图XYZ形式</li>
          <li @click="switchMap('')">国家地理信息公共服务平台 天地图</li>
          <li @click="switchMap('TianDiTu_sichuan')">天地图.四川</li>
          <li @click="switchMap('TianDiTu_xizang')">天地图.西藏</li>
          <li @click="switchMap('GaoDeDiTu')">高德地图</li>
          <li @click="createMapByMarkerPNG()">创建一个简单的点位png</li>
          <li @click="createMapByManyMarkerPNG()">创建多个marker-png</li>
          <li @click="createMarkerByCssPNG()">使用css样式支持openlayers的png图标闪烁</li>
          <li @click="createMarkerByGif()">实现让openlayers支持gif图标的</li>
          <li @click="addChinaAdmini()">叠加行政区划图层</li>
          <li @click="addGardenPlan()">规划园区</li>
          <li @click="addHeatmapOverlay()">热力图</li>
        </ul>
    </div>
    <div id="one-olmap" class="one-olmap">
      <text-box v-if="false" :olmap="olmap"></text-box>
    </div>
    <div id="popup" class="ol-popup">
      <div id="popup-content" class="popup-content">
        <div class="popup-title-content">
          <div class="popup-title">
            <a id="popup-name" title="${single.name != null ? single.name : ''}"  class="popup-name"></a>
            <a href="#" id="popup-closer" class="ol-popup-closer closer"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import GisMap from '@/api/olmap/GisMap.js';
    import AppUrlConfig from '@/api/config/app-url-config.js';
    export default {
       data() {
         return {
           olmapflag: false,
           olmap: null
         }
       },
        components: {
          TextBox: () => import('./component/TextBox')
        },
        mounted() {
          this.$nextTick(() => {
            AppUrlConfig.configServer().then(res => {
              let options = {
                systemType: res.type,
                target: 'one-olmap',
                tmapkey: res.T_MAP_KEY,
                center: res.MAP_CENTER_,
                zoom: null,
                minZoom: res.MAP_MinZoom_,
                fitExtent: res.MAP_Extent_,
                layerType: res.MAP_LAYER_Type_
              }
              let olmap = new GisMap(options);
              if (olmap instanceof GisMap) {
                olmap.initMap(null);
                this.olmap = olmap;
                this.olmapflag = true;
              }
            });
          })
        },
        methods: {
          switchMap(layer) {
            this.olmap.switchMap(layer);
          },
          createMapByMarkerPNG() {
            let single = {id: `Enteripse@116`, name: `西藏甘露藏药股份有限公司`, longitude: `91.718333`, latitude: `29.630278`, value: 250};
            this.olmap.createMapByMarkerPNG(single);
          },
          createMapByManyMarkerPNG() {
            let data = [
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
            this.olmap.createMapByManyMarkerPNG(data);
          },
          createMarkerByCssPNG() {
            let data = [
              {id: `1`, name: `西藏墨竹工卡元泽选矿有限公司`, longitude: `81.401368`, latitude: `33.391113`, value: 120},
              {id: `2`, name: `阿里北控泷源水务有限公司`, longitude: `82.001953`, latitude: `33.010253`, value: 120},
              {id: `3`, name: `西藏甘露藏药股份有限公司`, longitude: `80.976563`, latitude: `32.995605`, value: 250}
            ]
            this.olmap.createMarkerByCssPNG(data);
          },
          createMarkerByGif() {
            let data = [
              {id: `1`, name: `西藏墨竹工卡元泽选矿有限公司`, longitude: `81.401368`, latitude: `33.391113`, value: 120},
              {id: `2`, name: `阿里北控泷源水务有限公司`, longitude: `82.001953`, latitude: `33.010253`, value: 120},
              {id: `3`, name: `西藏甘露藏药股份有限公司`, longitude: `80.976563`, latitude: `32.995605`, value: 250}
            ]
            this.olmap.createMarkerByGif(data);
          },
          addChinaAdmini() {
            this.olmap.addChinaAdmini();
          },
          addHeatmapOverlay() {
            this.olmap.addHeatmapOverlay();
          },
          addGardenPlan() {
            this.olmap.addGardenPlan();
          }
        },
        beforeDestroy() {
         if (this.olmap) {
           this.olmap.beforeDestroy();
           delete this.olmap;
           this.olmapflag = false;
         }
        }
    }
</script>

<style lang="scss" scoped>
  .ol-map {
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0;
    .left{
      width: 0px;
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
      float: left;
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: center;
        li{
          padding: 12px 0px;
          background: #ffa935;
          border: 1px solid #040404;
          margin: 20px auto;
          font-size: 12px;
          &:hover{
            cursor: pointer;
            background: linear-gradient(90deg, rgba(255,191,39,1), rgba(74, 165, 255, 1));
            color: white;
          }
        }
      }
      ul.menu{
        width: calc(100% - 40px);
        margin:  20px  20px;
      }
    }
    .one-olmap{
      width: calc(100%);
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
      float: left;
    }
  }
</style>
<style lang="scss">
  @import "../../assets/css/popup-content.scss";
</style>
