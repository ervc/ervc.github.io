const n = 5;
let initLength = 30;
let sep = 50;
let parray = [];
let colors = ['red','orange','yellow','green','blue'];
let graph;
let damping;
let reset;
let x, y;
let timeData = [0], ydata = [];
let time;

function setup() {
  createCanvas(1000, 600);
  graph = new Graph(width/2+5,height/2,width/2-10, 3*height/4);
  
  damping = createSlider(0,10,0,0);
  damping.position(10,10);
  damping.style('width', '200px');
  
  reset = createButton('Reset Pendulums');
  reset.mousePressed(startOver);
  reset.position(230,10);
  
  x = 200;
  y = 50;
  let initAngle = 20;
  for (let i = 0; i < n; i++) {
    let length = initLength * 2**i;
    parray[i] = new pendulum(x,y,length,initAngle,colors[i])
    ydata[i] = [parray[i].angle];
  }
}

function draw() {
  background(0);
  let dt = 0.02
  time = frameCount*dt
  timeData.push(time);
  if (timeData.length > 200) {
    timeData.shift();
  }
  
  let damp = damping.value()
  for (let i = n-1; i >= 0; i--) {
    let p = parray[i];
    p.show();
    let zeta = p.update(damp);
    fill(colors[i]);
    text('Zeta = '+nf(zeta,1,3),400,y+p.length);
    ydata[i].push(p.angle);
    graph.plot(timeData,ydata[i],colors[i])
    if (ydata[i].length > 200) {
      ydata[i].shift();
    }
  }
  
  fill(255);
  text( 'Damping factor = '+nf(damp,1,2) ,20,40);
  //print('dt = ',nf(1/fr,1,5),'\n');
  
  noStroke();
  fill(255);
  ellipse(x,y,5)
}

function startOver() {
  for (let i = n-1; i >= 0; i--) {
    let p = parray[i];
    p.setAngle();
    ydata[i] = [];
  }
  time = 0;
  timeData = [];
}