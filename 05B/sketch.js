//Cantidad por defecto de bolas
var cant;

//Posiciones de las bolas
var x=[];
var y=[];

//Tamaño bolas  
var tam;

function setup() 
{ 
  createCanvas(400, 400);
  
  //Cantidad por defecto de bolas
  cant=24;
  
  //Posición inicial elipses
  for(var i=0; i<cant; i++)
  {
    x[i]=random(0, width);
    y[i]=random(0, height);
  }
} 

function draw() 
{ 
  push();
  background(255);
  text('Press', width/2, height/2);
  pop();
  
  //Muestra el estado en caso de presionar una tecla
  push();
  if(keyIsPressed || mouseIsPressed)
  {
    h=hour()+minute()/60+second()/3600;

    //Cambia el color del fondo según la distancia al medio día
    r=map(abs(h-12), 0, 12, 72, 0);
    g=map(abs(h-12), 0, 24, 151, 0);
    b=map(abs(h-12), 0, 24, 145, 0);
  
    background(r, g, b);
    
    //Dispersión de las bolas segúna distancia al medio día
    d=map(abs(h-12), 0, 12, -15, 1);
    
    //Tamaño bolas según segundo
    tam=map(second(), 0, 60, 10, 50);
    
    //Cambia el color y transparencia de las bolas según el segundo
    noStroke();
    c=map(second(), 0, 60, 0, 180);
    t=map(second(), 0, 6, 170, 220);
    fill(c, 0, 0, 200);
    
    //Tantas bolas como la hora actual
    cant=hour();
    
    //Ángulo minutero
    tM=map(minute(), 0, 60, 0, TWO_PI)-HALF_PI;
    
    //Dibuja las bolas y actualiza sus pocisiones
    for(var i=0; i<cant; i++)
    {
      x[i]=constrain(x[i]+random(-d, d), 0, width);
      y[i]=constrain(y[i]+random(-d, d), 0, height);
      
      ellipse(x[i], y[i], tam, tam);
      
      //Minutero en cada elipse
      push();
      translate(x[i], y[i]);
      fill(255);
      ellipse(tam/2*cos(tM), tam/2*sin(tM), tam/5, tam/5);
      pop();
    }  
  }
  pop();
}