import "../css/index.scss"
import $ from "jquery";

$(document).ready(function () {
  var c = $("canvas");
  var ctx = c.get(0).getContext("2d");
  if (ctx) {
    var container = $(".container");
    var background = new Image();
    var sprite = new Image();
    background.src = "src/background.png";
    sprite.src = "src/sprite.png";
    var currBarsHeight = [265, 265, 265];
    var currBars = [[], [], []];
    var rings = ringsGenerator();
    $("#up").click(addDisc);
    $("#down").click(removeDisc);
    var AnimActive = false;
    render();
    $(".start-button").click(function () {
      var txt = $(".start-button").text() === "start" ? "reset" : "start";
      $(".start-button").text(txt);

      if (txt === "reset") {
        AnimActive = true;
        var steps = generateSolution(getDiscs());
        startSolution(steps);
      } else reset();
    });
  };

  function ringsGenerator(num = 5) {
    var arr = [];
    var y = 265;
    var size = num;
    var sx = 0;
    currBars[0] = [];
    currBarsHeight[0] = 265;
    for (let i = 1; i <= num; i++) {
      var obj = {};
      obj.x = 70;
      obj.y = y;
      obj.sx = sx;
      obj.size = size;
      y -= 15;
      size--;
      sx += 142;
      arr.push(obj);
      currBars[0].push(obj);
      currBarsHeight[0] -= 16;
    }
    return arr;
  }

  function addDisc() {
    if (!AnimActive) {
      var currentNum = getDiscs();
      if (currentNum + 1 >= 5 && currentNum + 1 <= 10) {
        $("#discs").attr("value", currentNum + 1);
        rings = ringsGenerator(currentNum + 1);
        render();
      }
    } else {
      reset();
      addDisc();
    }
  }

  function removeDisc() {
    if (!AnimActive) {
      var currentNum = getDiscs();
      if (currentNum - 1 >= 5 && currentNum - 1 <= 10) {
        $("#discs").attr("value", currentNum - 1);
        rings = ringsGenerator(currentNum - 1);
        render();
      }
    } else {
      reset();
      removeDisc();
    }
  }

  function moveDisc(from, to) {
    var animationStage = 0;
    var barsLocations = [70, 230, 390];
    var fromArr = currBars[from - 1];
    var toArr = currBars[to - 1];
    animate(fromArr[fromArr.length - 1], "y", 50, 250);

    //http://codular.com/animation-with-html5-canvas
    function animate(obj, prop, val, duration) {
      if (AnimActive) {
        var start = new Date().getTime();
        var end = start + duration;
        var current = obj[prop];
        var distance = val - current;

        function step() {
          var timestamp = new Date().getTime();
          var progress = Math.min(((duration - (end - timestamp)) / duration), 1);
          obj[prop] = current + (distance * progress);
          if (progress < 1) requestAnimationFrame(step);
          else if (animationStage === 0) {
            animationStage++;
            animate(fromArr[fromArr.length - 1], "x", barsLocations[to - 1], 250);
          } else if (animationStage === 1) {
            animationStage++;
            animate(fromArr[fromArr.length - 1], "y", currBarsHeight[to - 1], 250);
          } else if (animationStage === 2) {
            animationStage++;
            updateBars();
          }
        };
        step();
      }
    };

    function updateBars() {
      currBarsHeight[from - 1] += 16;
      currBarsHeight[to - 1] -= 16;
      toArr.push(fromArr[fromArr.length - 1]);
      fromArr.pop();
      if (AnimActive) $("#moves").text(parseInt($("#moves").text()) + 1);
    }
  }

  function wait(t) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, t)
    });
  }

  function getDiscs() {
    return parseInt($("#discs").attr("value"));
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    for (var ring of rings) {
      ctx.drawImage(sprite, ring.sx, 0, 142, 18, ring.x, ring.y, 142, 18);
    }
    requestAnimationFrame(render);
  };

  function reset() {
    AnimActive = false;
    wait(100).then(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currBarsHeight = [265, 265, 265];
      currBars = [[], [], []];
      rings = ringsGenerator(getDiscs());
      $("#moves").text(0);
      $(".start-button").text("start");
      return render();
    });
  }

  function startSolution(stps) {
    if (stps.length > 0 && AnimActive) {
      moveDisc(stps[0][0], stps[0][1]);
      stps.shift();
      wait(1000).then(function () {
        return startSolution(stps);
      });
    }
  }

  function generateSolution(num) {
    var arr = [];
    var currLocalBars = $.extend(true, [], currBars);
    var MINIMUM_STEPS = Math.pow(2, num) - 1;
    generateSteps();
    return arr;

    function generateSteps() {
      if (arr.length < MINIMUM_STEPS) {
        if (num % 2 === 0) {
          arr.push(checkMove(1, 2));
          arr.push(checkMove(1, 3));
          arr.push(checkMove(2, 3));
          return generateSteps();
        }
        arr.push(checkMove(1, 3));
        arr.push(checkMove(1, 2));
        arr.push(checkMove(2, 3));
        return generateSteps();
      }
    }

    function checkMove(x, y) {
      var barx = currLocalBars[x - 1];
      var bary = currLocalBars[y - 1];
      if (barx.length <= 0) {
        update(y, x);
        return [y, x];
      };
      if (bary.length <= 0) {
        update(x, y);
        return [x, y];
      };
      if (barx[barx.length - 1].size < bary[bary.length - 1].size) {
        update(x, y);
        return [x, y];
      };
      update(y, x);
      return [y, x];
    }

    function update(from, to) {
      var fromLocalArr = currLocalBars[from - 1];
      var toLocalArr = currLocalBars[to - 1];
      toLocalArr.push(fromLocalArr[fromLocalArr.length - 1]);
      fromLocalArr.pop();
    }
  }
});
