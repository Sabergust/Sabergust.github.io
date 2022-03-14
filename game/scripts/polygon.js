namespace("Polygon",{},() => {
	return function(color,points) {

		this.drawOn = (context) => {
			context.fillStyle = color;
			context.beginPath();
			points.forEach((p,i) => {
				if (i == 0) {
					context.moveTo(p[0],p[1]);
				} else {
					context.lineTo(p[0],p[1])
				}
			});
			context.closePath();
			context.fill();
		}

		this.translate = ((x1,y1) => {
			points.forEach((p) => {
				p[0] += x1;
				p[1] += y1;
			});
		})

		this.getBounds = (() => {
			let xs = points.map((p) => p[0]);
			let ys = points.map((p) => p[1]);
			let minX = Math.min.apply(null,xs);
			let maxX = Math.max.apply(null,xs);
			let minY = Math.min.apply(null,ys);
			let maxY = Math.max.apply(null,ys);
			return [[minX,minY],[maxX,maxY]];
		});
	}
});