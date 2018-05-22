function cell(i, j, s)
{
  this.row = i;
  this.col = j;

  this.size = s;

  this.x = this.col*this.size;
  this.y = this.row*this.size + (height-this.size*cellsY)/2;

  this.visited = false;

  this.top = true;
  this.right = true;
  this.down = true;
  this.left = true;

  this.neighbors = [];

  this.getNeighbors = function(grid, w, h)
  {
    var neighbors = [];

    if(this.col == 0)
    {
      if(this.row == 0)
      {
        neighbors = [grid[this.row][this.col+1], grid[this.row+1][this.col]];
      }

      else if(this.row == h-1)
      {
        neighbors = [grid[this.row-1][this.col], grid[this.row][this.col+1]];
      }

      else
      {
        neighbors = [grid[this.row-1][this.col], grid[this.row][this.col+1], grid[this.row+1][this.col]];
      }
    }

    else if(this.col == w-1)
    {
      if(this.row == 0)
      {
        neighbors = [grid[this.row][this.col-1], grid[this.row+1][this.col]];
      }

      else if(this.row == h-1)
      {
        neighbors = [grid[this.row][this.col-1], grid[this.row-1][this.col]];
      }

      else
      {
        neighbors = [grid[this.row-1][this.col], grid[this.row+1][this.col], grid[this.row][this.col-1]];
      }
    }

    else if(this.row == 0 && 1 <= this.col && this.col < w-1)
    {
      neighbors = [grid[this.row][this.col-1], grid[this.row][this.col+1], grid[this.row+1][this.col]];
    }

    else if(this.row == h-1 && 1 <= this.col && this.col < w-1)
    {
      neighbors = [grid[this.row][this.col-1], grid[this.row][this.col+1], grid[this.row-1][this.col]];
    }

    else
    {
      neighbors=[grid[this.row-1][this.col], grid[this.row][this.col+1], grid[this.row+1][this.col], grid[this.row][this.col-1]];
    }
    
    var unvisited = [];
    
    for(var k = 0; k < neighbors.length; k++)
    {
      if(!neighbors[k].visited)
      {
        unvisited.push(neighbors[k]);
      }
    }
    
    return unvisited;
  }
}
