// mouse coordinates
// accounting for the size of the browser
// as well as the size of the window
relMouseCoords = function(clickEvent, el){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = canvas;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = clickEvent.pageX - totalOffsetX;
    canvasY = clickEvent.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
};

// global objects
var canvas = undefined;
var ctx = undefined;
$(function() {
  // Only initialize once the document is ready. (Thanks, jQuery!)
  canvas = document.getElementById("tutorial");
  ctx = canvas.getContext('2d');
});

// basic object
function DrawBasics(clickEvent) {

  this.tutorial_div = $("#tutorial_div");
  this.degrees = 360;
  this.radians = (Math.PI/180)*this.degrees;

  this.stepColor = function(startPoint) {
    return Math.floor(255-42.5*(startPoint % 3));
  }

  this.mouseCoords = relMouseCoords(clickEvent, this);

  this.hsv_to_rgb = function(h, s, v) {
    var h_i = parseInt(h*6);
    var f = h*6 - h_i;
    var p = v * (1 - s);
    var q = v * (1 - f*s);
    var t = v * (1 - (1 - f) * s);
    var r;
    var g;
    var b;
    if (h_i==0) {
      r = v;
      g = t;
      b = p;
    }
    if (h_i==1) {
      r = q;
      g = v;
      b = p;
    }
    if (h_i == 2) {
      r = p;
      g = v;
      b = t;
    }
    if (h_i == 3) {
      r = p;
      g = q;
      b = v;
    }
    if (h_i == 4) {
      r = t;
      g = p;
      b = v;
    }
    if (h_i == 5) {
      r = v;
      g = p;
      b = q;
    }
    this.r = parseInt(r * 256);
    this.g = parseInt(g * 256);
    this.b = parseInt(b * 256);
  }

  // set the color semi-randomly
  // it takes the x coords of the click event as the hue value
  this.hsv_to_rgb((this.mouseCoords.x/1000), Math.random(), 0.95);
  this.color = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";

  // drawing a circle
  this.makeArc = function(start, offsets) {
    ctx.beginPath();
    ctx.arc(this.mouseCoords.x, this.mouseCoords.y, start/2, 0, this.radians, true);
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    if (parseInt(offsets.x)) {
      this.mouseCoords.x += parseInt(offsets.x);
    }

    if (parseInt(offsets.y)) {
      this.mouseCoords.x += parseInt(offsets.y);
    }
  }
};

// the circle object
// wait i just realized i am instantiating DrawBasics on every click
// ut ohs, changing
function ArcBusiness(clickEvent) {
  this.drawing = new DrawBasics(clickEvent);
  this.degrees = 360;

  this.drawArcs = function(offsets) {
    var x = 0;
    while ((x*20)/2 < canvas.width) {
      this.delayArc(x*20, 1, offsets);
      x += 1;
    }
  };

  this.delayArc = function(start, delay, offsets) {
    var arc = this;
    setTimeout(function() {
      arc.drawing.makeArc(start, offsets);
    }, (start*delay));
  };

}
