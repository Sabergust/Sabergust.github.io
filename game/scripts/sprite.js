namespace("Sprite",{},() => {

	return function(shape,speed) {

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
						moveY = -1;
					} else if (dir.indexOf("E")>-1) {
						moveY = 1;
					}
					return;
				case "number":
					moveX = Math.sin(Math.PI * 2 * dir / 360);
					moveY = Math.cos(Math.PI * 2 * dir / 360);
					return;
			}
		}

		this.setUp = (() => { moveY = -1; });
		this.setDown = (() => { moveY = 1; });
		this.stopVert = (() => { moveY = 0; });
		this.setLeft = (() => { moveX = -1; });
		this.setRight = (() => { moveX = 1; });
		this.stopHoriz = (() => { moveX = 0; });

		this.step = (() => { shape.translate(speed*moveX,speed*moveY) });

		this.getBounds = (() => shape.getBounds());
		
		this.drawOn = ((canvas) => { canvas.drawShape(shape) });
		
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
	}
});