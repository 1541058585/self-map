import Heatmap from 'heatmap.js'
import { DomUtil } from '@/utils/dom-util.js'
import T from '@/api/tianditu-map/T.js';
/**
 * 天地图拓展--热力图
 *
 * @author cyq
 * 1、整个js库包裹在一个立即执行的匿名函数里，以避免污染全局命名空间。这也是很多js库的常见写法。
 * 2、核心对象有三个：Store（数据）、Canvas2dRenderer（绘制工具）、HeatMap（构建器）。
 * 3、通过global['h337']暴露创建工厂。
 */
/*eslint-disable */
export const HeatmapOverlayExtend = T.Overlay.extend({

    /**
     *构造参数
     * @param options 参数对象
     */
    initialize: function (options) {
        this.conf = options;
        this.el = DomUtil.create('div', 'canvas-zoom-map');
        this.heatmap = null;
        this.latlngs = [];
        this.bounds = null;
        this._max = 1; // 权重最大
        this._min = 0; // 权重最小
    },
    /**
     *添加覆盖物
     * @param map 地图对象
     */
    onAdd: function (map) {
        // 创建画布大小
        this._map = map;
        this.el.style.position = 'absolute';
        this.el.style.top = 0;
        this.el.style.left = 0;
        this.el.style.border = 0;
        // this.el.style.backgroundColor='red';
        // this.el.style.opacity='0.3';
        this.el.style.width = `${this._map.getSize().x}px`;
        this.el.style.height = `${this._map.getSize().y}px`;

        this.conf.container = this.el; // 增加属性
        if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
            return this.el;
        }

        this.conf.valueField = this.conf.valueField || 'count';
        this.conf.latField = this.conf.latField || 'lat';
        this.conf.lngField = this.conf.lngField || 'lng';

        this.heatmap = Heatmap.create(this.conf);
        /**
         * cocos2dx中setContentSize与setDimensions在设置label显示区域上的区别
         * Dimensions翻译为：规模，大小；
         * setDimensions（其实就是一种更加高效的设置Size的方式
         * Canvas2dRenderer
         * */
        this.heatmap._renderer.setDimensions(this._map.getSize().x, this._map.getSize().y);
        map.getPanes().overlayPane.appendChild(this.el);
        map.on('moveend', this._reset, this); // moveend  移动地图 绑定
        this._div = this.el;
    },
    /**
     * 移除叠加物，释放覆盖物对象所占用的内存。
     * */
    onRemove: function (map) {
        map.getPanes().overlayPane.removeChild(this._div);
        map.off('moveend', this._reset, this);
    },
    _reset: function () {
        let size = this._map.getSize();
        this._div.style.width = `${size.x}px`;
        this._div.style.height = `${size.y}px`;
        this.heatmap._renderer.setDimensions(size.x, size.y);
        this.draw(); // 绘制
    },
    /**
     * 得到画布元素
     * */
    getElement: function () {
        return this.conf.container;
    },
    /**
     *  操作地图的时候绘制
     * */
    draw: function () {
        if (!this._map) { return; }

        if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
            return;
        }

        //  if (this.isHidden())  return;
        let currentBounds = this._map.getBounds();
        if (!this.isadd && currentBounds.equals(this.bounds)) {
            this.isadd = false;
            return;
        }
        this.bounds = currentBounds;
        let ne = this._map.lngLatToLayerPoint(currentBounds.getNorthEast());
        let sw = this._map.lngLatToLayerPoint(currentBounds.getSouthWest());

        let topY = ne.y;
        let leftX = sw.x;
        let h = sw.y - ne.y;
        let w = ne.x - sw.x;

        this.conf.container.style.width = `${w}px`;
        this.conf.container.style.height = `${h}px`;
        this.conf.container.style[this.CSS_TRANSFORM()] = `translate(${Math.round(leftX)}px,${Math.round(topY)}px)`;

        this._update();
    },
    /**
     * 画布的样式
     * -ms-transform:rotate(7deg);
     *-moz-transform:rotate(7deg);
     *-webkit-transform:rotate(7deg);
     *-o-transform:rotate(7deg);
     *transform:rotate(7deg); //统一标识语句，符合w3c标准
     * */
    CSS_TRANSFORM: function () {
        let div = document.createElement('div');
        let props = [
            'transform',
            'WebkitTransform',
            'MozTransform',
            'OTransform',
            'msTransform'
        ];

        for (let i = 0; i < props.length; i++) {
            let prop = props[i];
            if (div.style[prop] !== undefined) {
                return prop;
            }
        }
        return props[0];
    },
    /**
     * 更新位置
     */
    _update: function () {
        let bounds, zoom, scale;
        let generatedData = { max: this._max, min: this._min, data: [] };

        bounds = this._map.getBounds();
        zoom = this._map.getZoom();
        scale = Math.pow(2, zoom); // Math.pow(x,n)方法,表示x的n次幂

        if (this.latlngs.length === 0) {
            if (this.heatmap) {
                this.heatmap.removeData(); // 移除heatmap里面的数据
            }
            return;
        }

        let latLngPoints = []; // 新的数组对象
        let radiusMultiplier = this.conf.scaleRadius ? scale : 1; // 半径
        let localMax = 0;
        let localMin = 0;
        let len = this.latlngs.length;

        // debugger

        // -----更新视图，乘以半径

        while (len--) {
          let entry = this.latlngs[len];
          let value = entry[this.conf.valueField];
          let latlng = entry.latlng;

          if (!bounds.contains(latlng)) {
            continue;
          }
          localMax = Math.max(value, localMax); // 取最大，
          localMin = Math.min(value, localMin); // 取最小

          let point = this._map.lngLatToContainerPoint(latlng);
          let latlngPoint = { x: Math.round(point.x), y: Math.round(point.y) };
          latlngPoint[this.conf.valueField] = value;

          let radius;

          if (entry.radius) {
            radius = entry.radius * radiusMultiplier / 2;
          } else {
            radius = (this.conf.radius || 2) * radiusMultiplier / 2;
          }
          latlngPoint.radius = radius;
          latLngPoints.push(latlngPoint);
      }

        // debugger
        if (this.conf.useLocalExtrema) {
            // generatedData.max = localMax;
            // generatedData.min = localMin;

            generatedData.max = this._max;
            generatedData.min = this._min;
        }

        generatedData.data = latLngPoints;

        this.heatmap.setData(generatedData);
    },
    /**
     * 设置热力图展现的详细数据, 实现之后,即可以立刻展现
     * {"<b>max</b>" : {Number} 权重的最大值,
     * {"<b>min</b>" : {Number} 权重的最小值,
     * <br />"<b>data</b>" : {Array} 坐标详细数据,格式如下 <br/>
     * {"lng":116.421969,"lat":39.913527,"count":3}, 其中<br/>
     * lng lat分别为经纬度, count权重值
     * @param data
     * 接收数据
     */
    setDataSet: function (data) {
        // this.data = data;

        this._max = data.max || this._max; // 权重最大值
        this._min = data.min || this._min; // 权重最小值
        let latField = this.conf.latField || 'lat'; // 经度
        let lngField = this.conf.lngField || 'lng'; // 纬度
        let valueField = this.conf.valueField || 'count'; // 值

        if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
            return;
        }
        let currentBounds = this._map.getBounds();

        let d = data.data;
        let dlen = d.length; // 数据和数据长度

        this.latlngs = [];
        this.heatmap.removeData(); // 移除heatmap里面的数据

        while (dlen--) { // 处理数据
            let entry = d[dlen]; // 单个对象
            let latlng = new T.LngLat(entry[this.conf.lngField], entry[this.conf.latField]); // 经纬度坐标
            this.latlngs.push({ latlng: latlng, count: entry.count }); // 提供给heatmap使用

            // var point = this._getContainerPoint(latlng);// 处理成画布数据
        }
        this._update();
    },
    /**
     *  处理为heatmap的坐标系
     * */
    _getContainerPoint: function (latlng) {
        let currentBounds = this._map.getBounds();
        let divPixel = this._map.lngLatToLayerPoint(latlng);
        let leftX = this._map.lngLatToLayerPoint(currentBounds.getSouthWest()).x;
        let topY = this._map.lngLatToLayerPoint(currentBounds.getNorthEast()).y;
        let screenPixel = new T.Point(divPixel.x - leftX, divPixel.y - topY);
        let point = this.pixelTransform(screenPixel);

        return point;
    },

    /**
     * 添加势力图的详细坐标点
     * @param {Number} lng 经度坐标
     * @param {Number} lat 经度坐标
     * @param {Number} count 经度坐标
     */
    addDataPoint: function (lng, lat, count) {
        if (!this.isSupportCanvas()) {
            return;
        }
        if (this.data && this.data.data) {
            this.data.data.push({
                lng: lng,
                lat: lat,
                count: count
            });
        }
        let latlng = new T.LngLat(lng, lat);
        let point = this.pixelTransform(this._map.lngLatToContainerPoint(latlng));

        this.latlngs.push({
            latlng: latlng,
            c: count
        });

        // this.heatmap.addData({x: point.x, y: point.y, value: count });
        this.isadd = true;
        this.draw();
    },

    /**
     * 内部使用的坐标转化
     * @param p
     * @returns {*}
     */
    pixelTransform: function (p) {
        let zoom = this._map.getZoom();
        let h = this.heatmap._config.container.clientHeight * zoom;
        let w = this.heatmap._config.container.clientWidth * zoom;
        if (w === 0 || h === 0) return p;
        while (p.x < 0) {
            p.x += w;
        }

        while (p.x > w) {
            p.x -= w;
        }

        while (p.y < 0) {
            p.y += h;
        }

        while (p.y > h) {
            p.y -= h;
        }

        p.x = (p.x >> 0);
        p.y = (p.y >> 0);

        return p;
    },
    /**
     * 更改热力图的展现或者关闭
     */

    toggle: function () {
        if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
            return;
        }
        if (this.conf.visible === true) {
            this.conf.visible = false;
        } else {
            this.conf.visible = true;
        };
        if (this.conf.visible) {
            this.conf.container.style.display = 'block';
        } else {
            this.conf.container.style.display = 'none';
        }
        return this.conf.visible;
    },

    setOptions: function (options) {
        if (!this.isSupportCanvas()) { // 判断是否支持Canvas.
            return;
        }

        for (let key in options) {
            if (key === 'radius') {
                this.heatmap._store._cfgRadius = options[key] * 2;
            }
            if (key === 'opacity') {
                options[key] = options[key] / 100;
            }
        }
        this.heatmap.configure(options);
        if (this.data) {
            this.setDataSet(this.data); // 重新渲染
        }
    },
    /**
     * 判断是否支持Canvas.(H5画布元素)
     * 备注：Internet Explorer 8 以及更早的版本不支持 <canvas> 元素。
     * */
    isSupportCanvas: function () {
        let elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

});

