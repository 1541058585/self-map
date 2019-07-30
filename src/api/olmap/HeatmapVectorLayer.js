import VectorLayer from 'ol/layer/Vector';
import Heatmap from 'heatmap.js'
import { createCanvasContext2D } from 'ol/dom.js';
import { assign } from 'ol/obj.js';
import { DomUtil } from '@/utils/dom-util.js'

/**
 * AUTHOR：CYQ
 * DESCRIBE: openlayers 官网的热力图是根据像素为单位的，不符合实际的情况，现在根据实际情况改成以地理坐标系来
 *  灵感来自于：openlayers的热力图源码，源码地址：https://github.com/openlayers/openlayers/blob/v5.3.0/src/ol/layer/Heatmap.js
 *  |---- class Heatmap extends VectorLayer
 *  共同之处：都是依照画布的方式实现 -- Canvas
 **/
export default class HeatmapVectorLayer extends VectorLayer {
  /**
   * @param {Options=} opt_options Options.
   */
  constructor(opt0ptions) {
    const options = opt0ptions !== {} ? opt0ptions : {};
    const baseOptions = assign({}, options);
    super(baseOptions);
    this.conf = options;
    // let currentBounds = (this.map.getView().calculateExtent());
    // let x = this.map.getSize()[0];
    // let y = this.map.getSize()[1];

    let heatmapInstance = Heatmap.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('.one-olmap'),
      maxOpacity: 0.8
    });
    heatmapInstance._renderer.setDimensions(options.width, options.height);
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
