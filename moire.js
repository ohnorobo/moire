var radiusIncrease = 20
var lineWeight = 10;
var colorJitter = 2;

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
  var moireRings = []
  
  for (var i = 0; i < 75; i++) {
    radius = i * radiusIncrease;
    drawRing(moireRings,
             point.x-colorJitter*2,
             point.y,
             radius,
             'cyan',
             0.75)
    drawRing(moireRings,
             point.x-colorJitter,
             point.y,
             radius,
             'blue',
             0.75) 
    drawRing(moireRings,
             point.x+colorJitter*2,
             point.y,
             radius,
             'yellow',
             0.75) 
    drawRing(moireRings,
             point.x+colorJitter,
             point.y,
             radius,
             'red',
             0.75)

    drawRing(moireRings,
             point.x,
             point.y,
             radius,
             'black',
             1) 
  }
  return moireRings;
}

function moveMoire(moire, point) {
  for (var i = 0; i < moire.length; i++) {
    var ring = moire[i];
    ring.position = point
  }
}

var centerPoint = paper.view.center;

var moire1 = drawMoire(centerPoint);
var moire2 = drawMoire(centerPoint);

view.onMouseMove = function(event) {
  var avgX = (event.point.x + centerPoint.x) / 2;
  var avgY = (event.point.y + centerPoint.y) / 2;
  var avgPoint = new Point(avgX, avgY);

  moveMoire(moire2, avgPoint);
}

