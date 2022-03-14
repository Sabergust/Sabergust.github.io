namespace("Rectangle",{},() => {
	return function(x,y,width,height,color) {

		this.drawOn = ((context) => {
			context.fillStyle = color;
			context.fillRect(x,y,width,height);
		});

		this.translate = ((x1,y1) => {
			x += x1;
			y += y1;
		});

		this.getBounds = (() => [[x,y],[x+width,y+height]]);

	}
});