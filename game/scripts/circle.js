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
    
    this.getBounds = (() => new ns.BoundsBox(cx - r, cy - r, cx + r, cy + r));
    
  }
});