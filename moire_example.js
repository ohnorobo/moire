var radiusIncrease = 40;
var lineWeight = 20;
var colorJitter = 3;
var numCircles = 30;
var colorJitterOpacity = .75;

// For later access
var moire1;
var moire2;

function drawRing(set, x, y, radius, color, opacity) {
  var ring = new paper.Path.Circle({
        center: [x, y],
        radius: radius,
        strokeColor: color
  });
  ring.strokeWidth = lineWeight;
  ring.opacity = opacity;
  ring.blendMode = 'multiply';
  set.push(ring);
}

function drawMoire(point) {
  var moireRingsBlack = []
  var moireRingsColor = [];
  for (var i = 0; i < numCircles; i++) {
    radius = i * radiusIncrease;
      
    drawRing(moireRingsColor,
              point.x-colorJitter*2,
              point.y,
              radius,
              'cyan',
              colorJitterOpacity)
    drawRing(moireRingsColor,
              point.x-colorJitter,
              point.y,
              radius,
              'blue',
              colorJitterOpacity) 
    drawRing(moireRingsColor,
              point.x+colorJitter*2,
              point.y,
              radius,
              'yellow',
              colorJitterOpacity) 
    drawRing(moireRingsColor,
              point.x+colorJitter,
              point.y,
              radius,
              'red',
              colorJitterOpacity)

    drawRing(moireRingsBlack,
              point.x,
              point.y,
              radius,
              'black',
              1)
  }

  var colorLayer = paper.project.layers['color'];
  colorLayer.activate();
  var colorGroup = new paper.Group(moireRingsColor);

  var blackLayer = paper.project.layers['black'];
  blackLayer.activate();
  var blackGroup = new paper.Group(moireRingsBlack);
  blackLayer.bringToFront();
  
  moires = [blackGroup, colorGroup];
  return moires;
}

function moveMoire(moire, point) {
  moire[0].position = point;
  moire[1].position = point;
}

function setupScene() {
  var blackLayer = new paper.Layer({ name: "black" });
  paper.project.addLayer(blackLayer);
  var colorLayer = new paper.Layer({ name: "color" });
  paper.project.addLayer(colorLayer);

  var centerPoint = paper.view.center;

  paper.project.addLayer(new paper.Layer());

  moire1 = drawMoire(centerPoint);
  moire2 = drawMoire(centerPoint);
}

function moveMoire(e) {
  if (Array.isArray(e)) {
    return;
  }

  var centerPoint = paper.view.center;

  console.log("logging event", e);
  console.log(e.event.x, e.event.y, centerPoint)

  var avgX = (e.event.x + centerPoint.x) / 2;
  var avgY = (e.event.y + centerPoint.y) / 2;
  var avgPoint = new paper.Point(avgX, avgY);

  moveMoire(moire1, avgPoint);

  console.log("new moire", moire1);

  paper.view.update();
}

window.onload = function() {
  var canvas = document.getElementById('paperCanvas');
  paper.setup(canvas);

  setupScene();

  paper.view.draw();

  var tool = new paper.Tool();
  tool.onMouseMove = moveMoire;
}