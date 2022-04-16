namespace("Circle",["BoundsBox"],(ns) => {
  return function(cx,cy,r,color) {
    
    this.drawOn = ((context,stroke) => {
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(cx,cy,r,0,2*Math.PI);
      if (stroke) {
        context.stroke();
      } else {
        context.fill();
      }
    });
    
    this.translate = ((x1,y1) => {
      cx += x1;
      cy += y1;
    });
    
    this.getBounds = (() => new ns.BoundsBox.fromCirc(cx,cy,r));
    
    let moveToHandlers = {
      top: (moveTo) => { cy = moveTo + r; },
      left: (moveTo) => { cx = moveTo + r; },
      bottom: (moveTo) => { cy = moveTo - r; },
      right: (moveTo) => { cx = moveTo - r; },
    };

    this.moveSideTo = function(side,moveTo) {
      moveToHandlers[side](moveTo)
    };

    
  }
});