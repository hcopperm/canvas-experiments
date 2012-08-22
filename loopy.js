function arcBusiness(clickEvent) {
  this.clickEvent = clickEvent;
  this.degrees = 360;
  this.radians = (Math.PI/180)*this.degrees;
  this.ctx = document.getElementById('tutorial').getContext('2d');

  this.stepColor = function(startPoint) {
    return Math.floor(255-42.5*(startPoint % 3));
  } 
  
  this.color = "rgb(" + this.stepColor(this.clickEvent.clientY) + ", " + this.stepColor(this.clickEvent.clientX) +", " + this.stepColor(Math.random() * 90) + ")";  


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
    this.ctx.beginPath();
    this.ctx.arc((this.clickEvent.clientX), this.clickEvent.clientY, start/2, 0, this.radians, true);
    this.ctx.closePath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }
}
     
