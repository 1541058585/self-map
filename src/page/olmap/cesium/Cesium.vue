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
          fullscreenElement: document.body // 全屏时渲染的HTML元素 暂时没发现用处
        })
        // 去除版权信息
        this.viewer._cesiumWidget._creditContainer.style.display = 'none'
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
