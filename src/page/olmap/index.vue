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
        </ul>
    </div>
    <div id="one-olmap" class="one-olmap">
      <text-box v-if="false" :olmap="olmap"></text-box>
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
      width: 200px;
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
      width: calc(100% - 200px);
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
      float: left;
    }
  }
</style>
