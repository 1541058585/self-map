<template>
  <canvas id="myCanvas" width="1200" height="800" style="border:1px solid #c3c3c3;"></canvas>
</template>

<script>
  export default {
    mounted() {
      // 径向渐变createRadialGradient(X1,Y1,Z1,X2,Y2,Z2)需要传递的参数有6个，X1,Y1,Z1分别代表起始圆的圆心和半径，X2,Y2,Z2分别代表结束圆的圆心和半径。具体示例如下：
      let canvasEle = document.querySelector('#myCanvas');
      let context = canvasEle.getContext('2d');
      let radialGradient = context.createRadialGradient(350, 50, 50, 350, 50, 0); // createRadialGradient创建线性渐变（用在画布内容上）
      radialGradient.addColorStop(1, 'red'); // addColorStop规定渐变对象中的颜色和停止位置
      radialGradient.addColorStop(0, 'white');
      context.fillStyle = radialGradient; // fillStyle设置或返回用于填充绘画的颜色、渐变或模式
      context.fillRect(300, 0, 100, 100); // fillRect绘制“被填充”的矩形
    }
  }
</script>

<style scoped>

</style>
