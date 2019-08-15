<template>
  <div id="map3d">
    <div id="cesiumContainer"></div>
  </div>
</template>
<script>
    import Cesium from 'cesium/Source/Cesium.js'
    import buildModuleUrl from 'cesium/Source/Core/buildModuleUrl'
    import 'cesium/Source/Widgets/widgets.css'
    export default {
      data() {
        return {
          viewer: '',
          tileset: ''
        }
      },
      mounted() {
        // 设置静态资源目录
        buildModuleUrl.setBaseUrl('../../static/Cesium/')
        // // 创建viewer实例
        this.viewer = new Cesium.Viewer('cesiumContainer', {
          // 需要进行可视化的数据源的集合
          animation: false, // 是否显示动画控件
          shouldAnimate: true,
          homeButton: false, // 是否显示Home按钮
          fullscreenButton: false, // 是否显示全屏按钮
          baseLayerPicker: false, // 是否显示图层选择控件
          geocoder: false, // 是否显示地名查找控件
          timeline: false, // 是否显示时间线控件
          sceneModePicker: false, // 是否显示投影方式控件
          navigationHelpButton: false, // 是否显示帮助信息控件
          infoBox: false, // 是否显示点击要素之后显示的信息
          requestRenderMode: true, // 启用请求渲染模式
          scene3DOnly: false, // 每个几何实例将只能以3D渲染以节省GPU内存
          sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
          skyBox: Cesium.SkyBox({
            sources: {
              positiveX: 'Cesium-1.7.1/Skybox/px.jpg',
              negativeX: 'Cesium-1.7.1/Skybox/mx.jpg',
              positiveY: 'Cesium-1.7.1/Skybox/py.jpg',
              negativeY: 'Cesium-1.7.1/Skybox/my.jpg',
              positiveZ: 'Cesium-1.7.1/Skybox/pz.jpg',
              negativeZ: 'Cesium-1.7.1/Skybox/mz.jpg'
            }
          }), // 用于渲染星空的SkyBox对象
          fullscreenElement: document.body // 全屏时渲染的HTML元素 暂时没发现用处
        })
        // 去除版权信息
        this.viewer._cesiumWidget._creditContainer.style.display = 'none';
        // 调用影响中文注记服务
        this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
          url: `http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=af73935c47c82d3fdba88eb23a4b6607`,
          layer: `tdtAnnoLayer`,
          style: `default`,
          format: `image/jpeg`,
          tileMatrixSetID: `GoogleMapsCompatible`,
          show: false
        }));

        //  加载gltf格式数据到cesium
        let scene = this.viewer.scene;
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(110.62898254394531, 40.02804946899414, 6.0)); // gltf数据加载位置
        let model = scene.primitives.add(Cesium.Model.fromGltf({
          url: 'modeldata/daedata.gltf', // 如果为bgltf则为.bgltf
          modelMatrix: modelMatrix,
          scale: 0 // 放大倍数
        }));
        // this.viewer.camera.flyTo({
        //   destination: Cesium.Cartesian3.fromDegrees(110.62898254394531, 40.02804946899414, 6000.0) // 相机飞入点
        // });

        // this.viewer.extend(Cesium.viewerCesiumNavigationMixin, {
        //   defaultResetView: Cesium.Cartesian3.fromDegrees(115.74852, 39.63266, 117.06688, 40.16471),
        //   enableCompass: true,
        //   enableZoomControls: true,
        //   enableDistanceLegend: true,
        //   enableCompassOuterRing: true
        // });

        // let initialPosition = Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
        // let initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
        // let homeCameraView = {
        //   destination: initialPosition,
        //   orientation: {
        //     heading: initialOrientation.heading,
        //     pitch: initialOrientation.pitch,
        //     roll: initialOrientation.roll
        //   }
        // };
        // this.viewer.scene.camera.setView(homeCameraView);

        this.viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(104.07, 38.05, 25000000),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: Cesium.Math.toRadians(0)
          }
        });

        // Cesium3DTileset用来实现大范围的模型场景数据的加载应用
        // 三维倾斜模型、人工建模、BIM模型等等，都可以转换成3DTiles
        this.tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: '../static/Cesium/Assets/approximateTerrainHeights.json', // 数据路径
          dynamicScreenSpaceError: true,
          cullWithChildrenBounds: false,
          // 当skipLevelOfDetail为true，是一个常量，用于定义加载切片时要跳过的最小级别数。
          skipLevels: 0,
          maximumScreenSpaceError: 0 // 最大的屏幕空间误差
          // maximumNumberOfLoadedTiles: 1000,  //最大加载瓦片个数
        }))
        this.viewer.zoomTo(this.tileset)
      }
    }
</script>

<style lang="scss" scoped>
  #map3d{
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
    /*  background-image: url('/static/tianditu/SkyBox/tycho2t3_80_mx.jpg');*/
      .sheet-number{
        position: absolute;
        bottom: 0px;
        left: 20px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
</style>
