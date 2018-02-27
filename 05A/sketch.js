//Segundo inicial
var s;

//Longitudes segundero, minutero, horario
var rS;
var rM;
var rH;

function setup() 
{ 
  createCanvas(400, 400);
  s=second();
  
  rS=min(width, height)/4;
  rM=0.7*rS;
  rH=0.5*rS;
} 

function draw() 
{ 
  //Color de fondo cambiante respecto a la hora del día
  r=map(hour()+minute()/60+second()/3600, 0, 24, 189, 5);
  g=map(hour()+minute()/60+second()/3600, 0, 24, 192, 9);
  b=map(hour()+minute()/60+second()/3600, 0, 24, 251, 75);
  background(r, g, b);  

  //Ángulos de las manecillas
  tS=map(s+millis()/1000, 0, 60, 0, TWO_PI)-HALF_PI;
  tM=map(minute()+second()/60, 0, 60, 0, TWO_PI)-HALF_PI;
  tH=map(hour()%12+minute()/60+second()/3600, 0, 12, 0, TWO_PI)-HALF_PI;
  
  translate(width/2, height/2);
  
  //Radio en el que se contiene todo el reloj
  r2=1.2*rS;
  push();
  strokeWeight(1.5);
  fill(r/2, g/2, b/2);
  ellipse(0, 0, 2*r2, 2*r2);
  pop();
  
  //Stroke cambiante dependiendo de la hora del día
  stroke(map(hour(), 0, 24, 0, 250));
  
  //Horario
  push();
  strokeWeight(3);
  line(0, 0, rH*cos(tH), rH*sin(tH));  
  pop();
  
  //Minutero
  push();
  strokeWeight(2);
  line(0, 0, rM*cos(tM), rM*sin(tM));
  pop();
  
  //Segundero
  push();
  strokeWeight(1);
  stroke(map(second(), 0, 60, 255, 100), 0, 0);
  line(0, 0, rS*cos(tS), rS*sin(tS));
  pop();
  
  //Círculo central sobre base de manecillas
  push();
  noStroke();
  ellipse(0, 0, 5, 5);
  pop();
  
  //Líneas de segundo
  for(var i=0; i<60; i++)
  {
    strokeWeight(1);
    //Radio menor y mayor para las líneas guia
    r1=1.15*rS;
    
    //Cada 5 segundos la línea guia es más larga y gruesa;
    if(i%5==0)
    {
      r1=1.1*rS;
      strokeWeight(1.5);
    }
    
    line(r1*cos(i*TWO_PI/60), r1*sin(i*TWO_PI/60), r2*cos(i*TWO_PI/60), r2*sin(i*TWO_PI/60));
  }
}