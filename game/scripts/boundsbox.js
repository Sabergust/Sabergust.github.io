namespace("BoundsBox",{},() => {
  let BoundsBox = function(left,top,right,bottom) {
    let width = right - left;
    let height = bottom - top;
    let cx = left + (width / 2);
    let cy = top + (height / 2);
    let r = Math.min(width,height) / 2;

    this.getRaw = (() => {
      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        width: width,
        height: height,
        centerX: cx,
        centerY: cy,
        radius: r
      }
    });    
  };

  BoundsBox.fromRect = function(x,y,width,height) {
    return new BoundsBox(x,y,x+width,y+height);
  }

  BoundsBox.fromCirc = function(cx,cy,r) {
    return new BoundsBox(cx - r, cy - r, cx + r, cy - r);
  }
  
  return BoundsBox;
});