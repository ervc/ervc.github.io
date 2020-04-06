const n = 5; //number of pendulums
let initLength = 30; //length of first pendulum (cm)
let parray = []; //array to hold pendulums
//colors of pendulums
let colors = ['red', 'orange', 'yellow', 'green', 'blue'];

//damping parameter slider
let damping;
//reset button
let reset;
//pause play button and pause play status
let playButton;
let isPlaying = false;

//xy position of pendulums
let x, y;

//global graph
let graph;
//data arrays for graphing
let timeData = [0],
  ydata = [];
//time
let time;
//count paused frames for graphing
let pauseCount = 0

function setup() {
  createCanvas(1000, 600);
  //create graph on left half of screen
  graph = new Graph(width / 2 + 5, height / 2, width / 2 - 10, 3 * height / 4);

  //create damping slider
  damping = createSlider(0, 10, 0, 0);
  damping.position(10, 10);
  damping.style('width', '200px');

  //create reset button
  reset = createButton('Reset Pendulums');
  reset.mousePressed(startOver);
  reset.position(230, 40);

  //create pause/play button
  playButton = createButton('Play/Pause Simulation');
  playButton.mousePressed(startStop);
  playButton.position(230, 10);

  //set xy of pendulums and initial angle, add pendulums to array
  x = 200;
  y = 50;
  let initAngle = 20;
  for (let i = 0; i < n; i++) {
    let length = initLength * 2 ** i;
    parray[i] = new pendulum(x, y, length, initAngle, colors[i])
    ydata[i] = [parray[i].angle];
  }
}

function draw() {
  background(50);
  //roughly what dt is (assumes 50fps)
  //in reality fps is usually in 50-60 range
  let dt = 0.02
  //create graph axes
  graph.build();
  //if sim is not paused, add time data to xarray
  if (isPlaying) {
    time = (frameCount - pauseCount) * dt
    timeData.push(time);
    if (timeData.length > 200) {
      timeData.shift();
    }
  } else {
    //if it is paused count for how many frames
    pauseCount++
  }

  //get the damp param from slider
  let damp = damping.value()
  fill(255);
  text('Damping factor = ' + nf(damp, 1, 2) + ' Hz', 20, 40);
  //loop through pendulums
  for (let i = n - 1; i >= 0; i--) {
    //show the pendulums
    let p = parray[i];
    p.show();
    //calculuate zeta
    let dcrit = 2 * sqrt(p.grav / p.length);
    let zeta = damp / dcrit;
    //update pendulums if not paused
    if (isPlaying) {
      p.update(damp);
      ydata[i].push(p.angle);
      if (ydata[i].length > 200) {
        ydata[i].shift();
      }
    }
    //plot the data
    graph.plot(timeData, ydata[i], colors[i])
    fill(colors[i]);
    //print zeta values by pendulums
    text('Zeta = ' + nf(zeta, 1, 2), 400, y + p.length);
  }

  //add pin at top of pendulums
  noStroke();
  fill(255);
  ellipse(x, y, 5);

  //credit author
  text('github.com/ervc',10,height-10);
}

function startStop() {
  if (isPlaying) {
    isPlaying = false;
  } else {
    isPlaying = true;
  }
}

function startOver() {
  for (let i = n - 1; i >= 0; i--) {
    let p = parray[i];
    p.setAngle();
    ydata[i] = [parray[i].angle];
  }
  timeData = []
  time = 0;
  pauseCount = 0;
  isPlaying = false;
}