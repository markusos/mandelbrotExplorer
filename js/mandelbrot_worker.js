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
    var r = 0;
    var g = 0;
    var b = 0;
    if (n != maxn) {
    	var c = 3 * Math.log(n) / Math.log(maxn-1);
    	if (c < 1)
        {
        	b = c;
        }
        else if (c < 2)
        {
        	g = c-1;
        	b = 1;
        }
        else
        {
        	r = c-2;
        	g = 1;
         	b = 1;
        }
    }	
    return {
        r: math.floor(r * 255),
        g: math.floor(g * 255),
        b: math.floor(b * 255)
    };
}        
 
