<template>
  <div class="ol-map">
    <div id="cesiumContainer" class="one-olmap">
    </div>
  </div>
</template>

<script>
    import Graticule from 'ol/Graticule.js';
    import Map from 'ol/Map.js';
    import View from 'ol/View.js';
    import GeoJSON from 'ol/format/GeoJSON.js';
    import Projection from 'ol/proj/Projection.js';
    import VectorSource from 'ol/source/Vector.js';
    import { register } from 'ol/proj/proj4.js';
    import proj4 from 'proj4';
    import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
    import XYZ from 'ol/source/XYZ';
    export default {
      mounted() {
        proj4.defs('ESRI:53009', '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +a=6371000 ' + '+b=6371000 +units=m +no_defs');
        register(proj4);

        // Configure the Sphere Mollweide projection object with an extent,
        // and a world extent. These are required for the Graticule.
        let sphereMollweideProjection = new Projection({
          code: 'ESRI:53009',
          extent: [-9009954.605703328, -9009954.605703328, 9009954.605703328, 9009954.605703328],
          worldExtent: [-179, -89.99, 179, 89.99]
        });
        let map = new Map({
          target: 'cesiumContainer',
          keyboardEventTarget: document,
          layers: [
            new VectorLayer({
              source: new VectorSource({
                url: 'https://openlayers.org/en/latest/examples/data/geojson/countries-110m.geojson',
                format: new GeoJSON()
              })
            })
          ],
          view: new View({
            center: [0, 0],
            projection: sphereMollweideProjection,
            resolutions: [65536, 32768, 16384, 8192, 4096, 2048],
            zoom: 0
          })
        });
        let url = `http://t0.tianditu.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=af73935c47c82d3fdba88eb23a4b6607`
        let graticule = new Graticule({
          map: map
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
    #cesiumContainer {
      width: calc(100%);
      height: calc(100%);
      overflow: hidden;
      position: relative;
      z-index: 1;
      /*background-image: url('/static/tianditu/SkyBox/tycho2t3_80_mx.jpg');*/
    }
  }
</style>
