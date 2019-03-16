import { regex, cargaImagen, espacioMiles } from '../global/tools'
import { replace } from 'actions'
//import { setInterval } from 'timers';

export function rectNumFn(config) {
  const { container, params, variables, versions, vt } = config

  const {
    // General
    rectType, decimalScale, height, width, /*background,*/
    // Borde
    /* borderWidth, borderColor, borderStyle, borderRadius, */
    // Títulos
    titleValue, titleColor, titleSize, titleWeight,
    // Padding
    canvasPadding, containerPadding, chartPadding,
    // Escala
    scaleValue, scaleDivisions, scaleWidth, scaleLength, scaleColor,
    // Valor
    initValue, valuesSeparator,
    // Mostrar
    showFirstValue, showExValues, showAllValues, selectValuesToShow, showPointValue,
    wichPointValue, showFigValue, wichFigValues,
    showArcs, initArcPt, endArcPt, showConstant,
    //mostrar figuras
    srcFig1,altoFig1,ubicacionFig1,textoFig1,altoTextoFig1,posicionTextoFig1,posicionesFig1,separacionRectaFig1,
    srcFig2,altoFig2,ubicacionFig2,textoFig2,altoTextoFig2,posicionTextoFig2,posicionesFig2,separacionRectaFig2,
    // Tramo LLave
    showTramoLlave,tramoInicio,tramoFin,tramoTexto,tramoAltoTexto,tramoMostrarNumero,tramoColor,tramoForma,tramoAltura,
    // Mini Escala
    showMiniScale, showMiniTheValue, showMiniExValues, showMiniAllValues,
    showMiniPointValue, showMiniFig, wichMiniFigValues, showMiniArcs,
    initArcPtMini, endArcPtMini, showMiniGuides, showLens, alignLens,
    // Ejes
    axisColor, withArrows, axisWidth,
    // Fuente
    fontColor, fontSize, fontFamily, fontWeight,
  } = params

  let canvasPaddingAux = {}, containerPaddingAux = {}, chartPaddingAux = {}/*, innerChartPaddingAux = {}*/
  canvasPaddingAux.top = eval(canvasPadding.split(',')[0])
  canvasPaddingAux.right = eval(canvasPadding.split(',')[1])
  canvasPaddingAux.bottom = eval(canvasPadding.split(',')[2])
  canvasPaddingAux.left = eval(canvasPadding.split(',')[3])
  containerPaddingAux.top = eval(containerPadding.split(',')[0])
  containerPaddingAux.right = eval(containerPadding.split(',')[1])
  containerPaddingAux.bottom = eval(containerPadding.split(',')[2])
  containerPaddingAux.left = eval(containerPadding.split(',')[3])
  chartPaddingAux.top = eval(chartPadding.split(',')[0])
  chartPaddingAux.right = eval(chartPadding.split(',')[1])
  chartPaddingAux.bottom = eval(chartPadding.split(',')[2])
  chartPaddingAux.left = eval(chartPadding.split(',')[3])
  //innerChartPaddingAux = eval(innerChartPadding)

  container.width = width
  container.height = height

  let c = container
  let vars = vt ? variables : versions

  let state = {}
  state.ctx = c.getContext('2d')
  state.typeRect = rectType
  state.scale = {
    decimalScale: decimalScale === 'si' ? true : false,
    divisions: Number(regex(scaleDivisions, vars, vt)),//eval(rectValuesDec) !== undefined ? eval(scaleDivisions) > eval(rectValuesDec) ? eval(scaleDivisions) + 1 : eval(rectValuesDec) + 2 : eval(scaleDivisions) + 1,
    value: /*state.typeRect !== 'enteros' ? 1 : */ eval(regex(scaleValue, vars, vt)) === 0 ? 1 : eval(regex(scaleValue, vars, vt)),
    width: c.width < 500 ? eval(scaleWidth) * 0.6 : eval(scaleWidth),
    color: scaleColor,
    length: c.width < 500 ? eval(scaleLength) * 0.7 : eval(scaleLength)
  }
  state.show = {
    extValues: showExValues === 'si' ? true : false,
    firstValue: showFirstValue === 'si' ? true : false,
    allValues: {
      show: showAllValues !== 'no' ? showAllValues : false,
      values: regex(selectValuesToShow, vars, vt)
    },
    points: {
      show: showPointValue !== 'no' ? true : false,
      values: wichPointValue
    },
    figures: {
      show: showFigValue === 'no' ? false : showFigValue,
      values: wichFigValues,
      imagenes: [{
        src:srcFig1,
        alto:Number(altoFig1),
        ubicacion:ubicacionFig1,
        texto: regex(textoFig1, vars, vt),
        posiciones: regex(posicionesFig1, vars, vt),
      },{
        src:srcFig2,
        alto:Number(altoFig2),
        ubicacion:ubicacionFig2,
        texto: regex(textoFig2, vars, vt),
        posiciones: regex(posicionesFig2, vars, vt),
      }]
    },
    arcs: {
      show: showArcs !== 'no' ? showArcs : false,
      values: {
        init: regex(initArcPt, vars, vt),
        end: regex(endArcPt, vars, vt),
        constant: showConstant === 'si' ? true : false
      }
    },
    tramoLLave:{
      mostrar: showTramoLlave === 'si' ? true : false,
      inicio: regex(tramoInicio, vars, vt),
      fin: regex(tramoFin, vars, vt),
      texto: regex(tramoTexto, vars, vt),
      alto: Number(tramoAltoTexto),
      color: tramoColor,
      forma: tramoForma,
      altura: Number(tramoAltura)
    },
    miniScale: {
      show: (rectType !== 'enteros' && rectType !== 'mixta') && showMiniScale === 'si' ? true : false,
      extValues: showMiniExValues === 'si' ? true : false,
      allValues: showMiniAllValues === 'si' ? true : false,
      theValue: showMiniTheValue,
      point: showMiniPointValue === 'si' ? true : false,
      figure: {
        show: showMiniFig === 'no' ? false : showMiniFig,
        values: wichMiniFigValues
      },
      arcs: {
        show: showMiniArcs !== 'no' ? showMiniArcs : false,
        init: initArcPtMini,
        end: endArcPtMini
      },
      guides: showMiniGuides === 'si' ? true : false,
      lens: {
        show: showLens === 'si' ? true : false,
        align: alignLens === 'punto' ? true : false
      }
    }
  }
  state.font = {
    family: fontFamily,
    weight: fontWeight,
    size: c.width < 500 ? eval(fontSize) * 0.6 : eval(fontSize),
    color: fontColor,
    align: 'left' // end, right, center, start, left
  }
  state.titles = {
    mainTitle: {
      title: titleValue,
      alignX: 'center',
      alignY: 'top',
      font: {
        family: fontFamily,
        weight: titleWeight,
        color: titleColor,
        size: eval(titleSize)
      },
      color: titleColor,
      move: { moveY: 0, moveX: 0 }
    }
  }
  state.canvas = {
    height: c.height,
    width: c.width,
    padding: {
      top: c.height * (canvasPaddingAux.top / 1000),
      right: c.width * (canvasPaddingAux.right / 1000),
      bottom: c.height * (canvasPaddingAux.bottom / 1000),
      left: c.width * (canvasPaddingAux.left / 1000)
    }
  }
  state.canvas.position = {
    x0: state.canvas.padding.left,
    y0: state.canvas.padding.top,
    x1: c.width - (state.canvas.padding.right),
    y1: c.height - (state.canvas.padding.bottom)
  }
  state.container = {
    padding: {
      top: c.height * (containerPaddingAux.top / 1000),
      right: c.width * (containerPaddingAux.right / 1000),
      bottom: c.height * (containerPaddingAux.bottom / 1000),
      left: c.width * (containerPaddingAux.left / 1000)
    }
  }
  state.container.position = {
    x0: state.canvas.position.x0 + state.container.padding.left,
    y0: state.canvas.position.y0 + state.container.padding.top + state.titles.mainTitle.font.size,
    x1: state.canvas.position.x1 - state.container.padding.right,
    y1: state.canvas.position.y1 - state.container.padding.bottom
  }
  state.chart = {
    padding: {
      top: c.height * (chartPaddingAux.top / 1000),
      right: c.width * (chartPaddingAux.right / 1000),
      bottom: c.height * (chartPaddingAux.bottom / 1000),
      left: c.width * (chartPaddingAux.left / 1000)
    },
    axis: {
      width: c.width < 500 ? eval(axisWidth) * 0.6 : eval(axisWidth),
      color: axisColor,
      arrows: withArrows == 'si' ? true : false,
      arrowColor: axisColor
    },
    image: {
      //showLens: showLens === 'si' ? true : false,
      lupa: 'https://contenedoradapt.adaptativamente.cl/frontejercicios/imagenes_front/recta_numerica/lupa_recta.svg',
      pictoImg: 'https://contenedoradapt.adaptativamente.cl/frontejercicios/imagenes_front/recta_numerica/rombo_recta.svg'
    },
    values: {
      initValue: regex(initValue, vars, vt),
      valuesSeparator: valuesSeparator == 'coma' ? ',' : '.'
    }
  }
  state.chart.position = {
    x0: state.container.position.x0 + state.chart.padding.left,
    y0: state.container.position.y0 + state.chart.padding.top,
    x1: state.container.position.x1 - state.chart.padding.right,
    y1: state.container.position.y1 - state.chart.padding.bottom
  }

  let mainData = {
    pointsData: ptosPrincipales(state),
    pointsDataMini: ptosPrincipalesMini(state)
  }
  // dibujarBordes(state, state.canvas, 'red') // Canvas
  // dibujarBordes(state, state.container, 'blue') // Container
  // dibujarBordes(state, state.chart, 'green') // Chart

  init(state, mainData)
}

