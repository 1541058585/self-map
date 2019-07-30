<template>
  <div class="tianditu-map">
      <div id="tdt-map"></div>
  </div>
</template>

<script>
    import TianDiTuMap from '@/api/tianditu-map/business-map.js'
    export default {
      data() {
        return {
          tianDiTuMap: null
        }
      },
      mounted() {
        this.$nextTick(() => {
          let tianDiTuMap = new TianDiTuMap('tdt-map', [83.52703855535762, 32.853010947288794], 8, 'EPSG:4326');
          if (tianDiTuMap instanceof TianDiTuMap) {
            tianDiTuMap.initMap();
            this.tianDiTuMap = tianDiTuMap;
          }
        })
      },
      beforeDestroy() {
          delete this.tianDiTuMap;
      }
    }
</script>

<style lang="scss" scoped>
.tianditu-map {
  width: calc(100%);
  height: calc(100%);
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0;
  #tdt-map {
    width: calc(100%);
    height: calc(100%);
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
}
</style>
