class Rack {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    /*shape can be 'full','zipper','twoxtwo',
    'play button','gentlemen','center' */
    this.shape = 'full';
    this.hasIsland = false;
    this.totalCups = 10;
    this.cupsLeft = 10;
    this.cups = [];
    this.rerackCount = 0;
    this.canRerack = false;
    this.scl = 1
    
    if (this.width < 0) {
      this.scl = -1
      this.width = -this.width
    }

    let radius = this.width / 8;

    //create full rack first time
    this.totalCups = 10;
    this.cupsLeft = 10;
    //set cup 1 location, base off this
    let x1 = this.x + this.scl*radius;
    let y1 = this.y + this.scl*radius;
    //back row
    for (let i = 0; i < 4; i++) {
      let cup = new Cup(x1 + this.scl*2 * i * radius, y1, radius);
      append(this.cups, cup);
      cup.show();
    }
    //second row
    let x2 = x1 + this.scl*radius;
    let y2 = y1 + this.scl*radius * sqrt(3);
    for (let i = 0; i < 3; i++) {
      let cup = new Cup(x2 + this.scl*2 * i * radius, y2, radius);
      append(this.cups, cup);
      cup.show();
    }
    //third row
    let x3 = x2 + this.scl*radius;
    let y3 = y1 + this.scl*2 * radius * sqrt(3);
    for (let i = 0; i < 2; i++) {
      let cup = new Cup(x3 + this.scl*2 * i * radius, y3, radius);
      append(this.cups, cup);
      cup.show();
    }
    //last cup
    let x4 = x3 + this.scl*radius;
    let y4 = y1 + this.scl*3 * radius * sqrt(3);
    let cup = new Cup(x4, y4, radius);
    append(this.cups, cup);
    cup.show();
  }

  rackEm() {
    for (let i = 0; i < this.totalCups; i++) {
      let cup = this.cups[i];
      cup.show();
      text(i, cup.x, cup.y);
    }
  }

  //sets rack formation
  rerack() {
    let radius = this.width / 8;

    //full rack
    if (this.shape == 'full') {
      this.totalCups = 10;
      this.cupsLeft = 10;
      //set cup 1 location, base off this
      let x1 = this.x + radius;
      let y1 = this.y + radius;
      //back row
      for (let i = 0; i < 4; i++) {
        let cup = new Cup(2 * i * radius + x1, y1, radius);
        append(this.cups, cup);
        cup.show();
      }
      //second row
      let x2 = x1 + radius;
      let y2 = y1 + radius * sqrt(3);
      for (let i = 0; i < 3; i++) {
        let cup = new Cup(2 * i * radius + x2, y2, radius);
        append(this.cups, cup);
        cup.show();
      }
      //third row
      let x3 = x2 + radius;
      let y3 = y1 + 2 * radius * sqrt(3);
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(2 * i * radius + x3, y3, radius);
        append(this.cups, cup);
        cup.show();
      }
      //last cup
      let x4 = x3 + radius;
      let y4 = y1 + 3 * radius * sqrt(3);
      let cup = new Cup(x4, y4, radius);
      append(this.cups, cup);
      cup.show();

      //zipper  
    } else if (this.shape == 'zipper') {
      this.totalCups = 5;
      this.cupsLeft = 5;
      this.hasIsland = false;
      this.cups = []
      //left row
      let x1 = this.x + 3 * radius
      let y1 = this.y + radius
      for (let i = 0; i < 3; i++) {
        let cup = new Cup(x1, 2 * i * radius + y1, radius);
        append(this.cups, cup);
        cup.show();
      }
      //right row
      let x2 = x1 + radius * sqrt(3);
      let y2 = y1 + radius;
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(x2, 2 * i * radius + y2, radius);
        append(this.cups, cup);
        cup.show()
      }

      //twoxtwo  
    } else if (this.shape == 'twoxtwo') {
      this.totalCups = 4;
      this.cupsLeft = 4;
      this.hasIsland = false;
      this.cups = []
      //left row
      let x1 = this.x + 3 * radius
      let y1 = this.y + radius
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(x1, 2 * i * radius + y1, radius);
        append(this.cups, cup);
        cup.show();
      }
      //right row
      let x2 = x1 + radius * sqrt(3);
      let y2 = y1 + radius;
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(x2, 2 * i * radius + y2, radius);
        append(this.cups, cup);
        cup.show();
      }

      //play button
    } else if (this.shape == 'play button') {
      this.totalCups = 3;
      this.cupsLeft = 3;
      this.hasIsland = false;
      this.cups = []
      //left
      let x1 = this.x + 3 * radius
      let y1 = this.y + radius
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(x1, 2 * i * radius + y1, radius);
        append(this.cups, cup);
        cup.show();
      }
      //right
      let cup = new Cup(x1 + radius * sqrt(3), y1 + radius, radius);
      append(this.cups, cup);
      cup.show();

      //gentleman's  
    } else if (this.shape == 'gentlemen') {
      this.totalCups = 2;
      this.cupsLeft = 2;
      this.hasIsland = false;
      this.cups = [];
      let x1 = this.x + this.width / 2;
      let y1 = this.y + radius;
      for (let i = 0; i < 2; i++) {
        let cup = new Cup(x1, 2 * i * radius + y1, radius);
        append(this.cups, cup);
        cup.show();
      }

      //last cup  
    } else if (this.shape == 'center') {
      this.totalCups = 1;
      this.cupsLeft = 1;
      this.hasIsland = false;
      this.cups = [];
      let cup = new Cup(this.x + this.width / 2, this.y + radius,
        radius);
      append(this.cups, cup);
      cup.show();
      cup.isLastCup = true;
    }
  }

  checkRack() {
    let islandCount = 0
    for (let i = 0; i < this.totalCups; i++) {
      islandCount += this.islandCheck(i);
    }
    if (islandCount > 0) {
      this.hasIsland = true;
    } else {
      this.hasIsland = false;
    }
    if (this.cupsLeft < 6 && this.rerackCount < 2 && this.cupsLeft > 0) {
      this.canRerack = true;
    } else {
      this.canRerack = false;
    }
    if (this.cupsLeft == 1) {
      this.findLastCup();
    }
  }

  //if one cup is left loop through to find it
  findLastCup() {
    for (let i = 0; i < this.totalCups; i++) {
      let cup = this.cups[i];
      if (cup.isFull) {
        cup.isLastCup = true;
      }
    }
  }

  //See if there are any islands
  islandCheck(i) {
    //if a cup is empty it is not an island
    let cup = this.cups[i];
    if (!cup.isFull) {
      cup.isIsland = false;
      return 0;
    } else {
      //only full rack allows islands
      if (this.shape == 'full') {
        let neighborTable = [
          [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
          [1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
          [0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          [1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
          [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
          [0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
          [0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 0]
        ]
        //need more than 4 cups to island
        if (this.cupsLeft < 5) {
          return 0;
          //check table to find neighbors
        } else {
          for (let j = 0; j < this.totalCups; j++) {
            //if a neighbor is full, it's not an island
            if (neighborTable[i][j] == 1 && this.cups[j].isFull) {
              return 0;
            }
          }
          //if you get through all the neighbors and none is full
          cup.isIsland = true;
          return 1;
        }
        //not full rack
      } else {
        return 0;
      }
    }
  }

    inCup(i) {
      let cup = this.cups[i];
      let dx = mouseX - cup.x;
      let dy = mouseY - cup.y;
      let dist = sqrt(dx * dx + dy * dy);
      if (dist < cup.radius) {
        return true;
      } else {
        return false;
      }
    }
  }