// Dibuja los espacios definidos, container, chart
/*
function dibujarBordes(state, el, color) {
  const { ctx } = state
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.rect(el.position.x0, el.position.y0, el.position.x1 - el.position.x0, el.position.y1 - el.position.y0)
  ctx.stroke()
  ctx.restore()
  ctx.save()
}
*/

function ptosPrincipales(state) {
  const { typeRect, chart, show, scale } = state
  const { x0, y0, x1, y1 } = chart.position
  let centroY = (y1 - y0)/2 + y0
  if (show.miniScale.show && !(typeRect === 'centesimal' || typeRect === 'mixta centesimal')) {
    centroY = (y1 - y0)/4 + y0
  }
  let segmento = (x1 - x0)/(scale.divisions + 2)
  let divisiones = scale.divisions
  let escalaValor = scale.value
  let xIni = x0 + segmento
  let xFin = x1 - segmento
  return {
    eje: {
      xIni: x0,
      xFin: x1,
      centroY,
      segmento,
      divisiones
    },
    recta: {
      xIni,
      xFin,
      centroY,
      segmento,
      divisiones,
      escalaValor
    }
  }
}

function ptosPrincipalesMini(state) {
  const { chart } = state
  const { x0, y0, x1, y1 } = chart.position
  let divisiones = 10
  let escalaValor = 1
  let contenedorAncho = x1 - x0
  let margenEje = contenedorAncho/8
  let xIniEje = x0 + margenEje
  let xFinEje = x1 - margenEje
  let ejeAncho = xFinEje - xIniEje
  let segmento = ejeAncho/(divisiones + 2)
  let xIniRecta = xIniEje + segmento
  let xFinRecta = xFinEje - segmento
  
  let centroY = (y1 - y0)*3/4 + y0
  return {
    eje: {
      xIni: xIniEje,
      xFin: xFinEje,
      centroY,
      segmento,
      divisiones
    },
    recta: {
      xIni: xIniRecta,
      xFin: xFinRecta,
      centroY,
      segmento,
      divisiones,
      escalaValor
    }
  }
}

