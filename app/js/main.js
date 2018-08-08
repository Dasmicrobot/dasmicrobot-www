(function (window, document) {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var defaults = {
    x: 0,
    y: canvas.height,
    speed: 1,
    angle: 90,
    length: 10,
    speedChangeRate: 1.01,
    angleChangeRate: 1.001,
    lengthChangeRate: 1.05,
    width: 1,
    widthChangeRate: 1
  }

  function Line(props) {
    this.x = props.x;
    this.y = props.y;
    this.angle = props.angle; // 0 - 06:00, 90 - 03:00, 180 - 12:00, 270 - 09:00
    this.length = props.length;
    this.color = "Green";
    this.width = props.width;
  }

  Line.prototype = {
    constructor: Line,
    getAngle: function(){
      return this.angle % 360 * Math.PI / 180;
    },
    getEndCoords: function () {
      return {
        x: Math.sin(this.getAngle()) * this.length + this.x,
        y: Math.cos(this.getAngle()) * this.length + this.y
      };
    },
    move: function (delta) {
      this.x = Math.sin(this.getAngle()) * delta + this.x;
      this.y = Math.cos(this.getAngle()) * delta + this.y;
    }
  };

  var line = new Line(defaults)
  var speed = defaults.speed;
  ctx.strokeStyle = line.color;
  ctx.lineWidth = line.width;

  function drawLine() {
    ctx.beginPath();
    var endCoords = line.getEndCoords();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.stroke();
  }

  function moveLine() {

    line.move(speed);

    line.width *= defaults.widthChangeRate;
    line.angle *= defaults.angleChangeRate;
    line.length *= defaults.lengthChangeRate;
    speed *= defaults.speedChangeRate;
    ctx.lineWidth = line.width;

    if (line.y < 0 || line.y > canvas.height || line.x < 0 || line.x > canvas.width) {
      speed = defaults.speed;
      line.x = defaults.x;
      line.y = defaults.y;
      line.angle = defaults.angle;
      line.length = defaults.length;
      line.width = defaults.width;
    }
  }

  function loop() {
    // clear old frame;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveLine();
    drawLine();
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);

}(window, document));



