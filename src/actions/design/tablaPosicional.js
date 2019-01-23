import { regex, cargaImagen, cargaFuente } from '../global/tools';

export function tablaPosicional(config) {
  const { container, params, variables, versions, vt } = config;
  var imgSrcFlechaAbajo = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/flecha_fija.svg';
  var imgSrcSignoMas = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/num_sig_mas.svg';
  var srcFuente = 'https://desarrolloadaptatin.blob.core.windows.net/fuentes/LarkeNeueThin.ttf';
  //× => ALT+158
  var {_width,_tipoTabla, /*puede ser 'centenas' o 'miles'*/_pisosTabla, /*pueden ser 'uno', 'dos', 'tres'*/_separacionElementos,
_tipoPisoUno,_repeticionPictoricaPisoUno,_umilPisoUno,_centenaPisoUno,_decenaPisoUno,_unidadPisoUno, /*numerico , imagenes, repeticion*/
_tipoPisoDos,_repeticionPictoricaPisoDos,_umilPisoDos,_centenaPisoDos,_decenaPisoDos,_unidadPisoDos,
_tipoPisoTres,_repeticionPictoricaPisoTres,_umilPisoTres,_centenaPisoTres,_decenaPisoTres,_unidadPisoTres,
_dibujaValorPosicional1,_altoTextoValorPosicional1,_umilVP1,_centenaVP1,_decenaVP1,_unidadVP1,
_dibujaValorPosicional2,_altoTextoValorPosicional2,_umilVP2,_centenaVP2,_decenaVP2,_unidadVP2,
_dibujaTextoResultado,_altoTextoResultado,_resultado} = params;

  var vars = vt ? variables : versions;
  try {
    _umilPisoUno = regex(_umilPisoUno, vars, vt);
    _centenaPisoUno = regex(_centenaPisoUno, vars, vt);
    _decenaPisoUno = regex(_decenaPisoUno, vars, vt);
    _unidadPisoUno = regex(_unidadPisoUno, vars, vt);

    _umilPisoDos = regex(_umilPisoDos, vars, vt);
    _centenaPisoDos = regex(_centenaPisoDos, vars, vt);
    _decenaPisoDos = regex(_decenaPisoDos, vars, vt);
    _unidadPisoDos = regex(_unidadPisoDos, vars, vt);

    _umilPisoTres = regex(_umilPisoTres, vars, vt);
    _centenaPisoTres = regex(_centenaPisoTres, vars, vt);
    _decenaPisoTres = regex(_decenaPisoTres, vars, vt);
    _unidadPisoTres = regex(_unidadPisoTres, vars, vt);

    _umilVP1 = regex(_umilVP1, vars, vt);
    _centenaVP1 = regex(_centenaVP1, vars, vt);
    _decenaVP1 = regex(_decenaVP1, vars, vt);
    _unidadVP1 = regex(_unidadVP1, vars, vt);

    _umilVP2 = regex(_umilVP2, vars, vt);
    _centenaVP2 = regex(_centenaVP2, vars, vt);
    _decenaVP2 = regex(_decenaVP2, vars, vt);
    _unidadVP2 = regex(_unidadVP2, vars, vt);

    _resultado = regex(_resultado, vars, vt);
  } catch(error) {
    console.log(error);
  }
  let datosEjercicio = {};
  datosEjercicio.tabla = {};
  datosEjercicio.tabla.configuracion = {
    tipoTabla: _tipoTabla,
    pisosTabla: Number(_pisosTabla)
  }
  datosEjercicio.tabla.detallePisos = [{
    tipo: _tipoPisoUno, //tipo piso uno
    tipoRepeticion: _repeticionPictoricaPisoUno,
    umil: Number(_umilPisoUno),
    centena: Number(_centenaPisoUno),
    decena: Number(_decenaPisoUno),
    unidad: Number(_unidadPisoUno)
  }]
  if (datosEjercicio.tabla.configuracion.pisosTabla > 1) {
    datosEjercicio.tabla.detallePisos[1] = {
      tipo: _tipoPisoDos,
      tipoRepeticion: _repeticionPictoricaPisoDos,
      umil: Number(_umilPisoDos),
      centena: Number(_centenaPisoDos),
      decena: Number(_decenaPisoDos),
      unidad: Number(_unidadPisoDos)
    }
  }
  if (datosEjercicio.tabla.configuracion.pisosTabla > 2) {
    datosEjercicio.tabla.detallePisos[2] = {
      tipo: _tipoPisoTres,
      tipoRepeticion: _repeticionPictoricaPisoTres,
      umil: Number(_umilPisoTres),
      centena: Number(_centenaPisoTres),
      decena: Number(_decenaPisoTres),
      unidad: Number(_unidadPisoTres)
    }
  }
  datosEjercicio.valoresPosicionales = [];

  if (_dibujaValorPosicional1 === 'si') {
    datosEjercicio.valoresPosicionales[0] = {
      mostrar: _dibujaValorPosicional1,
      altoTexto: Number(_altoTextoValorPosicional1), //alto del texto de los valores posicionales
      numeros: {//numeros que se muestran debajo de la tabla en forma de suma
        umil: _umilVP1,
        centena: _centenaVP1,
        decena: _decenaVP1,
        unidad: _unidadVP1
      }
    }
  }

  if (_dibujaValorPosicional2 === 'si') {
    datosEjercicio.valoresPosicionales[1] = {
      mostrar: _dibujaValorPosicional2,
      altoTexto: Number(_altoTextoValorPosicional2), //alto del texto de los valores posicionales
      numeros: {//numeros que se muestran debajo de la tabla en forma de suma
        umil: _umilVP2,
        centena: _centenaVP2,
        decena: _decenaVP2,
        unidad: _unidadVP2
      }
    }
  }

  datosEjercicio.resultado = {
    mostrar: _dibujaTextoResultado,
    numero: _resultado, //numero del valor final centrado (puede ser texto o  numero)
    altoTexto: Number(_altoTextoResultado) //alto del texto del resultado
  }

  _separacionElementos = Number(_separacionElementos);

  let recursos = cargaRecursos();
  var ctx, yStart = 0;
  Promise.all(recursos).then(function ([imgTabla, imgFlechaAbajo, imgSignoMas]) {
    var { altoCanvas, altoImagen } = calculaAltoCanvas(imgTabla.width, imgTabla.height, imgFlechaAbajo.height);
    container.width = Number(_width);
    container.height = altoCanvas;
    ctx = container.getContext('2d');
    ctx.drawImage(imgTabla, 0, 0, _width, altoImagen); //dibuja la tabla de repeticion

    const diviciones = datosEjercicio.tabla.configuracion.tipoTabla === 'centenas' ? 3 : 4;
    const anchoSeparaciones = _width / diviciones;

    dibujaContenidoTabla(anchoSeparaciones, altoImagen);
    yStart = altoImagen + _separacionElementos;

    datosEjercicio.valoresPosicionales.forEach(function (valorPosicional) {
      yStart = muestraValoresPosicionales(valorPosicional, yStart, diviciones, anchoSeparaciones, imgFlechaAbajo, imgSignoMas);
    });

    if (datosEjercicio.resultado.mostrar === 'si') {
      muestraTextoResultado(yStart, diviciones, anchoSeparaciones, imgFlechaAbajo);
    }

  }).catch(function (error) {
    console.log(error, error.message);
  });

  function dibujaContenidoTabla(anchoSeparaciones, altoImagen) {
    ctx.fillStyle = '#F58220';
    ctx.textAlign = 'center';

    const { detallePisos } = datosEjercicio.tabla;
    const { tipoTabla, pisosTabla } = datosEjercicio.tabla.configuracion;
    var porcion = altoImagen / ((pisosTabla * 2) + 1);//cantidad de separaciones que tiene la imagen ya que el alto de un cuadro equivale a dos alto del titulo de la tabla
    var altoCuadro = porcion * 2;
    var altoHeader = porcion;
    var altoTexto = altoCuadro * 0.85;
    var separaciones = tipoTabla === 'centenas' ? 3 : 4;
    var anchoSeparacion = container.width / separaciones;
    ctx.font = `${altoTexto}pt LarkeNeueThinFuente`;

    for (var fila = 0; fila < detallePisos.length; fila++) {
      const { tipo, tipoRepeticion, umil, centena, decena, unidad } = detallePisos[fila];
      var numeros = tipoTabla === 'centenas' ? [centena, decena, unidad] : [umil, centena, decena, unidad];
      numeros.forEach(function (numero, columna) {
        switch (tipo) {
          case 'numerico':
            !(tipoTabla === 'miles' && numero == 0 && columna === 0) && dibujaNumeroEnFila(numero, fila, columna);
            break;
          case 'imagenes':
            dibujaImagen(numero, fila, columna, tipoRepeticion);
            break;
          case 'repeticion':
            dibujaRepeticion(numero, fila, columna, tipoRepeticion);
            break;
          default:
            console.log('opcion aun no soportada');
            break;
        }
      });
    }

    function dibujaNumeroEnFila(numero, fila, columna) {
      fila++;
      var xTexto = (anchoSeparacion * columna) + (anchoSeparacion / 2);
      var yTexto = porcion + (altoCuadro * fila) - (altoCuadro - altoTexto) / 2;
      ctx.fillText(numero, xTexto, yTexto);
    }

    function dibujaImagen(numero, fila, columna, tipoRepeticion) {
      console.log('me llamaron');
      if (tipoRepeticion === 'pelotas') {
        var src = `https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/pelotas_repeticiones/Arreglo${numero}.svg`;
        cargaImagen(src).then(image => {
          var xImg = (anchoSeparacion * columna) + (anchoSeparacion / 2) - (altoCuadro * 0.85 / 2);
          var yImg = porcion + (altoCuadro * fila) + (altoCuadro / 2) - (altoCuadro * 0.85 / 2);
          ctx.drawImage(image, xImg, yImg, altoCuadro * 0.85, altoCuadro * 0.85);
        }).catch(error => {
          console.log(error)
        });
      } else if (tipoRepeticion === 'circulo y cuadrado') {
        var img = columna % 2 === 0 ? 'Circulo.svg' : 'Cuadrado.svg';
        var src = 'https://desarrolloadaptatin.blob.core.windows.net:443/frontejercicios/imagenes_front/tablas_posicionales/' + img;
        cargaImagen(src).then(image => {
          var xImg = (anchoSeparacion * columna) + (anchoSeparacion / 2) - (altoCuadro * 0.85 / 2);
          var yImg = porcion + (altoCuadro * fila) + (altoCuadro / 2) - (altoCuadro * 0.85 / 2);
          ctx.drawImage(image, xImg, yImg, altoCuadro * 0.85, altoCuadro * 0.85);
        }).catch(error => {
          console.log(error)
        });
      }
    }

    function dibujaRepeticion(numero, fila, columna, tipoRepeticion) {
      var ruta, src;
      ruta = tipoTabla === 'centenas' ? 5 - columna : 4 - columna; // busca que imagen ocupar
      if (tipoRepeticion === 'bloques') {
        src = `https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/bloques_multibase/bloque-${ruta}.svg`;
      } else if (tipoRepeticion === 'monedas y billetes') {
        var ceros = ruta === 1 ? '' : ruta === 2 ? '0' : ruta === 3 ? '00' : '000';
        src = `https://desarrolloadaptatin.blob.core.windows.net:443/frontejercicios/imagenes_front/monedas_billetes/1${ceros}.svg`;
      }
      cargaImagen(src).then(image => {
        var cx = (anchoSeparacion * columna) + (anchoSeparacion / 2);
        var cy = porcion + (altoCuadro * fila) + (altoCuadro / 2);
        for (var repeticion = 0; repeticion < numero; repeticion++) {
          switch (ruta) {
            case 4:
              if (tipoRepeticion === 'bloques') {
                dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              } else if (tipoRepeticion === 'monedas y billetes') {
                dibujaRepeticionDadoBilletes(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              }
              break;
            case 3:
              dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              break;
            case 2:
              if (tipoRepeticion === 'bloques') {
                dibujaRepeticionHorizontalVertical(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              } else if (tipoRepeticion === 'monedas y billetes') {
                dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              }
              break;
            case 1:
              dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              break;
            default:
              console.log('aun no se pinta ' + ruta);
              break;
          }
        }
      }).catch(error => {
        console.log(error);
      });

      function dibujaRepeticionDadoBilletes(numero, anchoSeparacion, altoCuadro, image, cx, cy) {
        var container = altoCuadro * 0.9;
        var altoImg = container / 3 * 0.9;
        var widthImg = image.width * altoImg / image.height;
        var separacion = container / 3 * 0.1;

        switch (numero) {
          case 1:
            var x = cx - widthImg / 2;
            var y = cy - altoImg / 2;
            ctx.drawImage(image, x, y, widthImg, altoImg);
            break;
          case 2:
            var x = cx - widthImg / 2;
            var y1 = cy - container / 2,
              y2 = cy + container / 2 - altoImg;
            ctx.drawImage(image, x, y1, widthImg, altoImg);
            ctx.drawImage(image, x, y2, widthImg, altoImg);
            break;
          case 3:
            var x = cx - widthImg / 2;
            var y1 = cy - container / 2,
              y2 = cy + container / 2 - altoImg,
              y3 = cy - altoImg / 2;
            ctx.drawImage(image, x, y1, widthImg, altoImg);
            ctx.drawImage(image, x, y2, widthImg, altoImg);
            ctx.drawImage(image, x, y3, widthImg, altoImg);
            break;
          case 4:
            var x1 = cx - separacion / 2 - widthImg, x2 = cx + separacion / 2;
            var y1 = cy - separacion / 2 - altoImg, y2 = cy + separacion / 2;
            ctx.drawImage(image, x1, y1, widthImg, altoImg);
            ctx.drawImage(image, x1, y2, widthImg, altoImg);
            ctx.drawImage(image, x2, y1, widthImg, altoImg);
            ctx.drawImage(image, x2, y2, widthImg, altoImg);
            break;
          case 5:
            var x1 = cx - separacion / 2 - widthImg, 
            x2 = cx + separacion / 2;
            var y1 = cy - container / 2,
              y2 = cy + container / 2 - altoImg,
              y3 = cy - altoImg / 2,
              y4 = cy - separacion / 2 - altoImg,
              y5 = cy + separacion / 2;
            ctx.drawImage(image, x1, y1, widthImg, altoImg);
            ctx.drawImage(image, x1, y2, widthImg, altoImg);
            ctx.drawImage(image, x1, y3, widthImg, altoImg);
            ctx.drawImage(image, x2, y4, widthImg, altoImg);
            ctx.drawImage(image, x2, y5, widthImg, altoImg);
            break;
          case 6:
            var x1 = cx - separacion / 2 - widthImg, x2 = cx + separacion / 2;
            var y1 = cy - container / 2,
              y2 = cy + container / 2 - altoImg,
              y3 = cy - altoImg / 2;
            ctx.drawImage(image, x1, y1, widthImg, altoImg);
            ctx.drawImage(image, x1, y2, widthImg, altoImg);
            ctx.drawImage(image, x1, y3, widthImg, altoImg);
            ctx.drawImage(image, x2, y1, widthImg, altoImg);
            ctx.drawImage(image, x2, y2, widthImg, altoImg);
            ctx.drawImage(image, x2, y3, widthImg, altoImg);
            break;
          default:
            alert('La repeticion de billetes de mil es hasta 6');
            break;
        }
      }

      function dibujaRepeticionHorizontalVertical(numero, anchoSeparacion, altoCuadro, image, cx, cy) {
        var container = altoCuadro * 0.9;
        var altoImg = container / 2;
        var anchoImg = image.width * altoImg / image.height;
        var separacion = ((container * 0.9) / 2) * 0.3;
        var xStart = cx - ((numero * anchoImg) + ((numero - 1) * separacion)) / 2;
        if (numero <= 6) {
          xStart = cx - ((numero * anchoImg) + ((numero - 1) * separacion)) / 2;
        } else {
          xStart = cx - ((6 * anchoImg) + (5 * separacion)) / 2;
        }
        var yStart = cy - (container / 2);
        for (var i = 0, x, y; i < numero; i++) {
          if (i <= 5) {
            x = xStart + (anchoImg * i) + (separacion * i);
            y = yStart;
            ctx.drawImage(image, x, y, anchoImg, altoImg);
          } else {
            x = cx - (altoImg / 2)
            y = yStart + altoImg + anchoImg + separacion * (i - 6) + anchoImg * (i - 5);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 2);
            ctx.drawImage(image, 0, 0, anchoImg, altoImg);
            ctx.restore();
          }
        }
      }

      function dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy) {
        var altoImg = ((altoCuadro * 0.85) / 3) * 0.9;
        var anchoImg = image.width * altoImg / image.height;
        var separacion = ((altoCuadro * 0.85) / 3) * 0.1;
        switch (numero) {
          case 1:
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 2:
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 3:
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 4:
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 5:
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 6:
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 7:
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 8:
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(8, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(2, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case 9:
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(8, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(2, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
        }

        function dibujaBloqueEnPosicionNueve(posicion, image, altoImg, anchoImg, cx, cy, separacion, altoCuadro) { //posicion 1-9
          var x, y;
          if (posicion == 1 || posicion == 4 || posicion == 7) {
            x = cx - (anchoImg * 1.5) - separacion;
          } else if (posicion == 2 || posicion == 5 || posicion == 8) {
            x = cx - (anchoImg / 2)
          } else {
            x = cx + (anchoImg / 2) + separacion;
          }
          if (posicion == 1 || posicion == 2 || posicion == 3) {
            y = cy - (altoImg * 1.5) - separacion;
          } else if (posicion == 4 || posicion == 5 || posicion == 6) {
            y = cy - (altoImg / 2);
          } else {
            y = cy + (altoImg / 2) + separacion;
          }
          ctx.drawImage(image, x, y, anchoImg, altoImg);
        }
      }
    }
  }

  function muestraValoresPosicionales(valorPosicional, yStart, diviciones, anchoSeparaciones, imgFlechaAbajo, imgSignoMas) {
    ctx.font = `${valorPosicional.altoTexto}pt LarkeNeueThinFuente`;
    ctx.fillStyle = '#F58220';
    ctx.textAlign = 'center';
    var { umil, centena, decena, unidad } = valorPosicional.numeros;
    var numerosValorPosicional = diviciones === 3 ? [centena, decena, unidad] : [umil, centena, decena, unidad];

    for (var i = 1, centroSeccion, centroSeparacion, yTexto; i < diviciones + 1; i++) {
      centroSeccion = (anchoSeparaciones * i) - (anchoSeparaciones / 2);
      centroSeparacion = anchoSeparaciones * i;
      //flecha
      var xFlecha = centroSeccion - (imgFlechaAbajo.width / 2);
      ctx.drawImage(imgFlechaAbajo, xFlecha, yStart);
      //texto
      yTexto = yStart + imgFlechaAbajo.height + _separacionElementos + valorPosicional.altoTexto;
      ctx.fillText(numerosValorPosicional[i - 1], centroSeccion, yTexto);
      //singo mas
      if (i + 1 !== diviciones + 1) {
        var xMas = centroSeparacion - (imgSignoMas.width / 2);
        var yMas = yStart + imgFlechaAbajo.height + _separacionElementos + (valorPosicional.altoTexto / 2) - (imgSignoMas.height / 2)
        ctx.drawImage(imgSignoMas, xMas, yMas);
      }
    }
    return yTexto + _separacionElementos;
  }

  function muestraTextoResultado(yStart, diviciones, anchoSeparaciones, imgFlechaAbajo) {
    ctx.font = `${datosEjercicio.resultado.altoTexto}pt LarkeNeueThinFuente`;
    ctx.fillStyle = '#F58220';
    //imagen flecha
    var xImage = _width / 2 - imgFlechaAbajo.width / 2;
    ctx.drawImage(imgFlechaAbajo, xImage, yStart);

    var xTexto = _width / 2;
    var yTexto = yStart + imgFlechaAbajo.height + _separacionElementos + datosEjercicio.resultado.altoTexto;

    ctx.fillText(datosEjercicio.resultado.numero, xTexto, yTexto);
  }

  function cargaRecursos() {
    var columnas = datosEjercicio.tabla.configuracion.tipoTabla === 'miles' ? '4' : '3';
    var pisos = datosEjercicio.tabla.configuracion.pisosTabla;
    var srcTabla = `https://desarrolloadaptatin.blob.core.windows.net/frontejercicios/imagenes_front/tablas_posicionales/Tabla${columnas}x${pisos}.svg`
    let recursos = [
      cargaImagen(srcTabla),
      cargaImagen(imgSrcFlechaAbajo),
      cargaImagen(imgSrcSignoMas),
      cargaFuente("LarkeNeueThinFuente", srcFuente)
    ];

    return recursos;
  }

  function calculaAltoCanvas(anchoTabla, altoTabla, altoFlechas) {
    let altoImagen = _width * altoTabla / anchoTabla; // calcula el alto de la imagen
    let separaciones = 0, flechas = 0, texto = 0;
    if (datosEjercicio.valoresPosicionales.length > 0) { //
      separaciones = separaciones + 3 * datosEjercicio.valoresPosicionales.length;
      flechas += datosEjercicio.valoresPosicionales.length;
      texto = texto +
        (datosEjercicio.valoresPosicionales[0] ? Number(datosEjercicio.valoresPosicionales[0].altoTexto) : 0) +
        (datosEjercicio.valoresPosicionales[1] ? Number(datosEjercicio.valoresPosicionales[1].altoTexto) : 0);
    }
    if (_dibujaTextoResultado == 'si') {
      separaciones = datosEjercicio.valoresPosicionales.length > 0 ?
        separaciones + 2 * datosEjercicio.valoresPosicionales.length :
        separaciones + 3;
      flechas++;
      texto = texto + Number(_altoTextoResultado);
    }
    let altoCanvas = altoImagen + // alto de la imagen de la tabla
      altoFlechas * flechas + //alto de las imagenes de flechas
      separaciones * _separacionElementos + // alto de las separaciones
      texto; //alto de la fuente de los textos
    return { altoCanvas, altoImagen };
  }
}