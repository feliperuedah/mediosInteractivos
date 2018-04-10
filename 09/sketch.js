//Comida de los peces
var cantComida=10;
var comida=[];

//Peces normales
var cantPeces=3;
var peces=[];

//Peces globos
var cantPecesGlobos=5;
var pecesGlobos=[];

//Medusas
var cantMedusas=2;
var medusas=[];

//Cangrejos
var cantCangrejos=2;
var cangrejos=[];

//Botón para alimentar a los peces
var feedButton;

function setup() 
{
  createCanvas(500, 400);
  
  //Comida
  for(var i=0; i<cantComida; i++)
  {
    comida[i]=new food();
  }
    
  //Peces
  for(var i=0; i<cantPeces; i++)
  {
    peces[i]=new fish(); 
  }
  
  //Medusas
  for(var i=0; i<cantMedusas; i++)
  {
    medusas[i]=new jellyfish();
  }
  
  //Cangrejos
  for(var i=0; i<cantCangrejos; i++)
  {
    cangrejos[i]=new crab(); 
  }
  
  //Peces globos
  for(var i=0; i<cantPecesGlobos; i++)
  {
    pecesGlobos[i]=new globefish();
  }
  
  //Botón de alimento
  feedButton=createButton('Feed');
  feedButton.position(width-feedButton.width-5, height+5);
  feedButton.mousePressed(feed);
}

function draw() 
{
  background(135, 206, 235);
  
  //Peces
  for(var i=0; i<peces.length; i++)
  {
    peces[i].show();
    peces[i].update();
  }
  
  //Cangrejos
  for(var i=0; i<cangrejos.length; i++)
  {
    cangrejos[i].show();
    cangrejos[i].update();
  }
  
  //Peces globos
  for(var i=0; i<pecesGlobos.length; i++)
  {
    pecesGlobos[i].show();
    pecesGlobos[i].update();
  }
  
  //Medusas
  for(var i=0; i<medusas.length; i++)
  {
    medusas[i].show();
    medusas[i].update();
  }
  
  //Comida
  for(var i=0; i<comida.length; i++)
  {
    comida[i].show();
    comida[i].update();
  }
  
  //Cangrejos-comida
  for(var i=0; i<cangrejos.length; i++)
  {
    for(var j=0; j<comida.length; j++)
    {
      //Determina si el centro de la comida está dentro de la elipse del cangrejo
      d=pow((cangrejos[i].x-comida[j].x)/(cangrejos[i].width/2), 2)+pow((cangrejos[i].y-comida[j].y)/(cangrejos[i].height/2), 2);
      
      if(d<=1)
      {
        comida.splice(j, 1);
      }
    }
  }
  
  //Peces-comida
  for(var i=0; i<peces.length; i++)
  {
    for(var j=0; j<comida.length; j++)
    {
      //Calcula el sentido en que nada el pez (1 si vx>0, -1 si vx<0)
      sentido=peces[i].vx/abs(peces[i].vx);
      
      //Posición de la boca del pez según su sentido de nado
      x1=peces[i].x+sentido*peces[i].width/2;
      y1=peces[i].y;
      
      //Posición de la comida
      x2=comida[j].x;
      y2=comida[j].y;
      
      //Distancia entre la boca del pez y la comida
      d=dist(x1, y1, x2, y2);
      
      if(d<=comida[j].size/2)
      {
        comida.splice(j, 1);
      }
    }
  }
  
  //Peces globo-comida
  for(var i=0; i<pecesGlobos.length; i++)
  {
    for(var j=0; j<comida.length; j++)
    {
      //Posición de la boca del pez globo
      x1=pecesGlobos[i].x;
      y1=pecesGlobos[i].y;
      
      //Posición de la comida
      x2=comida[j].x;
      y2=comida[j].y;
      
      //Distancia entre la boca del pez globo y la comida
      dx=abs(x1-x2);
      dy=abs(y1-y2);
      
      //Verifica si la comida está dentro del rectángulo que define la boca del pez globo
      if(dx<=pecesGlobos[i].size/8 && dy<=pecesGlobos[i].size/20)
      {
        comida.splice(j, 1);
        pecesGlobos[i].size+=1;
      }
    }
  }
  
  //Peces-medusas
  for(var i=0; i<peces.length; i++)
  {
    for(var j=0; j<medusas.length; j++)
    {
      //Sentido de nado del pez
      sentido=peces[i].vx/abs(peces[i].vx);
      
      //Posición pez
      x1=peces[i].x;
      y1=peces[i].y;
      
      //Siguiente posicion pez
      x2=peces[i].x+peces[i].vx;
      y2=peces[i].y+peces[i].vy;
      
      //Posición medusa
      u1=medusas[j].x;
      v1=medusas[j].y;
      
      //Siguiente posición medusa
      u2=medusas[j].x+medusas[j].vx;
      v2=medusas[j].y+medusas[j].vy;
      
      xb=x2+sentido*peces[i].width/2;
      
      //Distancia entre el pez y la medusa
      d1=dist(x1, y1, u1, v1);
      
      //Siguiente distancia entre el pez y la medusa
      d2=dist(x2, y2, u2, v2);
      
      if(d1<peces[i].width/2+medusas[j].size/2)
      {
        if(d2<d1)
        {
          if(peces[i].vx<=0 && medusas[j].vx>=0 || peces[i].vx>=0 && medusas[j].vx<=0)
          {
            peces[i].vx*=-1;
          }
        }
      }
    }
  }
  
  //Peces globos-medusas
  for(var i=0; i<pecesGlobos.length; i++)
  {
    for(var j=0; j<medusas.length; j++)
    {
      if(dist(pecesGlobos[i].x, pecesGlobos[i].y, medusas[j].x, medusas[j].y)<=medusas[j].size/2+pecesGlobos[i].size/2)
      {
        pecesGlobos[i].inflado=true;
      }
    } 
  } 
}

