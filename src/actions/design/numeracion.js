import { replace } from 'actions'
//import { setInterval } from 'timers';

export function rectNumFn(config) {
  const { container, params, variables, versions, vt } = config

  const {
    // General
    rectType, /*height, width, background,*/
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
    showExValues, showAllValues, selectValuesToShow, showPointValue, 
    wichPointValue, showFigValue, wichFigValues,
    showArcs, initArcPt, endArcPt,
    // Mini Escala
    showMiniScale, showMiniTheValue, showMiniExValues, showMiniAllValues,
    showMiniPointValue, showMiniFig, wichMiniFigValues, showMiniArcs,
    initArcPtMini, endArcPtMini, showMiniGuides, showLens, alignLens,
    // Ejes
    axisColor, withArrows, axisWidth,
    // Fuente
    fontColor, fontSize, fontFamily, fontWeight
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

  if (!container) return
  let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
      width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

  container.width = width
  container.height = height

  let c = container
  let vars = vt ? variables : versions
  function valuesValidation(arrValues) {
    let valuesUnit = [], valuesDec = [], valuesCent = []
    let aux = arrValues.split(',')
    aux.map( el => {
      if (el.split('.')) {
        valuesUnit.push(el.split('.')[0])
        if (el.split('.')[1]) {
          el.split('.')[1][0] ? valuesDec.push(el.split('.')[1][0]) : valuesDec.push('')
          el.split('.')[1][1] ? valuesCent.push(el.split('.')[1][1]) : valuesCent.push('')
        } else {
          valuesDec.push('')
          valuesCent.push('')
        }
      } else {
        valuesDec.push('')
        valuesCent.push('')
      }
    })
    return {
      unidadValor: valuesUnit,
      decimalValor: valuesDec,
      centesimalValor: valuesCent
    }
  }

  let state = {}
  state.ctx = c.getContext('2d')
  state.typeRect = rectType
  state.scale = {
    divisions: eval(scaleDivisions) + 1,//eval(rectValuesDec) !== undefined ? eval(scaleDivisions) > eval(rectValuesDec) ? eval(scaleDivisions) + 1 : eval(rectValuesDec) + 2 : eval(scaleDivisions) + 1,
    value: /*state.typeRect !== 'enteros' ? 1 : */ eval(scaleValue) === 0 ? 1 : eval(scaleValue),
    width: c.width < 500 ? eval(scaleWidth)*0.6 : eval(scaleWidth),
    color: scaleColor,
    length: c.width < 500 ? eval(scaleLength)*0.7 : eval(scaleLength)
  }
  state.show = {
    showExValues: showExValues === 'si' ? true : false,
    showAllValues: {
      showAllValues: showAllValues !== 'no' ? showAllValues : false,
      selectValuesToShow: valuesValidation(selectValuesToShow)
    },
    showPointValue: {
      showPointValue: showPointValue !== 'no' ? true : false,
      selectPointsValue: valuesValidation(wichPointValue)
  },
    showFigValue: {
      showFigValue: showFigValue === 'no' ? false : showFigValue,
      selectPointsValue: valuesValidation(wichFigValues)
    },
    showLens: {
      show: showLens === 'si' ? true : false,
      alignLens: alignLens === 'punto' ? true : false
    },
    showArcs: {
      showArcs: showArcs !== 'no' ? showArcs : false,
      showArcsValues : {
        initArcPt: valuesValidation(initArcPt),
        endArcPt: valuesValidation(endArcPt)
      }
    },
    showMiniScale: {
      show: (rectType !== 'enteros' && rectType !== 'mixta') && showMiniScale === 'si' ? true : false,
      showMiniExValues: showMiniExValues === 'si' ? true: false,
      showMiniAllValues: showMiniAllValues === 'si' ? true: false,
      showMiniTheValue: valuesValidation(showMiniTheValue),
      showMiniPointValue: showMiniPointValue === 'si' ? true: false,
      showMiniFigure: {
        showMiniFig: showMiniFig === 'no' ? false : showMiniFig,
        wichMiniFigValues: valuesValidation(wichMiniFigValues)
      },
      showMiniArcs: {
        show: showMiniArcs !== 'no' ? showMiniArcs : false,
        initArcPtMini: valuesValidation(initArcPtMini),
        endArcPtMini: valuesValidation(endArcPtMini)
      },
      showMiniGuides: showMiniGuides === 'si' ? true: false
    }
  }
  state.font = {
    family: fontFamily,
    weight: fontWeight,
    size: c.width < 500 ? eval(fontSize)*0.6 : eval(fontSize),
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
      top: c.height*(canvasPaddingAux.top/1000),
      right: c.width*(canvasPaddingAux.right/1000),
      bottom: c.height*(canvasPaddingAux.bottom/1000),
      left: c.width*(canvasPaddingAux.left/1000)
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
      top: c.height*(containerPaddingAux.top/1000),
      right: c.width*(containerPaddingAux.right/1000),
      bottom: c.height*(containerPaddingAux.bottom/1000),
      left: c.width*(containerPaddingAux.left/1000)
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
      top: c.height*(chartPaddingAux.top/1000),
      right: c.width*(chartPaddingAux.right/1000),
      bottom: c.height*(chartPaddingAux.bottom/1000),
      left: c.width*(chartPaddingAux.left/1000)
    },
    axis: {
      width: c.width < 500 ? eval(axisWidth)*0.6 : eval(axisWidth),
      color: axisColor,
      arrows: withArrows == 'si' ? true : false,
      arrowColor: axisColor
    },
    image: {
      //showLens: showLens === 'si' ? true : false,
      lupa: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Ordenar/lupa.svg',
      pictoImg: 'https://desarrolloadaptatin.blob.core.windows.net/imagenesprogramacion/Eje_1/OA_11/IE_04/rombo.svg'
    },
    values: {
      initValue: valuesValidation(initValue),
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

function ptosPrincipales(state) {
  const { chart, show } = state
  const { x0, y0, x1, y1 } = chart.position
  let xIni = x0
  let xFin = x1
  let centroY = show.showMiniScale ? (y1 - y0)/4 + y0 : (y1 - y0)/2 + y0
  return {
    xIni: xIni,
    xFin: xFin,
    centroY: centroY
  }
}

function ptosPrincipalesMini(state) {
  const { chart } = state
  const { x0, y0, x1, y1 } = chart.position
  let xIni = x0*1.1
  let xFin = x1/1.1
  let dist = ((x1 - x0) - (xFin - xIni))
  xIni += dist
  let centroY = (y1 - y0)*2/3 + y0
  return {
    xIni: xIni,
    xFin: xFin,
    centroY: centroY
  }
}

// Inicializa la graficación de la recta
function init(state, mainData) {
  const { show, typeRect } = state
  insertarTitPrinc(state)
  ejePrincipal(state, mainData)
  if (typeRect !== 'enteros' && typeRect !== 'mixta' && typeRect !== 'enteros con decimales' && show.showMiniScale) {
    ejeSecundario(state, mainData)
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

/* -------------------------------- Begin Eje Genérico -------------------------------- */
function generarEje(state, xIni, xFin, centroY) {
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

function generarEscala(state, xIni, xFin, centroY, divisiones) {
  const { ctx, scale } = state
  ctx.save()
  let segment = (xFin - xIni)/(divisiones+1)
  let bordersScales = scale.length
  ctx.strokeStyle = scale.color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = scale.width
  for (let i = 0; i < divisiones; i++) {
    let xPos = xIni + segment + segment*i
    ctx.beginPath()
    ctx.moveTo(xPos, centroY - bordersScales)
    ctx.lineTo(xPos, centroY + bordersScales)
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()
  ctx.save()
}

function generarEscalaDec(state, xIni, xFin, centroY, divisiones) {
  const { ctx, scale, typeRect } = state
  ctx.save()
  ctx.strokeStyle = scale.color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  let segment = (xFin - xIni)/(divisiones+1)
  for (let i = 0; i < divisiones - 1; i++) {
    ctx.lineWidth = scale.width
    let bordersScales = scale.length
    if (typeRect !== 'enteros' || typeRect !== 'mixta') {
      for (let j = 1; j < 10; j ++) {
        let extraLarge = j === 5 ? bordersScales*0.2 : 0
        let xPos = xIni + segment + segment*i + segment/10*j
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

/*-------------------------------- Begin Eje Principal --------------------------------*/

function ejePrincipal(state, mainData) {
  const { scale, typeRect } = state
  const { xIni, xFin, centroY } = mainData.pointsData
  let divisiones = scale.divisions
  generarEje(state, xIni, xFin, centroY)
  generarEscala(state, xIni, xFin, centroY, divisiones)
  if (typeRect !== 'enteros' && typeRect !== 'enteros con decimales' && typeRect !== 'mixta') {
    generarEscalaDec(state, xIni, xFin, centroY, divisiones)
  }
  selecRecta(state, mainData)
}

/*-------------------------------- End Eje Principal --------------------------------*/

/*
switch (typeRect) {
  case 'enteros':
    rectaEnteros(state, mainData)
    break;
  case 'enteros con decimales':
    
    break;
  case 'decimal':
    
    break;
  case 'centesimal':
    
    break;
  case 'mixta':
    
    break;
  case 'mixta decimal':
    
    break;
  case 'mixta centesimal':
    
    break;
}
*/


function selecRecta(state, mainData) {
  const { typeRect } = state

  switch (typeRect) {
    case 'enteros':
      rectaEnteros(state, mainData)
      break;
    case 'enteros con decimales':
      rectaEnterosConDecimales(state, mainData)
      break;
    case 'decimal':
      
      break;
    case 'centesimal':
      
      break;
    case 'mixta':
      
      break;
    case 'mixta decimal':
      
      break;
    case 'mixta centesimal':
      
      break;
  }
}

function rectaEnteros(state, mainData) {
  const { scale, chart, show } = state
  const { unidadValor, centesimalValor, decimalValor } =  chart.values.initValue
  const { xIni, xFin, centroY } = mainData.pointsData
  let divisiones = scale.divisions - 1
  let segmento = (xFin - xIni)/(divisiones + 2)
  let unidad = Number(unidadValor[0])
  let decimo = Number(decimalValor[0])
  let centesimo = Number(centesimalValor[0])
  let centroYNum = centroY + scale.length*1.2
  for (let i = 0; i <= divisiones; i++) {
    let xPos = xIni + segmento + segmento*i
    if (i === 0 || i === divisiones) {
      show.showExValues && numeroEntero(state, xPos, centroYNum, i, 2, unidad, decimo, centesimo)
    } else {
      mostrarNumero(state, i, unidad, decimo, centesimo)  && numeroEntero(state, xPos, centroYNum, i, 1.5, unidad, decimo, centesimo)
      mostrarPuntos(state, xPos, centroY, i, 1, unidad, decimo, centesimo)
      mostrarFiguras(state, xPos, centroY, i, 1, unidad, decimo, centesimo)
    }
    let centroX = xPos + segmento/2
    show.showArcs.showArcs !== false && mostrarArcos(state, centroX, centroY, i, segmento*0.6, unidad, decimo, centesimo)
    
  }
}

function rectaEnterosConDecimales(state, mainData) {
  const { scale, chart, show } = state
  const { unidadValor, centesimalValor, decimalValor } =  chart.values.initValue
  const { xIni, xFin, centroY } = mainData.pointsData
  let divisiones = scale.divisions - 1
  let segmento = (xFin - xIni)/(divisiones + 2)
  let unidad = Number(unidadValor[0])
  let decimo = Number(decimalValor[0])
  let centesimo = Number(centesimalValor[0])
  let centroYNum = centroY + scale.length*1.2
  for (let i = 0; i <= divisiones; i++) {
    let xPos = xIni + segmento + segmento*i
    if (i === 0 || i === divisiones) {
      show.showExValues && numeroEnteroConDecimal(state, xPos, centroYNum, i, 2, unidad, decimo, centesimo)
    } else {
      console.log(mostrarNumero(state, i, unidad, decimo, centesimo))
      mostrarNumero(state, i, unidad, decimo, centesimo) && numeroEnteroConDecimal(state, xPos, centroYNum, i, 1.5, unidad, decimo, centesimo)
      mostrarPuntos(state, xPos, centroY, i, 1, unidad, decimo, centesimo)
      mostrarFiguras(state, xPos, centroY, i, 1, unidad, decimo, centesimo)
    }
    let centroX = xPos + segmento/2
    show.showArcs.showArcs !== false && mostrarArcos(state, centroX, centroY, i, segmento*0.6, unidad, decimo, centesimo)
  }
  console.log(show.showAllValues.selectValuesToShow)
}

function mostrarNumero(state, posicion, unidad, decimo, centesimo) {
  const { typeRect } = state
  const { showAllValues, selectValuesToShow } = state.show.showAllValues
  const { unidadValor, decimalValor, centesimalValor } = selectValuesToShow
  switch (typeRect) {
    case 'enteros':
    return verificarValorUnidad(showAllValues, posicion, unidad, unidadValor)
    case 'enteros con decimales':
      return verificarValorUnidadDecimo(showAllValues, posicion, unidad, unidadValor, decimo, decimalValor)
    case 'decimal':
      
      break;
    case 'centesimal':
      
      break;
    case 'mixta':
      
      break;
    case 'mixta decimal':
      
      break;
    case 'mixta centesimal':
      
      break;
  }

}

function verificarValorUnidad(mostrarValores, posicion, unidad, unidadValor) {
  let valor = (posicion + unidad).toString()
  switch (mostrarValores) {
    case 'todos':
      return true
    case 'mostrar':
      if (unidadValor.includes(valor)) {
        return true
      }
      break;
    case 'ocultar':
      if (!unidadValor.includes(valor)) {
        return true
      }
      break;
    default:
      break;
  }
}

function verificarValorUnidadDecimo(mostrarValores, posicion, unidad, unidadValor, decimo, decimalValor) {
  let valorU = (posicion + unidad).toString()
  let valorD = (decimo).toString()
  switch (mostrarValores) {
    case 'todos':
      return true
    case 'mostrar':
      if (unidadValor.includes(valorU) && decimalValor.includes(valorD)) {
        return true
      } else {return false}
      break;
    case 'ocultar':
      if (!(unidadValor.includes(valorU) && decimalValor.includes(valorD))) {
        return true
      }
      break;
    default:
      break;
  }
}

/*--------------------------------BeginEjeSecundario--------------------------------*/

function ejeSecundario(state, mainData) {
  console.log('ejeSecundario()')
  const { scale, typeRect } = state
  const { xIni, xFin, centroY } = mainData.pointsDataMini
  let divisiones = scale.divisions
  generarEje(state, xIni, xFin, centroY)
  generarEscala(state, xIni, xFin, centroY, divisiones)
}

/*--------------------------------EndEjeSecundario--------------------------------*/

function mostrarPuntos(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, typeRect, font, scale, show, chart } = state
  const { showPointValue } = show.showPointValue
  const { unidadValor, decimalValor, centesimalValor} = show.showPointValue.selectPointsValue
  ctx.save()
  ctx.fillStyle = font.color
  ctx.lineWidth = scale.width*0.6
  ctx.strokeStyle = chart.axis.color
  ctx.beginPath()
  switch (typeRect) {
    case 'enteros':
      if (showPointValue && unidadValor.includes((unidad + posicion).toString())) {
        ctx.arc(xPos, centroY, scale.length/2*multSize,0,360*Math.PI/180)
      }
      break;
    case 'enteros con decimales':
      
      break;
    case 'decimal':
      
      break;
    case 'centesimal':
      
      break;
    case 'mixta':
      
      break;
    case 'mixta decimal':
      
      break;
    case 'mixta centesimal':
      
      break;
  }
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
}

function mostrarFiguras(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, typeRect, font, scale, show } = state
  const { showFigValue } = show.showFigValue
  const { unidadValor, decimalValor, centesimalValor} = show.showFigValue.selectPointsValue
  const { selectValuesToShow, showAllValues } = show.showAllValues
  ctx.save()
  let diamondW = scale.length*1.5
  let diamondH = diamondW*1.3

  switch (typeRect) {
    case 'enteros':
      enteros()
      break;
    case 'enteros con decimales':
      
      break;
    case 'decimal':
      
      break;
    case 'centesimal':
      
      break;
    case 'mixta':
      
      break;
    case 'mixta decimal':
      
      break;
    case 'mixta centesimal':
      
      break;
  }
  ctx.restore()
  ctx.save()
  function drawDiamond(ctx, xPos, centroY, diamondW, diamondH, yDist) {
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
  }
  function enteros() {
    let yDist// = showFigValue === 'abajo' ? scale.length*1.5 : - (scale.length*1.5 + diamondH)
    if (showFigValue !== 'abajo') {
      yDist = - (scale.length*1.5 + diamondH)
    } else {
      yDist = scale.length*1.5
      let incluVal = showAllValues === 'mostrar' && selectValuesToShow.unidadValor.includes((unidad + posicion).toString())
      let noIncluVal = showAllValues === 'ocultar' && !selectValuesToShow.unidadValor.includes((unidad + posicion).toString())
      if (showAllValues === 'todos' || incluVal || noIncluVal ) {
        yDist += font.size*1.5
      }
    }
    if (showFigValue && unidadValor.includes((unidad + posicion).toString())) {
      drawDiamond(ctx, xPos, centroY, diamondW, diamondH, yDist)
    }    
  }
}

function mostrarArcos(state, centroX, centroY, posicion, segmento, unidad, decimo, centesimo) {
  const { ctx, typeRect, font, scale, show, chart } = state
  const { unidadValor, centesimalValor, decimalValor } =  chart.values.initValue
  const { showArcsValues } = show.showArcs
  const { initArcPt, endArcPt } = showArcsValues
  let direccion, numInic, numFin, divisiones, minEscVal, maxEscVal
  direccion = show.showArcs.showArcs === 'derecha' ? true : false
  divisiones = Number(scale.divisions) - 1
  switch (typeRect) {
    case 'enteros':
      minEscVal = Number(unidadValor[0])
      maxEscVal = Number(unidadValor[0]) + divisiones
      numInic = Number(initArcPt.unidadValor[0]) - minEscVal
      numFin = divisiones < Number(endArcPt.unidadValor[0]) - minEscVal ? divisiones : Number(endArcPt.unidadValor[0]) - minEscVal
      break;
  
    default:
      break;
  }
  if (numInic !== numFin && numInic <= posicion && (posicion) < numFin) { //numInic <= posicion <= numFin
    dibujarArco(state, centroX, centroY, segmento, direccion)
  }

  function dibujarArco(state, centroX, centroY, arcoRadio, direccion) {
    const { ctx, font, scale } = state
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = font.color
    ctx.lineWidth = 2
    let iniAngulo = 220*Math.PI/180
    let finAngulo = 320*Math.PI/180
    ctx.arc(centroX, centroY, arcoRadio, iniAngulo, finAngulo)
    let xDist, ladoDib
    ladoDib = -(arcoRadio)*Math.cos(40*Math.PI/180)
    xDist = -arcoRadio*0.3
    if (direccion) {
      xDist *= -1
      ladoDib *= -1
    }
    ctx.moveTo(centroX + ladoDib, centroY - (arcoRadio)*Math.sin(40*Math.PI/180) - arcoRadio*0.3)
    ctx.lineTo(centroX + ladoDib, centroY - (arcoRadio)*Math.sin(40*Math.PI/180))
    ctx.lineTo(centroX + ladoDib - xDist, centroY - (arcoRadio)*Math.sin(40*Math.PI/180))
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.save()
  }
}

/* --------------------------- Begin Tipo de Número ------------------------------- */
function numeroEntero(state, centroX, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  let showValue = unidad + posicion*scale.value
  ctx.fillText(showValue, centroX, centroY)
  ctx.restore()
  ctx.save()
}

function numeroEnteroConDecimal(state, centroX, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, typeRect, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  let showValue = `${unidad+posicion},${decimo}`
  ctx.fillText(showValue, centroX, centroY)
  ctx.restore()
  ctx.save()
}

function numeroDecimal(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, typeRect, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  let valorUnidad = unidad
  let valorDecimal = decimo + posicion
  if (valorDecimal >= 10) {
    valorUnidad++
    valorDecimal-=10
  }
  let showValue = `${valorUnidad},${valorDecimal}`
  ctx.fillText(showValue, xPos, centroY)
  ctx.restore()
  ctx.save()
}

function numeroCentesimal(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, typeRect, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  let valorUnidad = unidad
  let valorDecimal = decimo + posicion
  if (valorDecimal >= 10) {
    valorUnidad++
    valorDecimal-=10
  }
  ctx.font = font.size*multSize + 'px ' + font.family
  let showValue = `${valorUnidad},${valorDecimal}0`
  ctx.fillText(showValue, xPos, centroY)
  ctx.restore()
  ctx.save()
}

function numeroCentesimalSeleccionado(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, typeRect, scale } = state
  ctx.save()
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  let valorUnidad = unidad
  let valorDecimal = decimo
  let valorCentecimal = centesimo + posicion
  if (valorCentecimal >= 10) {
    valorDecimal++
    valorCentecimal-=10
  }
  if (valorDecimal >= 10) {
    valorUnidad++
    valorDecimal-=10
  }
  ctx.font = font.size*multSize + 'px ' + font.family
  let showValue = `${valorUnidad},${valorDecimal}${valorCentecimal}`
  ctx.fillText(showValue, xPos, centroY)
  ctx.restore()
  ctx.save()
}

function numeroMixto(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, scale } = state
  ctx.save()

  let valorUnidad = unidad
  let valorDecimal = decimo + posicion
  let valorCentecimal = centesimo

  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textBaseline = 'top'
  let numberFontSize = Number(font.size*multSize*0.7)
  ctx.font = numberFontSize + 'px ' + font.family
  let textLength = ctx.measureText('00').width
  xPos -= textLength/2
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.textAlign = 'right'


  if (valorCentecimal >= 10) {
    valorDecimal++
    valorCentecimal-=10
  }
  if (valorDecimal >= 10) {
    valorUnidad++
    if (valorDecimal === 10) {
      return(
        ctx.fillText(valorUnidad, xPos + textLength*0.8, centroY)
      )
    }
    valorDecimal-=10
  }

  ctx.fillText(valorUnidad, xPos, centroY)
  ctx.strokeStyle = scale.color
  ctx.lineWidth = scale.width/2
  ctx.lineCap="round";
  ctx.translate(xPos, centroY + numberFontSize)
  ctx.moveTo(0, 0)
  ctx.lineTo(textLength, 0)
  ctx.stroke()
  ctx.font = numberFontSize + 'px ' + font.family
  // let deltaLine
  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  ctx.fillText(valorDecimal, textLength/4, 5)
  ctx.textBaseline = 'top'
  let denominador = scale.divisions - 1
  ctx.fillText(denominador, 0, 0)

  ctx.restore()
  ctx.save()
}

function numeroMixtoCent(state, xPos, centroY, posicion, multSize, unidad, decimo, centesimo) {
  const { ctx, font, scale } = state
  ctx.save()

  let valorUnidad = unidad
  let valorDecimal = decimo
  let valorCentecimal = centesimo + posicion

  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textBaseline = 'middle'
  let numberFontSize = Number(font.size*multSize*0.65)
  ctx.font = numberFontSize + 'px ' + font.family
  let textLength = ctx.measureText('000').width
  xPos -= textLength/6
  ctx.font = font.size*multSize + 'px ' + font.family
  ctx.textAlign = 'right'


  if (valorCentecimal >= 10) {
    valorDecimal++
    valorCentecimal-=10
  }
  if (valorDecimal >= 10) {
    valorUnidad++
    if (valorDecimal === 10) {
      return(
        ctx.fillText(valorUnidad, xPos + textLength*0.8, centroY)
      )
    }
    valorDecimal-=10
  }
  let elCentro = centroY + numberFontSize + numberFontSize/6
  ctx.fillText(valorUnidad, xPos, elCentro)
  ctx.textBaseline = 'top'
  ctx.strokeStyle = scale.color
  let denominadorLineaAncho = scale.width/2
  ctx.lineWidth = denominadorLineaAncho
  ctx.lineCap="round";
  ctx.translate(xPos, centroY + numberFontSize)
  ctx.moveTo(2, 0)
  ctx.lineTo(textLength, 0)
  ctx.stroke()
  ctx.font = numberFontSize + 'px ' + font.family
  // let deltaLine
  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  let mostrarValor = `${valorDecimal}${valorCentecimal}`
  ctx.fillText(mostrarValor, textLength/6, -denominadorLineaAncho)
  ctx.textBaseline = 'top'
  //ctx.font = numberFontSize*0.9 + 'px ' + font.family
  let denominador = scale.divisions - 1
  ctx.fillText(denominador*10, 4, denominadorLineaAncho*2)

  ctx.restore()
  ctx.save()
}
/* ------------------------------- End Tipo de Número ----------------------------------- */
