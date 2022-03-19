namespace("Sprite",{},() => {

  return function(shape,speed) {
    
    let collisions = [];

    let moveX = 0;
    let moveY = 0;

    this.setDirection = (dir) => {
      switch(typeof dir){
        case "string":
          dir = dir.toUpperCase();
          if (dir.indexOf("N")>-1) {
            moveY = -1;
          } else if (dir.indexOf("S")>-1) {
            moveY = 1;
          }
          if (dir.indexOf("W")>-1) {
            moveX = -1;
          } else if (dir.indexOf("E")>-1) {
            moveX = 1;
          }
          console.log({dir:dir,moveX:moveX,moveY:moveY});
          return;
        case "number":
          moveX = Math.sin(Math.PI * 2 * dir / 360);
          moveY = Math.cos(Math.PI * 2 * dir / 360);
          return;
      }
    }
    this.getDirection = (() => [moveX,moveY]);
    
    this.addCollision = ((c) => { collisions.push(c); });

    this.setUp = (() => { moveY = -1; });
    this.setDown = (() => { moveY = 1; });
    this.stopVert = (() => { moveY = 0; });
    this.setLeft = (() => { moveX = -1; });
    this.setRight = (() => { moveX = 1; });
    this.stopHoriz = (() => { moveX = 0; });
    this.bounceDown = (() => { moveY = Math.abs(moveY); });
    this.bounceUp = (() => { moveY = 0 - Math.abs(moveY); });
    this.bounceLeft = (() => { moveX = 0 - Math.abs(moveX); });
    this.bounceRight = (() => { moveX = Math.abs(moveX); });
    this.bounce = (() => {
      moveX = -moveX;
      moveY = -moveY;
    });

    this.step = (() => { shape.translate(speed*moveX,speed*moveY); });
    this.bounceBack = ((mult,dir) => {
      mult = mult || speed;
      mult = (mult == 0) ? speed : mult;
      let x = moveX == 0 ? 1 : moveX;
      let y = moveY == 0 ? 1 : moveY;
      let [dirX,dirY] = dir || [-x,-y];
      shape.translate(speed*dirX*mult,speed*dirY*mult); 
    });

    this.getBounds = (() => shape.getBounds());
    
    this.moveTo = ((side,moveTo) => { shape.moveTo(side,moveTo); });
    
    this.drawOn = ((canvas) => { canvas.drawShape(shape); });
    
    this.setAsPlayer = function() {
      document.addEventListener("arrowuphold",this.setUp);
      document.addEventListener("arrowuprelease",this.stopVert);
      document.addEventListener("arrowdownhold",this.setDown);
      document.addEventListener("arrowdownrelease",this.stopVert);
      document.addEventListener("arrowlefthold",this.setLeft);
      document.addEventListener("arrowleftrelease",this.stopHoriz);
      document.addEventListener("arrowrighthold",this.setRight);
      document.addEventListener("arrowrightrelease",this.stopHoriz);
    };
    
    this.unsetAsPlayer = function() {
      document.removeEventListener("arrowuphold",this.setUp);
      document.removeEventListener("arrowuprelease",this.stopVert);
      document.removeEventListener("arrowdownhold",this.setDown);
      document.removeEventListener("arrowdownrelease",this.stopVert);
      document.removeEventListener("arrowlefthold",this.setLeft);
      document.removeEventListener("arrowleftrelease",this.stopHoriz);
      document.removeEventListener("arrowrighthold",this.setRight);
      document.removeEventListener("arrowrightrelease",this.stopHoriz);
    };
    
    this.checkCollisions = function() {
      collisions.forEach((c) => { c.check(this); });
    }
  }
});