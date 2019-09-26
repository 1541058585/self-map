<template>
  <div class="ol-map">
    <div id="one-olmap" class="one-olmap">
      <MenuTool v-if="olmapflag" :olmap="olmap"></MenuTool>
      <text-box v-if="false" :olmap="olmap"></text-box>
      <DiffusionPlayModel  :map="olmap.map" v-if="diffusionModel.playStopFlag" :diffusionModel="diffusionModel"></DiffusionPlayModel>
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
    import eventBus from '@/api/eventBus';
    import Utils from '@/utils/utils'
    export default {
       data() {
         return {
           olmapflag: false,
           olmap: null,
           diffusionModel: { // 大气扩散模型
             playStopFlag: false, // 是否显示
             circleCenter: [], // 发生地点,经纬度
             releaseDuration: 0, // 分钟
             windDirection: 0, // 风向
             modelData: [], // 模型相关的数据
             number: 0,
             uuid: 0
           }
         }
       },
        components: {
          TextBox: () => import('./component/TextBox'),
          DiffusionPlayModel: () => import('./component/DiffusionPlayModel'),
          MenuTool: () => import('./component/MenuTool')
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
          });
          eventBus.$on('diffusion-model-data', (diffusionModelData) => {
            this.diffusionModel.circleCenter = diffusionModelData.circleCenter;
            this.diffusionModel.modelData = diffusionModelData.modelData;
            this.diffusionModel.releaseDuration = diffusionModelData.releaseDuration;
            this.diffusionModel.windDirection = diffusionModelData.windDirection;
            this.diffusionModel.playStopFlag = true;
            this.diffusionModel.uuid = Utils.getGuid();
          })
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
<style>
  @import "./../../assets/icon/iconfont.css";
</style>
<style lang="scss">
  @import "../../assets/css/popup-content.scss";
  @import "../../assets/css/marker-content.scss";
</style>
