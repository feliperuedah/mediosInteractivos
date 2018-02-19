//Ancho de la zona de dibujo
var sizeX=322;

//Características mosca
var mosca=15;

//Posición mosca
var x;
var y;

//Sentidos
var sx=1;
var sy=1;

//Velocidades
var vx;
var vy;

//Contador de choques
var cont=0;

//Ancho cara bob
var cara=200;

//Nariz bob
var xS=50+sizeX/2;
var tamNariz=30;

//Ojos bob
var tamOjo=60;
var xOjoIzq=xS-tamOjo/2-20;
var xOjoDer=xS+tamOjo/2+20;
var yOjos;
var d=50;
var theta;
var pupila=15;
var iris=20;

//Cejas bob
var xCejaIzq=xOjoIzq;
var xCejaDer=xOjoDer;
var yCejas;
var ceja=40;

function setup() 
{
  createCanvas(sizeX+50, 208);
  
  //Posición inicial mosca
  x=random(50+mosca, width);
  y=random(mosca, height);
  
  //Velocidad mosca
  vx=random(-8, 8);
  vy=random(-8, 8);
  
  //Posiciones ojos
  yOjos=height-30;
  
  //Posiciones cejas
  yCejas=yOjos-tamOjo/2-10;

  //Color mosca (rojo inicial)
  col=color(255, 0, 0);
}

