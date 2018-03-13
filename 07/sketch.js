//Botón filtro 1
var f1;

//Botón filtro 2
var f2;

//Sliders
var r;
var g;
var b;

//Botón filtro 3
var f3;
var fil3=false;

//Botón de salvar
var saveIm;

//Imagen
var img;

// noprotect

function preload()
{
  img=loadImage("office.jpg");
}

function setup() 
{
  createCanvas(img.width/2, img.height/2);
  image(img, 0, 0, img.width/2, img.height/2);
  
  //Botón filtro 1
  f1=createButton('Negative');
  f1.position(0, height+5);
  f1.mousePressed(filtro1);
  
  //Botón filtro 2
  f2=createButton('Red component');
  f2.position(f1.x, f1.y+f1.height+5);
  f2.mousePressed(filtro2);
  
  //Botón filtro 3
  f3=createButton('RGB tint');
  f3.position(f2.x, f2.y+f2.height+5);
  f3.mousePressed(filtro3);
  
  //Sliders
  r=createSlider(0, 255, 255);
  r.position(f3.x, f3.y+f3.height);
  g=createSlider(0, 255, 255);
  g.position(r.x, r.y+20, 50);
  b=createSlider(0, 255, 255);
  b.position(r.x, g.y+20, 80);
  
  red1=createP('red');
  red1.position(r.x+r.width+10, r.y-20);
  green1=createP('green');
  green1.position(g.x+g.width+10, g.y-20);
  blue1=createP('blue');
  blue1.position(b.x+b.width+10, b.y-20);
  
  //Botón salvar imagen
  save=createButton('Save');
  save.position(width-save.width, height+5);
  save.mousePressed(saveDrawing);
}

function draw()
{
  if(fil3)
  {
    background(255);
    tint(r.value(), g.value(), b.value());
    image(img, 0, 0, img.width/2, img.height/2);
  }
}

function saveDrawing()
{
  saveCanvas();
}

function filtro1()
{
  fil3=false;
  noTint();
  
  image(img, 0, 0, img.width/2, img.height/2);
  
  for(var i=0; i<width; i++)
  {
    for(var j=0; j<height; j++)
    {
      r1=red(get(i,j));
      g1=green(get(i,j));
      b1=blue(get(i,j));
      
      colN=color(255-r1, 255-g1, 255-b1);
        
      set(i, j, colN);
      updatePixels();
    }
  }
}

function filtro2()
{
  fil3=false;
  noTint();
  
  image(img, 0, 0, img.width/2, img.height/2);
  
  for(var i=0; i<width; i++)
  {
    for(var j=0; j<height; j++)
    {
      r1=red(get(i,j));
      colN=color(r1, r1, r1);
        
      set(i, j, colN);
      updatePixels();
    }
  }
}

function filtro3()
{
  fil3=true;
}
