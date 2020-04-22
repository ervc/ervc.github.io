class Graph {
  constructor(xmin,ymin,xmax,ymax) {
    this.Axes = new Axes(this);
    this.Data = new Data(this);
    this.xspan = {min : xmin, max : xmax}
    this.yspan = {min : ymin, max : ymax}
    this.width = xmax-xmin;
    this.height = ymax-ymin;
    this.origin = createVector(width/2,height/2)
  }
  
  setOrigin(x,y) {
    this.origin.set(x,y);
  }
  
  show() {
    this.Axes.draw();
    this.Data.plot();
    push();
    noStroke();
    fill(0);
    rect(0,0,width,this.yspan.min);
    rect(0,this.yspan.max,width,height-this.yspan.max);
    rect(0,0,this.xspan.min,height);
    rect(this.xspan.max,0,width-this.xspan.max,height);
    pop();
    rect(
      this.xspan.min,this.yspan.min,this.width,this.height
    );
  }
}



//////////////////   AXES   ///////////////////////
class Axes {
  constructor(graph) {
    this.Graph = graph;
    this.xrange = {min : -1, max : 1};
    this.yrange = {min : -1, max : 1};
    this.hidden = false;
  }
  
  draw() {
    if (this.hidden == false) {
      push();
      strokeWeight(2);
      let orgn = this.Graph.origin;
      line(
        this.Graph.xspan.min,
        orgn.y,
        this.Graph.xspan.max,
        orgn.y
      );
      line(
        orgn.x,
        this.Graph.yspan.min,
        orgn.x,
        this.Graph.yspan.max
      );
      pop();
    }
  }
  
  show() {
    this.hidden = false;
  }
  
  hide() {
    this.hidden = true;
  }
  
  setRange(xmin,xmax,ymin,ymax) {
    this.xrange.min = xmin;
    this.xrange.max = xmax;
    this.yrange.min = ymin;
    this.yrange.max = ymax;
    let ox = map(
      0,
      xmin,
      xmax,
      this.Graph.xspan.min,
      this.Graph.xspan.max);
    let oy = map(
      0,
      ymin,
      ymax,
      this.Graph.yspan.min,
      this.Graph.yspan.max);
    this.Graph.setOrigin(ox, oy)
  }
  
  setxRange(a,b) {
    this.xrange.min = a;
    this.xrange.max = b;
    let ox = map(
      0,
      a,
      b,
      this.Graph.xspan.min,
      this.Graph.xspan.max);
    this.Graph.setOrigin(ox, this.Graph.origin.y)
  }
  
  setyRange(a,b) {
    this.yrange.min = a;
    this.yrange.max = b;
    let oy = map(
      0,
      a,
      b,
      this.Graph.yspan.min,
      this.Graph.yspan.max);
    this.Graph.setOrigin(this.Graph.origin.x, oy)
  }
  
  grid() {
    push();
    strokeWeight(0.5);
    for (let x = floor(this.xrange.min);
         x <= ceil(this.xrange.max);
         x++) {
      let nx = map(
        x,
        this.xrange.min,
        this.xrange.max,
        this.Graph.xspan.min,
        this.Graph.xspan.max);
      if (nx > this.Graph.xspan.min &&
          nx < this.Graph.xspan.max) {
        line(
          nx,
          this.Graph.yspan.min,
          nx,
          this.Graph.yspan.max)
      }
    }
    for (let y = floor(this.yrange.min);
         y <= ceil(this.yrange.max);
         y++) {
      let ny = map(
        y,
        this.yrange.min,
        this.yrange.max,
        this.Graph.yspan.min,
        this.Graph.yspan.max);
      if (ny > this.Graph.yspan.min &&
          ny < this.Graph.yspan.max) {
        line(
          this.Graph.xspan.min,
          ny,
          this.Graph.xspan.max,
          ny)
      }
    }
    pop();
  }
}




//////////////////////   DATA    //////////////////////
class Data {
  constructor(graph) {
    this.Graph = graph;
    this.Axes = graph.Axes;
    this.xdata = [];
    this.ydata = [];
    this.color = 255;
  }
  
  plot() {
    push();
    strokeWeight(4);
    stroke(this.color);
    beginShape();
    for (let i = 0; i < this.xdata.length; i++) {
      let x = map(
        this.xdata[i],
        this.Axes.xrange.min,
        this.Axes.xrange.max,
        this.Graph.xspan.min,
        this.Graph.xspan.max
      )
      let y = map(
        this.ydata[i],
        this.Axes.yrange.min,
        this.Axes.yrange.max,
        this.Graph.yspan.max,
        this.Graph.yspan.min
      )
      //if (x > this.Graph.xspan.min &&
      //    x < this.Graph.xspan.max &&
      //    y > this.Graph.yspan.min &&
      //    y < this.Graph.yspan.max) {
        vertex(x,y);
      //}
    }
    endShape();
    pop();
  }
  
  setColor(c) {
    this.color = c;
  }
  
  setData(xdata,ydata) {
    this.xdata = xdata;
    this.ydata = ydata;
  }
  
  moveTo(newydata,velydata) {
    let oldydata = this.ydata;
    let dt = 0.1
    for (let i = 0; i < this.ydata.length; i++) {
      let oldy = oldydata[i];
      let newy = newydata[i];
      let vely = velydata[i];
      
      let dy = oldy-newy;
      let acc = -dy - 2 * vely;
      vely += acc * dt;
      oldy += vely * dt;
      
      velydata[i] = vely;
      oldydata[i] = oldy
    }
    this.ydata = oldydata;
    return velydata;
  }
  
  autoScale() {
    this.Axes.setRange(
      floor(min(this.xdata)),
      ceil(max(this.xdata)),
      floor(min(this.ydata)),
      ceil(max(this.ydata))
    )
  }
  
  setxData(data) {
    this.xdata = data;
  }
  
  setyData(data) {
    this.ydata = data;
  }
}