
export default class CanvasUtil {
  /**
   *  cxt canvas
   *  x 圆心横坐标
   *  y 圆心纵坐标
   *  r 半径
   *  startAngle 开始角度
   *  endAngle 结束角度
   *  anticlockwise 是否逆时针方向绘制（默认false表示顺时针；true表示逆时针）
   * **/
  static drawStrokeCircle(cxt, x, y, r, startAngle, endAngle, anticlockwise, strokeStyle) {
    cxt.beginPath();
    cxt.arc(x, y, r, startAngle, endAngle, false);
    cxt.lineWidth = 1;
    cxt.strokeStyle = strokeStyle;
    cxt.stroke();// 画空心圆
    cxt.closePath();
  }
  /**
   * 函数的参数x,y为椭圆中心；a,b分别为椭圆横半轴、
   * 纵半轴长度，不可同时为0
   * 该方法的缺点是，当lineWidth较宽，椭圆较扁时
   * 椭圆内部长轴端较为尖锐，不平滑，效率较低
   * **/
  static paramEllipse(context, x, y, a, b) {
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
    context.closePath();
  }
}
