function obstacle(x, y, w, h)
{
  this.width = w;
  this.height = h;

  this.x = x;
  this.y = y;
  
  this.color = color(0, 0, 255);
  
  this.visited = false;

  this.show = function()
  {
    if(this.visited)
    {
      push();
      noStroke();
      fill(this.color);

      rect(this.x, this.y, this.width, this.height);
      pop();
    }
  }
}