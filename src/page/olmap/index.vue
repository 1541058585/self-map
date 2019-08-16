<template>
  <div class="ol-map">
    <div class="left">
        <ul class="menu">
          <li>openlayers自身地图</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
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
