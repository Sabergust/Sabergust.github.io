namespace("Collision",{},() => {
  return function(source,sourceType,target,targetType,onCollide) {

    this.check = function() {
      if (source.getBounds().hasCollided(target.getBounds().getBox())) {
        onCollide(source,target);
      }
    }
    
    isOrdered = function(numbers) {
      if (numbers.length <= 1) {
        return true;
      }
      let first = numbers.shift();
      return numbers.reduce(([prev,out],num) => {
        return [num,out && (num > prev)];
      },
      [first,true])[1];
    } 
    
    let getDirectionFromSlope = function(x1,y1,x2,y2) {
      
    }
    
    let getCardinalDirection = function(x1,y1,x2,y2) {
      let direction = "";
      if (y1 < y2) {
        direction += "S";
      } else if (y1 > y2) {
        direction += "N";
      } 
      if (x1 < x2) {
        direction += "E";
      } else if (x1 > x2) {
        direction += "W";
      } 
      return direction;
    }
    
    let directionMap = {
      top: "N",
      bottom: "S",
      left: "W",
      right: "E"
    };
    
    let rectRect = function(source,target) {
      if ( source.bottom < target.top || target.bottom < source.top || source.left > target.right || target.left > source.right ) {
        return;
      }
      let sides = {};
      if (isOrdered(target.top,source.top,target.bottom)) {
        sides.top = true;
      }
      if (isOrdered(target.top,source.bottom,target.bottom)) {
        sides.bottom = true;
      }
      if (isOrdered(target.left,source.left,target.right)) {
        sides.left = true;
      }
      if (isOrdered(target.left,source.right,target.right)) {
        sides.right = true;
      }
      if (Object.keys(sides).length == 4) {
        return getCardinalDirection(source.centerX,source.centerY,target.centerX,target.centerY);
      }
      if (sides.left && sides.right) {
        delete sides.left;
        delete sides.right;
      }
      if (sides.top && sides.bottom) {
        delete sides.top;
        delete sides.bottom;
      }
      let result = ["top","bottom","left","right"].reduce((out,dir) => {
        return out + (sides[dir] ? directionMap[dir] : "");
      },"");
      if (result.length > 0) {
        return result;
      }
      return;
    }
    
    let corners = {
      NE:((box) => [box.right, box.top]),
      NW:((box) => [box.left, box.top]),
      SE:((box) => [box.right, box.bottom]),
      SW:((box) => [box.left, box.bottom])
    }
    
    let dist = function(x1,y1,x2,y2) {
      return Math.sqrt(Math.pow(x2 - x1) + Math.pow(y2 - y1));
    }

    let rectCircle = function(source,target) {
      let rectRectResult = rectRect(source,target);
      if (((typeof rectRectResult) == "string") && rectRectResult.length == 2) {
        let [cornerX,cornerY] = corners[rectRectResult](source);
        let dir = getCardinalDirection(cornerX,cornerY,target.centerX,target.centerY);
        if (rectRectResult == dir && dist(cornerX,cornerY,target.centerX,target.centerY) > target.radius) {
          return;
        }
      }
      return rectRectResult;
    }
    
    let mirror = { N: "S", NE: "SW", E: "W", SE: "NW", S: "N", SW: "NE", W: "E", NW: "SE" };

    let circleRect = function(source,target) {
      let rectCircleResult = rectCircle(target,source);
      if ((typeof rectCircleResult) == "string") {
        return mirror[rectCircleResult];
      }
      return;
    }

    let circleCircle = function(source,target) {
      if (dist(source.centerX,source.centerY,target.centerX,target.centerY) < (source.radius + target.radius)) {
        return getCardinalDirection(source.centerX,source.centerY,target.centerX,target.centerY);
      }
    }

  }
});