function draw() 
{ 
  //Portada  
  if (frameCount<=30) 
  {
    background(0);
    
    push();
    noStroke();
    rectMode(CENTER);   
    for(var i=0; i<10; i++)
    {
      tamX=map(i, 0, 9, sizeX, 20);
      tamY=map(i, 0, 9, height, 10);
      r=map(i, 0, 9, 94, 251);
      g=map(i, 0, 9, 9, 50);
      b=map(i, 0, 9, 2, 34);
      fill(r,g,b);
      rect(xS, height/2, tamX, tamY);
    }

    fill(255);
    textAlign(CENTER);
    textSize(30);
    text('Annoying bug', xS, height/3);
    
    fill(190, 190, 190, 200);
    textSize(15);
    text('feliperuedah', 4*width/5, height-20);
    
    pop();
  }

  //Animación
  else if (30<frameCount) 
  {
    background(255);
    
    //Línea separación
    push();
    stroke(230);
    line(50, 0, 50, height);
    
    //Distancia mosca-centro ojos
    d=sqrt(pow(xS-x,2)+pow(yOjos-y,2));
    //Máxima distancia entre la mosca y el centro de los ojos
    m=sqrt(pow(xS-width,2)+pow(yOjos,2));
    
    //Cara
    noStroke();
    fill(map(d, 0, m, 230, 255), map(d, 0, m, 230, 255), 0);
    rect(xS-cara/2, height/2, cara, height/2);
    
    //Ojos
    
    //Color ojos
    noStroke();
    r=map(d, 0, m, 250, 255);
    g=map(d, 0, m, 100, 255);
    b=map(d, 0, m, 80, 255); 
    fill(r, g, b);
    
    //Izquierdo
    ellipse(xOjoIzq, yOjos, tamOjo, tamOjo);
    //Derecho
    ellipse(xOjoDer, yOjos, tamOjo, tamOjo);
    
    //Cejas
    strokeWeight(map(d, 0, m, 3, 1));
    stroke(0);
    
    //Longitud cejas
    r=map(d, 0, m, ceja/2+3, ceja/2-3);
    //Ángulo cejas
    beta=map(d, 0, m, 0.8, -0.5);
    line(xCejaIzq-r*cos(beta), yCejas-r*sin(beta), xCejaIzq+r*cos(beta), yCejas+r*sin(beta));
    line(xCejaDer+r*cos(beta), yCejas-r*sin(beta), xCejaDer-r*cos(beta), yCejas+r*sin(beta));    
    
    //Nariz
    noStroke();
    fill(map(d, 0, m, 205, 230), map(d, 0, m, 205, 230), 0);
    ellipse(xS, height, tamNariz, tamNariz);
    
    //Movimiento ojos
    izqX=map(x, 50, width, xOjoIzq-tamOjo/2+pupila/2, xOjoIzq+tamOjo/2-pupila/2);
    izqY=map(y, 0, width, yOjos-tamOjo/2+pupila/2, yOjos+tamOjo/2-pupila/2);
    derX=map(x, 50, width, xOjoDer-tamOjo/2+pupila/2, xOjoDer+tamOjo/2-pupila/2);
    derY=map(y, 0, width, yOjos-tamOjo/2+pupila/2, yOjos+tamOjo/2-pupila/2);
    
    //Iris
    fill(0, 100, 255);
    ellipse(izqX, izqY, iris, iris);
    ellipse(derX, derY, iris, iris);
    
    //Pupilas
    fill(0);
    pupila=map(d, 0, m, 5, 20);   
    ellipse(izqX, izqY, pupila, pupila);
    ellipse(derX, derY, pupila, pupila);
    pop();
    
    //Mosca
    if(cont%3==0)
    {
      col=color(map(x, 0, sizeX, 255, 120), 0, 0);
    }
    
    else if(cont%3==1)
    {
      col=color(0, map(x, 0, sizeX, 255, 120), 0);
    }
    
    else if(cont%3==2)
    {
      col=color(0, 0, map(x, 0, sizeX, 255, 120));      
    }
    
    //Mosca
    noStroke();
    fill(col);
    ellipse(x, y, mosca, mosca);

    //Cambio de dirección
    if (x<=50+mosca/2 || x>=width-mosca/2) 
    {
      sx*=-1;
      cont++;
    }

    if (y<=mosca/2 || y>=height-mosca/2) 
    {
      sy*=-1;
      cont++;
    }

    x+=sx*vx;
    y+=sy*vy;    
  }
  
  //Contra portada
  else if (frameCount==100) 
  {
    background(0);
    
    noStroke();
    rectMode(CENTER);   
    for(var j=0; j<10; j++)
    {
      tamX=map(j, 0, 9, sizeX, 20);
      tamY=map(j, 0, 9, height, 10);
      r=map(j, 0, 9, 243, 185);
      g=map(j, 0, 9, 250, 189);
      b=map(j, 0, 9, 14, 4);
      fill(r,g,b);
      rect(xS, height/2, tamX, tamY);
    }
    
    translate(0, -height/3);
    
    //Ojos
    fill(250, 90, 70);
    ellipse(xOjoIzq, yOjos, tamOjo, tamOjo);
    ellipse(xOjoDer, yOjos, tamOjo, tamOjo);
    
    //Cejas
    strokeWeight(3);
    stroke(0);
    
    //Longitud cejas
    r=ceja/2+2;
    //Ángulo cejas
    beta=0.5;
    line(xCejaIzq-r*cos(beta), yCejas-r*sin(beta), xCejaIzq+r*cos(beta), yCejas+r*sin(beta));
    line(xCejaDer+r*cos(beta), yCejas-r*sin(beta), xCejaDer-r*cos(beta), yCejas+r*sin(beta));    
    
    //Iris
    izqX=xOjoIzq;
    izqY=yOjos;
    derX=xOjoDer;
    derY=yOjos;
    
    noStroke();
    fill(0, 100, 255);
    ellipse(izqX, izqY, iris, iris);
    ellipse(derX, derY, iris, iris);
    
    //Pupilas
    fill(0);
    pupila=10;   
    ellipse(izqX, izqY, pupila, pupila);
    ellipse(derX, derY, pupila, pupila);
    
    //Nariz
    noStroke();
    fill(157, 162, 4);
    ellipse(xS, height, tamNariz, tamNariz);
  } 
  
  else if (frameCount==101) 
  {
    noLoop();
  }
}
