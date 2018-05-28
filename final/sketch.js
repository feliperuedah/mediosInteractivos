//Determina el nivel del juego
var nivel;

//Arreglo de celdas que definen el laberinto
var cells = [];

var cellSize;

var stack = [];


//Obstaculos que definen el laberinto
var obstaculos = [];

//Bola
var bola;

//Meta del laberinto
var fin;

//Radio de luz desde la bola
var lightRadius;


var m = 0;
var n = 0;


function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  lightRadius = 70;
  
  generateMaze(15);

  bola = new ball();
  
  fin = new finish();

  nivel = 5;
}

function draw()
{
  if(nivel == 0)
  {
    background(0);
    
    push();
    fill(255);
    textAlign(CENTER);
    textSize(width/10);
    text('MAZE BALL', width/2, height/2);
    textSize(width/20);
    text('Press to go', width/2, height/2 + width/8);
    pop();
  }
  
  if(nivel == 6)
  {
    background(0);
    
    push();
    fill(255);
    textAlign(CENTER);
    textSize(width/10);
    text('GAME OVER: YOU WIN', width/2, height/2);
    textSize(40);
    text('Touch to play again', width/2, height-50);
    
    if(touches.length > 0 || mouseIsPressed)
    {
      generateMaze(15);
      bola = new ball();
      fin = new finish();
      nivel = 0;
    }
    
    pop();
  }
 
  if(nivel >= 1)
  {
    background(12);
    push();
    fill(255, 255, 255, 50);
    ellipse(bola.x, bola.y, 2*lightRadius);
    pop();
    
    fin.show();
    
    bola.show();
    bola.update(); 

    if(keyIsDown(LEFT_ARROW))
    {
      bola.vx -= 0.1;
    }

    if(keyIsDown(RIGHT_ARROW))
    {
      bola.vx += 0.1;
    }

    if(keyIsDown(UP_ARROW))
    {
      bola.vy -= 0.1;
    }

    if(keyIsDown(DOWN_ARROW))
    {
      bola.vy += 0.1;
    }

    checkCollision(bola, obstaculos);
    
    checkEnded(bola, fin);
    
    push();
    textAlign(CENTER);
    textSize(width/4);
    fill(126, 245, 18);
    text(nivel, width/2, height/2);
    pop();

    for(k = 0; k < obstaculos.length; k++)
    {
      d = dist(bola.x, bola.y, obstaculos[k].x, obstaculos[k].y);
      
      if(nivel == 1 || nivel == 2)
      {
        obstaculos[k].visited = true;
        obstaculos[k].show();
      }
      
      if(nivel == 3 || nivel == 4)
      {
        if(d < lightRadius)
        {
          obstaculos[k].visited = true;
        }
        
        obstaculos[k].show();
      }
      
      if(nivel == 5)
      {
        if(lightRadius <= d && d < lightRadius + 40)
        {
          obstaculos[k].visited = true;
          obstaculos[k].show();
        }

        if(d < lightRadius)
        {
          obstaculos[k].visited = true;
          obstaculos[k].show();
        }
      }
      
    }
  }  
}

function generateMaze(w)
{
  cellsX = w;
  
  cellSize = (width-1)/cellsX;
  
  cellsY = floor(height/cellSize);
  
  cells = [];
  
  for(var i = 0; i < cellsY; i++)
  {
    cells[i] = [];

    for(var j = 0; j < cellsX; j++)
    {
      cells[i][j] = new cell(i, j, cellSize);
    }
  }
  
  while(unvisitedCells(cells, cellsX, cellsY))
  {
    generateCell(cellsX, cellsY);
  }
  
  obstaculos = [];
  
  for(var i = 0; i < cellsY; i++)
  {
    for(var j = 0; j < cellsX; j++)
    {
      celda = cells[i][j];
      
      if(celda.top)
      {
        obstaculos.push(new obstacle(celda.x, celda.y,  celda.size, 2));
      }
      
      if(celda.right)
      {
        obstaculos.push(new obstacle(celda.x + celda.size, celda.y, 2, celda.size));
      }
      
      if(celda.down)
      {
        obstaculos.push(new obstacle(celda.x, celda.y + celda.size, celda.size, 2));
      }
      
      if(celda.left)
      {
        obstaculos.push(new obstacle(celda.x, celda.y, 2, celda.size));
      }
    }
  }
}

