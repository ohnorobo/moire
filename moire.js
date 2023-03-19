var radiusIncrease = 20
var lineWeight = 10;
var colorJitter = 1;
var numCircles = 30;

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
    
    project.activeLayer = project.layers[0];
      
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
             
    project.activeLayer = project.layers[1];

    drawRing(moireRingsBlack,
             point.x,
             point.y,
             radius,
             'black',
             1)
  }
  
  var colorGroup = new Group(moireRingsColor);
  var blackGroup = new Group(moireRingsBlack);
  
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
