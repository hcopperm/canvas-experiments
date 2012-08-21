function arcBusiness(clickEvent) {
  this.clickEvent = clickEvent;
  this.degrees = 360;
  this.radians = (Math.PI/180)*this.degrees;

  this.stepColor = function(startPoint) {
    return Math.floor(255-42.5*(startPoint % 3));
  } 
  
  this.color = "rgb(" + this.stepColor(this.clickEvent.clientY) + ", " + this.stepColor(this.clickEvent.clientX) + ", 0)";  


  this.drawArcs = function() {
    for (var x = 0; x < 50; x++) {
      this.delayArc(x*20, 1);
    }
  }

  this.eraseArcs = function() {
    this.color = "red";
    for (var x = 50; x > 0; x--) {
      this.delayArc(x*20, -1);
    }
  }

  this.delayArc = function(start, delay) {
    var arc = this;
    setTimeout(function() {
     arc.makeArc(start); 
    }, (1000 + (start*delay)));
  }

  this.makeArc = function(start) {
    var ctx = document.getElementById('tutorial').getContext('2d');
    ctx.beginPath();
    ctx.arc((this.clickEvent.clientX), this.clickEvent.clientY, start/2, 0, this.radians, true);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  this.drawAndEraseArcs = function() {
    var arc = this;
    setTimeout(function() {
      arc.drawArcs();
     // setTimeout(function () {arc.eraseArcs()}, 2400);
    }, 3000);
  }

}
     
