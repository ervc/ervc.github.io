var rackDown, rackUp;
let rerackButtonDown, missButtonDown, callItButtonDown;
let rerackButtonUp, missButtonUp, callItButtonUp;
var player1, player2, player3, player4;
var currentPlayer;
var extraCupFlag = false;
var table = {
  width  : 0,
  height : 0
};

var inputs = {
  teamNameDown : '',
  teamNameUp   : '',
  player1      : '',
  player2      : '',
  player3      : '',
  player4      : '',
  submitDown   : '',
  submitUp     : ''
};

var namesSubmitted = {
  teamDown : false,
  teamUp   : false
};

let whoFirst;

var pickFirst = {
  player1 : false,
  player2 : false,
  player3 : false,
  player4 : false
}

let readyToPlay = false;

function setup() {
  createCanvas(800, 800);
  
  table.width = width/2;
  table.height = height;
  
  IOSetup();
  
  setupDown();
  setupUp();
}

function draw() {
  background(200);
  fill(51,0,102);
  stroke('gold');
  strokeWeight(16);
  rect(8,8,table.width-16,table.height-16);
  
  noFill();
  stroke(0);
  strokeWeight(8);
  rect(4,4,table.width-8,table.height-8);
  
  stroke(0);
  strokeWeight(16);
  line(8,0,table.width-8,table.height);
  
  stroke('gold');
  strokeWeight(8);
  line(8,0,table.width-8,table.height);
  
  if (readyToPlay) {
    drawDown();
    drawUp();
    missButtonDown.show();
    missButtonUp.show();
    
    noFill();
    strokeWeight(2);
    stroke(0);
    if (currentPlayer == player1) {
      rect(table.width+10, height-100+55, 
             table.width/2-20, 24);
    } else if (currentPlayer == player2) {
      rect(1.5*table.width + 10, height-100+55, 
             table.width/2-20,24);
    } else if (currentPlayer == player3) {
      rect(table.width+10, 66, table.width/2-20, 24);
    } else {
      rect(1.5*table.width + 10, 66, table.width/2-20,24);
    }
  }
}

function IOSetup() {
  inputs.teamUp = createInput('Team Name A');
  inputs.teamUp.position(table.width+10,10);
  inputs.teamUp.size(216);
  inputs.teamUp.style('font-size','24px');
  
  inputs.player3 = createInput('Player one');
  inputs.player3.position(inputs.teamUp.x,
                   inputs.teamUp.y +
                   2*inputs.teamUp.height);
  inputs.player3.size(100);
  inputs.player3.style('font-size','12px');
  
  inputs.player4 = createInput('Player two');
  inputs.player4.position(inputs.player3.x + 
                   inputs.player3.width + 10, 
                   inputs.teamUp.y +
                   2*inputs.teamUp.height);
  inputs.player4.size(100);
  inputs.player4.style('font-size','12px');

  inputs.submitUp = createButton("Submit Team A");
  inputs.submitUp.position(inputs.teamUp.x + 
                   inputs.teamUp.width/2 -
                   inputs.submitUp.width/2,
                   inputs.player3.y + 
                   1.5*inputs.player3.height);
  inputs.submitUp.mousePressed(saveUp);
  
  inputs.teamDown = createInput('Team Name B');
  inputs.teamDown.position(315,height-100);
  inputs.teamDown.size(216);
  inputs.teamDown.style('font-size','24px');
  
  inputs.player1 = createInput('Player one');
  inputs.player1.position(inputs.teamDown.x,
                   inputs.teamDown.y + 
                   2*inputs.teamDown.height);
  inputs.player1.size(100);
  inputs.player1.style('font-size','12px');
  
  inputs.player2 = createInput('Player two');
  inputs.player2.position(inputs.player1.x +
                   inputs.player1.width + 10, 
                   inputs.teamDown.y + 
                   2*inputs.teamDown.height);
  inputs.player2.size(100);
  inputs.player2.style('font-size','12px');

  inputs.submitDown = createButton("Submit Team B");
  inputs.submitDown.position(inputs.teamDown.x + 
                   inputs.teamDown.width/2 -
                   inputs.submitDown.width/2,
                   inputs.player1.y +
                   1.5*inputs.player1.height);
  inputs.submitDown.mousePressed(saveDown);
}

