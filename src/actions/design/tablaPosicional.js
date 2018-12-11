import { regex, cargaImagen, cargaFuente } from '../global/tools';

export function tablaPosicional(config) {
  const { container, params, variables, versions, vt } = config;
  var imgSrcTablaCentena = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/tabla_CDU.svg';
  var imgSrcTablaUMil = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/tabla_UMCDU.svg';
  var imgSrcFlechaAbajo = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/flecha_fija.svg';
  var imgSrcSignoMas = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/num_sig_mas.svg';
  var srcFuente = 'https://desarrolloadaptatin.blob.core.windows.net/fuentes/LarkeNeueThin.ttf';
  var { _soloTabla,_umil,_centena,_decena,_unidad,_miles,_centenas,_decenas,_numero,_textoUnidades,_textoNumeroPalabras,_margenElementos } = params;
 
  var vars = vt ? variables : versions;
  try {
    if(_umil !== 'Seleccione') {
      _umil = regex(`$${_umil}`, vars, vt);
      _miles = regex(`$${_miles}`, vars, vt);
    } else {
      _umil = '0';
      _miles = '0000';
    }
    _centena = regex(`$${_centena}`, vars, vt);
    _decena = regex(`$${_decena}`, vars, vt);
    _unidad = regex(`$${_unidad}`, vars, vt);
    _centenas = regex(`$${_centenas}`, vars, vt);
    _decenas = regex(`$${_decenas}`, vars, vt);
    _numero = regex(`$${_numero}`, vars, vt);
  } catch(error) {
    console.log(error);
  }

  _textoUnidades = Number(_textoUnidades);
  _textoNumeroPalabras = Number(_textoNumeroPalabras);
  _margenElementos = Number(_margenElementos);
  Promise.all([
    cargaImagen(imgSrcTablaCentena), 
    cargaImagen(imgSrcTablaUMil), 
    cargaImagen(imgSrcFlechaAbajo),
    cargaImagen(imgSrcSignoMas),
    cargaFuente('LarkeNeueThinFuente', srcFuente)
  ]).then(function(result){
    var imgTablaCentena = result[0], 
    imgTablaUMil = result[1], 
    imgFlechaAbajo = result[2], 
    imgSignoMas = result[3];
    
    var ctx = container.getContext('2d');
    var tabla = _umil !== '0' ? imgTablaUMil : imgTablaCentena;
    container.height = _soloTabla == 'no' ? 
      tabla.height+_textoUnidades+_textoNumeroPalabras+(imgFlechaAbajo.height*2)+(_margenElementos*5) :
      tabla.height;
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
      _soloTabla == 'no' && insertaFlecha(centroSeccion);
      _soloTabla == 'no' && dibujaNumerosSuma(numerosSuma[i-1], centroSeccion);
      i+1 !== diviciones+1 && _soloTabla == 'no' && insertaSignosMas(centroSeparacion);
    }

    dibujaFlechaCentro(centroSeccion);
    dibujaNumeroFinal();

    function dibujaNumeros(numero, centroSeccion) {
      var altoBox = (tabla.height/1.8);
      var altoTexto = altoBox*0.65;
      var yTexto = tabla.height-(altoBox/2)+(altoTexto/2);
      ctx.font = `${altoTexto}pt LarkeNeueThinFuente`;
      var anchoTexto = ctx.measureText(numero).width;
      var xTexto = centroSeccion-(anchoTexto/2);
      ctx.fillStyle = '#F58220';
      ctx.fillText(numero, xTexto, yTexto);
    }

    function insertaFlecha(centroSeccion) {
      var x = centroSeccion - (imgFlechaAbajo.width / 2)
      var y = tabla.height + _margenElementos;
      ctx.drawImage(imgFlechaAbajo, x, y);
    }

    function dibujaNumerosSuma(numero, centroSeccion) {
      ctx.font = `${_textoUnidades}pt LarkeNeueThinFuente`;
      var anchoTexto = ctx.measureText(numero).width;
      var xTexto = centroSeccion-(anchoTexto/2);
      var yTexto = tabla.height+imgFlechaAbajo.height+(_margenElementos*2)+_textoUnidades;
      ctx.fillStyle = '#F58220';
      ctx.fillText(numero, xTexto, yTexto);
    }
    
    function insertaSignosMas(centroSeparacion) {
      var x = centroSeparacion - (imgSignoMas.width/2);
      var y = tabla.height+(_margenElementos*2)+imgFlechaAbajo.height+(_textoUnidades/2)-(imgSignoMas.height/2);
      ctx.drawImage(imgSignoMas, x, y);
    }

    function dibujaFlechaCentro() {
      var x = (container.width/2) - (imgFlechaAbajo.width / 2);
      var y = tabla.height+(_margenElementos*3)+imgFlechaAbajo.height+_textoUnidades;
      ctx.drawImage(imgFlechaAbajo, x, y);
    }

    function dibujaNumeroFinal() {
      ctx.font = `${_textoNumeroPalabras}pt LarkeNeueThinFuente`;
      ctx.textAlign="center"; 
      var x = container.width / 2;
      var y = tabla.height+_textoUnidades+_textoNumeroPalabras+(imgFlechaAbajo.height*2)+(_margenElementos*4);
      ctx.fillStyle = '#F58220';
      ctx.fillText(_numero, x, y);
    }
  }).catch(function(error){
    console.log(error);
  });
}