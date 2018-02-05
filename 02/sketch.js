//Dimensiones rectángulo
var ancho=41;
var alto=124;
//Dimensión de altura de las franjas de los rectángulos con rayas
var altoFranja=alto/10;

function setup() 
{ 
  createCanvas(492, 744);
  
	//Colores

  //Colores fondo rectángulos cruz
  var negro=color(35, 34, 32);
  var blanco=color(209, 195, 165);
  
  //Colores rectángulos rayados
  var naranja=color(199, 74, 51);
  var blancoClaro=color(216, 198, 156);
  var cafe=color(65, 47, 35);
  var blancoOscuro=color(175, 161, 128);
  
  //Iteración para dibujar los 72 rectángulos
  for(var i=0; i<12; i++)
  {
    for(var j=0; j<6; j++)
    {
      //Calcula el número del rectángulo que se está dibujando
      var c=6*i+j+1;
      
      //Dibuja los rectángulos con cruces
      if(c==1 || c==4 || c==9 || c==12 || c==14 || c==17 || c==19 || c==22 || c==26 || c==29 || c==31 || c==34 || c==39 || c==42 || c==44 || c==47 || c==51 || c==54 || c==55 || c==58 || c==62 || c==65 || c==69 || c==72)
      {
				//Color de fondo de rectángulo y de su respectiva cruz
        var colFondo=negro;
        var colLinea=blanco;
        
        //Dibuja los rectángulos de fondo negro, si la columna es la primera, tercera o quinta, entonces el rectángulo es negro 
        if(j==0 || j==2 || j==4)
        {
          colFondo=negro;
          colLinea=blanco;
          
          //Cambia el color de la cruz a naranja en caso de ser necesario, dentro de los rectángulos negros con cruces, esto sólo se prensenta si éste está en la columna 3
          if(j==2)
          {
            colLinea=naranja;
          }
        }
        
        //Si el rectángulo con cruz a dibujar se encuentra en la columna 2, 4 o 6, entoncces es un rectángulo blanco
        else if(j==1 || j==3 || j==5)
        {
          colFondo=blanco;
          colLinea=negro;
          
          //Cambia el color de la cruz a naranja si es necesario, dentro de los rectángulos blancos con cruces, esto sólo ocurre si el rectángulo está en la columna 4
          if(j==3)
          {
            colLinea=naranja;
          }
        }
        
        //Dibuja el rectángulo
        noStroke();
        fill(colFondo);
        rect(i*ancho, j*alto, ancho, alto);
        
        //Cruz
        stroke(colLinea);
        //Línea horizontal
        line(i*ancho, j*alto+alto/2, i*ancho+ancho, j*alto+alto/2);
        //Línea vertical
        line(i*ancho+ancho/2, j*alto, i*ancho+ancho/2, j*alto+alto);      
      }   
      
      //Dibuja los rectángulos con franjas
      else
      {
        noStroke();
        
        //Color primera franja rectángulo 
        var color1=blanco;
        //Color segunda franja rectángulo
        var color2=naranja;
        
        //Dibuja los rectángulos de franjas naranja-blanco cuya primera franja es naranja
        if(c==6 || c==7 || c==15 || c==16 || c==24 || c==27 || c==28 || c==36 || c==37 || c==45 || c==46 || c==49 || c==60 || c==63 || c==64 || c==67)
        {
          color1=naranja;
          color2=blancoClaro;
        }
        
        //Dibuja los rectángulos de franjas naranja-blanco cuya primera franja es blanco
        else if(c==2 || c==11 || c==20 || c==32 || c==41 || c==47 || c==56 || c==62 || c==77)
        {
          color1=blancoClaro;
          color2=naranja;
        }
        
        //Dibuja los rectángulos de franjas café-blanco oscuro cuya primera franja es café
        else if(c==3 || c==10 || c==13 || c==18 || c==21 || c==25 || c==30 || c==33 || c==40 || c==43 || c==48 || c==52 || c==57 || c==61 || c==66 || c==70)
        {
          color1=cafe;
          color2=blancoOscuro;
        }
        
        //Dibuja los rectángulos de franjas café-blanco oscuro cuya primera franja es blanco oscuro
        else if(c==5 || c==8 || c==23 || c==35 || c==38 || c==50 || c==59 || c==68)
        {
          color1=blancoOscuro;
          color2=cafe;
        }
        
        //Dibuja un rectángulo con un color de fondo igual al color de la franja inicial
        fill(color1);
        rect(i*ancho, j*alto, ancho, alto);
        
        //Dibuja las 5 franjas sobre el rectángulo anterior con el color de la segunda franja
        fill(color2);
        for(var k=0; k<6; k++)
        {
          rect(i*ancho, j*alto+altoFranja+2*k*altoFranja, ancho, altoFranja);
        }
      }
    }
  } 
}