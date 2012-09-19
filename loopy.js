function DrawBasics(clickEvent) {

  this.canvas = document.getElementById("tutorial");
  this.ctx = this.canvas.getContext('2d'); 
  this.degrees = 360;
  this.radians = (Math.PI/180)*this.degrees;

  this.stepColor = function(startPoint) {
    return Math.floor(255-42.5*(startPoint % 3));
  }
  

  this.relMouseCoords = function(){
      var totalOffsetX = 0;
      var totalOffsetY = 0;
      var canvasX = 0;
      var canvasY = 0;
      var currentElement = this.canvas;
  
      do{
          totalOffsetX += currentElement.offsetLeft;
          totalOffsetY += currentElement.offsetTop;
      }
      while(currentElement = currentElement.offsetParent)
  
      canvasX = clickEvent.pageX - totalOffsetX;
      canvasY = clickEvent.pageY - totalOffsetY;
  
      this.mouseCoords =  {x:canvasX, y:canvasY}
  }
  this.relMouseCoords();
  
  this.color = "rgb(" + this.stepColor(this.mouseCoords.y) + ", " + this.stepColor(this.mouseCoords.x) +", " + this.stepColor(Math.random() * 90) + ")";  

  this.makeArc = function(start) {

    this.ctx.beginPath();
    this.ctx.arc(this.mouseCoords.x, this.mouseCoords.y, start/2, 0, this.radians, true);
    this.ctx.closePath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    /*this.ctx.fillStyle = this.color;
    this.ctx.fill();*/
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
      ctx.drawImage(img,x,y);
    };
    img.src = './skull.png';
  }  
}



function Heart(clickEvent) {


  this.drawing = new DrawBasics(clickEvent);
  this.drawHeart = function() {
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
    ctx.fillStyle = "#F52C7D";
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
  this.drawing.color = "black";
  this.x = this.drawing.mouseCoords.x;
  this.y = this.drawing.mouseCoords.y;
  this.makeSkull = function(start) {
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
    ctx.strokeStyle = this.color;
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
     // ctx.strokeStyle = "white";
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
    for (var x = 2; x < 50; x++) {
      this.delayArc(x*20, 1);
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


     
