<template>
  <div class="ol-map">
    <div id="one-olmap" class="one-olmap">
    </div>
    <div id="coordinate"></div>
  </div>
</template>

<script>
    import GisMap from '@/api/olmap/gismap.js';
    import AppUrlConfig from '@/api/config/app-url-config.js';
    export default {
       data() {
         return {
           olmap: null
         }
       },
        mounted() {
          this.$nextTick(() => {
            AppUrlConfig.configServer().then(res => {
              let olmap = new GisMap(res.type, 'one-olmap', res.T_MAP_KEY, res.MAP_CENTER_, null, res.MAP_MinZoom_, res.MAP_Extent_, res.MAP_LAYER_Type_);
              if (olmap instanceof GisMap) {
                olmap.initMap();
                this.olmap = olmap;
              }
            });
          })
        },
        beforeDestroy() {
         if (this.olmap) {
           this.olmap.beforeDestroy();
           delete this.olmap;
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
    #one-olmap {
      width: calc(100%);
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    #coordinate {
      width:130px;
      height: auto;
      position:fixed;
      bottom: 50px;
      right: 20px;
      z-index: 9999;
      color: red;
      font-weight: bold;
    }
  }
</style>
