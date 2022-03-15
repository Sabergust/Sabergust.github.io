namespace("Rectangle",["BoundsBox"],(ns) => {
	return function(x,y,width,height,color) {

		this.drawOn = ((context,stroke) => {
			context.fillStyle = color;
			context.strokeStyle = color;
			context.lineWidth = 2;
			if (stroke) {
				context.strokeRect(x,y,width,height);
			} else {
				context.fillRect(x,y,width,height);
			}
		});

		this.translate = ((x1,y1) => {
			x += x1;
			y += y1;
		});

		this.getBounds = (() => new ns.BoundsBox(x,y,x+width,y+height));

	}
});