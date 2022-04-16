namespace("Printer",{},(ns) => {
  let charByChar = function(console,chars) {
    return function() {
      if (chars.length > 0) {
        let c = chars.shift();
        console.innerHTML += c;
        if (c == "\n") {
          console.scrollTop = console.scrollHeight;
        }
      }
    }
  }
  let buildPrinter = function(console,delay) {
    let chars = [];
    setInterval(charByChar(console,chars),delay);
    return function(str) {
      if (!str) {str = "";}
      chars.push("");
      str.split("").forEach(function(c){chars.push(c);});
      chars.push("\n");
    }
  }
  return function(node,delay) {
    delay = delay || 50;
    let printer = buildPrinter(node,delay);
    this.print = function(str) {
      printer(str);
    }
  }
});