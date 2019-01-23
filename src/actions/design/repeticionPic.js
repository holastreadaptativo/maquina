import { regex, cargaImagen } from '../global/tools'

export function repeticionPic(config) {
   const { container, params, variables, versions, vt } = config;

   var imagenes = [{
      name: 'bloque mil',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/umil.svg'
   },{
      name: 'bloque cien',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/centena.svg'
   }, {
      name: 'bloque diez',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/decena.svg'
   },{
      name: 'bloque uno',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/unidad.svg'
   },{
      name: 'billete mil',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/1000_1.png'
   },{
      name: 'moneda cien',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/100_1.png'
   },{
      name: 'moneda diez',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/10_1.png'
   },{
      name: 'moneda uno',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/1_1.png'
   },{
      name: 'moneda quinientos',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/500_1.png'
   },{
      name: 'moneda cincuenta',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/50_1.png'
   },{
      name: 'moneda cinco',
      src: 'https://desarrolloadaptatin.blob.core.windows.net/agapito/5_1.png'
   }];
 
   let {_pictoricos, _separacion, heightCanvas, widthCanvas, 
      _imagen1,_altoImagen1,_formaRepeticion1,_repeticiones1,_separacion1,_separaciony1,
      _imagen2,_altoImagen2,_formaRepeticion2,_repeticiones2,_separacion2,_separaciony2,
      _imagen3,_altoImagen3,_formaRepeticion3,_repeticiones3,_separacion3,_separaciony3,
      _imagen4,_altoImagen4,_formaRepeticion4,_repeticiones4,_separacion4,_separaciony4,
      _imagen5,_altoImagen5,_formaRepeticion5,_repeticiones5,_separacion5,_separaciony5,
      _imagen6,_altoImagen6,_formaRepeticion6,_repeticiones6,_separacion6,_separaciony6,
      _imagen7,_altoImagen7,_formaRepeticion7,_repeticiones7,_separacion7,_separaciony7,
      _imagen8,_altoImagen8,_formaRepeticion8,_repeticiones8,_separacion8,_separaciony8} = params;

   var vars = vt ? variables : versions;
   try {
      _repeticiones1 = regex(`$${_repeticiones1}`, vars, vt);
      _repeticiones2 = regex(`$${_repeticiones2}`, vars, vt);
      _repeticiones3 = regex(`$${_repeticiones3}`, vars, vt);
      _repeticiones4 = regex(`$${_repeticiones4}`, vars, vt);
      _repeticiones5 = regex(`$${_repeticiones5}`, vars, vt);
      _repeticiones6 = regex(`$${_repeticiones6}`, vars, vt);
      _repeticiones7 = regex(`$${_repeticiones7}`, vars, vt);
      _repeticiones8 = regex(`$${_repeticiones8}`, vars, vt);
   } catch(error) {
      console.log(error);
   }



   var repeticiones = getRepeticiones();
   
   _separacion = Number(_separacion);
   let xStart = _separacion;
   container.height = Number(heightCanvas);
   container.width = Number(widthCanvas);
   var ctx = container.getContext('2d');
   //carga las imagenes y dibuja las repeticiones
   Promise.all(repeticiones.map(x => cargaImagen(x.imagen.src))).then(imagenes => {
      repeticiones.forEach(function(x, i){
         repeticiones[i].imagen = imagenes[i]
      });
      return repeticiones;
   }).then(function(repeticionesPictoricas) {
      for(let repeticion of repeticionesPictoricas) {
         console.log(repeticion);
         if(repeticion.repeticiones > 0) {
            switch(repeticion.formaRepeticion) {
               case 'dado':
                  xStart = dibujaRepeticionDado(repeticion);
                  break;
               case 'diagonal/apilado':
                  xStart = dibujaRepeticionDiagonalApilado(repeticion);
                  break;
               case 'diagonal':
                  xStart = dibujaRepeticionDiagonal(repeticion);
                  break;
               case 'horizontal/vertical':
                  xStart = dibujaRepeticionHorizontalVertical(repeticion);
                  break;
               case 'horizontal':
                  xStart = dibujaRepeticionHorizontal(repeticion);
                  break;
               case 'vertical':
                  xStart = dibujaRepeticionVertical(repeticion);
                  break;
               default:
                  console.log(repeticion);
                  break;
            }
         }
      }
   }).catch(function(error){
      console.log(error);
   });
 

   function getRepeticiones() {
      let repeticiones = [{
         imagen: _imagen1 !== '' ? imagenes.find(x => x.name === _imagen1) : { src:'' },
         altoImagen: Number(_altoImagen1),
         formaRepeticion: _formaRepeticion1,
         repeticiones: Number(_repeticiones1),
         separacion: Number(_separacion1),
         separaciony: Number(_separaciony1)
      }];

      if(_pictoricos > 1) {
         repeticiones[1] = {
         imagen: _imagen2 !== '' ? imagenes.find(x => x.name === _imagen2) : { src:'' },
         altoImagen: Number(_altoImagen2),
         formaRepeticion: _formaRepeticion2,
         repeticiones: Number(_repeticiones2),
         separacion: Number(_separacion2),
         separaciony: Number(_separaciony2)
         }
      }
      
      if(_pictoricos > 2) {
         repeticiones[2] = {
         imagen: _imagen3 !== '' ? imagenes.find(x => x.name === _imagen3) : { src:'' },
         altoImagen: Number(_altoImagen3),
         formaRepeticion: _formaRepeticion3,
         repeticiones: Number(_repeticiones3),
         separacion: Number(_separacion3),
         separaciony: Number(_separaciony3)
         }
      }

      if(_pictoricos > 3) {
         repeticiones[3] = {
         imagen: _imagen4 !== '' ? imagenes.find(x => x.name === _imagen4) : { src:'' },
         altoImagen: Number(_altoImagen4),
         formaRepeticion: _formaRepeticion4,
         repeticiones: Number(_repeticiones4),
         separacion: Number(_separacion4),
         separaciony: Number(_separaciony4)
         }
      }

      if(_pictoricos > 4) {
         repeticiones[4] = {
         imagen: _imagen5 !== '' ? imagenes.find(x => x.name === _imagen5) : { src:'' },
         altoImagen: Number(_altoImagen5),
         formaRepeticion: _formaRepeticion5,
         repeticiones: Number(_repeticiones5),
         separacion: Number(_separacion5),
         separaciony: Number(_separaciony5)
         }
      }

      if(_pictoricos > 5) {
         repeticiones[5] = {
         imagen: _imagen6 !== '' ? imagenes.find(x => x.name === _imagen6) : { src:'' },
         altoImagen: Number(_altoImagen6),
         formaRepeticion: _formaRepeticion6,
         repeticiones: Number(_repeticiones6),
         separacion: Number(_separacion6),
         separaciony: Number(_separaciony6)
         }
      }

      if(_pictoricos > 6) {
         repeticiones[6] = {
         imagen: _imagen7 !== '' ? imagenes.find(x => x.name === _imagen7) : { src:'' },
         altoImagen: Number(_altoImagen7),
         formaRepeticion: _formaRepeticion7,
         repeticiones: Number(_repeticiones7),
         separacion: Number(_separacion7),
         separaciony: Number(_separaciony7)
         }
      }

      if(_pictoricos > 7) {
         repeticiones[7] = {
         imagen: _imagen8 !== '' ? imagenes.find(x => x.name === _imagen8) : { src:'' },
         altoImagen: Number(_altoImagen8),
         formaRepeticion: _formaRepeticion8,
         repeticiones: Number(_repeticiones8),
         separacion: Number(_separacion8),
         separaciony: Number(_separaciony8)
         }
      }

      return repeticiones;
   }

   function dibujaRepeticionVertical(repeticion) {
      var width = repeticion.imagen.width * repeticion.altoImagen / repeticion.imagen.height;
      var yStart = container.height/2 - (repeticion.repeticiones * repeticion.altoImagen + (repeticion.repeticiones-1) * repeticion.separacion)/2; 
      for(var i = 0, x = xStart, y; i < repeticion.repeticiones; i++){
         y = yStart + (i * repeticion.altoImagen) + (i * repeticion.separacion);
         ctx.drawImage(repeticion.imagen, x, y, width, repeticion.altoImagen);
      }
      return x+width+_separacion;
   }

   function dibujaRepeticionHorizontal(repeticion){
      var width = repeticion.imagen.width * repeticion.altoImagen / repeticion.imagen.height;
      for(var i = 0,x,y; i < repeticion.repeticiones; i++) {
         x = xStart + (i * repeticion.separacion) + (i * width);
         y = container.height/2 - repeticion.altoImagen/2;
         ctx.drawImage(repeticion.imagen, x, y, width, repeticion.altoImagen);
      }
      return x+width+_separacion;
   }

   function dibujaRepeticionHorizontalVertical(repeticion) {
      var width = repeticion.imagen.width * repeticion.altoImagen / repeticion.imagen.height;
      var yPrimera;
      if(repeticion.repeticiones < 6) {
         yPrimera = container.height/2-repeticion.altoImagen/2;
      } else {
         var heightTotal = repeticion.altoImagen + (repeticion.repeticiones-6)*repeticion.separacion + width*(repeticion.repeticiones-5);
         yPrimera = container.height/2-heightTotal/2;
      }
      for(var i = 0, x, x2, y2; i < repeticion.repeticiones; i++){
         if(i >= 6) {
            x2 = xStart;
            y2 = yPrimera + repeticion.separacion*(i-5) + width*(i-5) + repeticion.altoImagen;
            ctx.save();
            ctx.translate(x2,y2);
            ctx.rotate(-Math.PI/2);
            ctx.drawImage(repeticion.imagen, 0, 0, width, repeticion.altoImagen);
            ctx.restore();
         } else {
            x = (width * i) + (repeticion.separacion * i) + xStart;
            ctx.drawImage(repeticion.imagen, x, yPrimera, width, repeticion.altoImagen);
         }
      }
      return x+width+_separacion;
   }

   function dibujaRepeticionDiagonal(repeticion) {
      var width = repeticion.imagen.width * repeticion.altoImagen / repeticion.imagen.height;
      for(var i = 0, x, y, height; i < repeticion.repeticiones; i++) {
         x = xStart + i * repeticion.separacion;
         height = repeticion.altoImagen + (repeticion.repeticiones-1) * repeticion.separaciony;
         y = (container.height/2)-(height/2)+(i*repeticion.separaciony);
         ctx.drawImage(repeticion.imagen, x, y, width, repeticion.altoImagen);
      }
      return x+width+_separacion;
   }

   function dibujaRepeticionDiagonalApilado(repeticion) {
      var width = repeticion.imagen.width * repeticion.altoImagen / repeticion.imagen.height;
      for(var i = 0, x, y, height; i < repeticion.repeticiones; i++) {
         x = i <= 4 ? 
            xStart + i * repeticion.separacion : 
            xStart + width + (5 * repeticion.separacion) + ((i-5) * repeticion.separacion);
         if(repeticion.repeticiones <= 5) { // solo hay una pila
            height = repeticion.altoImagen + (repeticion.repeticiones-1) * repeticion.separaciony;
            y = (container.height/2)-(height/2)+(i*repeticion.separaciony);
         } else { // hay dos pilas
            if(i <= 4) {
               height = repeticion.altoImagen + 4 * repeticion.separaciony;
               y = (container.height/2)-(height/2)+(i*repeticion.separaciony);
            } else {
               height = repeticion.altoImagen + (repeticion.repeticiones-5) * repeticion.separaciony;
               y = (container.height/2)-(height/2)+((i-4)*repeticion.separaciony);
            }
         }
         ctx.drawImage(repeticion.imagen, x, y, width, repeticion.altoImagen);
      }
      return x+width+_separacion;
   }

   function dibujaRepeticionDado(repeticion) {
      var width = repeticion.imagen.width * repeticion.altoImagen / repeticion.imagen.height;
      var x = 0;
      switch(repeticion.repeticiones) {
         case 1:
            x = dibujaBloqueEnPosicionUno(repeticion.imagen, repeticion.altoImagen);
            break;
         case 2:
            x = dibujaBloqueEnPosicionCuatro(4, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionCuatro(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion)
            break;
         case 3:
            dibujaBloqueEnPosicionNueve(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(5, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            x = dibujaBloqueEnPosicionNueve(9, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
         case 4:
            dibujaBloqueEnPosicionCuatro(4, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionCuatro(3, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            x = dibujaBloqueEnPosicionCuatro(2, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionCuatro(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
         case 5:
            dibujaBloqueEnPosicionNueve(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(3, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(5, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(7, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            x = dibujaBloqueEnPosicionNueve(9, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
         case 6:
            x = dibujaBloqueEnPosicionNueve(8, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(5, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(2, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(7, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(4, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
         case 7:
            x = dibujaBloqueEnPosicionNueve(9, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(6, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(3, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(5, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(7, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(4, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
         case 8:
            x = dibujaBloqueEnPosicionNueve(9, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(6, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(3, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(8, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(2, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(7, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(4, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
         case 9:
            x = dibujaBloqueEnPosicionNueve(9, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(6, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(3, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(8, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(5, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(2, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(7, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(4, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            dibujaBloqueEnPosicionNueve(1, repeticion.imagen, repeticion.altoImagen, repeticion.separacion);
            break;
      }
      console.log(x);
      return x+width+_separacion;

      function dibujaBloqueEnPosicionNueve(posicion, imagen, altoImagen, separacion) { //posicion 1-9
         var width = imagen.width * altoImagen / imagen.height;
         var x, y;
         if(posicion==1 || posicion==4 || posicion==7) {
            x = xStart;
         } else if(posicion==2 || posicion==5 || posicion==8) {
            x = separacion+width+xStart;
         } else {
            x = separacion*2+width*2+xStart;
         }
         if(posicion==1 || posicion==2 || posicion==3) {
            y = container.height/2 - altoImagen/2 - separacion - altoImagen;
         } else if(posicion==4 || posicion==5 || posicion==6) {
            y = container.height/2 - altoImagen/2;
         } else {
            y = container.height/2 + altoImagen/2 + separacion;
         }
         ctx.drawImage(imagen, x, y, width, altoImagen);
         return x;
      }

      function dibujaBloqueEnPosicionCuatro(posicion, imagen, altoImagen, separacion) {
         var width = imagen.width * altoImagen / imagen.height;
         var x, y;
         if(posicion==1 || posicion==3) {
            x = xStart;
         } else {
            x = separacion+width+xStart;
         }
         if(posicion==1 || posicion==2) {
            y = container.height/2 - altoImagen - separacion/2;
         } else {
            y = container.height/2 + separacion/2;
         }
         ctx.drawImage(imagen, x, y, width, altoImagen);
         return x;
      }

      function dibujaBloqueEnPosicionUno(imagen, altoImagen) {
         var width = imagen.width * altoImagen / imagen.height;
         var x = xStart;
         var y = container.height/2-altoImagen/2;
         ctx.drawImage(imagen, x, y, width, altoImagen);
         return x;
      }
   }
}