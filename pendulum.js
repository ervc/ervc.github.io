class pendulum {
  constructor(x,y,length,theta,color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.initAngle = radians(theta);
    this.angle = this.initAngle;
    this.vel = 0;
    this.color=color;
    this.grav = 2000;
  }
  
  show() {
    push();
    translate(this.x,this.y);
    let bob = p5.Vector.fromAngle(HALF_PI - this.angle, this.length);
    
    strokeWeight(1);
    stroke(255);
    line(0,0,bob.x,bob.y);
    
    fill(this.color);
    stroke(50);
    strokeWeight(this.length*0.01);
    ellipse(bob.x,bob.y,this.length*0.25);
    pop();
  }
  
  update(damping) {
    let g = this.grav;
    let dt = 0.02;
    let T = TWO_PI * sqrt(this.length / g);
    let fact = TWO_PI / T;
    let dampfact = damping
    let damp = dampfact * this.vel;
    let acc = -fact * fact * this.angle - damp;
    this.vel += acc * dt;
    this.angle += this.vel * dt;
  }
  
  setAngle() {
    this.angle = this.initAngle;
    this.vel = 0;
  }
}