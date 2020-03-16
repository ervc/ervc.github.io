class fullRack {
  constructor(x, y, len, dir) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.dir = dir;
    this.cups = [];

    let rad = this.len / 8;
    //arrange cups for upward pointing or downward pointing racks
    if (this.dir == "down") {
      //bottom
      for (let i = 0; i < 4; i++) {
        let cup = new Cup(this.x + (2 * i + 1) * rad,
          this.y + rad,
          rad,
          true);
        append(this.cups, cup);
      }
      //second
      for (let i = 0; i < 3; i++) {
        let cup = new Cup(this.x + (2 * i + 2) * rad,
          this.y + 2.75 * rad,
          rad,
          true);
        append(this.cups, cup);
      }
      //third
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(this.x + (2 * i + 3) * rad,
          this.y + 4.5 * rad,
          rad,
          true);
        append(this.cups, cup);
      }
      //top
      let cup = new Cup(this.x + 4 * rad,
        this.y + 6.25 * rad,
        rad, true);
      append(this.cups, cup);
      
    } else if (this.dir == "up") {
      //bottom
      for (let i = 0; i < 4; i++) {
        let cup = new Cup(this.x - (2 * i + 1) * rad,
          this.y - rad,
          rad,
          true);
        append(this.cups, cup);
      }
      //second
      for (let i = 0; i < 3; i++) {
        let cup = new Cup(this.x - (2 * i + 2) * rad,
          this.y - 2.75 * rad,
          rad,
          true);
        append(this.cups, cup);
      }
      //third
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(this.x - (2 * i + 3) * rad,
          this.y - 4.5 * rad,
          rad,
          true);
        append(this.cups, cup);
      }
      //top
      let cup = new Cup(this.x - 4 * rad,
        this.y - 6.25 * rad,
        rad, true);
      append(this.cups, cup);
    
    } else {
      print("rack direction should be 'up' or 'down'");
    }
  }

  //display all 10 cups
  rackEm() {
    for (let i = 0; i < 10; i++) {
      let cup = this.cups[i];
      cup.show();
    }
  }

  //fill all cups with beer
  fillRack() {
    for (let i = 0; i < 10; i++) {
      let cup = this.cups[i];
      cup.refill();
    }
  }

  //check if mouse is on a cup
  clickOnCup(i) {
    let cup = this.cups[i];
    if (sqrt(sq(mouseX - cup.x) + sq(mouseY - cup.y)) > cup.rad) {
      return false;
    } else {
      return true;
    }
  }
  
  //check if there is beer in the cup
  beerInCup(i) {
    let cup = this.cups[i];
    return cup.full;
  }

  //drink the beer from the cup
  drinkCup(i) {
    let cup = this.cups[i];
    cup.empty();
  }
  
  //pour beer in the cup
  fillCup(i) {
    let cup = this.cups[i];
    cup.refill();
  }
}