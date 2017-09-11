import "../css/index.scss"
import $ from "jquery";

$(document).ready(function () {
  var c = $("canvas");
  if (c.get(0).getContext("2d")) {
    var ctx = c.get(0).getContext("2d");
    var container = $(".container");
    var background = new Image();
    background.src = "src/background.png";
    var rings = ringsGenerator(2); //watch rings input

    render();
    animate(rings[0], "y", 50, 500);
    animate(rings[0], "x", 230, 500);
  }


  function ringsGenerator(num = 5) {
    var arr = [];
    var y = 265;
    for (let i = 1; i <= num; i++) {
      var obj = {};
      var img = new Image();
      img.src = "src/" + i + ".png";
      obj.image = img;
      obj.x = 70;
      obj.y = y;
      y -= 15;
      arr.push(obj);
    }
    return arr;
  }

  function render() {
    //height of each ring 16,height of base 265, bars are 70, 230 and 390
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    for (var ring of rings) {
      ctx.drawImage(ring.image, ring.x, ring.y)
    }
    //context.rect(square.x, square.y, square.width, square.height);
    requestAnimationFrame(render);
  };

  //http://codular.com/animation-with-html5-canvas
  function animate(obj, prop, val, duration) {
    var start = new Date().getTime();
    var end = start + duration;
    var current = obj[prop];
    var distance = val - current;

    var step = function () {
      var timestamp = new Date().getTime();
      var progress = Math.min((duration - (end - timestamp)) / duration, 1);
      obj[prop] = current + (distance * progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    return step();
  };
});
