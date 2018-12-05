import { cargaImagen } from '../global/tools';

export function tablaPosicional(config) {
  const { container, params, variables, versions, vt } = config;
  var imgSrcTablaCentena = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/tablas_posicionales/Tabla_Centena_Full.png';
  var imgSrcTablaUMil = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/tablas_posicionales/Tabla_UMil.png';
  var imgSrcFlechaAbajo = 'https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/tablas_posicionales/Numeracion_Flecha_Abajo.png';
  var imgSrcSignoMas = 'https://desarrolloadaptatin.blob.core.windows.net:443/frontejercicios/imagenes_front/tablas_posicionales/NumeracionSuma.png';
  var { _umil,_centena,_decena,_unidad,_miles,_centenas,_decenas,_numero } = params;
  try {
    if(vt) {
      if(_umil !== 'Seleccione') {
        _umil = variables.find(function(item) {
          return item.var === params._umil;
        });
        _miles = variables.find(function(item) {
          return item.var === params._miles;
        });
        _umil = vt ? _umil.vt : _umil.val;
        _miles = vt ? _miles.vt : _miles.val;
      } else {
        _umil = '0';
        _miles = '0000';
      }
      _centena = variables.find(function(item) {
        return item.var === params._centena
      });
      _decena = variables.find(function(item) {
        return item.var === params._decena
      });
      _unidad = variables.find(function(item) {
        return item.var === params._unidad
      });
      _centenas = variables.find(function(item) {
        return item.var === params._centenas
      });
      _decenas = variables.find(function(item) {
        return item.var === params._decenas
      });
      _numero = variables.find(function(item) {
        return item.var === params._numero
      });
    } else {
      if(_umil !== 'Seleccione') {
        _umil = versions.find(function(item) {
          return item.var === params._umil;
        });
        _miles = versions.find(function(item) {
          return item.var === params._miles;
        });
        _umil = vt ? _umil.vt : _umil.val;
        _miles = vt ? _miles.vt : _miles.val;
      } else {
        _umil = '0';
        _miles = '0000';
      }
      _centena = versions.find(function(item) {
        return item.var === params._centena
      });
      _decena = versions.find(function(item) {
        return item.var === params._decena
      });
      _unidad = versions.find(function(item) {
        return item.var === params._unidad
      });
      _centenas = versions.find(function(item) {
        return item.var === params._centenas
      });
      _decenas = versions.find(function(item) {
        return item.var === params._decenas
      });
      _numero = versions.find(function(item) {
        return item.var === params._numero
      });
    }
    _centena = vt ? _centena.vt : _centena.val;
    _decena = vt ? _decena.vt : _decena.val;
    _unidad = vt ? _unidad.vt : _unidad.val;
    _centenas = vt ? _centenas.vt : _centenas.val;
    _decenas = vt ? _decenas.vt : _decenas.val;
    _numero = vt ? _numero.vt : _numero.val;
  } catch(error) {
    console.log(error);
  }

  Promise.all([
    cargaImagen(imgSrcTablaCentena), 
    cargaImagen(imgSrcTablaUMil), 
    cargaImagen(imgSrcFlechaAbajo),
    cargaImagen(imgSrcSignoMas)
  ]).then(function(result){
    var imgTablaCentena = result[0], 
    imgTablaUMil = result[1], 
    imgFlechaAbajo = result[2], 
    imgSignoMas = result[3];
    var ctx = container.getContext('2d');
    var tabla = _umil !== '0' ? imgTablaUMil : imgTablaCentena;
    container.height = tabla.height + 350;
    container.width = tabla.width;
    ctx.drawImage(tabla, 0, 0);

    var diviciones = _umil !== '0' ? 4 : 3;
    var anchoSeparaciones = container.width / diviciones;
    var numeros = _umil !== '0' ? [_umil, _centena, _decena, _unidad] : [_centena, _decena, _unidad];
    var numerosSuma = _umil !== '0' ? [_miles, _centenas, _decenas, _unidad] : [_centenas, _decenas, _unidad];
    for(var i = 1; i < diviciones+1; i++){
      var centroSeccion = (anchoSeparaciones * i) - (anchoSeparaciones/2);
      var centroSeparacion = anchoSeparaciones * i;
      dibujaNumeros(numeros[i-1], centroSeccion);
      insertaFlecha(centroSeccion);
      dibujaNumerosSuma(numerosSuma[i-1], centroSeccion);
      i+1 !== diviciones+1 && insertaSignosMas(centroSeparacion);
    }

    dibujaFlechaCentro(centroSeccion);
    dibujaNumeroFinal();

    function dibujaNumeros(numero, centroSeccion) {
      ctx.font = 'bold 200pt opensans';
      var anchoTexto = ctx.measureText(numero).width;
      var xTexto = centroSeccion-(anchoTexto/2);
      ctx.fillText(numero, xTexto, 328);
    }

    function dibujaNumerosSuma(numero, centroSeccion) {
      ctx.font = 'bold 100pt opensans';
      var anchoTexto = ctx.measureText(numero).width;
      var xTexto = centroSeccion-(anchoTexto/2);
      var yTexto = tabla.height + imgFlechaAbajo.height + 130; 
      ctx.fillText(numero, xTexto, yTexto);
    }

    function insertaFlecha(centroSeccion) {
      var x = centroSeccion - (imgFlechaAbajo.width / 2)
      var y = tabla.height + 20;
      ctx.drawImage(imgFlechaAbajo, x, y);
    }
    
    function insertaSignosMas(centroSeparacion) {
      var x = centroSeparacion - (imgSignoMas.width/2);
      var y = tabla.height + imgFlechaAbajo.height + 85 - (imgSignoMas.height/2);
      ctx.drawImage(imgSignoMas, x, y);
    }

    function dibujaFlechaCentro() {
      var x = (container.width/2) - (imgFlechaAbajo.width / 2);
      var y = tabla.height + imgFlechaAbajo.height + 150;
      ctx.drawImage(imgFlechaAbajo, x, y);
    }

    function dibujaNumeroFinal() {
      ctx.font = 'bold 50pt opensans';
      ctx.textAlign="center"; 
      var x = container.width / 2;
      var y = tabla.height + imgFlechaAbajo.height + 260;
      ctx.fillText(_numero, x, y);
    }
  }).catch(function(error){
    console.log(error);
  });
}