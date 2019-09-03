<template>
  <canvas id='canvas' width='1500' height='800' @mousedown="canvasDown($event)" style="border:1px solid #c3c3c3;"></canvas>
</template>

<script>
  import CanvasUtil from '@/utils/CanvasUtil.js'
  export default {
    data() {
      return {
        canvasdiv: null
      }
    },
    mounted() {
      let canvas = document.getElementById('canvas');
      this.canvasdiv = canvas;
      let cxt = canvas.getContext('2d');
      cxt.fillStyle = 'white'; // 内部使用白色，如不指定，默认为黑色
      cxt.strokeStyle = '#008'; // 深蓝色外边框
      cxt.lineWidth = 2; // 2个像素宽

      let poly = [
        {x: 341, y: 188},
        {x: 396, y: 196},
        {x: 420, y: 224},
        {x: 445, y: 262},
        {x: 450, y: 293},
        {x: 432, y: 305},
        {x: 382, y: 188},
        {x: 341, y: 188},
        {x: 341, y: 188},
      340, 284,
      315, 240,
      311, 207]
      this.polygon(poly, cxt);
    },
    methods: {
      polygon(poly, context) {
        // context.beginPath();
        // context.moveTo(poly[0], poly[1]);
        //
        // for (let i = 2; i < 8; i += 2) {
        //   context.lineTo(poly[i], poly[i + 1]);
        //   console.log(poly[i], poly[i + 1]);
        // }
        // context.closePath();
        // // context.fillStyle = '#ff0834';
        // // context.strokeStyle = '#ff0834';
        // context.fill();
        // context.stroke();

        // 绘制2次贝塞尔曲线
        context.beginPath();
        context.moveTo(poly[0], poly[1]);
        for (let i = 2; i < 8; i += 2) {
          context.arc(poly[i], poly[i], 50, 270 * Math.PI / 180, 0, false);
          context.arcTo(x1,y1,x2,y2,10);
          // context.moveTo(300, 100);
          console.log(poly[i], poly[i + 1]);
        }
        context.strokeStyle = 'red';
        context.closePath();
        context.fill();
        context.stroke();
      },
      // 鼠标按下
      canvasDown(e) {
        console.log(e.clientX, e.clientY);
        // let canvasX = e.clientX - this.canvasdiv.getBoundingClientRect().left;
        // let canvasY = e.clientY - this.canvasdiv.getBoundingClientRect().top;
        // console.log(canvasX, canvasY);
      }
    }
  }
</script>

<style scoped>

</style>
