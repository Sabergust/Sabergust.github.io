namespace("App",[
	"Canvas",
	"CheatCodeTracker",
	"Circle",
	"Polygon",
	"Rectangle",
	"Sprite"
],(ns) => {
	let Application = function() {

		let cheatCodeTracker = new ns.CheatCodeTracker();
		cheatCodeTracker.init();
		
		let canvas = new ns.Canvas(500,400);

		let sprite = new ns.Sprite(new ns.Rectangle(50,150,50,50,"blue"),2);
		
		let bumper = new ns.Sprite(new ns.Circle(125,325,25,"green"),0);
		
		let interval = null;
		
		let drawAll = (() => {
			canvas.outlineShape(new ns.Rectangle(0,0,500,400,"black"));
			for (let x = 0; x < 10; x++) {
				for (let y = 0; y < 8; y++) {
					canvas.outlineShape(new ns.Rectangle(x*50,y*50,50,50,"black"));
				}
			}
			sprite.drawOn(canvas);
			bumper.drawOn(canvas);
		});
		
		let update = () => {
			canvas.clear();
			sprite.step();
			drawAll();
			if (sprite.getBounds().hasEscaped(canvas.getBounds().getArgs())) {
				clearInterval(interval);
				alert("Escaped from wall!")
			}else if (bumper.getBounds().hasCollided(sprite.getBounds().getArgs())) {
				clearInterval(interval);
				alert("Collided with bumper!")
			}
		}
		
		this.build = (id) => {
			let frame = document.getElementById(id);
			canvas.appendToElement(frame);
			sprite.setAsPlayer();
			drawAll();
			interval = setInterval(update, 20);
			return this;
		}
		
		initKeyEventWrapper();
	};
	return new Application();
});
