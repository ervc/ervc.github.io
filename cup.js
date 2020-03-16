class Cup {
  constructor(x, y, r, f) {
    this.x = x; //center x
    this.y = y; //center y
    this.rad = r; //cup radius
    this.full = f; //is there beer in the cup
  }

  //empty or fill cup with beer
  empty() {
    this.full = false;
  }
  
  refill() {
    this.full = true;
  }

  show() {
    ellipseMode(RADIUS);
    //cup
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(4);
    ellipse(this.x, this.y, this.rad);

    //beer
    if (this.full) {
      fill(255, 220, 0);
      noStroke();
      ellipse(this.x, this.y, this.rad * 0.75);
    }

    //bottom
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse(this.x, this.y, this.rad / 2);
  }
}