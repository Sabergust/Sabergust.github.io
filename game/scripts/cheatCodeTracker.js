namespace("CheatCodeTracker",{},() => {
	return function() {

		let codes = {};
		let charStack = "";
		
		this.init = (() => {
			document.addEventListener("keyrelease",(e) => {
				if (e.detail.key && e.detail.key.length == 1) {
					charStack += e.detail.key;
				}
				let codeKeys = Object.keys(codes).filter((c) => {
					return charStack.endsWith(c);
				}).map((c) => {
					codes[c]();
					return c;
				});
			});
		});
		
		this.addCodeListener = (codePhrase,handler) => {
			if (Object.keys(codes).filter((c) => {
				return c.endsWith(codePhrase) || codePhrase.endsWith(c);
			}) > 0) {
				throw "Cannot add code phrase " + codePhrase + "; matches existing.";
			}
			codes[codePhrase] = handler;
		}
	}
});
