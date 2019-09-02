<template>
  <canvas id='canvas' width='1500' height='500'></canvas>
</template>

<script>
    export default {
      mounted() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        // 径向渐变
        let rg = ctx.createRadialGradient(380, 300, 150, 300, 300, 0);
        // 添加颜色
        // rg.addColorStop(0, 'white');
        // rg.addColorStop(0.6, 'blue');
        // rg.addColorStop(0.8, 'yellow');
        rg.addColorStop(1, 'red');
        ctx.fillStyle = rg;
        // 绘制一个圆形
        // ctx.beginPath();
        // ctx.arc(300, 300, 160, 0, Math.PI * 2);
        // ctx.fill();
        canvas.width = 800;
        canvas.height = 800;
        if (ctx.ellipse) {
          // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)是现在更新的，
          // 参数的意思：(起点x.起点y,半径x,半径y,旋转的角度，起始角，结果角，顺时针还是逆时针)
          ctx.ellipse(400, 400, 300, 200, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'red';
          ctx.strokeStyle = 'white';
          ctx.fill();
          ctx.stroke();
        } else {
          alert('no ellipse!');
        }
      }
    }
</script>

<style lang='scss' scoped>
canvas{
  border:1px solid black;
}
</style>
