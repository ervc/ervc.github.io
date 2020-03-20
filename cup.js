class Cup {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.isIsland = false;
    this.isLastCup = false;
    this.isFull = true;
    this.hasBeenMade = false;
  }

  //empty or fill cup with beer
  empty() {
    this.isFull = false;
  }
  
  refill() {
    this.isFull = true;
  }

  //Create the beer and cup
  show() {
    ellipseMode(RADIUS);
    //cup
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(4);
    ellipse(this.x, this.y, this.radius);
    
    //beer
    if (this.isFull) {
      fill(255, 220, 0);
      noStroke();
      ellipse(this.x, this.y, this.radius * 0.75);
    }

    //bottom
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse(this.x, this.y, this.radius/2);
  }
}