function saveUp() {
  let teamName = inputs.teamUp.value()
  player3.name = inputs.player3.value();
  player4.name = inputs.player4.value();
  inputs.teamUp.remove();
  inputs.player3.remove();
  inputs.player4.remove();
  inputs.submitUp.remove();
  displayInfo(teamName,player3.name,
              player4.name,10);
  namesSubmitted.teamUp = true;
  eyeToEye();
}

function saveDown() {
  let teamName = inputs.teamDown.value()
  player1.name = inputs.player1.value();
  player2.name = inputs.player2.value();
  inputs.teamDown.remove();
  inputs.player1.remove();
  inputs.player2.remove();
  inputs.submitDown.remove();
  displayInfo(teamName,player1.name,
              player2.name,height-100);
  namesSubmitted.teamDown = true;
  eyeToEye();
}

function eyeToEye() {
  pickFirst.player1 = createButton(player1.name);
  pickFirst.player1.position(5*width/8-10, height/2+2);
  pickFirst.player1.hide();
  pickFirst.player2 = createButton(player2.name);
  pickFirst.player2.position(6*width/8+10, height/2+2);
  pickFirst.player2.hide();
  pickFirst.player3 = createButton(player3.name);
  pickFirst.player3.position(5*width/8-10, height/2-24);
  pickFirst.player3.hide();
  pickFirst.player4 = createButton(player4.name);
  pickFirst.player4.position(6*width/8+10, height/2-24);
  pickFirst.player4.hide();
  if (namesSubmitted.teamDown && namesSubmitted.teamUp) {
    whoFirst = createElement('h2','Who will go first?').size(width/2,30);
    whoFirst.style('text-align','center')
    whoFirst.position(table.width,
                      height/2-100);
    pickFirst.player1.show();
    pickFirst.player2.show();
    pickFirst.player3.show();
    pickFirst.player4.show();
    pickFirst.player1.mousePressed(setFirst1);
    pickFirst.player2.mousePressed(setFirst2);
    pickFirst.player3.mousePressed(setFirst3);
    pickFirst.player4.mousePressed(setFirst4);
  }
}

function setFirst1() {
  player1.isFirst = true;
  player2.isFirst = false;
  currentPlayer = player1;
  readyToPlay = true;
  pickFirst.player1.remove();
  pickFirst.player2.remove();
  pickFirst.player3.remove();
  pickFirst.player4.remove();
  whoFirst.remove();
}

function setFirst2() {
  player2.isFirst = true;
  player1.isFirst = false;
  currentPlayer = player2;
  readyToPlay = true;
  pickFirst.player1.remove();
  pickFirst.player2.remove();
  pickFirst.player3.remove();
  pickFirst.player4.remove();
  whoFirst.remove();
}

function setFirst3() {
  player3.isFirst = true;
  player4.isFirst = false;
  currentPlayer = player3;
  readyToPlay = true;
  pickFirst.player1.remove();
  pickFirst.player2.remove();
  pickFirst.player3.remove();
  pickFirst.player4.remove();
  whoFirst.remove();
}

function setFirst4() {
  player4.isFirst = true;
  player3.isFirst = false;
  currentPlayer = player4;
  readyToPlay = true;
  pickFirst.player1.remove();
  pickFirst.player2.remove();
  pickFirst.player3.remove();
  pickFirst.player4.remove();
  whoFirst.remove();
}

