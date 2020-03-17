let inputA, inputA1, inputA2;
let submitA;
let nameA, playerA1, playerA2;

let inputB, inputB1, inputB2;
let submitB, submitB1, submitB2;
let nameB, playerB1, playerB2;

var table = {
  x : 400,
  y : 800,
};

let resetUp, resetDown;
let rackUp, rackDown;

function setup() {
  createCanvas(800, 800);
  
  //rack pointing down
  rackDown = new fullRack(table.x/4,10,
                          table.x/2,'down');
  //rack pointing up
  rackUp = new fullRack(3*table.x/4,table.y-10,
                        table.x/2,'up');
  
  //reset buttons
  resetUp = createButton("Refill All");
  resetUp.position(table.x-63,table.y-21);
  //resetUp.style('font-size','20px');
  resetUp.mousePressed(fillUp);
  resetDown = createButton("Refill All");
  resetDown.position(2,2);
  resetDown.mousePressed(fillDown);
  
  //Team A input
  inputA = createInput('Team Name A');
  inputA.position(table.x+15,10);
  inputA.size(216);
  inputA.style('font-size','24px');
  
  inputA1 = createInput('Player one');
  inputA1.position(inputA.x,
                   inputA.y + 2*inputA.height);
  inputA1.size(100);
  inputA1.style('font-size','12px');
  
  inputA2 = createInput('Player two');
  inputA2.position(inputA1.x + inputA1.width + 10, 
                   inputA.y + 2*inputA.height);
  inputA2.size(100);
  inputA2.style('font-size','12px');

  submitA = createButton("Submit Team A");
  submitA.position(inputA.x + inputA.width/2 - submitA.width/2,
                  inputA1.y + 1.5*inputA1.height);
  submitA.mousePressed(saveA);
  
  //Team B input
  inputB = createInput('Team Name B');
  inputB.position(table.x+15,height-100);
  inputB.size(216);
  inputB.style('font-size','24px');
  
  inputB1 = createInput('Player one');
  inputB1.position(inputB.x,
                   inputB.y + 2*inputB.height);
  inputB1.size(100);
  inputB1.style('font-size','12px');
  
  inputB2 = createInput('Player two');
  inputB2.position(inputB1.x + inputB1.width + 10, 
                   inputB.y + 2*inputB.height);
  inputB2.size(100);
  inputB2.style('font-size','12px');

  submitB = createButton("Submit Team B");
  submitB.position(inputB.x + inputB.width/2 - submitB.width/2,
                  inputB1.y + 1.5*inputB1.height);
  submitB.mousePressed(saveB);
  
}

function draw() {
  background(220);
  fill(0);
  rect(0,0,table.x,table.y);

  rackDown.rackEm();
  rackUp.rackEm();
}

//save team and player names
function saveA() {
  nameA  = inputA.value();
  nameA1 = inputA1.value();
  nameA2 = inputA2.value();
  inputA.remove();
  inputA1.remove();
  inputA2.remove();
  submitA.remove();
  displayInfo(nameA,nameA1,nameA2,10);
}

function saveB() {
  nameB  = inputB.value();
  nameB1 = inputB1.value();
  nameB2 = inputB2.value();
  inputB.remove();
  inputB1.remove();
  inputB2.remove();
  submitB.remove();
  displayInfo(nameB,nameB1,nameB2,height-100);
}

//click on cups to drink!
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

//Team name displays
function displayInfo(teamName,playerOne,playerTwo,yval) {
  let Team = createElement('h2',teamName).size(width-table.x,30);
  Team.position(table.x,yval);
  Team.style('font-size','24px');
  Team.style('text-align','center');
  
  let NameOne = createElement('h2',playerOne).size((width-table.x)/2,30);
  NameOne.position(table.x,Team.y+Team.height+15);
  NameOne.style('font-size','16px');
  NameOne.style('text-align','center');
  
  let NameTwo = createElement('h2',playerTwo).size((width-table.x)/2,30);
  NameTwo.position(table.x+NameOne.width,
                   Team.y+Team.height+15);
  NameTwo.style('font-size','16px');
  NameTwo.style('text-align','center');
}

function changePlayer() {
}

function changeTeam() {
}