function generateCell(w, h)
{
  var currentCell = cells[m][n];

  var neighbors = currentCell.getNeighbors(cells, w, h);

  if(neighbors.length > 0)
  {
    var k = floor(random(0, neighbors.length));

    stack.push(currentCell);

    cell1 = currentCell;
    cell2 = neighbors[k];

    if(cell1.row == cell2.row)
    {
      if(cell1.col < cell2.col)
      {
        cells[cell1.row][cell1.col].right = false;
        cells[cell2.row][cell2.col].left = false;
      }

      else if(cell2.col < cell1.col)
      {
        cells[cell2.row][cell2.col].right = false;
        cells[cell1.row][cell1.col].left = false;
      }
    }

    if(cell1.col == cell2.col)
    {
      if(cell1.row < cell2.row)
      {
        cells[cell1.row][cell1.col].down = false;
        cells[cell2.row][cell2.col].top = false;
      }

      else if(cell2.row < cell1.row)
      {
        cells[cell2.row][cell2.col].down = false;
        cells[cell1.row][cell1.col].top = false;
      }
    }

    m = neighbors[k].row;
    n = neighbors[k].col;
    
    cells[m][n].visited = true;
  }

  else if(stack.length > 0)
  {
    m = stack[stack.length-1].row;
    n = stack[stack.length-1].col;

    currentCell = cells[m][n];

    stack.splice(stack.length-1, 1);
  }
}

function unvisitedCells(grid, x, y)
{
  var foundUnvisited = false;

  for(var i = 0; i < y; i++)
  {
    for(var j = 0; j < x; j++)
    {
      if(!grid[i][j].visited)
      {
        return true;
      }
    }
  }

  return foundUnvisited;
}

function checkCollision(ball, obstacles)
{
  for(var i = 0; i < obstacles.length; i++)
  {
    obsX = obstacles[i].x;
    obsY = obstacles[i].y;
    obsW = obstacles[i].width;
    obsH = obstacles[i].height;

    ballX = ball.x;
    ballY = ball.y;
    ballS = ball.size;

    if(obsX -2 <= ballX && ballX <= obsX + obsW +2)
    {
      if(obsY - ballS/2 <= ballY && ballY <= obsY + obsH/2)
      {
        ball.vy *= 0.9;
        ball.y = obsY - ballS/2 - 0.5;
      }

      else if(obsY + obsH/2 <= ballY && ballY <= obsY + obsH + ballS/2)
      {
        ball.vy *= 0.9;
        ball.y = obsY + obsH + ballS/2 + 0.5;
      }
    }

    if(obsY - 2 <= ballY && ballY <= obsY + obsH + 2)
    {
      if(obsX - ballS/2 <= ballX && ballX <= obsX + obsW/2)
      {
        ball.vx *= 0.9;
        ball.x = obsX - ballS/2;
      }

      else if(obsX + obsW/2 <= ballX && ballX <= obsX + obsW + ballS/2)
      {
        ball.vx *= 0.9;
        ball.x = obsX + obsW + ballS/2;
      }
    }
  }
}

function checkEnded(ball, finish)
{
  d = dist(ball.x, ball.y, finish.x, finish.y);
  
  if(d <= 5*bola.size/8)
  {
    ball.entrar(finish);

    if(dist(ball.x, ball.y, finish.x, finish.y) <= 1)
    {
      changeLevel();
    }
  }
}

function changeLevel()
{
  nivel = nivel + 1;
  
  if(nivel == 2)
  {
    r = 15
  }
  
  else if(nivel == 3 || nivel == 4)
  {
    r = 20
  }
  
  else if (nivel == 5)
  {
    r = 25;
  }
  
  if(nivel <= 5)
  {
    generateMaze(r);
  
    bola.x = cellSize/2;
    bola.y = cellSize/2;
  
    bola.moving = true;

    fin.size = cellSize/2 + 5;
  }
}

function touchStarted() 
{
  if(nivel == 0) 
  {
    nivel = 1;
  }
}

function mouseDragged()
{
  return false;
}
