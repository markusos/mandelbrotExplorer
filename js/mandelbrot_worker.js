importScripts('math.min.js');
var math = mathjs();
var canvasData;

onmessage = function(event) {
	mandelbrot(event.data);
}

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
			updatePixel(x, y, color.r, color.g, color.b, 255);
		}
	}
	postMessage(canvasData);
}

function updatePixel (x, y, r, g, b, a) {
	var index = (x + y * canvasData.width) * 4;
	canvasData.data[index + 0] = r;
	canvasData.data[index + 1] = g;
	canvasData.data[index + 2] = b;
	canvasData.data[index + 3] = a;
}

function getColor(n, maxn) {

  var palette = [
      {r:000,g:000,b:255},
      {r:000,g:000,b:225},
      {r:000,g:000,b:200},
      {r:000,g:000,b:175},
      {r:000,g:000,b:150},
      {r:000,g:000,b:125},
      {r:000,g:050,b:100},
      {r:000,g:075,b:075},
      {r:000,g:100,b:050},
      {r:000,g:125,b:000},
      {r:000,g:150,b:000},
      {r:000,g:175,b:000},
      {r:000,g:200,b:000},
      {r:000,g:225,b:000},
      {r:000,g:255,b:000},
      {r:000,g:225,b:000},
      {r:000,g:200,b:000},
      {r:000,g:175,b:000},
      {r:000,g:150,b:000},
      {r:000,g:125,b:000},
      {r:000,g:100,b:050},
      {r:000,g:075,b:075},
      {r:000,g:050,b:100},
      {r:000,g:000,b:125},
      {r:000,g:000,b:150},
      {r:000,g:000,b:175},
      {r:000,g:000,b:200},
      ];

  if (n === maxn) {
    return {r:0,g:0,b:0}  
  }    
  else {
    return palette[n%palette.length]
  }
}