// Inicializa la graficación de la recta
function init(state, mainData) {
  const { show, typeRect } = state
  insertarTitPrinc(state)
  ejePrincipal(state, mainData.pointsData)
  const { guides,  lens } = show.miniScale
  if (show.miniScale.show && !(typeRect === 'centesimal' || typeRect === 'mixta centesimal')) {
    ejeSecundario(state, mainData.pointsDataMini)
    if (guides || lens.show) {
      dibujarGuiasLente(state, mainData)
    }
  }
  function dibujarGuiasLente(state, mainData) {
    const { typeRect, show, scale, chart, font } = state
    const { theValue, guides } = show.miniScale
    const { pointsData } = mainData
    let iniVal = Number(chart.values.initValue)
    let miniVal = Number(theValue)
    let valMin, valMax, miniValMin, /*miniValMax,*/ puntoXIni, puntoXFin

    let posIniGuia, posFinGuia
    if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
      if (iniVal.toFixed(2).split('.')[1][0]) {
        valMin = Number(`${iniVal.toFixed(2).split('.')[0]}.${iniVal.toFixed(2).split('.')[1][0]}`)
        valMax = valMin + 1
        if (miniVal.toFixed(2).split('.')[1][0]) {
          miniValMin = Number(`${miniVal.toFixed(2).split('.')[0]}.${miniVal.toFixed(2).split('.')[1][0]}`)
          // miniValMax = miniValMin + 0.1
          posIniGuia = Number(((miniValMin - valMin)*10).toFixed(0))
          posFinGuia = posIniGuia + 1
        }
      }
    }
    if (miniVal >= valMin && miniVal <= valMax) {
      puntoXIni = pointsData.recta.xIni + pointsData.recta.segmento*posIniGuia
      puntoXFin = pointsData.recta.xIni + pointsData.recta.segmento*posFinGuia
    }



    let miniPuntoXIni = mainData.pointsDataMini.recta.xIni
    let miniPuntoXFin = mainData.pointsDataMini.recta.xFin
    let miniPuntoY = mainData.pointsDataMini.recta.centroY
    let delta = scale.length*2
    let puntoY = miniPuntoY - mainData.pointsData.recta.centroY - scale.length*2 - font.size*2.3
    guides && dibujarLinea(state, miniPuntoXIni, miniPuntoXFin, miniPuntoY, puntoXIni, puntoXFin, puntoY, delta)
    lens.show && dibujarLente(state, puntoXIni, puntoXFin, puntoY, pointsData.recta.segmento)
    // xIni, xFin, centroY, segmento
    function dibujarLinea(state, miniPuntoXIni, miniPuntoXFin, miniPuntoY, puntoXIni, puntoXFin, puntoY, delta) {
      const { ctx, scale, font } = state
      ctx.lineWidth = scale.width*2/3
      ctx.strokeStyle = font.color
      ctx.fillStyle = font.color
      // let delta = scale.length*2
      ctx.beginPath()
      ctx.moveTo(miniPuntoXIni, miniPuntoY - delta)
      ctx.lineTo(puntoXIni, miniPuntoY - puntoY)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(miniPuntoXFin, miniPuntoY - delta)
      ctx.lineTo(puntoXFin, miniPuntoY - puntoY)
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
    }
    function dibujarLente(state, puntoXIni, puntoXFin, puntoY, imgWidth) {
      const { ctx, chart } = state
      const { lupa } = chart.image
      ctx.save()
      let img = new Image()
      img.src = lupa
      let factorImg = (129/191)
      let imageWidth = imgWidth*2.2
      let imageHeight = imageWidth*factorImg
      let centerX, centerY
      centerY = puntoY - imageHeight*0.38
      centerX = puntoXIni - imgWidth/2.2
      img.onload = function() {
        // img.width = imgWidth
        // img.height = imgWidth*factorImg
        ctx.translate(centerX + imageWidth/2, centerY + imageHeight/2)
        ctx.rotate(60*Math.PI/180)
        ctx.drawImage(img,-imageWidth/2,-imageHeight/2, imageWidth, imageHeight)
      }
      ctx.restore()
      ctx.save()

    }
  }
}

// Main Title
function insertarTitPrinc(state) {
  const { ctx, canvas } = state
  const { mainTitle } = state.titles
  if (mainTitle.title !== '') {
    ctx.save()
    let x = (canvas.position.x1)/2 + mainTitle.move.moveX + canvas.position.x0
    let y = 0 + canvas.position.y0 + mainTitle.move.moveY
    ctx.translate(x,y)
    ctx.fillStyle = mainTitle.color
    ctx.textAlign = mainTitle.alignX
    ctx.textBaseline = mainTitle.alignY
    ctx.font = mainTitle.font.weight + ' ' + mainTitle.font.size + 'px ' + mainTitle.font.family
    ctx.fillText(mainTitle.title, 0, 0)
    ctx.restore()
    ctx.save()
  }
}

/*-------------------------------- Begin Eje Principal --------------------------------*/

function ejePrincipal(state, data) {
  const { scale, typeRect, chart } = state
  generarEje(state, data.eje)
  generarEscala(state, data.recta)
  if (typeRect === 'enteros' || typeRect === 'enteros con decimales' || typeRect === 'decimal' || typeRect === 'mixta' || typeRect === 'mixta decimal') {
    scale.decimalScale && generarEscalaDec(state, data.recta)
  }
  if (chart.values.initValue) {
    mostrarDatos(state, data.recta)
  }
}

function ejeSecundario(state, data) {
  generarEje(state, data.eje)
  generarEscala(state, data.recta)
  mostrarDatosEjeSec(state, data.recta)
}

/*-------------------------------- End Eje Principal --------------------------------*/

