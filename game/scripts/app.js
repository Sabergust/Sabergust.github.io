namespace("App",[
  "Canvas",
  "CheatCodeTracker",
  "Circle",
  "Collision",
  "Polygon",
  "Rectangle",
  "Sprite"
],(ns) => {
  let Application = function() {

    let cheatCodeTracker = new ns.CheatCodeTracker();
    cheatCodeTracker.init();
    
    let canvas = new ns.Canvas(500,400);
    
    let get = function(obj,label) {
      return function() {
        return obj[label];
      }
    }

    let interval = null;
    
    let collide = {
      bounceDown: (_,t) => { t.bounceDown(); },
      bounceUp: (_,t) => { t.bounceUp(); },
      bounceLeft: (_,t) => { t.bounceLeft(); },
      bounceRight: (_,t) => { t.bounceRight(); },
      flushTop: (s,t) => {
        t.stopVert();
        let [minX,minY,maxX,maxY] = s.getBounds().getArgs();
        t.moveTo("top",maxY + 1);
      },
      flushLeft: (s,t) => {
        t.stopHoriz();
        let [minX,minY,maxX,maxY] = s.getBounds().getArgs();
        t.moveTo("left",maxX + 1);
      },
      flushBottom: (s,t) => {
        t.stopVert();
        let [minX,minY,maxX,maxY] = s.getBounds().getArgs();
        t.moveTo("bottom",minY - 1);
      },
      flushRight: (s,t) => {
        t.stopHoriz();
        let [minX,minY,maxX,maxY] = s.getBounds().getArgs();
        t.moveTo("right",minX - 1);
      },
      exit: () => { 
        clearInterval(interval);
        alert("Exiting room!");
      },
      bounceBack: (s,t) => { 
        t.bounceBack(0,s.getDirection());
        s.bounceBack();
      }
    };
    
    let shapes = {
      rect: ((args) => new ns.Rectangle(args[0],args[1],args[2],args[3],args[4])),
      circle: ((args) => new ns.Circle(args[0],args[1],args[2],args[3])),
    }
    
    let sprites = {
      northWallEast: [0, "rect",255,0,225,49,"black"],
      northWallWest: [0, "rect",0,0,225,49,"black"],
      southWallEast: [0, "rect",255,351,225,49,"black"],
      southWallWest: [0, "rect",0,351,225,49,"black"],
      westWallNorth: [0, "rect",0,0,49,175,"black"],
      westWallSouth: [0, "rect",0,205,49,175,"black"],
      eastWallNorth: [0, "rect",451,0,49,175,"black"],
      eastWallSouth: [0, "rect",451,205,49,175,"black"],
      northDoor: [0, "rect",225,0,50,49,"grey"],
      southDoor: [0, "rect",225,351,50,49,"grey"],
      westDoor: [0, "rect",0,175,49,50,"grey"],
      eastDoor: [0, "rect",451,175,49,50,"grey"],
      northExit: [0, "rect",225,0,50,5,"grey"],
      southExit: [0, "rect",225,395,50,5,"grey"],
      westExit: [0, "rect",0,175,5,50,"grey"],
      eastExit: [0, "rect",495,175,5,50,"grey"],
      bumper: [1, "circle",275,275,24,"green"],
      player: [2, "rect",101,151,48,48,"blue"]
    };
    
    Object.entries(sprites).forEach(([name,spec]) => {
      let speed = spec.shift();
      sprites[name] = new ns.Sprite(shapes[spec.shift()](spec),speed);
    });
    
    let collideTypes = {};
    
    let collisions = [["northWallEast","box","player","ball","flushTop"],
                      ["northWallEast","box","bumper","ball","bounceDown"],
                      ["northWallWest","box","player","ball","flushTop"],
                      ["northWallWest","box","bumper","ball","bounceDown"],
                      ["southWallEast","box","player","ball","flushBottom"],
                      ["southWallEast","box","bumper","ball","bounceUp"],
                      ["southWallWest","box","player","ball","flushBottom"],
                      ["southWallWest","box","bumper","ball","bounceUp"],
                      ["westWallNorth","box","player","ball","flushLeft"],
                      ["westWallNorth","box","bumper","ball","bounceRight"],
                      ["westWallSouth","box","player","ball","flushLeft"],
                      ["westWallSouth","box","bumper","ball","bounceRight"],
                      ["eastWallNorth","box","player","ball","flushRight"],
                      ["eastWallNorth","box","bumper","ball","bounceLeft"],
                      ["eastWallSouth","box","player","ball","flushRight"],
                      ["eastWallSouth","box","bumper","ball","bounceLeft"],
                      ["northDoor","box","bumper","ball","bounceDown"],
                      ["southDoor","box","bumper","ball","bounceUp"],
                      ["westDoor","box","bumper","ball","bounceRight"],
                      ["eastDoor","box","bumper","ball","bounceLeft"],
                      ["northExit","box","player","ball","exit"],
                      ["southExit","box","player","ball","exit"],
                      ["westExit","box","player","ball","exit"],
                      ["eastExit","box","player","ball","exit"],
                      ["bumper","ball","player","ball","bounceBack"]
    ].map(([source,sourceType,target,targetType,onCollide]) => {
      
      return new ns.Collision(sprites[source],sourceType,sprites[target],targetType,collide[onCollide]);
    });
    
    let drawAll = (() => {
      for (let x = 1; x < 10; x++) {
        for (let y = 1; y < 8; y++) {
          canvas.outlineShape(new ns.Rectangle(x*50,y*50,50,50,"black"));
        }
      }
      Object.values(sprites).forEach((s) => {
        s.drawOn(canvas);
      });
    });
    
    let update = () => {
      canvas.clear();
      sprites.bumper.step()
      sprites.player.step()
      collisions.forEach((c) => {
        c.check();
      });
      drawAll();
    }
    
    this.build = (id) => {
      let frame = document.getElementById(id);
      canvas.appendToElement(frame);
      sprites.player.setAsPlayer();
      sprites.bumper.setDirection("NE");
      //drawAll();
      //interval = setInterval(update, 20);
      return this;
    }
    
    initKeyEventWrapper();
  };
  return new Application();
});
