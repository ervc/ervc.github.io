class pendulum {
  constructor(x,y,length,theta,color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.initAngle = radians(theta);
    this.angle = this.initAngle;
    this.vel = 0;
    this.color=color;
    this.grav = 2000; //sets grav constant
  }
  
  show() {
    push();
    translate(this.x,this.y);
    let bob = p5.Vector.fromAngle(HALF_PI - this.angle, this.length);
    
    //draws string
    strokeWeight(1);
    stroke(255);
    line(0,0,bob.x,bob.y);
    
    //draws bob
    fill(this.color);
    stroke(50);
    strokeWeight(this.length*0.01);
    ellipse(bob.x,bob.y,this.length*0.25);
    pop();
  }
  
  update(damping) {
    //calculate damping
    let g = this.grav;
    let dt = 0.02;
    //period
    let T = TWO_PI * sqrt(this.length / g);
    let fact = TWO_PI / T;
    let dampfact = damping
    //ddtheta = -k*theta - c*dtheta
    let acc = -fact * fact * this.angle - dampfact * this.vel;
    this.vel += acc * dt;
    this.angle += this.vel * dt;
  }
  
  setAngle() {
    //reset to initial angle
    this.angle = this.initAngle;
    this.vel = 0;
  }
}