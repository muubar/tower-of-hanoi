import "../css/index.scss"
import $ from "jquery";

$(document).ready(function () {
  var c = $("canvas");
  if (c.get(0).getContext("2d")) {
    var ctx = c.get(0).getContext("2d");
    var container = $(".container");
    var background = new Image();
    background.src = "src/background.png"
    render();
    //animate('x', 0, 1000);
  }


  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    //context.rect(square.x, square.y, square.width, square.height);
    requestAnimationFrame(render);
  };

  //http://codular.com/animation-with-html5-canvas
  /*function animate(obj, prop, val, duration) {
    // The calculations required for the step function
    var start = new Date().getTime();
    var end = start + duration;
    var current = obj[prop];
    var distance = val - current;

    var step = function () {
      // Get our current progres
      var timestamp = new Date().getTime();
      var progress = Math.min((duration - (end - timestamp)) / duration, 1);

      // Update the square's property
      obj[prop] = current + (distance * progress);

      // If the animation hasn't finished, repeat the step.
      if (progress < 1) requestAnimationFrame(step);
    };

    // Start the animation
    return step();
  };*/
});