/* -------------------------------- Begin Eje Genérico -------------------------------- */
function generarEje(state, dataEje) {
  const { xIni, xFin, centroY } = dataEje
  const { ctx, chart, scale } = state
  ctx.save()
  ctx.lineWidth = chart.axis.width
  ctx.strokeStyle = chart.axis.color
  let arrowsLenght = scale.length*0.7
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (chart.axis.arrows) {
    ctx.beginPath()
    ctx.moveTo(xIni + arrowsLenght, centroY - arrowsLenght)
    ctx.lineTo(xIni, centroY)
    ctx.lineTo(xIni + arrowsLenght, centroY + arrowsLenght)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(xFin - arrowsLenght, centroY - arrowsLenght)
    ctx.lineTo(xFin, centroY)
    ctx.lineTo(xFin - arrowsLenght, centroY + arrowsLenght)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.lineWidth = chart.axis.width
  ctx.moveTo(xIni, centroY)
  ctx.lineTo(xFin, centroY)
  ctx.stroke()
  //ctx.closePath()
  ctx.restore()
  ctx.save()
}

function generarEscala(state, dataRecta) {
  const { ctx, scale } = state
  const { xIni, centroY, segmento, divisiones } = dataRecta
  ctx.save()
  let bordersScales = scale.length
  ctx.strokeStyle = scale.color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = scale.width
  for (let i = 0; i <= divisiones; i++) {
    let xPos = xIni + segmento*i
    ctx.beginPath()
    ctx.moveTo(xPos, centroY - bordersScales)
    ctx.lineTo(xPos, centroY + bordersScales)
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()
  ctx.save()
}

function generarEscalaDec(state, dataRecta) {
  const { xIni, centroY, segmento, divisiones } = dataRecta
  const { ctx, scale, typeRect } = state
  ctx.save()
  ctx.strokeStyle = scale.color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 0; i < divisiones; i++) {
    ctx.lineWidth = scale.width
    let bordersScales = scale.length
    if (typeRect !== 'enteros' || typeRect !== 'mixta') {
      for (let j = 1; j < 10; j ++) {
        let extraLarge = j === 5 ? bordersScales*0.2 : 0
        let xPos = xIni + segmento*i + segmento/10*j
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(xPos, centroY - bordersScales*0.7 - extraLarge)
        ctx.lineTo(xPos, centroY + bordersScales*0.7 + extraLarge)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }
  ctx.restore()
  ctx.save()
}
/* -------------------------------- End Eje Genérico -------------------------------- */

/*-------------------------------- Eje Secundario --------------------------------*/


function mostrarDatos(state, dataRecta) {
  const { show } = state
  const { extValues, firstValue, allValues, points, figures, arcs, tramoLLave } = show
  const { xIni, centroY, segmento, divisiones } = dataRecta
  let valores = [];
  for (let i = 0; i <= divisiones; i++) {
    let xPos = xIni + segmento * i
    let valor = numeroValidacion(state, i)
    // Mostrar valores externos
    if (i === 0 || i === divisiones) {
      extValues && mostrarValorExterno(state, xPos, centroY, i, valor);
      (i === 0 && firstValue) && mostrarValorExterno(state, xPos, centroY, i, valor);
    } else {
      let arrValoresAll = arrNumerosValidacion(state, allValues.values)
      allValues.show && mostrarValor(state, xPos, centroY, i, valor, arrValoresAll)
    }
    let arrValoresPoints = arrNumerosValidacion(state, points.values)
    points.show && mostrarPunto(state, dataRecta, xPos, centroY, i, valor, arrValoresPoints)
    let arrValoresFig = arrNumerosValidacion(state, figures.values)
    figures.show && mostrarFigura(state, dataRecta, xPos, centroY, i, valor, arrValoresFig)
    let arrValoresArcInit = arrNumerosValidacion(state, arcs.values.init)
    let arrValoresArcEnd = arrNumerosValidacion(state, arcs.values.end)
    arcs.show && mostrarArco(state, dataRecta, xPos, centroY, i, valor, arrValoresArcInit, arrValoresArcEnd, arcs.values.constant)
    valores.push({ valor, xPos });
  }
  if(tramoLLave.mostrar) {
    mostrarTramoLlave(state, valores, tramoLLave);
  }
  if(figures.show) {
    mostrarImagenesEnPosicion(state, valores, dataRecta);
  }
}

/*
imagenes: [{
  src:srcFig1.replace('https://contenedoradapt.blob.core.windows.net/recursos/ejercicios/Nivel-4/', '../../../../'),
  alto:Number(altoFig1),
  ubicacion:ubicacionFig1,
  texto:textoFig1,
  altoTexto:Number(altoTextoFig1),
  posicionTexto:posicionTextoFig1,
  posiciones:posicionesFig1,
  separacion:Number(separacionRectaFig1)
},{
  src:srcFig2.replace('https://contenedoradapt.blob.core.windows.net/recursos/ejercicios/Nivel-4/', '../../../../'),
  alto:Number(altoFig2),
  ubicacion:ubicacionFig2,
  texto:textoFig2,
  altoTexto:Number(altoTextoFig2),
  posicionTexto:posicionTextoFig2,
  posiciones:posicionesFig2,
  separacion:Number(separacionRectaFig2)
}]
*/

function mostrarImagenesEnPosicion(state, valores, dataRecta) {
  const { ctx, show, scale, font } = state;
  const { figures } = show;
  const { xIni, centroY, segmento } = dataRecta;
  Promise.all(figures.imagenes.map(x => x.src !== '' ? cargaImagen(x.src) : null)).then((imagen) => {
    imagen.forEach((imagen, index) => {
      figures.imagenes[index].imagenRecta = imagen;
    });
    return figures.imagenes;
  }).then(imagenes => {
    console.log(imagenes);
    imagenes.forEach(img => {
      
      const { alto, ubicacion, texto, posiciones, imagenRecta } = img; //texto no se usa
      if(imagenRecta === null) {
        return;
      }
      let posicionesImagen = posiciones.split(',');
      let yImagen = ubicacion === 'arriba' ? 
        centroY - scale.length * 1.7 - alto: 
        centroY + scale.length * 1.7;
      let widthImagen = imagenRecta.width * alto / imagenRecta.height;
      posicionesImagen.forEach((posicion, index) => {
        let datosPosicion = valores.find(x => x.valor === posicion);
        let xCentro;
        if(datosPosicion) {
          xCentro = datosPosicion.xPos;
          let xImagen = xCentro - widthImagen/2;
          ctx.drawImage(imagenRecta, xImagen, yImagen, widthImagen, alto);
        } else {
          xCentro = xIni + (posicion * segmento / scale.value);
          let xImagen = xCentro - widthImagen/2;
          ctx.drawImage(imagenRecta, xImagen, yImagen, widthImagen, alto);
        }
        if(texto != '') {
          let textoImagen = texto.split(',');
          let textoImagenPosicion = textoImagen[index] === 'numero' ? posicion :  textoImagen[index];
          let yTexto = ubicacion === 'arriba' ? centroY : centroY - (scale.length * 1.7)*2 - font.size;
          mostrarValor(state, xCentro, yTexto, 0, textoImagenPosicion, [posicion]);
        }
      });
    });
  }).catch(error => {
    console.log(error);
  });
}

function mostrarTramoLlave(state, valores, tramoLLave) {
  const { ctx, canvas, scale, font } = state
  const { inicio, fin, color, alto, texto, forma, altura } = tramoLLave;
  let radio = 15;
  let datosInicio = valores.find(x => x.valor === inicio);
  let datosFin = valores.find(x => x.valor === fin);
  let xInicio = forma === 'igual' ? datosInicio.xPos : forma === 'incluido' ? datosInicio.xPos - 5 : datosInicio.xPos + 5;
  let xFin = forma === 'igual' ? datosFin.xPos : forma === 'incluido' ? datosFin.xPos + 5 : datosFin.xPos - 5;
  let xMitad = (xInicio + xFin) / 2;
  let yTramo = canvas.height/2 - scale.length - altura;
  let yTramoInicio = yTramo + radio;
  let yTramoFin = yTramo - radio;
  console.log({yTramo, yTramoFin, yTramoInicio, altura, alto})
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  
  ctx.arc(xInicio+radio, yTramoInicio, radio, Math.PI, 1.5*Math.PI)
  
  ctx.lineTo(xMitad-radio, yTramo);

  ctx.arc(xMitad-radio, yTramoFin, radio, 0.5*Math.PI, 0, true);
  ctx.arc(xMitad+radio, yTramoFin, radio, Math.PI, 0.5 * Math.PI, true);
  
  ctx.lineTo(xFin-radio, yTramo);

  ctx.arc(xFin-radio, yTramoInicio, radio, 1.5*Math.PI, 0);  
  ctx.stroke();
  
  ctx.textAlign = "center";
  ctx.font = `${alto}px ${font.family}`;
  ctx.fillStyle = font.color;
  ctx.fillText(texto, xMitad, yTramoFin-5);

  ctx.restore();
}

function mostrarDatosEjeSec(state, dataRecta) {
  const { show, scale } = state
  const { miniScale } = show
  const { theValue, extValues, allValues, point, figure, arcs } = miniScale
  const { xIni, centroY, segmento } = dataRecta

  //console.log(miniScale)
  let centroYNum = centroY + scale.length*1.7
  let valor = Number(theValue)
  for (let i = 0; i <= 10; i++) {
    let xPos = xIni + segmento*i
    if (i === 0 || i === 10) {
      extValues && valorExternoEjeSec(state, xPos, centroYNum, valor, i, 1.7)
    } else {
      allValues && valoresEjeSec(state, xPos, centroYNum, valor, i, 1.4)
      point && puntoEjeSec(state, xPos, centroY, valor, i)
      figure.show && figuraEjeSec(state, xPos, centroY, valor, i)
    }
    if (i < 10) {
      let desde = arcs.init, hasta = arcs.end
      arcs.show && arcosEjeSec(state, xPos, centroY, valor, i, desde, hasta, segmento)
    }
  }

  function arcosEjeSec(state, x, y, valor, posicion, desde, hasta, segmento) {
    valor = Number(`${valor.toFixed(2).split('.')[0]}.${valor.toFixed(2).split('.')[1][0]}${posicion}`)
    let valorDesde = Number(desde)
    let valorHasta = Number(hasta)
    if (valor >= valorDesde && valor < valorHasta) {
      let arcoRadio = segmento/2
      dibujarArco(state, x + arcoRadio, y - arcoRadio/2, arcoRadio, true)
    }
  }
  function figuraEjeSec(state, x, y, valor, posicion) {
    const { typeRect } = state
    let figura
    if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
      figura = valor.toFixed(2).split('.')[1][1]
    }
    figura = Number(figura)
    if (figura === posicion) {
      dibujarRomboEjeSec(state, x, y, false)
    }
    function dibujarRomboEjeSec(state, x, y, grande) {
      const { ctx, scale, font } = state
      const { figure, allValues } = state.show.miniScale
      const xPos = x, centroY = y
      ctx.save()
      let diamondSize = grande ? font.size*1.4 : font.size*1.2
      let diamondW = diamondSize
      let diamondH = diamondW*1.3
      let yDist = scale.length*1.5
      if (figure.show !== 'abajo') {
        yDist -= (scale.length*1.5*2 + diamondH)
      } else {
        if (allValues) {
          yDist += (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') ?  font.size*2.3 : font.size*2
        }
      }
      ctx.strokeStyle = scale.color
      ctx.fillStyle = font.color
      ctx.fillStyle = '#dbac04'
      ctx.strokeStyle = '#dbac04'
      ctx.beginPath()
      ctx.moveTo(xPos, centroY + yDist)
      ctx.lineTo(xPos + diamondW/2, centroY + diamondH/2 + yDist)
      ctx.lineTo(xPos, centroY + diamondH + yDist)
      ctx.lineTo(xPos - diamondW/2, centroY + diamondH/2 + yDist)
      ctx.lineTo(xPos, centroY + yDist)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
      ctx.save()
    }
  }
  function puntoEjeSec(state, x, y, valor, posicion) {
    const { typeRect } = state
    let punto
    if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
      punto = valor.toFixed(2).split('.')[1][1]
    }
    punto = Number(punto)
    if (punto === posicion) {
      dibujarPunto(state, x, y, true)
    }
  }
  function valoresEjeSec(state, x, y, valor, posicion, size) {
    const { typeRect } = state
    if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
      valor = Number(`${valor.toFixed(2).split('.')[0]}.${valor.toFixed(2).split('.')[1][0]}${posicion}`)
      valor = valor.toFixed(2)
      if (typeRect === 'decimal') {
        numeroCentesimal(state, x, y, valor, size)
      } else {
        numeroMixtoCentesimal(state, x, y, valor, size)
      }
    }

  }
  function valorExternoEjeSec(state, x, y, valor, posicion, size) {
    const { typeRect } = state
    if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
      if (posicion === 0) {
        valor -= Number(`0.0${valor.toFixed(2).split('.')[1][1]}`)
      } else {
        valor += 0.1 - Number(`0.0${valor.toFixed(2).split('.')[1][1]}`)
      }
      valor = valor.toFixed(1)
      if (typeRect === 'decimal') {
        numeroDecimal(state, x, y, valor, size)
      } else {
        numeroMixtoDecimal(state, x, y, valor, size)
      }
    }
  }
}

