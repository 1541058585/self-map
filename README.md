# self-map

> mySelfMap

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

remark：地图上遇到的问题:在地图里面踩过的坑。
        1.一起来看看天地图的api,看看天地图是如何使用国外开源代码，封装成自己的地图。从天地图的api中去感受编码思想。（百度api和天地图api,简直就是兄弟，长得太像了，都属于国产）
        2.看看2018的天地图（https://map.tianditu.gov.cn/），我当时抓取的网站源码（这是天地图用vue刚刚改版完,最新的，当时网站还没有设置安全策略，恰巧抓取的）
        3.那以后，来看看我之前是如何仿照天地图来封装vue组件的。
        4.地图变革，为什么我们要从天地图api变革到openlayers的api,技术选型，都经历了哪些痛！
        5.一起来看看openlayers的api,以及openlayers的源码，你会发现什么？
          ---- ECMAScript 6 http://es6.ruanyifeng.com/#docs/class
          ---- https://github.com/openlayers/openlayers/blob/v5.3.0/src/ol
          extends :
            ----子类可以继承父类的属性和方法，也可以扩展自己的属性和方法;
            ----子类构造的时候会默认通过super()来调用父类的构造方法。初始化子类的时候，先调用父类的默认构造，再调用子类的构造。
            ----在调用子类的方法时会先在子类中寻找那个方法，找到后调用成功，否则再去父类中找想要调用的方法。如果在子类中找到了那个方法，则子类重写了父类的方法。
        6.大家都知道的天地图支持动态gif图标，然而开源的openlayers不支持gif图标，怎么解决？
            一.使用css样式支持openlayers的png图标闪烁。
            二.感受过了天地图，如何来实现让openlayers支持gif图标的。
        7.openlayers添加普通图标遇见的坑，这个坑会跟随数据量的增加，导致内存和CPU的增加，结果是地图卡顿，浏览器卡死。
        8.实现让openlayers支持gif图标.第7点解决了，来谈谈gif图标达到大量的时候，导致CPU,内存，GPU相关的消耗问题。
        9.看看天地图的热力图源码，再看看openlayers的热力图源码，你会发现什么？ 写出一个支持现有业务的热力图js;
        10.geoServer发布一个简单图层，并展示效果。
        11.细聊geoServer发布图层。
        12.实现一个三维地图,平时大家都是玩的2D的地图（平面地图，遥感影像，地形地图），一起来玩一个3D地图（HelloWord）

        --------------------- 兴趣，才是最好的老师！ ---------------------------------------------------------------
