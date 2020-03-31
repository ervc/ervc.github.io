class Graph {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.xdata = [];
    this.ydata = [];
  }
  
  plot(xarray,yarray,color) {
    this.xdata = xarray;
    this.ydata = yarray;
    this.color = color;
    
    let initTime = this.xdata[0]
    let len = this.xdata.length
    
    push();
    //draw axes
    
    strokeWeight(3);
    stroke(255);
    translate(this.x,this.y);
    line(0,0,this.width,0);
    line(0,-this.width/2,0,this.width/2);
    
    
    //draw line
    for (let i = 0; i < len - 1; i++) {
      let x1 = map(this.xdata[i] - initTime,0,4,0,this.width);
      let y1 = map(this.ydata[i],-1,1,-width/2,width/2);
      let x2 = map(this.xdata[i+1] - initTime,0,4,0,this.width);
      let y2 = map(this.ydata[i+1],-1,1,-width/2,width/2);
      stroke(color);
      line(x1,y1,x2,y2);
    }
    
    pop();
  }
}