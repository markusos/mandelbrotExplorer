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
				z = math.add(math.multiply(z,z), c);
			
				n += 1;
			}

			co = n / settings.iter;
			updatePixel(x, y, 0, 0, parseInt(255* co), 255);	
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
        
 
