var radiusIncrease = 40;
var lineWeight = 20;
var colorJitter = 3;
var numCircles = 30;

var blackLayer = new paper.Layer({ name: "black" });
paper.project.addLayer(blackLayer);
var colorLayer = new paper.Layer({ name: "color" });
paper.project.addLayer(colorLayer);

function drawRing(set, x, y, radius, color, opacity) {
  var ring = new Path.Circle({
        center: [x, y],
        radius: radius,
        strokeColor: color
    });
    ring.strokeWidth = lineWeight;
    ring.opacity = opacity;
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
             0.5)
    drawRing(moireRingsColor,
             point.x-colorJitter,
             point.y,
             radius,
             'blue',
             0.5) 
    drawRing(moireRingsColor,
             point.x+colorJitter*2,
             point.y,
             radius,
             'yellow',
             0.5) 
    drawRing(moireRingsColor,
             point.x+colorJitter,
             point.y,
             radius,
             'red',
             0.5)

    drawRing(moireRingsBlack,
             point.x,
             point.y,
             radius,
             'black',
             1)
  }

  var colorLayer = project.layers['color'];
  colorLayer.activate();
  var colorGroup = new Group(moireRingsColor);

  var blackLayer = project.layers['black'];
  blackLayer.activate();
  var blackGroup = new Group(moireRingsBlack);
  blackLayer.bringToFront();
  
  moires = [blackGroup, colorGroup];
  return moires;
}

function moveMoire(moire, point) {
  moire[0].position = point;
  moire[1].position = point;
}

var centerPoint = paper.view.center;

project.addLayer(new Layer());

var moire1 = drawMoire(centerPoint);
var moire2 = drawMoire(centerPoint);

view.onMouseMove = function(event) {
  var avgX = (event.point.x + centerPoint.x) / 2;
  var avgY = (event.point.y + centerPoint.y) / 2;
  var avgPoint = new Point(avgX, avgY);

  moveMoire(moire1, avgPoint);
}
