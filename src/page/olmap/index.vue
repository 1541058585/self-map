<template>
  <div class="ol-map">
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
                olmap.initMap();
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
    #one-olmap {
      width: calc(100%);
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
  }
</style>
