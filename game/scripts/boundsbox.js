namespace("BoundsBox",{},() => {
	return function(left,top,right,bottom) {

		this.getArgs = (() => [left,top,right,bottom]);
		
		this.hasCollided = (([otherLeft,otherTop,otherRight,otherBottom]) => {
			return !((bottom < otherTop) || (top > otherBottom) || (right < otherLeft) || (left > otherRight));
		});
		
		this.hasEscaped = (([borderLeft,borderTop,borderRight,borderBottom]) => {
			return ((bottom > borderBottom) || (top < borderTop) || (right > borderRight) || (left < borderLeft));
		});
	};
});