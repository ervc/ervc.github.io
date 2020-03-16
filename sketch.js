let resetUp, resetDown;
let rackUp, rackDown;

function setup() {
  createCanvas(300, 600);
  
  //rack pointing down
  rackDown = new fullRack(width/4,10,width/2,'down');
  //rack pointing up
  rackUp = new fullRack(3*width/4,height-10,width/2,'up');
  
  //reset buttons
  resetUp = createButton("Refill All");
  resetUp.position(width-63,height-21);
  resetUp.mousePressed(fillUp);
  resetDown = createButton("Refill All");
  resetDown.position(2,2);
  resetDown.mousePressed(fillDown);
}

//rack the racks
function draw() {
  background(0);

  rackDown.rackEm();
  rackUp.rackEm();
}

//click on cups to drink!
//click on empty cups to fill them
function touchStarted() {
  for (let i = 0; i<10; i++) {
    let onCupUp = rackUp.clickOnCup(i);
    if (onCupUp) {
      if (rackUp.beerInCup(i)) {
        rackUp.drinkCup(i);
      } else {
        rackUp.fillCup(i);
      }
    }
    let onCupDown = rackDown.clickOnCup(i);
    if (onCupDown) {
      if (rackDown.beerInCup(i)) {
        rackDown.drinkCup(i);
      } else {
        rackDown.fillCup(i);
      }
    }
  }
}

//fill rack functions for buttons
function fillUp() {
  rackUp.fillRack();
}
function fillDown() {
  rackDown.fillRack();
}