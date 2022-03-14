namespace("App",[
	"Canvas",
	"CheatCodeTracker",
	"Polygon",
	"Rectangle",
	"Sprite"
],(ns) => {
	let Application = function() {

		let cheatCodeTracker = new ns.CheatCodeTracker();
		cheatCodeTracker.init();
		
		let canvas = new ns.Canvas(480,270);

		let sprite = new ns.Sprite(new ns.Rectangle(10,120,30,30,"red"),2);
		
		let interval = null;
		
		let drawAll = (() => {
			sprite.drawOn(canvas);
		});
		
		let update = () => {
			canvas.clear();
			sprite.step();
			drawAll();
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
