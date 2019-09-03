<template>
  <canvas id='canvas' width='1500' height='800' style="border:1px solid #c3c3c3;"></canvas>
</template>

<script>
    import CanvasUtil from '@/utils/CanvasUtil.js'
    export default {
        mounted() {
          let canvas = document.getElementById('canvas');
          let cxt = canvas.getContext('2d');
          // 画一个空心圆
          cxt.beginPath();
          cxt.arc(500, 300, 100, 0, 360, false);
          cxt.lineWidth = 2;
          cxt.strokeStyle = '#ff0834';
          cxt.stroke();// 画空心圆
          cxt.closePath();

          cxt.beginPath();
          cxt.arc(500, 300, 150, 0, 360, false);
          cxt.lineWidth = 2;
          cxt.strokeStyle = '#ff8c35';
          cxt.stroke();// 画空心圆
          cxt.closePath();

          cxt.beginPath();
          cxt.arc(500, 300, 200, 0, 360, false);
          cxt.lineWidth = 2;
          cxt.strokeStyle = '#1fca04';
          cxt.stroke();// 画空心圆
          cxt.closePath();
        },
      methods: {
        paramEllipse(context, x, y, a, b) {
          // max是等于1除以长轴值a和b中的较大者
          // i每次循环增加1/max，表示度数的增加
          // 这样可以使得每次循环所绘制的路径（弧线）接近1像素
          let step = (a > b) ? 1 / a : 1 / b;
          context.beginPath();
          context.moveTo(x + a, y); // 从椭圆的左端点开始绘制
          for (let i = 0; i < 2 * Math.PI; i += step) {
            // 参数方程为x = a * cos(i), y = b * sin(i)，
            // 参数为i，表示度数（弧度）
            context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
          }
          context.lineWidth = 5;
          context.strokeStyle = '#ff0834';
          context.closePath();
        }
      }
    }
</script>

<style scoped>

</style>
