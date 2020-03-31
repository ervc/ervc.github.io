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
let isPlaying = true;

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
  graph = new Graph(width / 2 + 5, height / 2, width / 2 - 10, 3 * height / 4);

  damping = createSlider(0, 10, 0, 0);
  damping.position(10, 10);
  damping.style('width', '200px');

  reset = createButton('Reset Pendulums');
  reset.mousePressed(startOver);
  reset.position(230, 40);

  playButton = createButton('Play/Pause Simulation');
  playButton.mousePressed(startStop);
  playButton.position(230, 10);

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
  background(0);
  //frameRate(50);
  //print(frameRate());
  let dt = 0.02
  graph.build();
  if (isPlaying) {
    time = (frameCount - pauseCount) * dt
    timeData.push(time);
    if (timeData.length > 200) {
      timeData.shift();
    }
  } else {
    pauseCount++
  }

  let damp = damping.value()
  for (let i = n - 1; i >= 0; i--) {
    let p = parray[i];
    p.show();
    let g = 2000;
    let dcrit = 2 * sqrt(p.grav / p.length);
    let zeta = damp / dcrit;
    if (isPlaying) {
      p.update(damp);
      ydata[i].push(p.angle);
      if (ydata[i].length > 200) {
        ydata[i].shift();
      }
    }
    graph.plot(timeData, ydata[i], colors[i])
    fill(colors[i]);
    text('Zeta = ' + nf(zeta, 1, 3), 400, y + p.length);

  }

  fill(255);
  text('Damping factor = ' + nf(damp, 1, 2), 20, 40);
  //print('dt = ',nf(1/fr,1,5),'\n');

  noStroke();
  fill(255);
  ellipse(x, y, 5)
}

function startStop() {
  if (isPlaying) {
    isPlaying = false;
  } else {
    isPlaying = true;
    /*for (let i = n - 1; i >= 0; i--) {
      let p = parray[i];
      ydata[i] = [];
    }*/
    //time = 0;
    //timeData = [];
  }
}

function startOver() {
  for (let i = n - 1; i >= 0; i--) {
    let p = parray[i];
    p.setAngle();
    ydata[i] = [parray[i].angle];
  }
  timeData = []
}