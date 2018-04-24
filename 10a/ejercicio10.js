//Llave para acceder a la API de Auckland Transport. Para obtener una: https://dev-portal.at.govt.nz/signup
var atKey='8955d922e9d544cbb0c2ad67a9caef76';

//Versión de los datos
var versionDatos;

//Conjunto de puntos de coordenadas que definen la linea seleccionada
var datos;

//Paradas de la linea seleccionada
var paradas;

//Buses que se movilizan por la línea
var buses=[];

//Menu desplegable de rutas
var menuRutas;

//Título de la ruta seleccionada
var titulo;

//Nombre de la ruta actual a ver
var nombre;

//Arreglo de rutas dadas por el nombre
var rutas;

//Id de una ruta dada por el nombre
var rutaId;

//Viajes dados por el id de la ruta
var trips;

//Id de un trip dado por la ruta
var tripId;

//Nombres rutas
var ruta362='Manukau Bus Station To Weymouth Via Great South Rd';
var ruta070='Long Bay College To Browns Bay Shops';
var ruta061='Rangitoto College To Torbay';
var ruta882='Albany Station To Torbay';

function preload()
{
  $.ajax( {  
  url: 
    "https://api.at.govt.nz/v2/gtfs/versions?", 
    beforeSend: 
    function(xhrObj) {
      // Request headers
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", atKey);
    }
    , 
    type: 
    "GET", 
      // Request body
    data: 
    "{body}",
  }
  )
  .done(function(data) {
    versionDatos=data.response[0].version;
  }
  )
  .fail(function() {
    alert("There was an error consulting versions");
  }
  );
}

function setup() 
{
  createCanvas(600, 600);
  background(220);
  
  //Menu de rutas
  menuRutas=createSelect();
  menuRutas.option('Line 362');
  menuRutas.option('Line 070');
  menuRutas.option('Line 061');
  menuRutas.option('Line 882');
  menuRutas.position(width-2*menuRutas.width-5, height+5);
  menuRutas.changed(seleccionarRuta);

  //Título con nombre de la ruta seleccionada
  titulo=createElement('h4', 'No line picked');
  titulo.position(5, height-20);
}

function draw() 
{ 
  background(220);

  //En caso de que los datos de la ruta hayan sido cargados los dibuja
  if(datos)
  {    
    //Arreglos de puntos en longitud-latitud que definen la ruta
    var latitudes=[];
    var longitudes=[];

    //Cantidad de puntos
    n=datos.length;

    //Llena los arreglos con los datos cargados
    for(var i=0; i<n; i++)
    {
      latitudes[i]=datos[i].shape_pt_lat;
      longitudes[i]=datos[i].shape_pt_lon;
    }

    //Calcula la mínima y máxima longitud (latitud) para posicionar los puntos de manera centrada en el canvas 
    xM=max(longitudes);
    xm=min(longitudes);

    yM=max(latitudes);
    ym=min(latitudes);

    //Distancias máximas horizontales y verticales
    dx=abs(xM-xm);
    dy=abs(yM-ym);

    //Distancia máxima entre la distancia horizontal y vertical
    //Calculada para disponer la ruta en su totalidad, ya sea que se extienda horizontal o verticalmente 
    d=max(dx, dy);

    //Dibuja las líneas que unen los puntos que definen la ruta
    for(var i=0; i<n-1; i++)
    {
      y1=map(latitudes[i], ym+dy/2-d/2, ym+dy/2+d/2, height-2, 2);
      y2=map(latitudes[i+1], ym+dy/2-d/2, ym+dy/2+d/2, height-2, 2);

      x1=map(longitudes[i], xm+dx/2-d/2, xm+dx/2+d/2, 2, width-2);
      x2=map(longitudes[i+1], xm+dx/2-d/2, xm+dx/2+d/2, 2, width-2);

      line(x1, y1, x2, y2);
    }

    //Si se han cargado las paradas de la ruta entonces se dibujan
    if(paradas)
    {
      textAlign(CENTER);

      //Dibuja cada parada
      for(var i=0; i<paradas.length; i++)
      {
        //Calcula el punto de la parada en la pantalla
        x=map(paradas[i].stop_lon, xm+dx/2-d/2, xm+dx/2+d/2, 2, width-2);
        y=map(paradas[i].stop_lat, ym+dy/2-d/2, ym+dy/2+d/2, height-2, 2);

        //Si el mouse no está sobre la parada dibuja una elipse pequeña
        if (dist(mouseX, mouseY, x, y)>4)
        {
          ellipse(x, y, 8, 8);
        }

        //Si el mouse está sobre la parada, se agranda la ellipse y muestra el nombre de la parada y el número de esta
        else
        {
          ellipse(x, y, 16, 16);
          textSize(11);
          text(i+1, x, y+4);

          push();
          fill(255, 0, 0);

          textX=constrain(x, 60, width-80);
          textY=constrain(y, 60, height);

          nombreParada=paradas[i].stop_name;

          text(nombreParada, textX, textY-16);
          pop();
        }
      }
    }

    //Si se ha cargado un bus que recorra la ruta se dibuja en tiempo real
    if(buses.length>0)
    {
      for(var i=0; i<buses.length; i++)
      {
        //Posición del bus
        lat=buses[i].vehicle.position.latitude;
        lon=buses[i].vehicle.position.longitude;
  
        x=map(lon, xm+dx/2-d/2, xm+dx/2+d/2, 0, width);
        y=map(lat, ym+dy/2-d/2, ym+dy/2+d/2, height, 0);
  
        push();
        fill(255, 0, 0);
        ellipse(x, y, 10, 10);
        textAlign(CENTER);
        text("Vehicle ID: "+buses[i].vehicle.vehicle.id, x, y-20);
        pop();
      }
    }
  }
}

