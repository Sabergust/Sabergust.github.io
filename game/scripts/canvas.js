namespace("Canvas",["BoundsBox"],(ns) => {
	
	return function(width, height) {

		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;

		let context = canvas.getContext("2d");
		
		this.appendToElement = ((elem) => elem.appendChild(canvas));
		
		this.clear = (() => context.clearRect(0,0,canvas.width,canvas.height));

		this.drawShape = ((shape) => shape.drawOn(context));
		
		this.outlineShape = ((shape) => shape.drawOn(context,true));
		
		this.getBounds = (() => new ns.BoundsBox(0,0,width,height));
	}

});