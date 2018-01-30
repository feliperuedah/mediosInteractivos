function draw() 
{ 
  createCanvas(977, 307); 
  background(199, 210, 214);
  
  //Primer color fondo
  noStroke();
  fill(225, 218, 206, 200);  
  beginShape();
  vertex(0, 0);
  vertex(0, 307);
  vertex(408, 307);
  vertex(428, 228);
  vertex(278, 135);
  vertex(394, 0);
  endShape(CLOSE);
  
  //Segundo color fondo
  fill(236, 228, 207, 200);  
  quad(428, 228, 278, 135, 323, 85, 460, 87);
  
  //Tercer color fondo
  fill(205, 214, 213, 200);  
  quad(462, 87, 408, 307, 577, 307, 578, 87);
  
  //Cuarto color fondo
  fill(221, 209, 193, 220);
  beginShape();
  vertex(578, 87);
  vertex(577, 307);
  vertex(990, 307);
  vertex(795, 0);
  vertex(685, 0);
  vertex(710, 86);
  endShape(CLOSE);
  
  //Quinto color fondo
  fill(237, 217, 218, 250);
  quad(559, 0, 649, 87, 710, 86, 685, 0);
  
  //Sexto color fondo
  fill(213, 197, 182);
  triangle(990, 307, 977, 0, 795, 0);
  
  //Séptimo color fondo
  fill(210, 216, 212);
  quad(360, 39, 323, 85, 649, 87, 560, 0);
  
  //Octavo color fondo
  fill(185, 195, 196);
  triangle(366, 31, 548, 0, 394, 0);
  
  //Circulos izquierdos
  fill(155, 152, 167, 70);
  ellipse(96, 110, 129, 119);
  //Morado
  fill(160, 147, 169, 250);
  ellipse(96, 110, 108, 105);
  //Azul
  fill(99, 144, 170, 300);
  ellipse(96, 110, 91, 87);
  //Amarillo
  stroke(0);
  fill(210, 185, 57);
  ellipse(96, 110, 68, 69);
  
  //Arco circular cuadrícula
  strokeWeight(1);
  stroke(0);
  noFill();
  arc(234, 63, 110, 116, 3, 5);
  
  //Cuadrícula izquierda
  
  noStroke();
  
  //Primera columna
  //Cuadrilátero cafe
  fill(138, 88, 15);
  quad(213, 86, 246, 103, 266, 72, 232, 39);
  //Cuadrilátero azul claro
  fill(180, 188, 209);
  quad(246, 103, 266, 72, 276, 81, 250, 105);
  //Cuadrilátero blanco
  fill(236, 217, 210);
  quad(276, 81, 250, 105, 268, 115, 290, 93);
  //Cuadrilátero verde
  fill(101, 134, 47);
  quad(268, 115, 290, 93, 303, 107, 287, 126);
  
  //Segunda columna
  //Cuadrilátero blanco
  fill(240, 221, 217);
  quad(241, 17, 282, 49, 266, 72, 232, 39);
  //Cuadrilátero negro
  fill(11, 9, 12);
  quad(282, 49, 266, 72, 276, 81, 296, 60);
  //Cuadrilátero gris
  fill(217, 213, 186);
  quad(276, 81, 296, 60, 309, 70, 290, 93);
  //Cuádrilatero blanco
  fill(221, 204, 218);
  quad(290, 93, 303, 107, 323, 81, 309, 70); 
  
  //Tercera columna
  //Cuadrilátero verde
  fill(58, 91, 22);
  quad(241, 17, 282, 49, 300, 22, 249, -5);
  //Cuadrilátero blanco
  fill(233, 222, 220);
  quad(282, 49, 296, 60, 322, 34, 300, 22);
  //Cuadrilátero blanco
  fill(229, 216, 207);
  quad(296, 60, 309, 70, 335, 41, 322, 34);
  //Cuadrilátero gris claro
  fill(205, 207, 202);
  quad(309, 70, 323, 81, 351, 49, 335, 41);
  
  //Cuarta columna
  //Cuadrilatero gris
  fill(222, 211, 205);
  quad(249, -5, 300, 22, 314, 0, 263, -20);
  //Cuadrilátero azul
  fill(75, 130, 160);
  quad(300, 22, 322, 34, 339, 16, 314, 0);
  //Cuadrilátero blanco
  fill(230, 223, 207);
  quad(322, 34, 335, 41, 351, 24, 339, 16);
  //Cuadrilatero rosado
  fill(247, 158, 160);
  quad(335, 41, 351, 49, 366, 32, 351, 24);
  
  //Quinta columna
  //Cuadrilátero gris
  fill(234, 224, 214);
  quad(314, 0, 339, 16, 352, 4, 329, -10);
  //Cuadrilátero verde
  fill(42, 85, 55);
  quad(339, 16, 351, 24, 363, 13, 352, 4);
  //Cuadrilátero gris
  fill(203, 194, 185);
  quad(351, 24, 366, 32, 374, 23, 363, 13);
  
  //Sexta columna
  //Cuadrilátero negro
  fill(9, 3, 5);
  triangle(346, 0, 352, 4, 355, 0);
  //Cuadrilátero gris
  fill(232, 221, 219);
  quad(352, 4, 363, 13, 370, 2, 362, -5);
  //Cuadrilátero negro
  fill(1, 0, 4);
  quad(363, 13, 374, 23, 383, 13, 371, 3);
  
  //Séptima columna
  //Cuadrilátero negro
  fill(1, 0, 0);
  triangle(368, 0, 371, 3, 374, 0);
  //Cuadrilátero gris
  fill(216, 200, 187);
  quad(371, 3, 383, 13, 390, 5, 380, -3);
  
  //Octava columna
  //Cuadrilátero café
  fill(56, 44, 30);
  triangle(386, 0, 390, 5, 393, 0);
  
  //Cuadrilátero negro
  stroke(0);
  fill(0);
  quad(123, 45, 278, 136, 287, 125, 127, 39);
  
  //Lineas cuadrícula
  //Verticales
  line(213, 86, 247, 0);
  line(245, 103, 314, 0);
  line(250, 105, 355, 0);
  line(268, 115, 373, 0);
  line(278, 136, 393, 0);
  
  //Horizontales
  line(232, 39, 302, 106);
  line(241, 17, 323, 81);
  line(249, -5, 350, 49);
  line(314, 0, 365, 32);
  line(346, 0, 374, 22);
  
  //Circulo azul
  //Amarillo
  noStroke();
  fill(235, 224, 139);
  ellipse(379, 220, 85, 84);
  //Rosado
  strokeWeight(1);
  stroke(199, 162, 77);
  fill(240, 190, 167);
  ellipse(379, 220, 67, 66);
  //Azul
  noStroke();
  fill(19, 74, 127, 220);
  ellipse(376, 219, 53, 53);

  //Líneas izquierda círculo azul
  //Gruesa
  stroke(0);
  strokeWeight(2);
  line(253, 250, 428, 132);
  //Delgada
  strokeWeight(1);
  line(283, 289, 406, 169);

  //Círculo morado
  noStroke();
  fill(118, 87, 162);
  ellipse(731, 150, 57, 57);  
  
  //Círculo gris
  noStroke();
  fill(115, 127, 113, 200);
  ellipse(845, 200, 95, 95);
  
  //Triángulo amarillo
  noStroke();
  fill(191, 159, 48, 200);
  triangle(838, 90, 775, 160, 861, 185);

  //Cuadrado rojo
  stroke(0);
  fill(109, 2, 13);
  rect(885, 224, 34, 31);
  
  //Líneas cuadrado rojo
  strokeWeight(1.5);
  line(904, 239, 932, 239);
  strokeWeight(2);
  line(904, 243, 932, 243);
  
  //Línea diagonal derecha
  strokeWeight(1);
  stroke(0);
  line(795, 0, 977, 282);
  
  //Línea gruesa derecha
  stroke(0);
  fill(0);
  quad(867, -1, 934, 22, 935, 18, 869, -4);
  
  //Triángulos amarillos 
  strokeWeight(1);
  stroke(0);
  fill(129, 90, 15);
  triangle(815, -1, 876, 95, 820, -1);
  triangle(832, -1, 869, 52, 838, -1);
  triangle(862, -1, 889, 43, 867, -1);

  //Semicírculos blancos
  //Semicírculo gris
  fill(243, 235, 235);
  strokeWeight(2.5);
  stroke(168, 159, 180);
  arc(455, 86, 80, 79, PI, TWO_PI, OPEN);  
  //Contorno negro semicírculo gris
  noFill();
  strokeWeight(1.5);
  stroke(0);
  arc(455, 86, 84, 82, PI, TWO_PI, OPEN);
  
  //Semicírculo amarillo
  fill(243, 235, 235);
  strokeWeight(2.5);
  stroke(216, 202, 113);
  arc(539, 82, 82, 79, 3.05, 6.4, OPEN);
  //Contorno negro semicírculo amarillo
  noFill();
  strokeWeight(1);
  stroke(0);
  arc(539, 81, 86, 80, 3.05, 6.4, OPEN);
  
  //Semicírculo rojo
  fill(243, 235, 235);
  strokeWeight(3);
  stroke(171, 39, 37);
  arc(625, 85, 83, 81, 3.1, 6.35, OPEN);
  //Semicírculo negro
  strokeWeight(1);
  stroke(0);
  arc(709, 85, 83, 81, 3.105, 6.36, OPEN);
  
  //Línea delgada parte superior
  strokeWeight(0.5);
  stroke(0);
  line(558, 0, 599, 38);
  
  //Líneas gruesas parte superior
  //Línea negra
  fill(0);
  quad(307, 43, 307, 50, 564, 0, 545, -2);
  //Línea roja
  strokeWeight(2);
  stroke(0);
  fill(98, 19, 24);
  quad(298, 83, 295, 87, 566, 8, 563, 5);
  
  //Líneas derecha círculo azul
  //Horizontales
  stroke(0);
  strokeWeight(1.5);
  line(400, 165, 502, 166);
  line(401, 185, 510, 187);
  //Diagonal
  line(424, 226, 484, 0);
  
  //Cuadrilátero verde parte superior
  noStroke();
  fill(186, 193, 97, 200);
  quad(699, 0, 740, 49, 746, 39, 706, -2);
  
  //Semicírculos mitad
  strokeWeight(2);
  stroke(188, 158, 148);
  noFill();
  arc(498, 129, 80, 80, PI, 6.1);
  strokeWeight(1);
  stroke(0);
  arc(498, 129, 84, 84, PI, 6.3); 
  arc(580, 129, 80, 80, PI, 6.3); 
  arc(622, 172, 82, 82, 3, 6.5); 
  arc(663, 224, 84, 84, 3, 6.5);  
  
  //Rectángulo gris, negro, rojo
  //Parte negra baja
  noStroke();
  fill(0);
  quad(523, 125, 527, 131, 539, 123, 537, 115);
  
  //Parte blanca
  fill(250, 255, 255, 100);
  quad(539, 121, 575, 93, 572, 88, 537, 115);
  
  //Parte gris
  fill(119, 115, 106);
  quad(575, 94, 640, 46, 631, 43, 572, 88);
  //Parte negra
  fill(0);
  quad(640, 46, 668, 25, 664, 20, 631, 43);
  //Parte roja
  fill(182, 6, 6);
  quad(668, 25, 702, 0, 695, -3, 664, 20);
  
  //Líneas detalle
  strokeWeight(1.5);
  stroke(0);
  line(554, 103, 557, 108);
  line(557, 100, 560, 105);
  line(560, 98, 564, 103);
  line(563, 96, 566, 100);
  line(566, 94, 569, 98);
  line(569, 91, 572, 96);
  line(572, 88, 575, 93);
  
  //Borde
  strokeWeight(1.5);
  stroke(0);
  noFill();
  quad(523, 125, 527, 131, 702, 0, 695, -3);
  
  //Líneas mitad
  //Línea vertical mitad
  stroke(0);
  line(578, 55, 577, 307);
  //Triples
  //Arriba
  strokeWeight(1);
  line(538, 146, 617, 63);
  line(542, 149, 636, 49);
  line(546, 153, 651, 39);
  //Abajo
  strokeWeight(1.5);
  line(554, 206, 661, 90);
  line(556, 209, 665, 92);
  line(560, 211, 669, 93);
  
  //Línea horizontal semicírculos
  stroke(0);
  strokeWeight(2);
  line(324, 85, 838, 90);
  
  //Líneas círculo morado
  //Diagonal
  stroke(0);
  strokeWeight(2);
  line(764, 260, 685, 0);
  //Diagonal gruesa
  strokeWeight(3.5);
  line(663, 5, 839, 191);
  //Horizontales
  //Arriba
  strokeWeight(1);
  line(661, 148, 817, 148);
  //Abajo
  line(709, 225, 827, 223);
}