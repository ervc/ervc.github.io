let graphs = [];
let X = []
let N = 0;
let Yvelcos;
let Yvelsin;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER,BOTTOM);
  for (let i = 0; i < 2; i++) {
    graphs[i] = new Graph(100,100,width-100,height-100);
    if (i > 0) {
      graphs[i].Axes.hide();
    }
  }
  X = linspace(-3,3,1000);
  let Ycos = X.map(x => taylorCos(PI*x,N));
  let Ysin = X.map(x => taylorSin(PI*x,N));
  Yvelcos = X.map(x => 0);
  Yvelsin = X.map(x => 0);
  
  graphs[0].Data.setData(X,Ycos);
  graphs[0].Data.setColor('red');
  graphs[1].Data.setData(X,Ysin);
  graphs[1].Data.setColor('blue');
  //g.Data.autoScale();
  
  for (let g of graphs) {
    g.Axes.setyRange(-PI,PI);
    g.Axes.setxRange(-PI,PI);
  }
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  
  graphs[0].Axes.grid();
  for (let g of graphs) {
    g.show();
  }
  Yvelcos = graphs[0].Data.moveTo(
    X.map(x => taylorCos(PI*x,N)),Yvelcos
  )
  Yvelsin = graphs[1].Data.moveTo(
    X.map(x => taylorSin(PI*x,N)),Yvelsin
  )
  
  fill(255);
  textSize(32);
  text(`N = ${N}`,width/2,100);
}

function linspace(min,max,num) {
  let l = []
  let di = (max-min)/num
  for (let i = min; i<=max+di; i+=di) {
    l.push(i);
  }
  return l;
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    N++;
  }
  if (keyCode == LEFT_ARROW) {
    N--;
  }
  if (key == 'r') {
    N = 0;
  }
}