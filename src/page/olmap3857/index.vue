<template>
  <div class="ol-map">
    <div id="one-olmap" class="one-olmap">
    </div>
  </div>
</template>

<script>
    import AppUrlConfig from '@/api/config/app-url-config.js';
    import Map from 'ol/Map.js';
    import View from 'ol/View.js';
    import TileLayer from 'ol/layer/Tile.js';
    import OSM from 'ol/source/OSM.js';
    export default {
        mounted() {
          this.$nextTick(() => {
            let map = new Map({
              layers: [
                new TileLayer({
                  source: new OSM()
                })
              ],
              target: 'one-olmap',
              view: new View({
                center: [0, 0],
                projection: 'EPSG:3857',
                zoom: 0
              })
            });
          });
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
      overflow-y: auto;
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