//Team name displays
function displayInfo(teamName,playerOne,playerTwo,yval) {
  let Team = createElement('h2',teamName).size(width-table.width,30);
  Team.position(table.width,yval);
  Team.style('font-size','24px');
  Team.style('text-align','center');
  
  let NameOne = createElement('h2',playerOne).size((width-table.width)/2,30);
  NameOne.position(table.width,Team.y+Team.height+15);
  NameOne.style('font-size','16px');
  NameOne.style('text-align','center');
  
  let NameTwo = createElement('h2',playerTwo).size((width-table.width)/2,30);
  NameTwo.position(table.width+NameOne.width,
                   Team.y+Team.height+15);
  NameTwo.style('font-size','16px');
  NameTwo.style('text-align','center');
}

function setupDown() {
  //create rack
  rackDown = new Rack(table.width/4, table.width/4, table.width/2);
  rackDown.shape = 'full';
  
  //create players
  player1 = new Player('Player one');
  player1.isFirst = true;
  player2 = new Player('Player two');

  //create miss button
  missButtonDown = createButton('Miss!');
  missButtonDown.position(rackDown.x + rackDown.scl * (rackDown.width / 2 -
                          missButtonDown.width / 2),
                          rackDown.y -  
                          rackDown.scl * (missButtonDown.height + 10));
  missButtonDown.mousePressed(miss);
  missButtonDown.hide();

  //creat button to call island
  callItButtonDown = createButton('Call it!');
  callItButtonDown.position(rackDown.x +
    rackDown.scl * (rackDown.width / 2 -
                    callItButtonDown.width / 2),
                    missButtonDown.y -
                    rackDown.scl * (callItButtonDown.height + 10));
  callItButtonDown.mousePressed(callIt);
  callItButtonDown.hide();

  //create rerack button
  rerackButtonDown = createButton('rerack?');
  rerackButtonDown.position(missButtonDown.x + missButtonDown.width + 5,
                           missButtonDown.y);
  rerackButtonDown.mousePressed(rerackOptions);
  rerackButtonDown.hide();
}

function setupUp() {
  //create rack
  rackUp = new Rack(3*table.width/4, table.height-table.width/4,
                    -table.width/2);
  rackUp.shape = 'full';

  //create players
  player3 = new Player('Player Three');
  player3.isFirst = true;
  player4 = new Player('Player Four');

  //create miss button
  missButtonUp = createButton('Miss!');
  missButtonUp.position(rackUp.x + rackUp.scl * (rackUp.width / 2 +
                          missButtonUp.width / 2),
                          rackUp.y -  
                          rackUp.scl * (missButtonUp.height - 10));
  missButtonUp.mousePressed(miss);
  missButtonUp.hide();

  //creat button to call island
  callItButtonUp = createButton('Call it!');
  callItButtonUp.position(rackUp.x +
                          rackUp.scl * (rackUp.width / 2 +
                          callItButtonUp.width / 2),
                          missButtonUp.y -
                          rackUp.scl * (callItButtonUp.height - 10));
  callItButtonUp.mousePressed(callIt);
  callItButtonUp.hide();

  //create rerack button
  rerackButtonUp = createButton('Rerack?');
  rerackButtonUp.position(missButtonUp.x - rerackButtonUp.width - 5, 
                          missButtonUp.y);
  rerackButtonUp.mousePressed(rerackOptions);
  rerackButtonUp.hide();
}

function drawDown() {
  rackDown.rackEm();
  rackDown.checkRack();
  if (rackDown.canRerack &&
    currentPlayer.isFirst &&
    !currentPlayer.madeThisTurn) {
    rerackButtonDown.show();
  } else {
    rerackButtonDown.hide();
  }
  if (rackDown.hasIsland && currentPlayer.canCall) {
    callItButtonDown.show();
  } else {
    callItButtonDown.hide();
  }
}


function drawUp() {
  rackUp.rackEm();
  rackUp.checkRack();
  if (rackUp.canRerack &&
    currentPlayer.isFirst &&
    !currentPlayer.madeThisTurn) {
    rerackButtonUp.show();
  } else {
    rerackButtonUp.hide();
  }
  if (rackUp.hasIsland && currentPlayer.canCall) {
    callItButtonUp.show();
  } else {
    callItButtonUp.hide();
  }
}

