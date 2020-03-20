var buttons = [0, 
               'center', 
               'gentlemen', 
               'playButton', 
               'twoxtwo',
               'zipper']

function rerackOptions() {
  if (rackDown.cupsLeft == 5) {
    buttons[5] = createButton('Zipper');
    buttons[5].position(rerackButtonDown.x+rerackButtonDown.width + 5, 
                        rerackButtonDown.y);
    buttons[5].mousePressed(makeZipper);
  }

  if (rackDown.cupsLeft == 4) {
    buttons[4] = createButton('Two by Two');
    buttons[4].position(rerackButtonDown.x+rerackButtonDown.width + 5, 
                        rerackButtonDown.y);
    buttons[4].mousePressed(makeTwoxTwo);
  }
  
  if (rackDown.cupsLeft == 3) {
    buttons[3] = createButton('Play Button');
    buttons[3].position(rerackButtonDown.x+rerackButtonDown.width + 5, 
                        rerackButtonDown.y);
    buttons[3].mousePressed(makePlayButton);
  }
  
  if (rackDown.cupsLeft == 2) {
    buttons[2] = createButton("Gentlemen's");
    buttons[2].position(rerackButtonDown.x+rerackButtonDown.width + 5, 
                        rerackButtonDown.y);
    buttons[2].mousePressed(makeGentlemen);
  }
  
  if (rackDown.cupsLeft == 1) {
    buttons[1] = createButton('Center It');
    buttons[1].position(rerackButtonDown.x+rerackButtonDown.width + 5, 
                        rerackButtonDown.y);
    buttons[1].mousePressed(makeCenter);
  }
}

function makeZipper() {
  rackDown.shape = 'zipper'
  rackDown.rerack();
  rackDown.rerackCount += 1;
  buttons[5].hide();
}

function makeTwoxTwo() {
  rackDown.shape = 'twoxtwo'
  rackDown.rerack();
  rackDown.rerackCount += 1;
  buttons[4].hide();
}

function makePlayButton() {
  rackDown.shape = 'play button'
  rackDown.rerack();
  rackDown.rerackCount += 1;
  buttons[3].hide();
}

function makeGentlemen() {
  rackDown.shape = 'gentlemen'
  rackDown.rerack();
  rackDown.rerackCount += 1;
  buttons[2].hide();
}

function makeCenter() {
  rackDown.shape = 'center'
  rackDown.rerack();
  rackDown.rerackCount += 1;
  buttons[1].hide();
}