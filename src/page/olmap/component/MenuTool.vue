<template>
  <div id="menu_tool" :class="expand">
    <a :title="title" class="side_bar_stretch" @click="toggleStretch"><span class="iconfont" :class="toggleStretchTipClass"></span></a>
    <component :is="currentView" v-if="expandflag" :expand="expandflag" :olmap="olmap"></component>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sideBarShowflag: false,
        expandflag: false
      }
    },
    props: {
      olmap: {
        type: Object
      }
    },
    components: {
      'collect-component': () => import('./CollectPane')
    },
    computed: {
      currentView() {
        return this.expandflag === true ? 'collect-component' : '';
      },
      expand() {
        return {
          show: this.expandflag
        }
      },
      sideBarShow() {
        return this.sideBarShowflag;
      },
      toggleStretchTipClass() {
        return this.sideBarShow ? 'side_to_left icon-left' : 'side_to_right icon-right';
      },
      title() {
        return this.sideBarShow ? '关闭' : '打开';
      },
      map() {
        return this.expandflag
      }
    },
    mounted() {
    },
    methods: {
      toggleStretch() {
        this.expandflag = !this.expandflag;
        this.sideBarShowflag = !this.sideBarShowflag
      }
    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
  #menu_tool{
    position: absolute;
    width: 350px;
    height: calc(100% - 150px);
    top: 80px;
    left: -350px;
    background: rgba(255, 255, 255, 1);
    transition: left .5s ease;
    z-index: 998;
    border-collapse: separate;
    .side_bar_stretch {
      position: absolute;
      width: 20px;
      height: 25px;
      background:linear-gradient(90deg,rgba(37,136,234,1),rgba(74,165,255,1));
      top: 5px;
      right: -20px;
      border-left: none;
      cursor: pointer;
      display: block;
      transition: .2s;
    }
    .side_to_left, .side_to_right{
      width: 16px;
      height: 16px;
      line-height: 25px;
      display: block;
      color: white;
    }
  }

  #menu_tool.show{
    left: 0px;
  }
</style>