function arrNumerosValidacion(state, arr) {
  const { typeRect } = state
  let arrValores = arr
  switch (typeRect) {
    case 'enteros':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    case 'enteros con decimales':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    case 'decimal':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    case 'centesimal':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    case 'mixta':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    case 'mixta decimal':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    case 'mixta centesimal':
      arrValores = arr.split(',') ? arr.split(',') : arr.split('')
      break;
    default:
      break;
  }
  return arrValores
}

function numeroValidacion(state, index) {
  const { typeRect, scale, chart } = state
  const { initValue } = chart.values
  let valor = initValue
  switch (typeRect) {
    case 'enteros':
      valor = eval(valor) + index*scale.value
      valor = valor.toString()
      valor = valor.split('.') ? valor.split('.')[0] : valor
      break;
    case 'enteros con decimales':
      valor = eval(valor) + index*scale.value 
      valor = valor.toFixed(2), valor = valor.toString()
      if (valor.split('.')[1].toString()) {
        valor = `${valor.split('.')[0]}.${valor.split('.')[1].toString().substring(0,1)}`
      } else {
        valor = `${valor.split('.')[0]}.0`
      }
      break;
    case 'decimal':
      valor = eval(valor) + index*scale.value/10
      valor = valor.toString()
      if (valor.split('.')[1]) {
        valor = `${valor.split('.')[0]}.${valor.split('.')[1].toString().substring(0,1)}`
      } else {
        valor = `${valor.split('.')[0]}.0`
      }
      break;
    case 'centesimal':
      valor = (eval(valor) + index*scale.value/100).toFixed(2)
      valor = valor.toString()
      valor = `${valor.split('.')[0]}.${valor.split('.')[1].toString().substring(0,2)}`
      break;
    case 'mixta':
      valor = eval(valor) + index*scale.value/10
      valor = valor.toFixed(2), valor = valor.toString()
      if (valor.split('.')[1]) {
        valor = `${valor.split('.')[0]}.${valor.split('.')[1].toString().substring(0,1)}`
      } else {
        valor = `${valor.split('.')[0]}.0`
      }
      break;
    case 'mixta decimal':
      valor = eval(valor) + index*scale.value/10
      valor = valor.toFixed(2), valor = valor.toString()
      if (valor.split('.')[1]) {
        valor = `${valor.split('.')[0]}.${valor.split('.')[1].toString().substring(0,2)}`
      } else {
        valor = `${valor.split('.')[0]}.00`
      }
      break;
    case 'mixta centesimal':
      valor = (eval(valor) + index*scale.value/100).toFixed(2)
      valor = valor.toString()
      valor = `${valor.split('.')[0]}.${valor.split('.')[1].toString().substring(0,2)}`
      break;
  }
  return valor
}

