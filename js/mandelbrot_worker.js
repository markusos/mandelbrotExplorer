importScripts('math.min.js');
var math = mathjs();
var canvasData;

onmessage = function(event) {
    mandelbrot(event.data);
};

function mandelbrot(settings) {
    var n;
    var z;
    var center = math.complex(settings.cx, settings.cy);
    canvasData = settings.canvasData;

    for (var x = 0; x < settings.canvasWidth; x++){
        for (var y = 0; y < settings.canvasHeight; y++) {
            n = 0;
            z = math.complex(0, 0);
            xi = (x-settings.canvasWidth/2) / (settings.zoom * (settings.canvasWidth/2));
            yi = (y-settings.canvasHeight/2) / (settings.zoom * (settings.canvasHeight/2));
            c = math.add(center, math.complex(xi, yi));

            while (math.abs(z) < 2 && n < settings.iter) {
                ztemp = math.add(math.multiply(z,z), c);
        if (z === ztemp) {
          n = settings.iter;
          break;
        }
        z = ztemp;
                n += 1;
            }

            var color = getColor(n, settings.iter);
            updatePixel(x, y, color);
        }
    }
    postMessage(canvasData);
}

function updatePixel (x, y, color) {
    var index = (x + y * canvasData.width) * 4;
    canvasData.data[index + 0] = color.r;
    canvasData.data[index + 1] = color.g;
    canvasData.data[index + 2] = color.b;
    canvasData.data[index + 3] = 255;
}

function getColor(n, maxn) {

  var palette = [
      {r:0,g:0,b:255},
      {r:0,g:0,b:225},
      {r:0,g:0,b:200},
      {r:0,g:0,b:175},
      {r:0,g:0,b:150},
      {r:0,g:0,b:125},
      {r:0,g:50,b:100},
      {r:0,g:75,b:75},
      {r:0,g:100,b:50},
      {r:0,g:125,b:0},
      {r:0,g:150,b:0},
      {r:0,g:175,b:0},
      {r:0,g:200,b:0},
      {r:0,g:225,b:0},
      {r:0,g:255,b:0},
      {r:0,g:225,b:0},
      {r:0,g:200,b:0},
      {r:0,g:175,b:0},
      {r:0,g:150,b:0},
      {r:0,g:125,b:0},
      {r:0,g:100,b:50},
      {r:0,g:75,b:75},
      {r:0,g:50,b:100},
      {r:0,g:0,b:125},
      {r:0,g:0,b:150},
      {r:0,g:0,b:175},
      {r:0,g:0,b:200},
      ];

  if (n === maxn) {
    return {r:0,g:0,b:0}
  }
  else {
    return palette[n%palette.length]
  }
}
