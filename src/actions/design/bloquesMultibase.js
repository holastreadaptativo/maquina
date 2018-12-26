import { cargaImagen, regex } from '../global/tools';

export function bloquesMultibase(config) {
  const { container, params, variables, versions, vt } = config;
  var { 
    _separacion,
    _miles,
    _heightWidthMiles,
    _centenas,
    _heightWidthCentenas,
    _aumentoCentenas,
    _decenas,
    _unidades,
    _heightWidthUnidades,
    _aumentoUnidades,
    _distribucion,
    _canvasWidth,
    _canvasHeight } = params;
  var srcBloqueUMil = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/umil.svg';
  var srcBloqueCentena = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/centena.svg';
  var srcBloqueDecena = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/decena.svg';
  var srcBloqueUnidad = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/unidad.svg';

  _separacion = Number(_separacion);
  _heightWidthMiles = Number(_heightWidthMiles);
  _heightWidthCentenas = Number(_heightWidthCentenas);
  _heightWidthUnidades = Number(_heightWidthUnidades);

  var vars = vt ? variables : versions;

  try {
    _miles = regex(`$${_miles}`, vars, vt);
    _centenas = regex(`$${_centenas}`, vars, vt);
    _decenas = regex(`$${_decenas}`, vars, vt);
    _unidades = regex(`$${_unidades}`, vars, vt);
  } catch(error) {
    console.log(error);
  }
  _separacion = Number(_separacion);
  _heightWidthMiles = Number(_heightWidthMiles);
  _heightWidthCentenas = Number(_heightWidthCentenas);
  _aumentoCentenas = Number(_aumentoCentenas);
  _heightWidthUnidades = Number(_heightWidthUnidades);
  _aumentoUnidades = Number(_aumentoUnidades);
  _canvasWidth = Number(_canvasWidth);
  _canvasHeight = Number(_canvasHeight);
  _miles = Number(_miles);
  _centenas = Number(_centenas);
  _decenas = Number(_decenas);
  _unidades = Number(_unidades);
  var ctx = container.getContext('2d');
  Promise.all([
    cargaImagen(srcBloqueUMil),
    cargaImagen(srcBloqueCentena),
    cargaImagen(srcBloqueDecena),
    cargaImagen(srcBloqueUnidad)
  ]).then(function(result) {
    var imgBloqueUMil = result[0],
    imgBloqueCentena = result[1],
    imgBloqueDecena = result[2],
    imgBloqueUnidad = result[3];
    var heightDecenas = _heightWidthCentenas,
               widthDecenas = _heightWidthCentenas*imgBloqueDecena.width/imgBloqueDecena.height;
    var bloques = [{ 
        tipo:'Miles',
        cantidad:_miles,
        dimension:_heightWidthMiles,
        img:imgBloqueUMil
    },{ 
        tipo:'Centenas',
        cantidad:_centenas,
        dimension:_heightWidthCentenas,
        aumento:_aumentoCentenas,
        img:imgBloqueCentena
    },{
        tipo:'Decenas',
        cantidad:_decenas,
        dimension: {
          height:heightDecenas,
          width:widthDecenas
        },
        img:imgBloqueDecena
    },{
        tipo:'Unidades',
        cantidad:_unidades,
        dimension:_heightWidthUnidades,
        aumento:_aumentoUnidades,
        img:imgBloqueUnidad
    }];
    container.height = _canvasHeight;
    container.width = _canvasWidth;
    var xStart = calculaInicioCentro();
    bloques.forEach(function(item){
      if(item.cantidad > 0) {
        if(_distribucion === 'ordenado') {
          switch(item.tipo) {
            case 'Miles':
              xStart = dibujaMiles(xStart, imgBloqueUMil, item.dimension);
              break;
            case 'Centenas':
              xStart = dibujaCientos(xStart);
              break;
            case 'Decenas':
              xStart = dibujaDecenas(xStart);
              break;
            case 'Unidades':
              xStart = dibujaUnidades(xStart, imgBloqueUnidad, item.dimension);
              break;
          }
        } else {
          if(item.tipo === 'Decenas') {
            xStart = dibujaBloqueEnLinea(item.img, item.cantidad, xStart, item.dimension.width, item.dimension.height);
          } else {
            xStart = dibujaBloqueEnLinea(item.img, item.cantidad, xStart, item.dimension, item.dimension);
          }
        }
      }
    });

  function calculaInicioCentro() {
    var anchoTotal = 0;
    if(_distribucion === 'ordenado') {
      for(let bloque of bloques) {
        if(bloque.cantidad > 0) {
          switch(bloque.tipo) {
            case 'Miles':
              if(bloque.cantidad === 1) {
                anchoTotal += _heightWidthMiles+_separacion;
              } else if(bloque.cantidad === 2 ||  bloque.cantidad === 4 || bloque.cantidad === 6) {
                anchoTotal += _heightWidthMiles*2+_separacion*2;
              } else {
                anchoTotal += _heightWidthMiles*3+_separacion*3;
              }
              break;
            case 'Centenas':
              anchoTotal += bloque.cantidad > 5 ? 
                ((bloque.cantidad-2)*_aumentoCentenas)+_heightWidthCentenas*2+_separacion*2:
                (bloque.cantidad-1)*_aumentoCentenas+_heightWidthCentenas+_separacion;
              break;
            case 'Decenas':
              anchoTotal += bloque.cantidad < 6 ? 
                bloque.cantidad*bloque.dimension.width+_separacion*bloque.cantidad: 
                6*bloque.dimension.width+_separacion*6;
              break;
            case 'Unidades':
              if(bloque.cantidad === 1) {
                anchoTotal += _heightWidthUnidades+_separacion;
              } else if(bloque.cantidad === 2 ||  bloque.cantidad === 4 || bloque.cantidad === 6) {
                anchoTotal += _heightWidthUnidades*2+_separacion*2;
              } else {
                anchoTotal += _heightWidthUnidades*3+_separacion*3;
              }
              break;
          }
        }
      }
    } else {
      for(let bloque of bloques) {
        if(bloque.cantidad > 0 && bloque.tipo === 'Decenas') {
          anchoTotal += (bloque.dimension.width*bloque.cantidad)+(bloque.cantidad*_separacion)
        } else if(bloque.cantidad > 0) {
          anchoTotal += (bloque.dimension*bloque.cantidad)+(bloque.cantidad*_separacion)
        }
      }
    }
    
    return container.width/2-(anchoTotal+_separacion)/2;
  }
            
  function dibujaMiles(xStart, imgBloqueUMil, dimension) {
    switch(_miles) {
      case 1:
        var { x } = dibujaBloqueEnPosicionUno(imgBloqueUMil, dimension);
        break;
      case 2:
        dibujaBloqueEnPosicionCuatro(1, imgBloqueUMil, dimension)
        var { x } = dibujaBloqueEnPosicionCuatro(4, imgBloqueUMil, dimension);
        break;
      case 3:
        dibujaBloqueEnPosicionNueve(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(5, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUMil, dimension);
        break;
      case 4:
        dibujaBloqueEnPosicionCuatro(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionCuatro(2, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionCuatro(3, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionCuatro(4, imgBloqueUMil, dimension);
        break;
      case 5:
        dibujaBloqueEnPosicionNueve(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(3, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(5, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(7, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUMil, dimension);
        break;
      case 6:
        dibujaBloqueEnPosicionNueve(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(2, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(4, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(5, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(7, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionNueve(8, imgBloqueUMil, dimension);
        break;
      case 7:
        dibujaBloqueEnPosicionNueve(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(3, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(4, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(5, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(6, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(7, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUMil, dimension);
        break;
      case 8:
        dibujaBloqueEnPosicionNueve(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(2, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(3, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(4, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(6, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(8, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(7, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUMil, dimension);
        break;
      case 9:
        dibujaBloqueEnPosicionNueve(1, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(2, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(3, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(4, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(5, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(6, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(8, imgBloqueUMil, dimension);
        dibujaBloqueEnPosicionNueve(7, imgBloqueUMil, dimension);
        var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUMil, dimension);
        break;
    }
    return x+_heightWidthMiles;
  }

  function dibujaBloqueEnPosicionNueve(posicion, imagen, dimensiones) { //posicion 1-9
    var x, y;
    if(posicion==1 || posicion==4 || posicion==7) {
      x = _separacion+xStart;
    } else if(posicion==2 || posicion==5 || posicion==8) {
      x = _separacion*2+dimensiones+xStart;
    } else {
      x = _separacion*3+dimensiones*2+xStart;
    }
    if(posicion==1 || posicion==2 || posicion==3) {
      y = container.height/2 - dimensiones/2 - _separacion - dimensiones;
    } else if(posicion==4 || posicion==5 || posicion==6) {
      y = container.height/2 - dimensiones/2;
    } else {
      y = container.height/2 + dimensiones/2 + _separacion;
    }
    ctx.drawImage(imagen, x, y, dimensiones, dimensiones);
    return {x,y};
  }

  function dibujaBloqueEnPosicionCuatro(posicion, imagen, dimensiones) {
    if(posicion==1 || posicion==3) {
      x = _separacion+xStart;
    } else {
      x = _separacion*2+dimensiones+xStart;
    }
    if(posicion==1 || posicion==2) {
      y = container.height/2 - _separacion/2 - dimensiones;
    } else {
      y = container.height/2 + _separacion/2;
    }
    ctx.drawImage(imagen, x, y, dimensiones, dimensiones);
    console.log('estas malditas variables no sirven de nada', x, y);
    return {x,y};
  }

  function dibujaBloqueEnPosicionUno(imagen, dimensiones) {
    var x = _separacion+xStart;
    var y = container.height/2-dimensiones/2;
    ctx.drawImage(imagen, x, y, dimensiones, dimensiones);
    return {x,y};
  }

  function dibujaCientos(xInicial) {
    var heightTotal1 = _centenas > 5 ? 
      (_aumentoCentenas*4)+_heightWidthCentenas:
      (_aumentoCentenas*_centenas-1)+_heightWidthCentenas;
    var yInicial1 = container.height/2 - heightTotal1/2;
    for(var i=0,x,y; i<_centenas; i++) {
      if(i >= 5) {
          x = _separacion*2 + xInicial + (_aumentoCentenas * 3) + _heightWidthCentenas + (_aumentoCentenas * (i-4));     
          y = yInicial1 +  _separacion + (_aumentoCentenas * (i-5));
      } else {
          x = _separacion + xInicial + (_aumentoCentenas * i);
          y = yInicial1 +_separacion + (_aumentoCentenas * i);
      }
      ctx.drawImage(imgBloqueCentena, x, y, _heightWidthCentenas, _heightWidthCentenas);
    }
    return x+_heightWidthCentenas;
  }

  function dibujaDecenas(xInicial) {
    var yPrimera = _decenas < 6 ?
      container.height/2-heightDecenas/2 :
      container.height/2-(heightDecenas+widthDecenas*(_decenas-5)+_separacion*(_decenas-6))/2
    for(var i=0,x,x2,y2; i<_decenas; i++){
      if(i>=6) {
          x2 = _separacion + xInicial;
          y2 = yPrimera + _separacion*(i-5) + widthDecenas*(i-5) + heightDecenas;
          ctx.save();
          ctx.translate(x2,y2);
          ctx.rotate(-Math.PI/2);
          ctx.drawImage(imgBloqueDecena, 0, 0, widthDecenas, heightDecenas);
          ctx.restore();
      } else {
          x = (widthDecenas * i) + _separacion + (_separacion * i) + xInicial;
          ctx.drawImage(imgBloqueDecena, x, yPrimera, widthDecenas, heightDecenas);
      }
      
    }
    return x+widthDecenas;
  }

  function dibujaUnidades(xInicial, imgBloqueUnidad, dimension) {
    switch(_unidades) {
      case 1:
          var { x } = dibujaBloqueEnPosicionUno(imgBloqueUnidad, dimension);
          break;
      case 2:
          dibujaBloqueEnPosicionCuatro(1, imgBloqueUnidad, dimension)
          var { x } = dibujaBloqueEnPosicionCuatro(4, imgBloqueUnidad, dimension);
          break;
      case 3:
          dibujaBloqueEnPosicionNueve(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(5, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUnidad, dimension);
          break;
      case 4:
          dibujaBloqueEnPosicionCuatro(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionCuatro(2, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionCuatro(3, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionCuatro(4, imgBloqueUnidad, dimension);
          break;
      case 5:
          dibujaBloqueEnPosicionNueve(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(3, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(5, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(7, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUnidad, dimension);
          break;
      case 6:
          dibujaBloqueEnPosicionNueve(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(2, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(4, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(5, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(7, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionNueve(8, imgBloqueUnidad, dimension);
          break;
      case 7:
          dibujaBloqueEnPosicionNueve(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(3, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(4, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(5, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(6, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(7, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUnidad, dimension);
          break;
      case 8:
          dibujaBloqueEnPosicionNueve(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(2, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(3, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(4, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(6, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(8, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(7, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUnidad, dimension);
          break;
      case 9:
          dibujaBloqueEnPosicionNueve(1, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(2, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(3, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(4, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(5, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(6, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(8, imgBloqueUnidad, dimension);
          dibujaBloqueEnPosicionNueve(7, imgBloqueUnidad, dimension);
          var {x} = dibujaBloqueEnPosicionNueve(9, imgBloqueUnidad, dimension);
          break;
    }
    return x+_heightWidthMiles;
  }

  function dibujaBloqueEnLinea(img, cantidad, xInicio, dimensionx, dimensiony) {
      var y = container.height/2 - dimensiony/2;
      for(var i = 0, x; i < cantidad; i++) {
        x = xInicio+(_separacion*i)+(i*dimensionx);
        ctx.drawImage(img, x, y, dimensionx, dimensiony);
      }
      return x + _separacion + dimensionx;
  }
  }).catch(function(error) {
      console.log(error)
  });
}