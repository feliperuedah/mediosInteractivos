function ball()
{
  this.size = cellSize/2;

  this.x = cellSize/2;
  this.y = cellSize/2;

  this.vx = 0;
  this.vy = 0;
  
  this.moving = true;
  
  this.maxSpeed = random(10, 15);

  this.show = function()
  {
    push();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  this.update = function()
  {
    if(deviceOrientation != "undefined")
    {
      this.vx = constrain(map(rotationY, -90, 90, -this.maxSpeed, this.maxSpeed), -this.maxSpeed, this.maxSpeed);
      this.vy = constrain(map(rotationX, -180, 180, -2*this.maxSpeed, 2*this.maxSpeed), -this.maxSpeed, this.maxSpeed);
    }
    
    if(this.moving)
    {
      this.x += this.vx;
      this.y += this.vy;
    }
  }
  
  this.entrar = function(finish)
  {
    this.stop();
    
    this.vx = 0.3*(finish.x - this.x);
    this.vy = 0.3*(finish.y - this.y);
    
    this.x += this.vx;
    this.y += this.vy;
  }
  
  this.stop = function()
  {
    this.moving = false;
  }
}
