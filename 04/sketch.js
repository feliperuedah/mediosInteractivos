
var d=15;

var herramientaElegida;
//Dimensiones botones herramientas
var wHerramienta;
var hHerramienta;
//Alto de la barra de herramientas
var hBarraHerramientas;
//Alto de la barra de color
var hBarraColor;

//Dimensiones botones colores
var wColor;
var hColor;

//Herramienta a usar
var herramienta=0;
//Cantidad herramientas
var herramientas=10;

//Lista de colores
var colores=[];

//Variable valor color elegido (0 si no se ha elegido color, 1 si se ha elegido color)
var colorEl=0;
//Color de stroke
var colStroke;
//Color de fill
var col;

//Colores
var verde;
var rojo;
var azul;
var amarillo;
var naranja;
var rosado;
var celeste;
var negro;
var blanco;

//Ángulo de la herramienta de vertices de pentágono
var angulo=0;

function setup() 
{ 
  createCanvas(500, 400);
  background(255);
  
  //Inicialización de variables
  wHerramienta=20;
  hHerramienta=20;
  
  hBarraHerramientas=hHerramienta+10;
  
  wColor=10;
  hColor=10;
  
  hBarraColor=hColor+10;

  yColor=height-hColor-5;
  
  col=color(255, 255, 255); 
  colStroke=color(255, 255, 255);
  
  verde=color(0, 255, 0);
  rojo=color(255, 0, 0);
  azul=color(0, 0, 255);
  amarillo=color(255, 242, 0);
  naranja=color(255, 127, 39);
  rosado=color(255, 0, 128);
  celeste=color(0, 255, 255);
  negro=color(0, 0, 0);
  blanco=color(255, 255, 255);
  
  colores[0]=verde;
  colores[1]=rojo;
  colores[2]=azul;
  colores[3]=amarillo;
  colores[4]=naranja;
  colores[5]=rosado;
  colores[6]=celeste;
  colores[7]=negro;
  colores[8]=blanco;
} 

