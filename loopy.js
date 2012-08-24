function DrawBasics(clickEvent) {

  this.canvas = document.getElementById("tutorial");
  this.ctx = this.canvas.getContext('2d'); 


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
}



function SquareBusiness(clickEvent) {
  this.drawing = new DrawBasics(clickEvent);
  this.drawSquare = function() {
    this.drawing.ctx.fillStyle = this.drawing.color;
    this.drawing.ctx.fillRect(this.drawing.mouseCoords.x, this.drawing.mouseCoords.y, 20, 20);    
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
    arc.makeArc(20);
    setTimeout(function() {
     arc.makeArc(start); 
    }, (start*delay));
  }

  this.makeArc = function(start) {
    this.drawing.ctx.beginPath();
    this.drawing.ctx.arc(this.drawing.mouseCoords.x, this.drawing.mouseCoords.y, start/2, 0, this.radians, true);
    this.drawing.ctx.closePath();
    this.drawing.ctx.lineWidth = 5;
    this.drawing.ctx.strokeStyle = this.drawing.color;
    this.drawing.ctx.stroke();
  }
}
     
