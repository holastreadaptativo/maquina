import { cargaImagen, cargaFuente, regex } from '../global/tools';

export function valorPosicional(config) {
  const { container, params, variables, versions, vt } = config;
  var { _tipo,_texto,_numeroPalabras,_marca,_separacionNumeros,_miles,_centenas,_decenas,_unidades,_altoTexo,_margenTopBottom } = params;
  var imgSrcFlechaAbajo = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/flecha_fija.svg';
  var imgSrcSignoMas = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/num_sig_mas.svg';
  var srcFuente = 'https://desarrolloadaptatin.blob.core.windows.net/fuentes/LarkeNeueThin.ttf';

  var vars = vt ? variables : versions;

  try {
    _miles = regex(`$${_miles}`, vars, vt);
    _centenas = regex(`$${_centenas}`, vars, vt);
    _decenas = regex(`$${_decenas}`, vars, vt);
    _unidades = regex(`$${_unidades}`, vars, vt);
    if(_tipo === 'Numero Escrito') {
      _numeroPalabras = regex(`$${_numeroPalabras}`, vars, vt);
    } else if(_tipo === 'Texto') {
      _texto = regex(_texto, vars, vt);
    } else if (_tipo === 'Texto a Palabras') {
      _numeroPalabras = regex(`$${_numeroPalabras}`, vars, vt);
      _texto = regex(_texto, vars, vt);
    }
  } catch(error) {
    console.log(error);
  }
  

  var ctx = container.getContext('2d');
  Promise.all([
    cargaImagen(imgSrcFlechaAbajo),
    cargaImagen(imgSrcSignoMas),
    cargaFuente('LarkeNeueThinFuente', srcFuente)
  ]).then(function(result) {
    var imgFlecha = result[0],
    imgSignoMas = result[1];
    _altoTexo = Number(_altoTexo);
    _margenTopBottom = Number(_margenTopBottom);
    container.height = (_margenTopBottom * 4) + (_altoTexo * 2) + imgFlecha.height;
    container.width = 850;
    ctx.font = `${_altoTexo}pt LarkeNeueThinFuente`;
    ctx.textAlign="center";
    ctx.fillStyle = '#F58220';
    var xTexto = container.width / 2;
    var yTexto = _altoTexo + _margenTopBottom;

    if(_tipo === 'Numero Escrito') {
      ctx.fillText(_numeroPalabras, xTexto, yTexto);
    } else if(_tipo === 'Texto' || _tipo === 'Texto a Palabras'){
      ctx.fillText(_texto, xTexto, yTexto);
    }

    if(_tipo === 'Numero Escrito') {
      var xFlecha = (container.width / 2) - (imgFlecha.width / 2);
      var yFlecha = _altoTexo + (_margenTopBottom*2);
      ctx.drawImage(imgFlecha, xFlecha, yFlecha);

      var separaciones = _miles !== '$Seleccione' ? 4 : 3;
      var anchoSeparacion = (container.width - 60) / separaciones;
      var numeros = _miles !== '$Seleccione' ? [_miles, _centenas, _decenas, _unidades] : [_centenas, _decenas, _unidades];
      for(var i = 1; i < separaciones + 1; i++) {
        var centro = (anchoSeparacion * i) + 30 - (anchoSeparacion/2);
        var separacion = (anchoSeparacion * i) + 30;
        escribeNumero(centro, numeros[i-1]);
        i+1 !== separaciones+1 && dibujaSignoMas(separacion);
      }
    } else if(_tipo === 'Texto'){
      var xFlecha = (container.width / 2) - (imgFlecha.width / 2);
      var yFlecha = _altoTexo + (_margenTopBottom*2);
      ctx.drawImage(imgFlecha, xFlecha, yFlecha);

      escribeNumeroCentro();
    } else if(_tipo === 'Texto a Palabras') {
      var xFlecha = (container.width / 2) - (imgFlecha.width / 2);
      var yFlecha = _altoTexo + (_margenTopBottom*2);
      ctx.drawImage(imgFlecha, xFlecha, yFlecha);
      var xPalabras = container.width/2;
      var yPalabras = _altoTexo*2 + (_margenTopBottom*3) + imgFlecha.height;
      ctx.fillText(_numeroPalabras, xPalabras, yPalabras);
    } else {
      var underline = _marca === 'U de Mil' ? 1 : 2;
      var anchoTextoNumero = _altoTexo*4 + 3*Number(_separacionNumeros);
      var margen = (container.width - anchoTextoNumero) / 4;
      var numeros = [_miles, _centenas, _decenas, _unidades]; 
      for(var i = 1; i < 5; i++) {
        var centro = margen+_separacionNumeros*(i-1)+(_altoTexo*i)-(_altoTexo/2);
        var y = _margenTopBottom + _altoTexo;
        ctx.fillText(numeros[i-1], centro, y);
        if(i === underline) {
          var xStart = centro-(_altoTexo/2)-5;
          var xEnd = centro+(_altoTexo/2)+5;
          var yUnderline = y + 5;
          dibujaUnderlineNumero(xStart, xEnd, yUnderline);
          var xFlecha = centro - (imgFlecha.width/2);
          var yFlecha = y + 5 + _margenTopBottom;
          ctx.drawImage(imgFlecha, xFlecha, yFlecha);
          ctx.textAlign="left";
          var xTexto = centro - (_altoTexo * 0.35);
          var yTexto = y + 5 + _margenTopBottom*2 + imgFlecha.height + _altoTexo;
          if(underline === 2) {
            ctx.fillText(`${_centenas} centenas = ${_centenas}00`, xTexto, yTexto);
          } else {
            ctx.fillText(`${_miles} unidades de mil = ${_miles}000`, xTexto, yTexto);
          }
        }
      }
    }

    function dibujaUnderlineNumero(xStart, xEnd, yUnderline) {
      ctx.strokeStyle="#FF0000";
      ctx.beginPath();
      ctx.moveTo(xStart, yUnderline);
      ctx.lineTo(xEnd, yUnderline);
      ctx.stroke();
      ctx.closePath();
    }

    function escribeNumeroCentro() {
      var numero = `${_miles} ${_centenas}${_decenas}${_unidades}`;
      var x = container.width/2;
      var y = (_altoTexo*2) + (_margenTopBottom*3) + imgFlecha.height;
      ctx.fillText(numero, x, y);
    }

    function escribeNumero(centro, numero) {
      var y = (_altoTexo*2) + (_margenTopBottom*3) + imgFlecha.height;
      ctx.fillText(numero, centro, y);
    }

    function dibujaSignoMas(separacion) {
      var x = separacion - (imgSignoMas.width / 2);
      var y = (_altoTexo*2) + (_margenTopBottom*3) + imgFlecha.height - (_altoTexo/2) - (imgSignoMas.height/2);
      ctx.drawImage(imgSignoMas, x, y);
    }

  }).catch(function(error) {
    console.log(error)
  });
}