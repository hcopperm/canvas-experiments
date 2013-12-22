relMouseCoords = function(clickEvent, el){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = el.canvas;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = clickEvent.pageX - totalOffsetX;
    canvasY = clickEvent.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
function DrawBasics(clickEvent) {

  this.canvas = document.getElementById("tutorial");
  console.log("hiii");
  this.tutorial_div = $("#tutorial_div");
  this.ctx = this.canvas.getContext('2d');
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
  this.hsv_to_rgb((this.mouseCoords.x/1000), Math.random(), 0.95);
  this.color = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";

  this.makeArc = function(start) {

    this.ctx.beginPath();
    this.ctx.arc(this.mouseCoords.x, this.mouseCoords.y, start/2, 0, this.radians, true);
    this.ctx.closePath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }
}

function ImageStamp(clickEvent) {
  this.drawing = new DrawBasics(clickEvent);
  this.draw = function() {
    var img = new Image();
    var ctx = this.drawing.ctx;
    var x = this.drawing.mouseCoords.x;
    var y = this.drawing.mouseCoords.y;
    img.onload = function(){
      ctx.drawImage(img,x-60,y-60);
    };
    img.src = './dino.png';
  }
}

function randomizeCoords(mouseCoords) {
  var newX = (mouseCoords.x - (Math.random() * 100));
  var newY = (mouseCoords.y + (Math.random() * 100));
  return {x:newX, y:newY};

}

function Line(clickEvent) {
  var drawBasics = new DrawBasics(clickEvent);
  this.drawLine = function(color) {
    var line = this;
    line.downCoords = relMouseCoords(clickEvent, drawBasics);
    line.downCoords = randomizeCoords(line.downCoords);
    drawBasics.tutorial_div.mouseup(function(upEvent) {
      drawBasics.tutorial_div.unbind("mouseup");
      line.upCoords = relMouseCoords(upEvent, drawBasics);
      line.upCoords = randomizeCoords(line.upCoords);
      drawBasics.ctx.beginPath();
      drawBasics.ctx.moveTo(line.downCoords.x, line.downCoords.y);
      drawBasics.ctx.lineTo(line.upCoords.x, line.upCoords.y);
      drawBasics.ctx.strokeStyle = color;
      drawBasics.ctx.stroke();
    });
  }
}



function Heart(clickEvent) {


  this.drawing = new DrawBasics(clickEvent);
  this.drawHeart = function(color) {
    var ctx = this.drawing.ctx;
    var x = this.drawing.mouseCoords.x;
    var y = this.drawing.mouseCoords.y;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - 3, x - 5, y - 15, x - 25, y - 15);
    ctx.bezierCurveTo(x - 55, y - 15, x - 55, y + 22.5, x - 55, y + 22.5);
    ctx.bezierCurveTo(x - 55, y + 40, x - 35, y + 62, x, y + 80);
    ctx.bezierCurveTo(x + 35, y + 62, x + 55, y + 40, x + 55, y + 22.5);
    ctx.bezierCurveTo(x + 55, y + 22.5, x + 55, y - 15, x + 25, y - 15);
    ctx.bezierCurveTo(x + 10, y - 15, x, y - 3, x, y);
    ctx.fillStyle = color;
    ctx.fill();
  }
}


function SquareBusiness(clickEvent) {
  this.drawing = new DrawBasics(clickEvent);
  this.drawSquare = function() {
    this.drawing.ctx.fillStyle = this.drawing.color;
    this.drawing.ctx.fillRect(this.drawing.mouseCoords.x, this.drawing.mouseCoords.y, 20, 20);
  }
}

function Skull(clickEvent) {
  this.drawing = new DrawBasics(clickEvent);
  this.x = this.drawing.mouseCoords.x;
  this.y = this.drawing.mouseCoords.y;
  this.makeSkull = function(color) {
    this.drawing.color = color;
    this.drawing.hsv_to_rgb(0.1, 0.2, 0.1);
    this.makeCranium(65);
    this.makeJaw();
    this.makeMouth();
    this.makeEyes();
    this.makeNose();
    this.makeTeeth();
  }

  this.makeCranium = function(start) {
    var ctx = this.drawing.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, start/2, (Math.PI/180) * 48, (Math.PI/180) * 132, true);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.drawing.color;
    ctx.stroke();
  }

  this.makeJaw = function() {
    var ctx = this.drawing.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y+30, 23, (Math.PI/180)*195, (Math.PI/180)*345, true);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.drawing.color;
    ctx.stroke();
  }

  this.makeEyes = function() {
    this.makeEye(12);
    this.makeEye(-12);
  }

  this.makeEye = function(place) {
    var ctx = this.drawing.ctx;
    ctx.beginPath();
    ctx.arc(this.x - place, this.y + 9.5, 10, 0, this.drawing.radians, true);
    ctx.closePath();
    ctx.stroke();
  }

  this.makeNose = function() {
    var ctx = this.drawing.ctx;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 19);
    ctx.lineTo(this.x - 4, this.y + 29);
    ctx.lineTo(this.x + 4, this.y + 29);
    ctx.closePath();
    ctx.stroke();

  }

  this.makeMouth = function() {
    var ctx = this.drawing.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y - 126, 170, (Math.PI/180)*96, (Math.PI/180)*83, true);
    ctx.lineWidth = 1.75;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x, this.y - 134, 170, (Math.PI/180)*98, (Math.PI/180)*82, true);
    ctx.stroke();
  }

  this.makeTeeth = function() {
    var ctx = this.drawing.ctx;
    var z = -20;
    while (z <= 20) {
      ctx.beginPath();
      ctx.moveTo(this.x + z, this.y+36);
      ctx.lineTo(this.x + z, this.y+43);
      ctx.stroke();
      z += 5;
    }
  }


}



function ArcBusiness(clickEvent) {
  this.drawing = new DrawBasics(clickEvent);
  this.degrees = 360;
  this.radians = (Math.PI/180)*this.degrees;



  this.drawArcs = function() {
    //for (var x = 2; x < 80; x++) {
    var x = 0;
    while ((x*20)/2 < this.drawing.canvas.width) {
      this.delayArc(x*20, 1);
      x += 1;
    }
  }

  this.eraseArcs = function() {
    for (var x = 50; x > 0; x--) {
      this.delayArc(x*20, -1);
    }
  }

  this.delayArc = function(start, delay) {
    var arc = this;
    arc.drawing.makeArc(20);
    setTimeout(function() {
      arc.drawing.makeArc(start);
    }, (start*delay));
  }

}