function draw() 
{ 
  //Selecciona la herramienta
  if(0<=mouseX && mouseX<=width && 0<=mouseY && mouseY<=hBarraHerramientas && mouseIsPressed)
  {
    herramientaElegida=false;
    for(var i=0; i<herramientas && !herramientaElegida; i++)
    {
      x=width-(i+1)*(wHerramienta+5);
      
      if(x<=mouseX && mouseX<=x+wHerramienta && 5<=mouseY && mouseY<=5+hHerramienta)
      {      
        herramienta=i+1;
        herramientaElegida=true;
      }
    }
  }
  
  //Selecciona el color
  if(0<=mouseX && mouseX<=width && height-hBarraColor<mouseY && mouseY<=height && mouseIsPressed)
  {
    colorElegido=false;
    for(var i=0; i<colores.length && !colorElegido; i++)
    {
      x=width-(i+1)*(wColor+5);
      
      if(x<=mouseX && mouseX<=x+wColor && yColor<=mouseY && mouseY<=yColor+hColor)
      {
        colStroke=colores[i];
        col=colores[i];
        colorElegido=true;
        colorEl=1;
      }
    }
  }
  
  //Dibuja según la herramienta escogida
  if(0<=mouseX && mouseX<=width && hBarraHerramientas<mouseY && mouseY<=height-hBarraColor && mouseIsPressed)
  {     
    if(herramienta==1)
    {
      push();
      stroke(colStroke);
      strokeWeight(1);
      line(mouseX-5, mouseY+5, mouseX+5, mouseY-5);
      pop();
    }
    
    else if(herramienta==2)
    {
      push();
      noStroke();
      fill(red(col), green(col), blue(col), 50);
      ellipse(mouseX, mouseY, d, d);
      pop();
    }
    
    else if(herramienta==3)
    {
      push();
      strokeWeight(0.1);
      stroke(colStroke);
      fill(col);
      line(0, hHerramienta+10, mouseX, mouseY);
      pop();
    }
    
    else if(herramienta==4)
    {
      push();
      strokeWeight(0.2);
      stroke(colStroke);
      h=constrain(map(mouseX, 0, width, 0, height-hBarraHerramientas-hBarraColor), 0, height-hBarraHerramientas-hBarraColor);
      line(mouseX, height-hBarraColor, mouseX, height-hBarraColor-h); 
      pop();
    }
    
    else if(herramienta==5)
    {
      push();
      strokeWeight(2);
      stroke(colStroke);
      translate(mouseX, mouseY)
      for(var i=0; i<5; i++)
      {
        r=30;
        ellipse(r*cos(angulo+i*TWO_PI/5), r*sin(angulo+i*TWO_PI/5), d/4, d/4);
      }
      pop();
      
      if(keyIsDown(LEFT_ARROW))
      {
        angulo-=0.05;
      }
      
      if(keyIsDown(RIGHT_ARROW))
      {
        angulo+=0.051;
      }
    }
    
    else if(herramienta==6)
    {
      push();
      noStroke();
      fill(red(col), green(col), blue(col), 80);
      ellipse(mouseX, mouseY, d/2, d/2);
      ellipse(width-mouseX, mouseY, d/2, d/2);
      pop();
    }
    
    else if(herramienta==7)
    {
      push();
      strokeWeight(map(d, 0, 2*width/3, 0.01, 3));
      stroke(colStroke);
      line(0, hBarraHerramientas+(height-hBarraColor-hBarraHerramientas)/2, mouseX, mouseY);
      line(width, hBarraHerramientas+(height-hBarraColor-hBarraHerramientas)/2, mouseX, mouseY);
      line(width/2, hBarraHerramientas, mouseX, mouseY);
      line(width/2, height-hBarraColor, mouseX, mouseY);
      pop();
    }
    
    else if(herramienta==8)
    {
      push();
      
      pop();
    }
  }
  
	//Cambia el tamaño de la herramienta a usar
  if(keyIsDown(UP_ARROW))
  {
    d=constrain(d+0.5, 0, 2*width/3);
  }
      
  if(keyIsDown(DOWN_ARROW))
  {
    d=constrain(d-0.5, 0, 2*width/3);
  }
  
  //Cambia el ángulo de la herramienta 5
  if(keyIsDown(LEFT_ARROW))
  {
    angulo-=0.05;
  }
      
  if(keyIsDown(RIGHT_ARROW))
  {
    angulo+=0.051;
  }
  
  //Barra gris herramientas
  push();
  noStroke();
  fill(240);
  rect(0, 0, width, hBarraHerramientas);
  pop();
  
  //Botones herramientas
  
  //Boton línea
  push();
  x=width-(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  x=width-(hHerramienta/2+5)
  line(x-5, 5+hHerramienta/2+5, x+5, hHerramienta/2);
  pop();
  
  //Botón elipse
  push();
  x=width-2*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta); 
  x=width-2*(wHerramienta+5)+wHerramienta/2;
  noStroke();
  fill(0);
  ellipse(x, 5+hHerramienta/2, 15, 15);
  pop();
  
  //Botón línea esquina izquierda superior a mouse
  push();
  x=width-3*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  strokeWeight(0.5);
  stroke(0);
  mx=constrain(map(mouseX, 0, width, x, x+wHerramienta), x, x+wHerramienta);
  my=constrain(map(mouseY+5, 5, height, 5, 5+hHerramienta), 5, 5+hHerramienta);
  line(x, 5, mx, my);
  pop();
  
  //Botón líneas verticales
  push();
  h=constrain(map(mouseX, 0, width, 0, hHerramienta), 0, hHerramienta);     
  x=width-4*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  x1=constrain(map(mouseX, 0, width, x, x+wHerramienta), x, x+wHerramienta);
  strokeWeight(0.5);
  line(x1, hHerramienta+5, x1, hHerramienta+5-h);
  pop();
  
  //Botón circulos pentágono
  push();
  x=width-5*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta); 
  r=6;
  translate(x+wHerramienta/2, 5+hHerramienta/2);
  strokeWeight(0.5);
  for(var i=0; i<5; i++)
  {
    ellipse(r*cos(angulo+i*TWO_PI/5), r*sin(angulo+i*TWO_PI/5), 3, 3);
  }
  pop();
  
  //Botón dibujo simétrico
  push();
  x=width-6*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  strokeWeight(0.5);
  x1=constrain(map(mouseX, 0, width, 0, wHerramienta), 0, wHerramienta);
  y=constrain(map(mouseY, 0, height, 5, 5+hHerramienta), 5, 5+hHerramienta);
  noStroke();
  fill(0);
  ellipse(x+x1, y, 3, 3);
  ellipse(x+wHerramienta-x1, y, 3, 3);
  pop();
  
  //Botón 4 lineas medias
  push();
  x=width-7*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  x1=constrain(map(mouseX, 0, width, x, x+wHerramienta), x,x+wHerramienta);
  y1=constrain(map(mouseY, 0, height, 5, 5+hHerramienta), 5, 5+hHerramienta);
  strokeWeight(0.5);
  line(x, 5+hHerramienta/2, x1, y1);
  line(x+wHerramienta, 5+hHerramienta/2, x1, y1);
  line(x+wHerramienta/2, 5, x1, y1);
  line(x+wHerramienta/2, 5+hHerramienta, x1, y1);
  pop();
  
  //Botón 
  push();
  x=width-8*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  pop();
  
  //Botón 
  push();
  x=width-9*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  pop();
  
  //Botón 
  push();
  x=width-10*(wHerramienta+5);
  rect(x, 5, wHerramienta, hHerramienta);
  pop();
  
  //Barra blanca colores
  push();
  noStroke();
  fill(240);
  rect(0, height-hColor-10, width, hBarraColor);
  pop();
  
  //Now using: Muestra la herramienta seleccionada
  if(herramienta!=0)
  {
    text('Now using: ', 5, 2*hBarraHerramientas/3);
    rect(70, 5, wHerramienta, hHerramienta);
    
    x=70;
    
    //Línea
    if(herramienta==1)
    {
      push();
      line(x-5+wHerramienta/2, 5+hHerramienta/2+5, x+5+wHerramienta/2, hHerramienta/2);
      pop();
    }
    
    //Círculo
    else if(herramienta==2)
    {
      push();
      noStroke();
      fill(0);
      ellipse(x+wHerramienta/2, 5+hHerramienta/2, 15, 15);
      pop();
    }
    
    //Línea esquina-mouse
    else if(herramienta==3)
    {
      push();
      strokeWeight(0.5);
      stroke(0);
      mx=constrain(map(mouseX, 0, width, x, x+wHerramienta), x, x+wHerramienta);
      my=constrain(map(mouseY+5, 5, height, 5, 5+hHerramienta), 5, 5+hHerramienta);
      line(x, 5, mx, my);
      pop();
    }
    
    //Línea vertical
    else if(herramienta==4)
    {
      push();
      h=constrain(map(mouseX, 0, width, 0, hHerramienta), 0, hHerramienta);     
      rect(x, 5, wHerramienta, hHerramienta);
      x1=constrain(map(mouseX, 0, width, x, x+wHerramienta), x, x+wHerramienta);
      strokeWeight(0.5);
      line(x1, hHerramienta+5, x1, hHerramienta+5-h);
      pop();
    }
    
    //Vértices pentágono
    else if(herramienta==5)
    { 
      push();
      r=6;
      translate(x+wHerramienta/2, 5+hHerramienta/2);
      strokeWeight(0.5);
      for(var i=0; i<5; i++)
      {
        ellipse(r*cos(angulo+i*TWO_PI/5), r*sin(angulo+i*TWO_PI/5), 3, 3);
      }
      pop();
    }
    
    //Dibujo simétrico
    else if(herramienta==6)
    {
      push();
      strokeWeight(0.5);
      x1=constrain(map(mouseX, 0, width, 0, wHerramienta), 0, wHerramienta);
      y=constrain(map(mouseY, 0, height, 5, 5+hHerramienta), 5, 5+hHerramienta);
      noStroke();
      fill(0);
      ellipse(x+x1, y, 3, 3);
      ellipse(x+wHerramienta-x1, y, 3, 3);
      pop();
    }
  }
  
  //Botones colores
  push();
	strokeWeight(0.5);
  for(var i=0; i<colores.length; i++)
  {
    fill(colores[i]);
    rect(width-(i+1)*(wColor+5), yColor, wColor, hColor);
  }
  
  //Now using: Muestra el color seleccionado
  if(colorEl!=0)
  {
    noStroke();
    fill(0);
    text('Now using:', 5, height-hBarraColor/3);
  
    stroke(0);
    strokeWeight(0.5);
    fill(col);
    rect(70, height-hBarraColor+5, wColor, hColor);
  }
  pop();
}
    