function cargarBus(vec)
{  
  for(var i=0; i<vec.length; i++)
  {
    tripid=vec[i].trip_id;
    
    $.ajax({  url: "https://api.at.govt.nz/v2/public/realtime/vehiclelocations?&tripid="+tripid,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", atKey);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            buses=buses.concat(data.response.entity);
        })
        .fail(function() {
            alert("error");
        });
  }
}

//Función que selecciona la ruta a mostrar
function seleccionarRuta()
{
  var line=menuRutas.value();

  if(line=='Line 362')
  {
    nombre=ruta362;
    titulo.html('362: '+nombre);
  } 
  
  else if(line=='Line 070')
  {
    nombre=ruta070;
    titulo.html('070: '+nombre);
  } 
  
  else if(line=='Line 061')
  {
    nombre=ruta061;
    titulo.html('061: '+nombre);
  }
  
  else if(line=='Line 882')
  {
    nombre=ruta882;
    titulo.html('882: '+nombre);
  }

  //Busca la ruta según el nombre
  if(nombre)
  {
    $.ajax({  url: "https://api.at.govt.nz/v2/gtfs/routes/routeLongName/"+nombre+"?",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", atKey);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            rutas=data.response;
            
            if(rutas)
            {
              for(var i=0; i<rutas.length; i++)
              {
                if(rutas[i].route_id.endsWith(versionDatos))
                {
                  rutaId=rutas[i].route_id;
                }
              }
              
              if(rutaId)
              {
                $.ajax({  url: "https://api.at.govt.nz/v2/gtfs/trips/routeid/"+rutaId,
                          beforeSend: function(xhrObj){
                              // Request headers
                              xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", atKey);
                          },
                          type: "GET",
                          // Request body
                          data: "{body}",
                      })
                      .done(function(data) {
                          trips=data.response;
                                                   
                          if(trips)
                          {
                            for(var j=0; j<trips.length; j++)
                            {
                              if(trips[j].trip_id.endsWith(versionDatos))
                              {
                                tripId=trips[j].trip_id;
                              }
                            }
                            
                            if(tripId)
                            {
                              cargarRuta(tripId);
                              cargarParadas(tripId);
                              cargarBus(trips);
                            }
                          }
                      })
                      .fail(function() {
                          alert("error");
                      });
              }
            }
        })
        .fail(function() {
            alert("error");
        });
  }
} 

function cargarRuta(trip)
{
  $.ajax({  url: "https://api.at.govt.nz/v2/gtfs/shapes/tripId/"+trip+"?",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", atKey);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            datos=data.response;
        })
        .fail(function() {
            alert("Ther has been an error loading this line");
        });
}

function cargarParadas(trip)
{
  $.ajax({  url: "https://api.at.govt.nz/v2/gtfs/stops/tripId/"+trip+"?",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", atKey);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            paradas=data.response;
        })
        .fail(function() {
            alert("Ther has been an error loading this line stops");
        });
}

function mercX(lon) 
{
  lon = radians(lon);
  var a = (256/PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}
 
function mercY(lat) 
{
  lat = radians(lat);
  var a = (256/PI) * pow(2, zoom);
  var b = tan(PI/4 + lat/2);
  var c = PI - log(b);
  return a * c;
}