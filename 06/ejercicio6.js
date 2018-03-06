//Tamaño del círculo deslizador
var tam=6;

//Posición del deslizador
var mx=0;

//Aceleración del deslizador
var ax=20;

//Piso verde
var wPiso=5000;
var hPiso=8000;

//Carretera
var wCarretera=207;

//Lineas amarillas
var lAmarilla=100;
var sAmarilla=30;

//Arbol
var cantArboles=11;
var colArboles=[];
var hArboles=[];
var rArboles=[];

//Casa
var cantCasas=11;
var wCasa=200;
var hCasa=150;
var dCasa=180;
var sCasa=50;
var hTecho=60;

//coloresCasa casa
var coloresCasa=[cantCasas];
var coloresTecho=[cantCasas];

function setup() 
{
  createCanvas(500 , 500, WEBGL);
  
  //coloresCasa casas
  for(var i=0; i<cantCasas; i++)
  {
    coloresCasa[i]=color(random(255), random(255), random(255));
    coloresTecho[i]=color(random(109, 202), random(54, 99), random(30, 36));
  }
  
  //Dimensiones arboles
  for(var i=0; i<cantArboles; i++)
  {
    rArboles[i]=random(15, 22);
    hArboles[i]=random(170, 220);
    colArboles[i]=color(random(119, 81), random(80, 54), random(40, 28));
  }
}

function draw() 
{
  background(map(mx, 0, width, 20, 40), map(mx, 0, width, 67, 131), map(mx, 0, width, 92, 179));
  
  //Intensidad luces
  intensidad=map(mx, 0, width, 150, 200);
  
  //Luces
  for(var i=0; i<5; i++)
  {
    d=map(i, 0, 4, intensidad, intensidad/100);
    pointLight(d, d, d, 0, height/2, 100+i*50);
  }
  
  //Dolly camara
  translate(0, 0, map(mx, 0, width, -width/2, 1500));
  
  //Plano piso verde
  push();
  translate(0, height/2, 0);
  rotateX(-HALF_PI);
  r=map(mx, 0, width, 252, 43);
  g=map(mx, 0, width, 253, 75);
  b=map(mx, 0, width, 251, 29);
  fill(r, g, b);
  plane(wPiso, hPiso);
  pop();
  
  //Carretera
  push();
  ambientMaterial(220, 255, 220);
  translate(0, height/2, 0);
  rotateX(-HALF_PI);
  box(wCarretera, hPiso, 2);
  pop();
  
  //Líneas amarillas carretera
  push();
  ambientMaterial(255, 255, 0);
  translate(0, height/2, hPiso/2);
  cant=floor(hPiso/(lAmarilla+sAmarilla));
  
  for(var i=0; i<cant; i++)
  {
    box(wCarretera/15, 4, lAmarilla);
    translate(0, 0, -lAmarilla-sAmarilla);
  }
  pop();
  
  //Líneas amarillas continuas carretera
  push();
  ambientMaterial(255, 255, 0);
  translate(-wCarretera/2, height/2, 0);
  box(wCarretera/15, 3, hPiso);
  pop();
  push();
  ambientMaterial(255, 255, 0);
  translate(wCarretera/2, height/2, 0);
  box(wCarretera/15, 3, hPiso);
  pop();
  
  //Arboles
  push();
  translate(-300, height/2, width/2);
  
  for(var i=0; i<cantArboles; i++)
  {
    push();
    //Tronco
    ambientMaterial(colArboles[i]);
    translate(100*(noise(i)-0.5), -hArboles[i]/2, -240*i);
    cone(rArboles[i], hArboles[i]);
    
    //Copa
    push();
    translate(0, -hArboles[i]/2, 0);
    ambientMaterial(map(mx, 0, width, 40, 75), map(mx, 0, width, 88, 162), map(mx, 0, width, 18, 34));
    sphere(map(mx, 0, width, 0, 20));
    pop();
    
    //Ramas
    translate(0, hArboles[i]/4, 0); 
    for(var k=0; k<4; k++)
    {  
      lRama=map(k, 0, 3, hArboles[i]/3, hArboles[i]/6);
      rRama=map(k, 0, 3, 8, 3);
      rotateY(TWO_PI*noise(k));
      for(var j=0; j<5; j++)
      {
        rotateY(TWO_PI/5);
        push();
        translate(0, 20*noise(j), (15-4*k)*rArboles[i]/20+lRama/2);
        rotateX(HALF_PI);
        ambientMaterial(colArboles[i]);
        cone(rRama, lRama);
        translate(0, -lRama/2, 0);
        ambientMaterial(map(mx, 0, width, 40, 75), map(mx, 0, width, 88, 162), map(mx, 0, width, 18, 34));
        sphere(map(mx, 0, width, 0, 20));
        pop();
      }
      translate(0, -hArboles[i]/5, 0);
    }
    pop();   
  }
  pop();
  
  //Casas
  push();
  translate(300, height/2-hCasa/2, width/2);
  for(var i=0; i<cantCasas; i++)
  {
    translate(0, 0, -wCasa-sCasa);
    ambientMaterial(coloresCasa[i]);
    box(wCasa, hCasa, dCasa);
  }
  pop();
  
  //Techos casas
  push();
  //Angulo inclinación
  theta=atan((dCasa/2)/hTecho);
  //Longitud diagonal techo
  l=sqrt(pow(dCasa/2,2)+pow(hTecho,2));
  
  translate(3*width/5, height/2-hCasa-hTecho/2, width/2);
  
  for(var i=0; i<cantCasas; i++)
  {
    translate(0, 0, -wCasa-sCasa);
    
    //Triangulos techo
    push();
    rotateY(HALF_PI);
    fill(coloresTecho[i]);
    beginShape();
    vertex(0, -hTecho/2, -wCasa/2);
    vertex(dCasa/2, hTecho/2, -wCasa/2);
    vertex(-dCasa/2,  hTecho/2, -wCasa/2);
    endShape(CLOSE);
    beginShape();
    vertex(0, -hTecho/2, wCasa/2);
    vertex(dCasa/2, hTecho/2, wCasa/2);
    vertex(-dCasa/2,  hTecho/2, wCasa/2);
    endShape(CLOSE);
    pop();
 
    //Laterales (Madera)
    push();
    ambientMaterial(coloresTecho[i]);
    rotateY(PI);
    translate(0, 0, dCasa/4);
    rotateX(-theta);
    box(wCasa, l, 3);
    pop();
    
    push();
    ambientMaterial(coloresTecho[i]);
    rotateY(PI);
    translate(0, 0, -dCasa/4);
    rotateX(theta);
    box(wCasa, l, 3);
    pop();
    
    //Laterales (Nieve)
    if(mx<=330)
    {
      push();
      ambientMaterial(255, 255, 255);
      rotateY(PI);
      translate(0, 0, dCasa/4);
      rotateX(-theta);
      box(wCasa+map(mx, 0, width, 5, -1), l+map(mx, 0, width, 10, -2), map(mx, 0, width, 20, -10));
      pop();
          
      push();
      ambientMaterial(255, 255, 255);
      rotateY(PI);
      translate(0, 0, -dCasa/4);
      rotateX(theta);
      box(wCasa+map(mx, 0, width, 5, -1), l+map(mx, 0, width, 10, -2), map(mx, 0, width, 20, -10));
      pop();   
    }
  }
  pop();
  
  //Actualiza el deslizador en x
  if(abs(mx-mouseX)>1)
  {
    mx=constrain(mx+(mouseX-mx)/ax, tam/2, width-tam/2);
  }
}