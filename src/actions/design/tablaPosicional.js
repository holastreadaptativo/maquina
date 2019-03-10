import { regex, regexFunctions, cargaImagen, cargaFuente } from '../global/tools';

export function tablaPosicional(config) {
  const { container, params, variables, versions, vt } = config;
  var imgSrcFlechaAbajo = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/flecha_fija.svg';
  var imgSrcSignoMas = 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/img_Funcionalidades_temp/num_sig_mas.svg';
  var srcFuente = 'https://desarrolloadaptatin.blob.core.windows.net/fuentes/LarkeNeueThin.ttf';
  //× => ALT+158
  var { _width, _tipoTabla, /*puede ser 'centenas' o 'miles'*/_pisosTabla, /*pueden ser 'uno', 'dos', 'tres'*/_separacionElementos,_titulo,
    _tipoPisoUno, _repeticionPictoricaPisoUno, _mostrarNumeroCompletoUno, _numeroCompletoPisoUno, _umilPisoUno, _centenaPisoUno, _decenaPisoUno, _unidadPisoUno, _altoTextoPisoUno, /*numerico , imagenes, repeticion*/
    _altoImgMilesPisoUno, _altoImgCentPisoUno, _altoImgDecPisoUno, _altoImgUniPisoUno,//termino datos piso uno
    _tipoPisoDos, _repeticionPictoricaPisoDos, _mostrarNumeroCompletoDos, _numeroCompletoPisoDos, _umilPisoDos, _centenaPisoDos, _decenaPisoDos, _unidadPisoDos, _altoTextoPisoDos,
    _altoImgMilesPisoDos, _altoImgCentPisoDos, _altoImgDecPisoDos, _altoImgUniPisoDos,//termino datos piso dos
    _tipoPisoTres, _repeticionPictoricaPisoTres, _mostrarNumeroCompletoTres, _numeroCompletoPisoTres, _umilPisoTres, _centenaPisoTres, _decenaPisoTres, _unidadPisoTres, _altoTextoPisoTres,
    _altoImgMilesPisoTres, _altoImgCentPisoTres, _altoImgDecPisoTres, _altoImgUniPisoTres,//termino datos piso tres
    _dibujaValorPosicional1, _mostrarSignoMasVP1,_altoTextoValorPosicional1, _umilVP1, _centenaVP1, _decenaVP1, _unidadVP1,
    _dibujaValorPosicional2, _mostrarSignoMasVP2,_altoTextoValorPosicional2, _umilVP2, _centenaVP2, _decenaVP2, _unidadVP2,
    _dibujaTextoResultado, _altoTextoResultado, _resultado,
    _tipoUmilVP1,_tipoCentenaVP1,_tipoDecenaVP1,_tipoUnidadVP1,_altoumilvp1,_altocentenavp1,_altodecenavp1,_altounidadvp1,
    _tipoUmilVP2,_tipoCentenaVP2,_tipoDecenaVP2,_tipoUnidadVP2,_altoumilvp2,_altocentenavp2,_altodecenavp2,_altounidadvp2 } = params;

  var vars = vt ? variables : versions;
  try {
    var numeroCompletoPisoUno = _mostrarNumeroCompletoUno === 'si' ? regex(_numeroCompletoPisoUno, vars, vt) : '';
    _umilPisoUno = _mostrarNumeroCompletoUno === 'si' ? numeroCompletoPisoUno[0] : regex(_umilPisoUno, vars, vt);
    _centenaPisoUno = _mostrarNumeroCompletoUno === 'si' ? numeroCompletoPisoUno[1] : regex(_centenaPisoUno, vars, vt);
    _decenaPisoUno = _mostrarNumeroCompletoUno === 'si' ? numeroCompletoPisoUno[2] : regex(_decenaPisoUno, vars, vt);
    _unidadPisoUno = _mostrarNumeroCompletoUno === 'si' ? numeroCompletoPisoUno[3] : regex(_unidadPisoUno, vars, vt);

    var numeroCompletoPisoDos = _mostrarNumeroCompletoDos === 'si' ? regex(_numeroCompletoPisoDos, vars, vt) : '';
    _umilPisoDos = _mostrarNumeroCompletoDos === 'si' ? numeroCompletoPisoDos[0] : regex(_umilPisoDos, vars, vt);
    _centenaPisoDos = _mostrarNumeroCompletoDos === 'si' ? numeroCompletoPisoDos[1] : regex(_centenaPisoDos, vars, vt);
    _decenaPisoDos = _mostrarNumeroCompletoDos === 'si' ? numeroCompletoPisoDos[2] : regex(_decenaPisoDos, vars, vt);
    _unidadPisoDos = _mostrarNumeroCompletoDos === 'si' ? numeroCompletoPisoDos[3] :regex(_unidadPisoDos, vars, vt);

    var numeroCompletoPisoTres = _mostrarNumeroCompletoTres === 'si' ? regex(_numeroCompletoPisoTres, vars, vt) : '';
    _umilPisoTres = _mostrarNumeroCompletoTres === 'si' ? numeroCompletoPisoTres[0] : regex(_umilPisoTres, vars, vt);
    _centenaPisoTres = _mostrarNumeroCompletoTres === 'si' ? numeroCompletoPisoTres[1] : regex(_centenaPisoTres, vars, vt);
    _decenaPisoTres = _mostrarNumeroCompletoTres === 'si' ? numeroCompletoPisoTres[2] : regex(_decenaPisoTres, vars, vt);
    _unidadPisoTres = _mostrarNumeroCompletoTres === 'si' ? numeroCompletoPisoTres[3] : regex(_unidadPisoTres, vars, vt);

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
  datosEjercicio.tabla.detallePisos = [{//tipo piso uno
    tipo: _tipoPisoUno, 
    tipoRepeticion: _repeticionPictoricaPisoUno,
    umil: _umilPisoUno,
    centena: _centenaPisoUno,
    decena: _decenaPisoUno,
    unidad: _unidadPisoUno,
    altoTexto: _altoTextoPisoUno,
    umilAltoImg: _altoImgMilesPisoUno,
    decAltoImg: _altoImgDecPisoUno,
    centAltoImg: _altoImgCentPisoUno,
    uniAltoImg: _altoImgUniPisoUno
  }]
  if (datosEjercicio.tabla.configuracion.pisosTabla > 1) {
    datosEjercicio.tabla.detallePisos[1] = {//tipo piso dos
      tipo: _tipoPisoDos,
      tipoRepeticion: _repeticionPictoricaPisoDos,
      umil: _umilPisoDos,
      centena: _centenaPisoDos,
      decena: _decenaPisoDos,
      unidad: _unidadPisoDos,
      altoTexto: _altoTextoPisoDos,
      umilAltoImg: _altoImgMilesPisoDos,
      decAltoImg: _altoImgDecPisoDos,
      centAltoImg: _altoImgCentPisoDos,
      uniAltoImg: _altoImgUniPisoDos
    }
  }
  if (datosEjercicio.tabla.configuracion.pisosTabla > 2) {
    datosEjercicio.tabla.detallePisos[2] = {//tipo piso tres
      tipo: _tipoPisoTres,
      tipoRepeticion: _repeticionPictoricaPisoTres,
      umil: _umilPisoTres,
      centena: _centenaPisoTres,
      decena: _decenaPisoTres,
      unidad: _unidadPisoTres,
      altoTexto: _altoTextoPisoTres,
      umilAltoImg: _altoImgMilesPisoTres,
      decAltoImg: _altoImgDecPisoTres,
      centAltoImg: _altoImgCentPisoTres,
      uniAltoImg: _altoImgUniPisoTres
    }
  }
  datosEjercicio.valoresPosicionales = [];

  if (_dibujaValorPosicional1 === 'si') {
    datosEjercicio.valoresPosicionales[0] = {
      mostrar: _dibujaValorPosicional1,
      mostrarSignoMas: _mostrarSignoMasVP1,
      altoTexto: Number(_altoTextoValorPosicional1), //alto del texto de los valores posicionales
      numeros: {//numeros que se muestran debajo de la tabla en forma de suma
        umil: _tipoUmilVP1 === 'texto' ? _umilVP1 : { src: _umilVP1, alto: Number(_altoumilvp1) },
        centena: _tipoCentenaVP1 === 'texto' ? _centenaVP1 : { src: _centenaVP1, alto: Number(_altocentenavp1) },
        decena: _tipoDecenaVP1 === 'texto' ? _decenaVP1 : { src: _decenaVP1, alto: Number(_altodecenavp1) },
        unidad: _tipoUnidadVP1 === 'texto' ? _unidadVP1 : { src: _unidadVP1, alto: Number(_altounidadvp1) }
      }
    }
  }

  if (_dibujaValorPosicional2 === 'si') {
    datosEjercicio.valoresPosicionales[1] = {
      mostrar: _dibujaValorPosicional2,
      mostrarSignoMas: _mostrarSignoMasVP2,
      altoTexto: Number(_altoTextoValorPosicional2), //alto del texto de los valores posicionales
      numeros: {//numeros que se muestran debajo de la tabla en forma de suma
        umil: _tipoUmilVP2 === 'texto' ? _umilVP2 : { src: _umilVP2, alto: Number(_altoumilvp2) },
        centena: _tipoCentenaVP2 === 'texto' ? _centenaVP2 : { src: _centenaVP2, alto: Number(_altocentenavp2) },
        decena: _tipoDecenaVP2 === 'texto' ? _decenaVP2 : { src: _decenaVP2, alto: Number(_altodecenavp2) },
        unidad: _tipoUnidadVP2 === 'texto' ? _unidadVP2 : { src: _unidadVP2, alto: Number(_altounidadvp2) }
      }
    }
  }

  datosEjercicio.resultado = {
    mostrar: _dibujaTextoResultado,
    numero: _resultado, //numero del valor final centrado (puede ser texto o  numero)
    altoTexto: Number(_altoTextoResultado) //alto del texto del resultado
  }
  if(_titulo !== '') {
    container.parentElement.querySelectorAll('span').forEach(e => e.parentNode.removeChild(e));
    container.parentElement.classList.add('text-center');
    var titulo = document.createElement('span');
    titulo.innerText = regexFunctions(regex(_titulo, vars, vt));
    titulo.style.fontSize = '18px';
    titulo.style.fontWeight = '600';
    titulo.style.color = 'black';
    container.parentNode.insertBefore(titulo, container);
  }
  _separacionElementos = Number(_separacionElementos);
  console.log(datosEjercicio);
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
    const { detallePisos } = datosEjercicio.tabla;
    const { tipoTabla, pisosTabla } = datosEjercicio.tabla.configuracion;
    var porcion = altoImagen / ((pisosTabla * 2) + 1);//cantidad de separaciones que tiene la imagen ya que el alto de un cuadro equivale a dos alto del titulo de la tabla
    var altoCuadro = porcion * 2;
    var separaciones = tipoTabla === 'centenas' ? 3 : 4;
    var anchoSeparacion = container.width / separaciones;
    

    for (var fila = 0; fila < detallePisos.length; fila++) {
      const { tipo, tipoRepeticion, umil, centena, decena, unidad, altoTexto, umilAltoImg, centAltoImg, decAltoImg, uniAltoImg } = detallePisos[fila];
      var numeros = tipoTabla === 'centenas' ? [centena, decena, unidad] : [umil, centena, decena, unidad];
      numeros.forEach(function (numero, columna) {
        switch (tipo) {
          case 'numerico':
            !(tipoTabla === 'miles' && numero == 0 && columna === 0) && dibujaNumeroEnFila(numero, fila, columna, altoTexto);
            break;
          case 'imagenes':
            dibujaImagen(numero, fila, columna, tipoRepeticion);
            break;
          case 'repeticion':
            var altoImagenDeRepeticion;
            if(tipoTabla === 'miles') {
              if(columna === 0) {
                altoImagenDeRepeticion = umilAltoImg;
              } else if(columna === 1) {
                altoImagenDeRepeticion = centAltoImg;
              } else if(columna === 2) {
                altoImagenDeRepeticion = decAltoImg;
              } else if(columna === 3) {
                altoImagenDeRepeticion = uniAltoImg;
              }
            } else {
              if(columna === 0) {
                altoImagenDeRepeticion = centAltoImg;
              } else if(columna === 1) {
                altoImagenDeRepeticion = decAltoImg;
              } else if(columna === 2) {
                altoImagenDeRepeticion = uniAltoImg;
              }
            }
            dibujaRepeticion(numero, fila, columna, tipoRepeticion, altoImagenDeRepeticion);
            break;
          default:
            console.log('opcion aun no soportada');
            break;
        }
      });
    }

    function dibujaNumeroEnFila(numero, fila, columna, altoTexto) {
      ctx.fillStyle = '#F58220';
      ctx.font = `${altoTexto}pt LarkeNeueThinFuente`;
      ctx.textAlign = 'center';
      fila++;
      var xTexto = (anchoSeparacion * columna) + (anchoSeparacion / 2);
      var yTexto = porcion + (altoCuadro * fila) - (altoCuadro - altoTexto) / 2;
      ctx.fillText(numero, xTexto, yTexto);
    }

    function dibujaImagen(numero, fila, columna, tipoRepeticion) {
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

    function dibujaRepeticion(numero, fila, columna, tipoRepeticion, altoImgRep) {
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
                dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep);
              } else if (tipoRepeticion === 'monedas y billetes') {
                dibujaRepeticionDadoBilletes(numero, anchoSeparacion, altoCuadro, image, cx, cy);
              }
              break;
            case 3:
              dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep);
              break;
            case 2:
              if (tipoRepeticion === 'bloques') {
                dibujaRepeticionHorizontal(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep);
              } else if (tipoRepeticion === 'monedas y billetes') {
                dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep);
              }
              break;
            case 1:
              dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep);
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
          case '1':
            var x = cx - widthImg / 2;
            var y = cy - altoImg / 2;
            ctx.drawImage(image, x, y, widthImg, altoImg);
            break;
          case '2':
            var x = cx - widthImg / 2;
            var y1 = cy - container / 2,
              y2 = cy + container / 2 - altoImg;
            ctx.drawImage(image, x, y1, widthImg, altoImg);
            ctx.drawImage(image, x, y2, widthImg, altoImg);
            break;
          case '3':
            var x = cx - widthImg / 2;
            var y1 = cy - container / 2,
              y2 = cy + container / 2 - altoImg,
              y3 = cy - altoImg / 2;
            ctx.drawImage(image, x, y1, widthImg, altoImg);
            ctx.drawImage(image, x, y2, widthImg, altoImg);
            ctx.drawImage(image, x, y3, widthImg, altoImg);
            break;
          case '4':
            var x1 = cx - separacion / 2 - widthImg, x2 = cx + separacion / 2;
            var y1 = cy - separacion / 2 - altoImg, y2 = cy + separacion / 2;
            ctx.drawImage(image, x1, y1, widthImg, altoImg);
            ctx.drawImage(image, x1, y2, widthImg, altoImg);
            ctx.drawImage(image, x2, y1, widthImg, altoImg);
            ctx.drawImage(image, x2, y2, widthImg, altoImg);
            break;
          case '5':
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
          case '6':
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
            console.log('Hola :)');
            break;
        }
      }

      function dibujaRepeticionHorizontal(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep) {
        var altoImg = altoImgRep;
        var anchoImg = image.width * altoImg / image.height;
        var separacion = 10;
        var xStart = cx - ((numero * anchoImg) + (separacion * (numero -1))) /2
        var yStart = cy - (altoImg /2)
        for (var i = 0, x, y; i < numero; i++) {
          x = xStart + (anchoImg * i) + (separacion * i);
          y = yStart;
          ctx.drawImage(image, x, y, anchoImg, altoImg);
        }
      }

      function dibujaRepeticionDado(numero, anchoSeparacion, altoCuadro, image, cx, cy, altoImgRep) {
        var altoImg = altoImgRep;
        var anchoImg = image.width * altoImg / image.height;
        var separacion = ((altoCuadro * 0.85) / 3) * 0.1;
        switch (numero) {
          case '1':
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '2':
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '3':
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '4':
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '5':
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '6':
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '7':
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(5, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '8':
            dibujaBloqueEnPosicionNueve(9, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(6, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(3, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(8, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(2, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(7, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(4, image, altoImg, anchoImg, cx, cy, separacion);
            dibujaBloqueEnPosicionNueve(1, image, altoImg, anchoImg, cx, cy, separacion);
            break;
          case '9':
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
    //console.log(numerosValorPosicional);
    for (var i = 1, centroSeccion, centroSeparacion, yTexto; i < diviciones + 1; i++) {
      centroSeccion = (anchoSeparaciones * i) - (anchoSeparaciones / 2);
      centroSeparacion = anchoSeparaciones * i;
      //flecha
      var xFlecha = centroSeccion - (imgFlechaAbajo.width / 2);
      ctx.drawImage(imgFlechaAbajo, xFlecha, yStart);
      //texto
      if(typeof numerosValorPosicional[i - 1] === 'string') {
        yTexto = yStart + imgFlechaAbajo.height + _separacionElementos + valorPosicional.altoTexto;
        ctx.fillText(numerosValorPosicional[i - 1], centroSeccion, yTexto);
      } else {
        cargaImagen(numerosValorPosicional[i-1].src).then(function(img){
          var anchoImgVp = numerosValorPosicional[i-1].alto * img.width / img.height;
          var xImagenVp = centroSeccion-anchoImgVp/2;
          var yImagenVp = yStart + imgFlechaAbajo.height + _separacionElementos;
          ctx.drawImage(img, xImagenVp, yImagenVp, anchoImgVp, numerosValorPosicional[i-1].alto);
        }).catch(function(error){
          console.log(error);
        });
      }
      
      //singo mas
      if(valorPosicional.mostrarSignoMas === 'si') {
        if (i + 1 !== diviciones + 1) {
          var xMas = centroSeparacion - (imgSignoMas.width / 2);
          var yMas = yStart + imgFlechaAbajo.height + _separacionElementos + (valorPosicional.altoTexto / 2) - (imgSignoMas.height / 2)
          ctx.drawImage(imgSignoMas, xMas, yMas);
        }
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