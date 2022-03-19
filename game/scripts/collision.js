namespace("Collision",{},() => {
  return function(source,target,onCollide) {
    this.check = function() {
      if (source.getBounds().hasCollided(target.getBounds().getArgs())) {
        onCollide(source,target);
      }
    }
  }
});