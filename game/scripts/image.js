namespace("Image",["BoundsBox"],(ns) => {
  return function(imgsrc,x,y,width,height) {
    
    let imgObj = document.createElement("img");
    imgObj.src = imgsrc;
    let crop = null;
    if (arguments.length == 9) {
      crop = {
        x: arguments[5],
        y: arguments[6],
        width: arguments[7],
        height: arguments[8]
      };
    }
    
    this.drawOn = ((context) => {
      context.fillStyle = color;
      if ((typeof crop) == "object") {
        context.drawImage(image,crop.x,crop.y,crop.width,crop.height,x,y,width,height);
      } else {
        context.drawImage(image,x,y,width,height);
      }  
    });
    
    this.translate = ((x1,y1) => {
      x += x1;
      y += y1;
    });
    
    this.getBounds = (() => ns.BoundsBox.fromRect(x,y,width,height));
    
  }
});
