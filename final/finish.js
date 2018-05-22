function finish()
{
  this.size = cellSize/2 + 5;

  this.x = width - cellSize/2;
  this.y = height - (height-cellsY*cellSize)/2 - cellSize/2 ;

  this.show = function()
  {
    push();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