//if cup is clicked on, check for special status
function mousePressed() {
  let racks = [rackDown, rackUp];
  for (let j = 0; j < 2; j++) {
    let rack = racks[j];
    for (let i = 0; i < rack.totalCups; i++) {
      let cup = rack.cups[i];
      if (rack.inCup(i) && cup.isFull) {
        checkCup(i,rack) //<-- will impliment later
        //cup.empty();
        //checkSwitch(); <-- will check if players should be switched
        // but for now just switch
        //switchPlayers();
      }
      if (cup.isIsland) {
        print('cup ' + i + ' is an island');
      }
    }
  }
}

//check if a cup should be pulled
function checkCup(i,rack) {
  let cup = rack.cups[i];
  //first check if it's an island
  if (cup.isIsland && currentPlayer.doesCall) {
    print('Island!\nPull and extra cup');
    cup.empty();
    rack.cupsLeft -= 1;
    currentPlayer.cupStreak += 1;
    currentPlayer.madeThisTurn = true;
    extraCupFlag = true;
    currentPlayer.doesCall = false;
  } else if (extraCupFlag) {
    cup.empty();
    rack.cupsLeft -= 1;
    extraCupFlag = false
    switchPlayers();
    //if it's not an island check if it's the last cup
  } else if (cup.isLastCup) {
    lastCupProcedure(i, rack);
  } else {
    cup.empty();
    rack.cupsLeft -= 1;
    currentPlayer.cupStreak += 1;
    currentPlayer.madeThisTurn = true;
    switchPlayers();
  }
  //last cup message
  if (rack.cupsLeft == 1) {
    print('Last Cup!')
  }
}

//What to do if the last cup is made
function lastCupProcedure(i, rack) {
  let cup = rack.cups[i];
  //if player one
  if (currentPlayer.isFirst) {
    // and the cup has already been made
    if (cup.hasBeenMade) {
      cup.empty();
      rack.cupsLeft--;
      print('YOU WIN!');
      // and the cup has not already been made  
    } else {
      print('Hit it again to ice it!');
      currentPlayer.cupStreak++;
      currentPlayer.madeThisTurn = true;
      cup.hasBeenMade = true;
      switchPlayers();
    }
    //if player two
  } else {
    // and the cup has been made OR player one made a cup
    if (cup.hasBeenMade || player1.madeThisTurn) {
      cup.empty();
      rack.cupsLeft--;
      print('YOU WIN!');
      // and player one did not make a cup nor has the cup been made
    } else {
      if (currentPlayer.cupStreak >= 2) {
        cup.hasBeenMade = true;
        print('FIRE!\nHit the cup again to ice it!')
      } else {
        currentPlayer.cupStreak++
        currentPlayer.madeThisTurn = true;
        cup.empty();
        rack.cupsLeft--;
        print('REBUTTLE')
      }
    }
  }
}

//miss a cup is missButton is clicked on
function miss() {
  currentPlayer.cupStreak = 0;
  //checkSwitch(); <-- future implementation
  //but for now
  switchPlayers();
}

//call the island
function callIt() {
  currentPlayer.doesCall = true;
  currentPlayer.canCall = false;
}

//switch players (two teams)
//There's a better way to do this but this is fine
function switchPlayers() {
  if (currentPlayer.cupStreak < 3) {
    if (currentPlayer.isFirst) {
      if (currentPlayer == player1) {
        currentPlayer = player2;
      } else if (currentPlayer == player2) {
        currentPlayer = player1;
      } else if (currentPlayer == player3) {
        currentPlayer = player4;
      } else if (currentPlayer == player4) {
        currentPlayer = player3;
      }
    } else {
      if (currentPlayer == player1 || currentPlayer == player2) {
        if (player3.isFirst) {
          currentPlayer = player3;
        } else {
          currentPlayer = player4;
        }
      } else {
        if (player1.isFirst) {
          currentPlayer = player1;
        } else {
          currentPlayer = player2;
        }
      }
    }
    print("Now shooting: " + currentPlayer.name);
  } else {
    print('Fire!\nShoot again');
  }
}
