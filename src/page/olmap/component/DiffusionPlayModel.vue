<!--扩散模型模仿条-->
<template>
    <div v-if="showPlayModel" class="diffusion-play-model">
      <div class="left-play-stop">
        <span @click="pause" v-if="isPlay"  title="暂停" class="baseUrl pause"></span>
        <span @click="play" v-else title="播放" class="baseUrl play"></span>
      </div>
      <div class="content-block">
        <el-slider v-model="value" @change="changeSlider" :step="numValStep" show-stops :show-tooltip="false"></el-slider>
      </div>
      <div class="right-close">
        <span @click="close" title="关闭" class="baseUrl close"></span>
      </div>
    </div>
</template>

<script>
    import DiffusionOverlay from '@/api/olmap/DiffusionOverlay.js';
    import eventBus from '@/api/eventBus'
    export default {
      props: {
        diffusionModel: {
          type: Object
        },
        map: { // 地图对象
          type: Object,
          required: true
        }
      },
      data() {
        return {
          showPlayModel: true,
          value: 0,
          isPlay: false,
          interval: null,
          diffusionOverlay: null,
          numValStep: 5
        }
      },
      mounted() {
       this.loadData();
      },
      methods: {
        loadData() {
          this.$nextTick(() => {
            if (this.diffusionOverlay !== null) {
              this.diffusionOverlay.clearModel();
            }
            let param = {
              circleCenter: this.diffusionModel.circleCenter,
              releaseDuration: this.diffusionModel.releaseDuration,
              windDirection: this.diffusionModel.windDirection,
              map: this.map,
              color: ['#ffa500', '#ff0834', '#1fca04'],
              data: this.diffusionModel.modelData[0]
            };
            this.numValStep = 100 / this.diffusionModel.modelData.length + 1;
            this.showPlayModel = false;
            if (this.diffusionModel.modelData.length > 0) {
              if (this.diffusionModel.modelData.length === 1) {
                if (this.diffusionModel.modelData[0].Time === 'SteadyState') {
                  if (this.diffusionModel.modelData[0].ImpactRegions[0].length === 0 & this.diffusionModel.modelData[0].ImpactRegions[1].length === 0) {
                    this.$message({ type: 'info', message: '查询结果中，第一组恒稳态数据为空，没有没有分析出恒稳态的数据！', duration: 5000 });
                    this.diffusionModel.playStopFlag = false;
                  } else {
                    let diffusionOverlay = new DiffusionOverlay(param);
                    diffusionOverlay.createDiffusion();
                    this.diffusionOverlay = diffusionOverlay;
                    this.showPlayModel = true;
                  }
                }
              } else {
                let diffusionOverlay = new DiffusionOverlay(param);
                diffusionOverlay.createDiffusion();
                this.diffusionOverlay = diffusionOverlay;
                this.showPlayModel = true;
              }
            }
          });
        },
        play() {
          this.isPlay = true;
          this.changeSlider(this.value);
          if (this.diffusionOverlay !== null) {
            this.diffusionOverlay.clearModel();
          }
          this.interval = setInterval(() => {
            if (this.isPlay) {
              if (this.value === 100) {
                this.value = 0;
              } else {
                this.value = this.value + this.numValStep;
              }
              this.changeSlider(this.value);
            }
          }, 1000);
        },
        pause() {
          this.isPlay = false;
          clearInterval(this.interval);
          this.interval = null;
        },
        close() {
          this.isPlay = false;
          if (this.diffusionOverlay !== null) {
            this.diffusionOverlay.clearModel();
          }
          clearInterval(this.interval);
          this.interval = null;
          this.diffusionModel.playStopFlag = false;
        },
        changeSlider(val) {
          if (val === 100) {
          } else {
            let index = parseInt(val / this.numValStep);
            this.diffusionOverlay.updateDiffusion(this.diffusionModel.modelData[index]);
            this.diffusionModel.number = index;
          }
        }
      },
      beforeDestroy() { // 销毁之前，执行
        this.close()
      },
      watch: {
        'diffusionModel.uuid': {
          handler(newVal, oldVal) {
            this.showPlayModel = false;
            this.value = 0;
            this.isPlay = false;
            this.interval = null;
            this.numValStep = 5;
            if (this.diffusionOverlay !== null) {
              this.diffusionOverlay.clearModel();
            }
            this.loadData()
          }
        },
        value(val) {
          if (val >= 100) {
            let objectDistance = {
              SafeDistances: [],
              Time1: '',
              Time2: ''
            };
            if (this.diffusionModel.modelData.length >= 2) {
              objectDistance.SafeDistances[0] = this.diffusionModel.modelData[this.diffusionModel.modelData.length - 1].SafeDistances[0];
              objectDistance.SafeDistances[1] = this.diffusionModel.modelData[this.diffusionModel.modelData.length - 2].SafeDistances[0];
              objectDistance.Time1 = this.diffusionModel.modelData[this.diffusionModel.modelData.length - 1].Time;
              objectDistance.Time2 = this.diffusionModel.modelData[this.diffusionModel.modelData.length - 2].Time;
            } else {
              objectDistance.SafeDistances[0] = this.diffusionModel.modelData[0].SafeDistances[0];
              objectDistance.SafeDistances[1] = this.diffusionModel.modelData[0].SafeDistances[1];
              objectDistance.Time1 = this.diffusionModel.modelData[0].Time;
              objectDistance.Time2 = this.diffusionModel.modelData[0].Time;
            }
            if (this.diffusionOverlay !== null) {
              this.diffusionOverlay.safeDistancesEnd(objectDistance);
              // this.diffusionModel.number = this.diffusionModel.number++;
              // eventBus.$emit('objectDistance-table', objectDistance);
            }
            this.isPlay = false;
            clearInterval(this.interval);
            this.interval = null;
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .diffusion-play-model{
    width: calc(100%);
    height: 38px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    background:rgba(153,153,153,1);
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.14);
    border-radius: 2px;
    z-index: 101;
    .left-play-stop{
      width: 38px;
      height: 38px;
      float: left;
      span{
        width: 38px;
        height: 38px;
        display: inline-block;
        vertical-align: middle;
        user-select: none;
        &:hover {
          cursor: pointer
        }
        &.baseUrl {
          width: 32px;
          height: 32px;
          margin: 2px 2px;
        }
        &.play{
          background-image: url("/static/images/png/play-model.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        &.pause{
          background-image: url("/static/images/png/pause-model.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .content-block{
      width: calc(100% - 86px);
      margin-left: 10px;
      float: left;
    }
    .right-close{
      width: 38px;
      height: 38px;
      float: right;
      span{
        width: 38px;
        height: 38px;
        display: inline-block;
        vertical-align: middle;
        user-select: none;
        &:hover {
          cursor: pointer
        }
        &.baseUrl {
          width: 32px;
          height: 32px;
          margin: 2px 2px;
        }
        &.close{
          background-image: url("/static/images/png/close-model.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
