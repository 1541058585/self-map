import { Vector as VectorSource } from 'ol/source.js';
import VectorLayer from 'ol/layer/Vector';

import { assign } from 'ol/obj.js';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature';
import { Circle as CircleStyle, Fill, Style } from 'ol/style.js';
import Overlay from 'ol/Overlay';

export default class AnimationOverlay {
  constructor(opt0ptions) {
    const options = opt0ptions !== {} ? opt0ptions : {};
    this._data = options.data;
    this._map = options.map;
    this.vectorSource = null;
    this.moveendListener = null;
    this.animationOverlay = [];
  }
  open() {
    this.moveendListener = (e) => {
      this._update();
    };
    this._map.on('moveend', this.moveendListener);
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 3
    });
    this._map.addLayer(this.vectorLayer);
    this._data.forEach((item) => {
      let feature = new Feature({
        geometry: new Point([item.longitude, item.latitude]),
        value: item.value
      });
      feature.setStyle(new Style({
        image: new CircleStyle({
          radius: 0,
          fill: new Fill({ color: `#00F` })
        })
      }));
      feature.data = item;
      this.vectorSource.addFeature(feature);
    });
  }
  close() {
    this._destroy();
    this.vectorSource.clear();
    this._map.un('moveend', this.moveendListener);
    this._data = [];
    this._map = null;
    this.moveendListener = null;
    this.vectorSource = null;
  }
  _update() {
    this._destroy();
    this.vectorSource.forEachFeatureIntersectingExtent((this._map.getView().calculateExtent()), (feature) => {
      let markerByGif = this._createMarkerAnimationByGif(feature.data, `/static/images/gif/${Math.floor(Math.random() * 7)}.gif`, [-25, -28]);
      this.animationOverlay.push(markerByGif);
    });
  }
  _destroy() {
    this.animationOverlay.forEach((item) => {
      this._map.removeOverlay(item);
    });
    this.animationOverlay = [];
  }
  /**
   * @private 支持gif 图片
   * 创建地图带样式的动画效果，image: gif
   **/
  _createMarkerAnimationByGif(data, icon, offset) {
    let olMarker = document.createElement('div');
    olMarker.id = `${data.id}`;
    olMarker.style.width = '50px';
    olMarker.style.height = '50px';
    olMarker.style.backgroundImage = `url(${icon})`;
    olMarker.style.backgroundSize = '50px 50px';
    let coordinates = [data.longitude, data.latitude];
    let overlay = new Overlay({
      element: olMarker,
      positioning: 'animation-overlay',
      stopEvent: false,
      offset: offset,
      zIndex: 1
    });
    if (coordinates) {
      overlay.setPosition(coordinates);
      overlay.data = data;
      this._map.addOverlay(overlay);
      this._map.updateSize();
    }
    return overlay;
  }
}
