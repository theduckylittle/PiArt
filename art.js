/** Draw Pi
 *
 *  Please see LICENSE for usage terms
 *
 *  (c) 2016, Dan "Ducky" Little
 *
 */

var CONFIG = {
	glyphSize: 40 //65
};

// Add all the extra digits needed to calulate Pi
Big.DP = 300;


/** Return a 'rect' which is a full cell.
 * 
 *  @param x X position
 *  @param y Y position
 *
 *  @returns an Element,
 */
function drawFull(x,y) {
	var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	rect.setAttribute('width', CONFIG.glyphSize);
	rect.setAttribute('height', CONFIG.glyphSize);
	rect.setAttribute('x', x);
	rect.setAttribute('y', y);
	return rect;
}

/** Return a 'triangle' filling the upper left corner.
 * 
 *  @param x X position
 *  @param y Y position
 *
 *  @returns an Element,
 */
function drawLeft(x, y) {
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	var gs = CONFIG.glyphSize;

	var tri = ['M',x,y,'L',x+gs,y,'L',x,y+gs,'z'];

	path.setAttribute('d', tri.join(' '));

	return path;
}


/** Return a 'triangle' filling the upper right corner.
 * 
 *  @param x X position
 *  @param y Y position
 *
 *  @returns an Element,
 */
function drawRight(x, y) {
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	var gs = CONFIG.glyphSize;

	var tri = ['M',x+gs,y,'L',x+gs,y+gs,'L',x,y+gs,'z'];

	path.setAttribute('d', tri.join(' '));

	return path;
}


/** Create a random number between 0-255.
 *
 *  @returns a random number between 0 and 255
 */
function rand255() {
	return Math.ceil(Math.random() * 255);
}

/** Get a CSS rgb() colour.
 *
 *  @returns a string formatted as 'rgb(r,g,b)'
 */
function getColor() {
	var r = rand255();
	var g = rand255();
	var b = rand255();
	return 'rgb(' + [r,g,b].join(',') +')';
}

/** Changes the colours of the rects;
 */
function paint() {
	var svg = document.getElementById('canvas');
	var rects = svg.childNodes;
	var greens = ['#543005','#8c510a','#bf812d','#dfc27d','#f6e8c3','#c7eae5','#80cdc1','#35978f','#01665e','#003c30'];

	var brown_purples = ['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b'];

	var red_blues = ['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2'];

	var colors = brown_purples;

	for(var i = 0; i < rects.length; i++) {
		var obj = rects[i];
		//var color = getColor();
		var color = colors[rects[i].digit];
		obj.style.fill = color;
		obj.style.stroke = color;
	}
}

/** Get pi
 *
 *  @param k The index of the number of pi.
 *
 */
function pi(k) {
	var acht = 8.0 * k;
	var top_a = new Big(4).div(acht + 1);
	var top_b = new Big(2).div(acht + 4);
	var top_c = new Big(1).div(acht + 5);
	var top_d = new Big(1).div(acht + 6);

	var m = top_a.minus(top_b).minus(top_c).minus(top_d);

	var p = new Big(16).pow(-1 * k);
	m = m.times(p)

	if(k == 0) { return m; }
	return m.plus(pi(k - 1));
}

/** Main drawing function, creates the shapes based on the
 *  functions given.
 */
function draw() {
	var svg = document.getElementById('canvas');
	var w = window.innerWidth;
	var h = window.innerHeight;
	var gs = CONFIG.glyphSize;

	var n_rows = Math.ceil(h / gs);
	var n_cols = Math.ceil(w / gs);

	var pi_string = pi(n_rows * n_cols).toString();

	var i = 2;
	for(var row = 0; row < n_rows; row++) {
		for(var col = 0; col < n_cols; col++) {
			// generate the pixel x,y coordinates
			var x = col * gs, y = row * gs;
			// get an individual digit of pi
			var digit = pi_string.substring(i, i+1);

			// created this as a variable in order to
			//  let it be changed.
			var glyph = drawFull;

			// reate the glyph
			var g = glyph(x,y);
			g.digit = digit;
			svg.appendChild(g);

			i+=1;
		}
	}


	//setInterval(paint, 2000);
	paint();
}
