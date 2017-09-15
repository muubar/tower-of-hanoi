import "../css/index.scss"
import $ from "jquery";

$(document).ready(function () {
  var c = $("canvas");
  if (c.get(0).getContext("2d")) {
    var ctx = c.get(0).getContext("2d");
    var container = $(".container");
    var background = new Image();
    background.src = "src/background.png";
    var currBarsHeight = [265, 265, 265]; //initialize me on start
    var currBars = [[], [], []]; //initialize me on start
    var rings = ringsGenerator();
    $("#up").click(addDisc);
    $("#down").click(removeDisc);
    render();
    $(".start-button").click(function () {
      var test = [[1, 3], [1, 2], [2, 1], ];
      testy();

      function testy() {
        if (test.length > 0) {
          moveDisc(test[0][0], test[0][1]);
          test.shift();
          wait(1000).then(function () {
            return testy();
          });
        }
      }
    });

    function ringsGenerator(num = 5) {
      var arr = [];
      var y = 265;
      currBars[0] = [];
      currBarsHeight[0] = 265;
      for (let i = 1; i <= num; i++) {
        var obj = {};
        var img = new Image();
        img.src = "src/" + i + ".png";
        obj.image = img;
        obj.x = 70;
        obj.y = y;
        y -= 15;
        arr.push(obj);
        currBars[0].push(obj);
        currBarsHeight[0] -= 16;
      }
      return arr;
    }

    function addDisc() {
      var currentNum = parseInt($("#discs").attr("value"));
      if (currentNum + 1 >= 5 && currentNum + 1 <= 10) {
        $("#discs").attr("value", currentNum + 1);
        rings = ringsGenerator(currentNum + 1);
        render();
      }
    }

    function removeDisc() {
      var currentNum = parseInt($("#discs").attr("value"));
      if (currentNum - 1 >= 5 && currentNum - 1 <= 10) {
        $("#discs").attr("value", currentNum - 1);
        rings = ringsGenerator(currentNum - 1);
        render();
      }
    }

    function moveDisc(from, to) {
      //height of each ring 16,height of base 265, bars are 70, 230 and 390
      var animationStage = 0;
      var barsLocations = [70, 230, 390];
      var fromArr = currBars[from - 1];
      var toArr = currBars[to - 1];
      animate(fromArr[fromArr.length - 1], "y", 50, 250);

      //http://codular.com/animation-with-html5-canvas
      function animate(obj, prop, val, duration) {
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
      };

      function updateBars() {
        currBarsHeight[from - 1] += 16;
        currBarsHeight[to - 1] -= 16;
        toArr.push(fromArr[fromArr.length - 1]);
        fromArr.pop();
        $("#moves").text(parseInt($("#moves").text()) + 1);
      }
    }

    function wait(t) {
      return new Promise(function (resolve) {
        window.setTimeout(resolve, t)
      });
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
  };
});
