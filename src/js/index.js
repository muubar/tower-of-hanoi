import "../css/index.scss"
import $ from "jquery";

$(document).ready(function () {
  var c = $("canvas");
  var ctx = c.get(0).getContext("2d");
  var container = $(".container");
  var img = new Image();
  img.src = "src/background.png"
  var ring = new Image();
  ring.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADaCAMAAAC/1eRAAAAAIVBMVEX///9vb29/f3+Pj4+fn5+vr6+/v7/Pz8/v7+////////9bPBWGAAAACnRSTlMAAQMFCREaKFV2tbMWLgAAAfNJREFUeAHt3UG2nCAQBVBaWuSx/wVnlEGSY0wm/1frvVt4h7JEKVpNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABs+zhyK8fYt/aR+kjWTSWjt4+yz6yby3y3D9Fn1iNk9lbfSNZjJKN8HOthSkfyznqgvFtNr5n1SJkv1eqKujWzHiyz1bJlPVw2T/Mznu1H1iKHPCQij4tE5CGRf3+ee7Lrd3W/Wb8g7VvN9Rum/Sv7Wj+9svhDXgqWonXV8ep9dVg6rbE4MWotEGKBWCIWSLEl0rM4lV7rHYSpYj28Zu2Lv9prVSymivXomtUXF3qtt0JGrYpFnhyIQBaX2hfaFpe2Wq+F7M9tsrRZx+LSUavJIgIRCAL5XwJBIAI5FpeOWi+GjFpbJ+y1NhfZam2/U+YDFb4YCmSsC4xavwHRS/0oR2r9Ssqs9bM1b8cRSokDO7VMR9pKSXfos5Q4Fl3LMDiglBitYYFYIudiPJPxTN5Fzk0j/oz4MwTzVIYxsQqWTutUjBo3alzv+0Udr+sqXCAiD4m4hEoenuyuxN2y9LuluHq1FpcT1+L67pJccK9uqVaXRrIeIxmtvj6zHiGztw+x3z+TzL19lH7j2pWM3j7Sto8jt3KMfWs3BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAx3vpEFpZA8QAAAAASUVORK5CYII=";

  img.addEventListener("load", function () {
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(ring, 0, 0, 400, 218, 94, 248, 100, 50);
  });
  window.requestAnimationFrame(draw);
});


var animate = function(prop, val, duration) {
  // The calculations required for the step function
  var start = new Date().getTime();
  var end = start + duration;
  var current = square[prop];
  var distance = val - current;

  var step = function() {
    // Get our current progres
    var timestamp = new Date().getTime();
    var progress = Math.min((duration - (end - timestamp)) / duration, 1);

    // Update the square's property
    square[prop] = current + (distance * progress);

    // If the animation hasn't finished, repeat the step.
    if (progress < 1) requestAnimationFrame(step);
  };

  // Start the animation
  return step();
};

function draw() {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.save();
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
