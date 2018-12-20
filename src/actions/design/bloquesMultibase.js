import { cargaImagen, regex } from '../global/tools';

export function bloquesMultibase(config) {
  const { container, params, variables, versions, vt } = config;
  var { _separacion,_miles,_heightWidthMiles,_centenas,_heightWidthCentenas,_decenas,_unidades,_heightWidthUnidades } = params;
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
      dimension:_heightWidthMiles
    },{ 
      tipo:'Centenas',
      cantidad:_centenas,
      dimension:_heightWidthCentenas
    },{
      tipo:'Decenas',
      cantidad:_decenas,
      dimension: {
          height:heightDecenas,
          width:widthDecenas
      }
    },{
      tipo:'Unidades',
      cantidad:_unidades,
      dimension:_heightWidthUnidades
    }];

    var dimensiones = calculaDimensionCanvas();
    container.height = dimensiones.y;
    container.width = dimensiones.x;
    var xStart = 0;
    bloques.forEach(function(item){
      if(item.cantidad > 0) {
          switch(item.tipo) {
            case 'Miles':
                xStart = dibujaMiles(_separacion);
                break;
            case 'Centenas':
                xStart = dibujaCientos(xStart);
                break;
            case 'Decenas':
                xStart = dibujaDecenas(xStart);
                break;
            case 'Unidades':
                xStart = dibujaUnidades(xStart);
                break;
          }
      }
    });

    function calculaDimensionCanvas() {
      var x = 0;
      for(let bloque of bloques) {
          if(bloque.cantidad > 0) {
            if(bloque.tipo === 'Decenas') {
                var pares = bloque.cantidad % 2 !== 0 ? (bloque.cantidad+1)/2 : bloque.cantidad/2;
                x += (bloque.dimension.width * pares) + _separacion * (pares - 1);
            } else if(bloque.tipo === 'Unidades') {
                var espacions = bloque.cantidad === 1 ? 1 : bloque.cantidad === 2 ? 2 : 3;
                x += (bloque.dimension * espacions) + _separacion * (espacions - 1);
            } else {
                var pares = bloque.cantidad % 2 !== 0 ? (bloque.cantidad+1)/2 : bloque.cantidad/2;
                x += (bloque.dimension * pares) + _separacion * (pares - 1);
            }
          }
      }
      x += _separacion*5;
      var y = _heightWidthMiles*2+_separacion*3;
      return {x,y}
    }
    
    function dibujaMiles(xInicial) {
      var paresDeMil = _miles % 2 === 0 ? _miles/2 : (_miles+1)/2;
      var yPrimera = _separacion, 
          ySegunda = _separacion * 2 + _heightWidthMiles;
      for(var i=0,x,vecesDibujado=0; i < paresDeMil; i++) {
          x = (_heightWidthMiles * i) + (_separacion * i) + xInicial;
          ctx.drawImage(imgBloqueUMil, x, yPrimera, _heightWidthMiles, _heightWidthMiles);
          vecesDibujado++;
          if(vecesDibujado < _miles) {
            ctx.drawImage(imgBloqueUMil, x, ySegunda, _heightWidthMiles, _heightWidthMiles);
            vecesDibujado++;
          }
      }
      return x+_heightWidthMiles;
    }

    function dibujaCientos(xInicial) {
      var paresDeCien = _centenas % 2 === 0 ? _centenas/2 : (_centenas+1)/2;
      var yPrimera = container.height/2 - _separacion/2 - _heightWidthCentenas,
          ySegunda = container.height/2 + _separacion/2;
      for(var i=0,x,vecesDibujado=0; i < paresDeCien; i++) {
          x = (_heightWidthCentenas * i) + _separacion + (_separacion * i) + xInicial;
          ctx.drawImage(imgBloqueCentena, x, yPrimera, _heightWidthCentenas, _heightWidthCentenas);
          vecesDibujado++;
          if(vecesDibujado < _centenas) {
            ctx.drawImage(imgBloqueCentena, x, ySegunda, _heightWidthCentenas, _heightWidthCentenas);
            vecesDibujado++;
          }
      }
      return x+_heightWidthCentenas;
    }

    function dibujaDecenas(xInicial) {
      var paresDeDiez = _decenas % 2 === 0 ? _decenas/2 : (_decenas+1)/2;
      var yPrimera = container.height/2 - _separacion/2 - heightDecenas,
          ySegunda = container.height/2 + _separacion/2;
      for(var i=0,x,vecesDibujado=0; i < paresDeDiez; i++){
          x = (widthDecenas * i) + _separacion + (_separacion * i) + xInicial;
          ctx.drawImage(imgBloqueDecena, x, yPrimera, widthDecenas, heightDecenas);
          vecesDibujado++;
          if(vecesDibujado < _decenas) {
            ctx.drawImage(imgBloqueDecena, x, ySegunda, widthDecenas, heightDecenas);
            vecesDibujado++;
          }
          
      }
      return x+widthDecenas;
    }

    function dibujaUnidades(xInicial) {
      var yPrimera = container.height/2 - _separacion/2 - _heightWidthUnidades,
          ySegunda = container.height/2 - _separacion/2 - _separacion - _heightWidthUnidades*2,
          yTercera = container.height/2 + _separacion/2 + _heightWidthCentenas - _heightWidthUnidades,
          yCuarta = container.height/2 + _separacion/2 + _heightWidthCentenas - _separacion - _heightWidthUnidades*2;
      for(var i=0,x,vecesDibujado=0;i < _unidades; i++) {
          if(vecesDibujado+1 <= 3) {
            x = (_heightWidthUnidades * i) + _separacion + (_separacion * i) + xInicial;
            ctx.drawImage(imgBloqueUnidad, x, yPrimera, _heightWidthUnidades, _heightWidthUnidades);
            vecesDibujado++;
          } else if(vecesDibujado+1 === 4) {
            x = _separacion + xInicial;
            ctx.drawImage(imgBloqueUnidad, x, ySegunda, _heightWidthUnidades, _heightWidthUnidades);
            vecesDibujado++;
          } else if(vecesDibujado+1 === 5) {
            x = _separacion * 2 + _heightWidthUnidades + xInicial;
            ctx.drawImage(imgBloqueUnidad, x, ySegunda, _heightWidthUnidades, _heightWidthUnidades);
            vecesDibujado++;
          } else if(vecesDibujado+1 >= 6 && vecesDibujado+1 <= 8) {
            x = (_heightWidthUnidades * (i-5)) + _separacion + (_separacion * (i-5)) + xInicial;
            ctx.drawImage(imgBloqueUnidad, x, yTercera, _heightWidthUnidades, _heightWidthUnidades);
            vecesDibujado++;
          } else if(vecesDibujado+1 === 9) {
            x = _separacion + xInicial;
            ctx.drawImage(imgBloqueUnidad, x, yCuarta, _heightWidthUnidades, _heightWidthUnidades);
            vecesDibujado++;
          } else if(vecesDibujado+1 === 10) {
            x = _separacion * 2 + _heightWidthUnidades + xInicial;
            ctx.drawImage(imgBloqueUnidad, x, yCuarta, _heightWidthUnidades, _heightWidthUnidades);
            vecesDibujado++;
          }
      }
    }
  }).catch(function(error) {
      console.log(error)
  });
}