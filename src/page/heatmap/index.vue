<template>
  <div class="ol-map">
    <div class="heatmap"></div>
  </div>
</template>

<script>
    import Heatmap from 'heatmap.js'
    export default {
      mounted() {
        let heatmapInstance = Heatmap.create({
          // only container is required, the rest will be defaults
          container: document.querySelector('.heatmap'),
          maxOpacity: 0.8
        });
        heatmapInstance._renderer.setDimensions(500, 500);
        let points = [];
        let max = 0;
        let width = 840;
        let height = 400;
        let len = 200;

        while (len--) {
          let val = Math.floor(Math.random() * 100);
          max = Math.max(max, val);
          let point = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            value: val
          };
          points.push(point);
        }
        let data = {
          max: max,
          data: points
        };
        heatmapInstance.setData(data);
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
    #heatmap {
      width: calc(100%);
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
  }
</style>
