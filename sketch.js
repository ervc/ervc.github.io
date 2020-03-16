let resetUp, resetDown;
let rackUp, rackDown;

function setup() {
  createCanvas(300, 600);
  
  //rack pointing down
  rackDown = new fullRack(width/4,0,width/2,'down');
  //rack pointing up
  rackUp = new fullRack(3*width/4,height,width/2,'up');
  
  //reset buttons
  resetUp = createButton("Refill");
  resetUp.position(width-45,height-21);
  resetUp.mousePressed(fillUp);
  resetDown = createButton("Refill");
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
function mouseClicked() {
  for (let i = 0; i<10; i++) {
    let splashUp = rackUp.madeCup(i);
    if (splashUp) {
      rackUp.drinkCup(i);
    }
    let splashDown = rackDown.madeCup(i);
    if (splashDown) {
      rackDown.drinkCup(i);
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