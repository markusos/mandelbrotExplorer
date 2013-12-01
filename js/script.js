var canvasContext;
var settings;
	
$(document).ready(function(){
	init();
	update();
})

function init() {
	$('#mandelbrotCanvas').bind( "mousedown", function(e){ canvasClick(e); } );
		
	$('#settings').submit(function () {
	settings.cx = parseFloat($('#centerx').val());
		settings.cy = parseFloat($('#centery').val());
		settings.zoom = parseFloat($('#zoom').val());
		settings.iter = parseInt($('#iterations').val());
		update();
		return false;
	});

	$('#spinner').hide();
	settings = new Object();

	settings.zoom = 0.8;
	settings.cx = -0.6;
	settings.cy = 0;
	settings.iter = 50;
	
	var canvas = document.getElementById("mandelbrotCanvas");
	settings.canvasWidth = canvas.width;
	settings.canvasHeight = canvas.height;

	canvasContext = canvas.getContext("2d")
	settings.canvasData = canvasContext.getImageData(0, 0, settings.canvasWidth, settings.canvasHeight)
}

function update() {
	$('#centerx').val(settings.cx);
	$('#centery').val(settings.cy);
	$('#zoom').val(settings.zoom);
	$('#iterations').val(settings.iter);

	var worker = new Worker("js/mandelbrot_worker.js");
	$('#spinner').show();
	worker.postMessage(settings);
	worker.onmessage = function (event) {
     	canvasContext.putImageData(event.data, 0, 0);
     	$('#spinner').hide(); 
    };

}

function canvasClick( e ){
	var x = e.offsetX;
	var y = e.offsetY;

	settings.cx = (x-settings.canvasWidth/2) / (settings.zoom * (settings.canvasHeight/2)) + settings.cx;
	settings.cy = (y-settings.canvasHeight/2) / (settings.zoom * (settings.canvasHeight/2)) + settings.cy;
	settings.zoom = settings.zoom * 2;

	update();
}