/* ------------------------ MOSTRAR DATOS  ------------------------- */

function mostrarValorExterno(state, x, y, index, valor) {
  const { typeRect, scale } = state
  y += (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') ? scale.length*2 : scale.length*1.7
  switch (typeRect) {
    case 'enteros':
      numeroEntero(state, x, y, valor, 2)
      break;
    case 'enteros con decimales':
      numeroEnteroDecimal(state, x, y, valor, 2)
      break;
    case 'decimal':
      numeroDecimal(state, x, y, valor, 2)
      break;
    case 'centesimal':
      numeroCentesimal(state, x, y, valor, 1.8)
      break;
    case 'mixta':
      numeroMixto(state, x, y, valor, 2, index)
      break;
    case 'mixta decimal':
      numeroMixtoDecimal(state, x, y, valor, 2, index)
      break;
    case 'mixta centesimal':
      numeroMixtoCentesimal(state, x, y, valor, 1.8, index)
      break;
  }
}

function mostrarValor(state, x, y, index, valor, arrValores) {
  const { typeRect, show, scale } = state
  y += (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') ? scale.length*2 : scale.length*1.7
  let mostrar = false
  if (show.allValues.show === 'todos') {
    mostrar = true
  } else if (show.allValues.show === 'mostrar') {
    if (arrValores.includes(valor)) {
      mostrar = true
    }
  } else if (show.allValues.show === 'ocultar') {
    if (!arrValores.includes(valor)) {
      mostrar = true
    }
  }
  switch (typeRect) {
    case 'enteros':
      mostrar && numeroEntero(state, x, y, valor, 1.5)
      break;
    case 'enteros con decimales':
      mostrar && numeroEnteroDecimal(state, x, y, valor, 1.5)
      break;
    case 'decimal':
      mostrar && numeroDecimal(state, x, y, valor, 1.5)
      break;
    case 'centesimal':
      mostrar && numeroCentesimal(state, x, y, valor, 1.4)
      break;
    case 'mixta':
      mostrar && numeroMixto(state, x, y, valor, 1.5, index)
      break;
    case 'mixta decimal':
      mostrar = false
      let valAux = `${valor.split('.')[0]}.${valor.split('.')[1][0]}`
      if (show.allValues.show === 'todos') {
        numeroMixtoDecimal(state, x, y, valor, 1.5, index)
      } else if (show.allValues.show === 'mostrar') {
        if (arrValores.includes(valAux)) {
          numeroMixtoDecimal(state, x, y, valor, 1.5, index)
        }
      } else if (show.allValues.show === 'ocultar') {
        if (!arrValores.includes(valAux)) {
          numeroMixtoDecimal(state, x, y, valor, 1.5, index)
        }
      }
      break;
    case 'mixta centesimal':
      mostrar && numeroMixtoCentesimal(state, x, y, valor, 1.4, index)
      break;
  }
}

function mostrarPunto(state, dataRecta, x, y, index, valor, arrValores) {
  const { typeRect } = state
  const { segmento } = dataRecta
  //valor = valor.toString()
  if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
    let valorAuxIni = `${valor.split('.')[0]}.${valor.split('.')[1][0]}`
    let valorAuxFin = eval(valor.split('.')[1][0]) === 9 ? `${eval(valor.split('.')[0])+1}.0` : `${valor.split('.')[0]}.${eval(valor.split('.')[1][0])+1}`
    if (arrValores[0] !== '') {
      arrValores.forEach( el => {
        if (eval(el) !== NaN && el.split('.')[1]) {
          valor = eval(valor), valorAuxIni = eval(valorAuxIni), valorAuxFin = eval(valorAuxFin)
          if (eval(el) >= valorAuxIni && eval(el) <= valorAuxFin) {
            if (eval(el) === valorAuxIni) {
              dibujarPunto(state, x, y, true)
            } else {
              let delta = eval(el.split('.')[1][1])*segmento/10
              let centroX = x + delta
              dibujarPunto(state, centroX, y, false)
            }
          }
        }
      })
    }
  } else {
    if (arrValores.includes(valor)) {
      dibujarPunto(state, x, y, true)
    }
  }
}

function mostrarFigura(state, dataRecta, x, y, index, valor, arrValores) {
  const { typeRect } = state
  const { segmento } = dataRecta
  if (typeRect === 'decimal' || typeRect === 'mixta decimal') {
    let valorAuxIni = `${valor.split('.')[0]}.${valor.split('.')[1][0]}`
    let valorAuxFin = eval(valor.split('.')[1][0]) === 9 ? `${eval(valor.split('.')[0])+1}.0` : `${valor.split('.')[0]}.${eval(valor.split('.')[1][0])+1}`
    if (arrValores[0] !== '') {
      arrValores.forEach( el => {
        if (eval(el) !== NaN && el.split('.')[1]) {
          valor = eval(valor), valorAuxIni = eval(valorAuxIni), valorAuxFin = eval(valorAuxFin)
          if (eval(el) >= valorAuxIni && eval(el) <= valorAuxFin) {
            if (eval(el) === valorAuxIni) {
              dibujarRombo(state, x, y, valor, true)
            } else {
              let delta = eval(el.split('.')[1][1])*segmento/10
              let centroX = x + delta
              dibujarRombo(state, centroX, y, valor, false)
            }
          }
        }
      })
    }
  } else {
    if (arrValores.includes(valor)) {
      dibujarRombo(state, x, y, valor, true)
    }
  }
}

function mostrarArco(state, dataRecta, xPos, centroY, i, valor, desde, hasta, constante) {
  const { ctx, typeRect, chart, scale } = state
  const { segmento } = dataRecta
  let maximoValorEscala = eval(chart.values.initValue) + scale.divisions*scale.value
  let arcoRadio = segmento/2
  let valorDesde = desde[0]
  let valorHasta = hasta[0]
  if (valorDesde !== '' & valorHasta !== '') {
    valorDesde = eval(valorDesde)
    valorHasta = eval(valorHasta) < maximoValorEscala ? eval(valorHasta) : maximoValorEscala
    if (typeRect === 'enteros') {
      valorDesde = valorDesde.toString().split('.') ? eval(valorDesde.toString().split('.')[0]) : valorDesde
      valorHasta = valorHasta.toString().split('.') ? eval(valorHasta.toString().split('.')[0]) : valorHasta
    } else if (typeRect === 'mixta decimal') {
      if (valorDesde.toString().split('.')[1] && valorHasta.toString().split('.')[1]) {
        maximoValorEscala = eval(chart.values.initValue) + scale.divisions*scale.value/10
        valorHasta = eval(valorHasta) < maximoValorEscala ? eval(valorHasta) : maximoValorEscala
        valorDesde = valorDesde.toString().split('.')[0] ? eval(`${(valorDesde.toString().split('.')[0])}.${(valorDesde.toString().split('.')[1][0])}`) : valorDesde
        valorHasta = valorHasta.toString().split('.')[0] ? eval(`${(valorHasta.toString().split('.')[0])}.${(valorHasta.toString().split('.')[1][0])}`) : valorHasta
      }
    }
    valor = eval(valor)
    if (valor >= valorDesde && valor < valorHasta) {
      
      dibujarArco(state, xPos + arcoRadio, centroY, arcoRadio)
      if(constante) {
        ctx.fillStyle = '#A84C4E';
        ctx.textAlign = "center"; 
        ctx.font = '15px Helvetica';
        ctx.fillText(`+${scale.value}`, xPos + arcoRadio, centroY-arcoRadio-10);
      }
    }
  }
}

/* ------------------------ DIBUJOS ------------------------- */

function dibujarPunto(state, x, y, grande) {
  const { ctx, scale, chart, font } = state
  ctx.save()
  let arcoRadio = grande ? scale.length/2 : scale.length/3
  ctx.fillStyle = font.color
  ctx.lineWidth = grande ? scale.width*0.6 : scale.width*0.5
  ctx.strokeStyle = chart.axis.color
  ctx.beginPath()
  ctx.arc(x, y, arcoRadio,0,360*Math.PI/180)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
}
function dibujarRombo(state, x, y, valor, grande) {
  const { ctx, typeRect, scale, font } = state
  const { figures, allValues } = state.show
  const xPos = x, centroY = y
  ctx.save()
  let diamondSize = grande ? font.size*1.4 : font.size*1.2
  let diamondW = diamondSize
  let diamondH = diamondW*1.3
  let yDist = scale.length*1.5
  if (figures.show !== 'abajo') {
    yDist -= (scale.length*1.5*2 + diamondH)
  } else {
    let incluVal = allValues.show === 'mostrar' && allValues.values.includes((valor).toString())
    let noIncluVal = allValues.show === 'ocultar' && !allValues.values.includes((valor).toString())
    if (allValues.show === 'todos' || incluVal || noIncluVal ) {
      yDist += (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') ?  font.size*2.3 : font.size*2
    }
  }
  ctx.strokeStyle = scale.color
  ctx.fillStyle = font.color
  ctx.fillStyle = '#dbac04'
  ctx.strokeStyle = '#dbac04'
  ctx.beginPath()
  ctx.moveTo(xPos, centroY + yDist)
  ctx.lineTo(xPos + diamondW/2, centroY + diamondH/2 + yDist)
  ctx.lineTo(xPos, centroY + diamondH + yDist)
  ctx.lineTo(xPos - diamondW/2, centroY + diamondH/2 + yDist)
  ctx.lineTo(xPos, centroY + yDist)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
}
function dibujarArco(state, x, y, arcoRadio, mini = false) {
  const { ctx, font, show } = state
  let direccion = show.arcs.show === 'derecha' ? true : false
  if (mini) {
    direccion = show.miniScale.arcs.show === 'derecha' ? true : false
  } 
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = font.color
  ctx.lineWidth = 2
  let iniAngulo = 220*Math.PI/180
  let finAngulo = 320*Math.PI/180
  ctx.arc(x, y, arcoRadio, iniAngulo, finAngulo)
  let xDist, ladoDib
  ladoDib = -(arcoRadio)*Math.cos(40*Math.PI/180)
  xDist = -arcoRadio*0.3
  if (direccion) {
    xDist *= -1
    ladoDib *= -1
  }
  ctx.moveTo(x + ladoDib, y - (arcoRadio)*Math.sin(40*Math.PI/180) - arcoRadio*0.3)
  ctx.lineTo(x + ladoDib, y - (arcoRadio)*Math.sin(40*Math.PI/180))
  ctx.lineTo(x + ladoDib - xDist, y - (arcoRadio)*Math.sin(40*Math.PI/180))
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
}

/* ------------------------ NUMEROS ------------------------- */
function numeroEntero(state, x, y, valor, multSize) {
  const { ctx, font } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size + 'px ' + font.family
  ctx.fillText(espacioMiles(valor), x, y)
  ctx.restore()
  ctx.save()
}

function numeroEnteroDecimal(state, x, y, valor, multSize) {
  const { ctx, font } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  let unidad, decimal//, centesimal
  unidad = valor.split('.')[0]
  if (valor.split('.')[1][0]) {
    decimal = valor.split('.')[1][0]
    // if (decimal) {
    //   centesimal = valor.split('.')[0][1]
    // }
  }
  valor = `${unidad}.${decimal}`
  ctx.fillText(valor, x, y)
  ctx.restore()
  ctx.save()
}

function numeroDecimal(state, x, y, valor, multSize) {
  const { ctx, font } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.fillText(valor, x, y)
  ctx.restore()
  ctx.save()
}

function numeroCentesimal(state, x, y, valor, multSize) {
  const { ctx, font } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.fillText(valor, x, y)
  ctx.restore()
  ctx.save()
}

function numeroMixto(state, x, y, valor, multSize, index) {
  const { ctx, font, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  let valorUnidad = Number(valor.split('.')[0])
  let valorDecimal = Number(valor.split('.')[1][0])
  let denominador
  denominador = scale.divisions
  ctx.textBaseline = 'middle'
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.textAlign = 'right'
  let enteroTextLength = ctx.measureText(valorUnidad).width
  let enteroPosX = x - enteroTextLength/4
  let centroY = y + font.size*multSize/2
  if (valorDecimal > denominador) {
    ctx.fillText(valorUnidad + 1, x, centroY)
  } else if (valorDecimal === 0) {
    ctx.textAlign = 'center'
    ctx.fillText(valorUnidad, x, centroY)
    return
  } else if (valorDecimal === denominador) {
    let delta = 1
    ctx.textAlign = 'center'
    ctx.fillText(valorUnidad + delta, x, centroY)
    return
  } else {
    ctx.fillText(valorUnidad, enteroPosX, centroY)
  }

  let numberFontSize = Number(font.size*multSize*0.8)
  ctx.font = numberFontSize + 'px ' + font.family
  let denominadorTextLength
  denominadorTextLength = ctx.measureText(denominador).width
  ctx.strokeStyle = scale.color
  ctx.lineWidth = font.size/8
  ctx.lineCap = 'round'
  let deltaYLine = font.size/16 + 1
  ctx.beginPath()
  ctx.moveTo(enteroPosX + 1, centroY - deltaYLine)
  ctx.lineTo(x + denominadorTextLength + 2, centroY - deltaYLine)
  ctx.stroke()
  ctx.closePath()
  let centroX = x + (denominadorTextLength)/2

  ctx.textAlign = 'center'
  //ctx.textBaseline = 'bottom'
  let deltaYFraccion = numberFontSize/2
  if (valorDecimal > denominador) {
    ctx.fillText(valorDecimal - denominador, centroX, centroY - deltaYFraccion)
  } else {
    ctx.fillText(valorDecimal, centroX, centroY - deltaYFraccion)
  }
  //ctx.textBaseline = 'top'
  ctx.fillText(denominador, centroX, centroY + deltaYFraccion)
  ctx.restore()
  ctx.save()
}

function numeroMixtoDecimal(state, x, y, valor, multSize, index) {
  const { ctx, font, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  let valorUnidad = Number(valor.split('.')[0])
  let valorDecimal = Number(valor.split('.')[1][0])
  let denominador
  denominador = scale.divisions
  ctx.textBaseline = 'middle'
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.textAlign = 'right'
  let enteroTextLength = ctx.measureText(valorUnidad).width
  let enteroPosX = x - enteroTextLength/4
  let centroY = y + font.size*multSize/2
  if (valorDecimal > denominador) {
    ctx.fillText(valorUnidad + 1, x, centroY)
  } else if (valorDecimal === 0) {
    ctx.textAlign = 'center'
    ctx.fillText(valorUnidad, x, centroY)
    return
  } else if (valorDecimal === denominador) {
    let delta = 1
    ctx.textAlign = 'center'
    ctx.fillText(valorUnidad + delta, x, centroY)
    return
  } else {
    ctx.fillText(valorUnidad, enteroPosX, centroY)
  }

  let numberFontSize = Number(font.size*multSize*0.8)
  ctx.font = numberFontSize + 'px ' + font.family
  let denominadorTextLength
  denominadorTextLength = ctx.measureText(denominador).width
  ctx.strokeStyle = scale.color
  ctx.lineWidth = font.size/8
  ctx.lineCap = 'round'
  let deltaYLine = font.size/16 + 1
  ctx.beginPath()
  ctx.moveTo(enteroPosX + 1, centroY - deltaYLine)
  ctx.lineTo(x + denominadorTextLength + 2, centroY - deltaYLine)
  ctx.stroke()
  ctx.closePath()
  let centroX = x + (denominadorTextLength)/2
  let deltaYFraccion = numberFontSize/2
  ctx.textAlign = 'center'
  if (valorDecimal > denominador) {
    ctx.fillText(valorDecimal - denominador, centroX, centroY - deltaYFraccion)
  } else {
    ctx.fillText(valorDecimal, centroX, centroY - deltaYFraccion)
  }
  ctx.fillText(denominador, centroX, centroY + deltaYFraccion)
  ctx.restore()
  ctx.save()
}

function numeroMixtoCentesimal(state, x, y, valor, multSize, index) {
  const { ctx, font, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  let valorUnidad = Number(valor.split('.')[0])
  let valorDecimal = Number(valor.split('.')[1][0])
  let valorCentesimal = Number(valor.split('.')[1][1])
  let numerador = Number(`${valorDecimal}${valorCentesimal}`)
  let denominador
  denominador = scale.divisions*10
  ctx.textBaseline = 'middle'
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.textAlign = 'right'
  let enteroTextLength = ctx.measureText(valorUnidad).width
  let enteroPosX = x - enteroTextLength/4
  let centroY = y + font.size*multSize/2
  if (numerador > denominador) {
    ctx.fillText(valorUnidad + 1, x, centroY)
  } else if (numerador === 0) {
    ctx.textAlign = 'center'
    ctx.fillText(valorUnidad, x, centroY)
    return
  } else if (numerador === denominador) {
    let delta = 1
    ctx.textAlign = 'center'
    ctx.fillText(valorUnidad + delta, x, centroY)
    return
  } else {
    ctx.fillText(valorUnidad, enteroPosX, centroY)
  }

  let numberFontSize = Number(font.size*multSize*0.8)
  ctx.font = numberFontSize + 'px ' + font.family
  let denominadorTextLength
  denominadorTextLength = ctx.measureText(denominador).width
  ctx.strokeStyle = scale.color
  ctx.lineWidth = font.size/8
  ctx.lineCap = 'round'
  let deltaYLine = font.size/16 + 1
  ctx.beginPath()
  ctx.moveTo(enteroPosX + 1, centroY - deltaYLine)
  ctx.lineTo(x + denominadorTextLength + 2, centroY - deltaYLine)
  ctx.stroke()
  ctx.closePath()
  let centroX = x + (denominadorTextLength)/2
  let deltaYFraccion = numberFontSize/2
  ctx.textAlign = 'center'
  if (numerador > denominador) {
    ctx.fillText(numerador - denominador, centroX, centroY - deltaYFraccion)
  } else {
    ctx.fillText(numerador, centroX, centroY - deltaYFraccion)
  }
  ctx.fillText(denominador, centroX, centroY + deltaYFraccion)
  ctx.restore()
  ctx.save()
}