//Cangrejos-medusas
for(var i=0; i<cangrejos.length; i++)
{
  for(var j=0; j<medusas.length; j++)
  {
    //Distancia entre medusa y cangrejo
    d=dist(cangrejos[i].x, cangrejos[i].y, medusas[j].x, medusas[j].y);
    if(d<=medusas[j].size)
    {
      cangrejos[i].y=cangrejos[i].y-100;
    }
  }
}

//Comida
function food()
{
  //Tamaño
  this.size=random(8, 15);
  
  //Posición inicial
  this.x=random(this.size/2+1, width-this.size/2-1);
  this.y=random(-2*this.size, 2*this.size);
  
  //Velocidad
  this.vx=random(-2, 2);
  this.vy=random(1, 1.5);
  
  //Color
  this.col=color(random(165, 232), random(93, 180), random(48, 125));
  
  //Dibuja el alimento
  this.show=function()
  {
    push();
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
  
  //Actualiza el alimento basado en la velocidad y el número de golpes
  this.update = function()
  {
    //Incremento en la posición según la velocidad
    this.x+=this.vx;
    this.y+=this.vy;
    
    //Rebota en los extremos laterales
    if(this.x+this.size/2>=width || this.x<=this.size/2)
    {
      this.vx*=-1;
    }
    
    //Cuando llega al fondo del tanque se detiene
    if(this.y+this.size/2>=height)
    {
      this.vy=0;
      this.vx*=0.95;
    }
  }
}

//Especie pez
function fish()
{
  //Dimensiones del pez 
  this.width=random(50, 70);
  this.height=random(20, 30);
    
  //Posición del pez
  this.x=random(this.width/2+1,width-this.width/2-1);
  this.y=random(this.height/2+1, height-this.height/2-1);
    
  //Velocidad del pez
  if(random()>0.5)
  {
    this.vx=random(1, 2);
  }
  
  else
  {
    this.vx=random(-2, 1);
  }
  this.vy=random(-2, 2);
  
  //Color del pez
  this.col=color(random(255), random(255), random(255));
  
  //Estado del pez
  this.alive=true;
  
  this.show=function()
  {
    //Dibuja el pez si está vivo
    if(this.alive)
    {
      push();
      noStroke();
      fill(this.col);
      ellipse(this.x, this.y, this.width, this.height);
      
      fill(color(255-red(this.col), 255-green(this.col), 255-blue(this.col)));
      
      //Dibuja la cola y el ojo del pez según la dirección
      if(this.vx>=0)
      {
        x1=this.x-3*this.width/4;
        y1=this.y-this.height/2;
        
        x2=x1;
        y2=this.y+this.height/2;
        
        x3=this.x-3*this.width/8;
        y3=this.y+this.height/4;
        
        x4=x3;
        y4=this.y-this.height/4;
        
        //Cola
        quad(x1, y1, x2, y2, x3, y3, x4, y4);
        
        //Ojo
        push();
        fill(0);
        noStroke();
        //Tamaño del ojo
        s=3*this.width/70;
        ellipse(this.x+3*this.width/8, this.y-this.height/8, s, s);
        pop();
      }
      
      else
      {
        x1=this.x+3*this.width/4;
        y1=this.y-this.height/2;
        
        x2=x1;
        y2=this.y+this.height/2;
        
        x3=this.x+3*this.width/8;
        y3=this.y+this.height/4;
        
        x4=x3;
        y4=this.y-this.height/4;
               
        //Cola
        quad(x1, y1, x2, y2, x3, y3, x4, y4);
        
        //Ojo
        push();
        fill(0);
        noStroke();
        
        ellipse(this.x-3*this.width/8, this.y-this.height/8, 3, 3);
        pop();
      }
      pop();
    }
  }
  
  //Actualiza la posición del pez
  this.update=function()
  {
    //Incrementa la posición según la velocidad
    this.x+=this.vx;
    this.y+=this.vy;
    
    //Cambia de sentido al encontrarse con los laterales
    if(this.x+this.width/2>=width || this.x-this.width/2<=0)
    {
      this.vx*=-1;
      
      //Cambia la dirección en Y aleatoriamente al llegar a los laterales
      if(random()>=0.5)
      {
        this.vy=random(1,2);
      }
      
      else
      {
        this.vy=random(-2,-1);
      }
    }
    
    //Cambia de sentido al encontrarse en los extremos horizontales
    if(this.y+this.height/2>=height || this.y-this.height/2<=0)
    {
      this.vy*=-1;
    }
  }
}

//Especie medusa
function jellyfish()
{
  //Tamaño
  this.size=random(35, 45);
  
  //Posición inicial
  this.x=random(76+this.size/2, width-this.size/2-76);
  this.y=random(this.size/2+1, height-this.size/2-1);
  
  //Velocidad
  this.vx=random(-1,1);
  this.vy=random(-2.5, 2.5);
  
  //Color
  this.col=color(random(238, 190), random(187, 20), random(249, 226), 120);
  
  //Dibuja la medusa
  this.show=function()
  {
    push();
    
    //Espacio entre los tentáculos de la medusa
    spacing=(3*sqrt(3)/25)*this.size/2;
    
    //Ancho de cada tentáculo de la medusa
    ancho=(sqrt(3)/10)*this.size/2;
    
    //Tentáculos
    noStroke();
    
    //Color tentáculos
    r=red(this.col)-30;
    g=green(this.col)-20;
    b=blue(this.col)-20;
    fill(r, g, b);
    
    //Dibuja los cuatro tentáculos
    for(var i=0; i<4; i++)
    {    
      //Posición del tentáculo a dibujar
      x=this.x-(sqrt(3)/2)*this.size/2+spacing+i*(ancho+spacing);
      y=this.y+this.size/4;
      
      //Tentáculo
      rect(x, y, ancho, (noise(i, 3*y/height)+0.5)*3*this.size/4);
    }
    
    //Cuerpo
    fill(this.col);
    arc(this.x, this.y, this.size, this.size, 5*PI/6, 13*PI/6, CHORD);
    
    pop();
  }
  
  //Actualiza la medusa
  this.update=function()
  {
    //Incrementa la posición según la velocidad
    this.x+=this.vx;
    this.y+=this.vy;
    
    //Cambia de dirección al llegar cerca los extremos laterales
    if(abs(width/2-this.x)>=width/2-this.size/2-75)
    {
      this.vx*=-1;
    }
    
    //Cambia de dirección al llegar a los extremos horizontales
    if(abs(height/2-this.y)>=height/2-this.size/2)
    {
      this.vy*=-1;
    }
  }
}

//Especie cangrejo
function crab()
{
  //Tamaño 
  this.width=random(30, 50);
  this.height=2*this.width/5;
  
  //Posición 
  this.x=random(this.width/2+1, width-this.width/2-1);
  this.y=random(height-50, height-this.height/2);
  
  //Velocidad
  this.vx=random(-1, 1);
  this.vy=random(1, 1.5);
  
  //Color 
  this.col=color(random(191, 248), random(75, 114), random(6, 33));
  
  //Estado 
  this.alive=true;
  
  //Dibuja el cangrejo
  this.show=function()
  {
    if(this.alive)
    {
      push();
      //Cuerpo
      noStroke();
      fill(this.col);
      ellipse(this.x, this.y, this.width, this.height);
      
      //
      push();
      //Izquierda 
      r=red(this.col)-30;
      g=green(this.col)-30;
      b=blue(this.col)-30;
      
      strokeWeight(this.height/4);
      stroke(r, g, b);
      
      x=this.x-0.38*this.width;
      y=this.y-this.height/4;
      
      line(x, y, x-0.6*this.width, y-0.3*this.height);
      fill(r, g, b);
      arc(x-0.6*this.width, y-0.3*this.height, 0.6*this.height, 0.6*this.height, -HALF_PI+PI/4, TWO_PI-HALF_PI+PI/4);
      
      //Derecha
      x=this.x+0.38*this.width;
      y=this.y-this.height/4;
      
      line(x, y, x+0.6*this.width, y-0.3*this.height);
      arc(x+0.6*this.width, y-0.3*this.height, 0.6*this.height, 0.6*this.height, -HALF_PI+PI/4, TWO_PI-HALF_PI+PI/4);
      
      pop();
      
      //Ojos
      x1=this.x-0.2*this.width;
      x2=this.x+0.2*this.width;
      y=this.y-this.height/2;
      
      fill(255);
      ellipse(x1, y, this.width/5, this.width/5);
      ellipse(x2, y, this.width/5, this.width/5);
      
      fill(0);
      ellipse(x1, y, this.width/10, this.width/10);
      ellipse(x2, y, this.width/10, this.width/10);
      
      //Boca
      stroke(20);
      strokeWeight(3);
      line(this.x-this.width/8, this.y, this.x+this.width/8, this.y);
      pop();
    }
  }
  
  //Actualiza la posición del cangrejo
  this.update=function()
  {
    //Incrementa la posición según la velocidad
    this.x+=this.vx;
    this.y+=this.vy;
    
    //Cambia de dirección al llegar a los extremos laterales
    if(abs(width/2-this.x)>=width/2-this.width/2)
    {
      this.vx*=-1;
    }
    
    //El cangrejo deja de caer al hacer contacto con el suelo
    if(this.y>=height-this.height/2)
    {
      this.vy=0;
    }
  }
}

//Especie pez globo
function globefish()
{
  //Tamaño
  this.size=random(20, 30);
  
  //Posición
  this.x=random(this.size/2+1, width-this.size/2-1);
  this.y=random(this.size/2+1, height-this.size/2-1);
  
  //Velocidad
  this.vx=random(random(-1.5, 1.5));
  this.vy=random(random(-1.5, 1.5));
  
  //Colores
  this.col=color(random(130, 201), random(152, 215), random(63, 59));
  this.colOjos=[color(random(220, 255)), color(random(0, 100))];
  
  //Determina si el pez se va a inflar
  this.inflado=false;
  
  //Número de puas
  this.puas=floor(random(20, 30));
  
  //Dibuja el pez globo
  this.show=function()
  {
    push();
    //Cuerpo
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    
    //Puas
    //Ancho de cada pua según la cantidad
    w=this.size/4*TWO_PI/this.puas;
    
    push();
    translate(this.x, this.y);
    for(var i=0; i<this.puas; i++)
    {
      rotate(-TWO_PI/this.puas);
      push();
      translate(0, this.size/2);
      triangle(-w/2, 0, w/2, 0, 0, 5);
      pop();
    }
    pop();
    
    //Ojos
    push();
    fill(this.colOjos[0]);
    ellipse(this.x+this.size/5, this.y-this.size/4, this.size/6, this.size/6);
    ellipse(this.x-this.size/5, this.y-this.size/4, this.size/6, this.size/6);
    
    fill(this.colOjos[1]);
    ellipse(this.x+this.size/5, this.y-this.size/4, this.size/10, this.size/10);
    ellipse(this.x-this.size/5, this.y-this.size/4, this.size/10, this.size/10);
    pop();
    
    //Boca
    push();
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.size/4, this.size/10, 20);  
    pop();
    
    pop();
  }
  
  //Actualiza el pez globo
  this.update=function()
  {
    //Incrementa la posicion
    this.x+=this.vx;
    this.y+=this.vy;
    
    //Cambia de dirección al encontrar los laterales
    if(abs(width/2-this.x)>=width/2-this.size/2)
    {
      this.vx*=-1;
    }
    
    //Cambia de dirección al encontrar los bordes horizontales
    if(abs(height/2-this.y)>=height/2-this.size/2)
    {
      this.vy*=-1;
    }
    
    //Aumenta el tamaño en caso de ser inflado
    if(this.inflado)
    {
      this.size=constrain(1.05*this.size, 30, 63);
    }
  }
  
  //Desinfla el pez globo
  this.desinflar=function()
  {
    this.size=constrain(0.95*this.size, 30, 63);
  }
}

//Comida
function feed()
{
  for(var i=0; i<cantComida; i++)
  {
    comida.push(new food());
  }
}