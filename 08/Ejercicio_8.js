//Canción a tocar
var song;

//Amplitud del sonido
var amplitud;

var mx=0;

//Volumen del sonido
var volume;

//Paneo del sonido
var pan;

//Botón de play
var play;

//Botón de pause
var pause;

//Tiempo actual de la canción
var t=0;

//Botón de stop
var stop;

//Boton input
var input;

function preload()
{
  song=loadSound('lettherightonein.mp3');
}

function setup() 
{
  createCanvas(400, 400);
  
  //Botón play
  play=createButton('Play/Resume');
  play.position(5, height+5);
  play.mousePressed(playSong);
  
  //Botón pause
  pause=createButton('Pause');
  pause.position(5, play.y+play.height+5);
  pause.mousePressed(pauseSong);
  
  //Botón stop
  stop=createButton('Stop');
  stop.position(5, pause.y+pause.height+5);
  stop.mousePressed(stopSong);
  
  amplitud=new p5.Amplitude();
  
  //Deslizador de volumen 
  pvol=createP('Volume:');
  pvol.position(5, stop.y+stop.height/2);
  
  volume=createSlider(0, 100, 30);
  volume.position(pvol.x+55, stop.y+stop.height+5);
  
  //Deslizador de paneo 
  ppan=createP('Pan:');
  ppan.position(5, pvol.y+pvol.height+5);
  
  pan=createSlider(0, 100, 50);
  pan.position(ppan.x+55, ppan.y+ppan.height);
  
  //Input
  input=createFileInput(handleFile);
  input.position(width-180, height+5);
}

function draw() 
{
  //Color de fondo según amplitud
  if(mx<=0.1)
  {
    background(map(t, 0, song.duration(), 255, 0), 255, 255);
  }
  
  else if(0.1<mx && mx<=0.2)
  {
    background(255, map(t, 0, song.duration(), 0, 255), 255);
  }
  
  else 
  {
    background(255, 255, map(t, 0, song.duration(), 0, 255));
  }
  
  //Cambio de volumen según valor del deslizador de volumen
  vol=map(volume.value(), 0, 100, 0, 1);
  song.setVolume(vol);
  
  //Cambio de paneo según deslizador paneo
  song.pan(map(pan.value(), 0, 100, -1, 1));
  
  //Amplitud de la canción
  m=amplitud.getLevel();
  
  //Actualiza la amplitud de manera continua
  if(abs(mx-m)>0.0001)
  {
    mx=mx+(m-mx)/3;
  }
  
  //Elipse segun la amplitud
  push();
  d=mx*2*width;
  noStroke();
  
  //Color elipse
  alc=map(mx, 0, 1, 100, 255);
  
  if(mx<=0.1)
  {
    fill(random(alc), 0, 0);
  }
  
  else if(0.1<mx && mx<=0.2)
  {
    fill(0, random(alc), 0);
  }
  
  else 
  {
    fill(0, 0, random(alc));
  }
  
  ellipse(width/2, height/2, d, d);
  pop();
  
  //Barra de desarollo de la canción
  if(song)
  {
    //Barra
    push();
    noStroke();
    fill(200);
    rect(0, height-4, width, 4);
    pop();
    
    //Rectángulo
    t=song.currentTime();
    x=map(t, 0, song.duration(), 0, width);
    push();
    noStroke();
    fill(0);
    rect(x, height-4, 3, 3);
    pop();
  }
}

//Reproduce-resume la canción cargada
function playSong()
{
  if(song && !song.isPlaying())
  {
    song.play();
  }
}

//Termina la canción que se esté reproduciendo
function stopSong()
{
  if(song.isPlaying())
  {
    song.stop();
  }
}

//Detiene la canción que se está reproduciendo
function pauseSong()
{
  if(song.isPlaying())
  {
    song.pause();
  }
}

//Carga la canción elegida
function handleFile(file)
{
  song=loadSound(file.data);
}