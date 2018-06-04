import { replace } from 'actions'
//import { setInterval } from 'timers';

export function rectNumFn(config) {
  const { container, params, variables, versions, vt } = config

  const { 
    rectType, rectOrientation, /*background, borderWidth, borderColor, borderStyle, borderRadius,*/ titleValue,
    titleColor, titleSize, titleWeight, canvasPadding, containerPadding, chartPadding, /*innerChartPadding,*/ rectValuesUnit,
    rectValuesDec, rectValuesCent, valuesSeparator, axisColor, withArrows, axisWidth, fontColor, fontSize, fontFamily, fontWeight, 
    pictoImg, lupaImg, scaleDivisions, scaleValue, scaleWidth, scaleColor, scaleLength, showExValues,
    showAllValues, showTheValue, showPointValue, showFigValue, showLens, showArcs, showMiniScale, alignLens,
    showMiniArcs, showMiniExValues, showMiniAllValues, showMiniTheValue, showMiniPointValue, showMiniGuides,
    initArcPt, endArcPt, selectValuesToShow, wichPointValue, rectValues, wichFigValues, showMiniFig, wichMiniFigValues,
    initArcPtMini, endArcPtMini
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
  let valuesUnit = replace(rectValuesUnit, vars, vt)
  let valuesDec = replace(rectValuesDec, vars, vt)
  let valuesCent= replace(rectValuesCent, vars, vt)
  //let rectValuesDec = rectValues.split(',')
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
      valuesUnit: valuesUnit,
      valuesDec: valuesDec,
      valuesCent: valuesCent
    }
  }

  let rectValuesAll = valuesValidation(rectValues)
  let pointsValuesAll = valuesValidation(wichPointValue)
  let figValuesAll = valuesValidation(wichFigValues)
  let arcsValuesFrom = valuesValidation(initArcPt)
  let arcsValuesTo = valuesValidation(endArcPt)

  let state = {}
  state.ctx = c.getContext('2d')
  state.typeRect = rectType
  state.scale = {
    divisions: eval(scaleDivisions) + 1,//eval(rectValuesDec) !== undefined ? eval(scaleDivisions) > eval(rectValuesDec) ? eval(scaleDivisions) + 1 : eval(rectValuesDec) + 2 : eval(scaleDivisions) + 1,
    value: eval(scaleValue) === 0 ? 1 : eval(scaleValue),
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
    showTheValue: showTheValue === 'si' ? true : false,
    showPointValue: {
      showPointValue: showPointValue !== 'no' ? true : false,
      unitValue: pointsValuesAll.valuesUnit,
      decValue: pointsValuesAll.valuesDec,
      centValue: pointsValuesAll.valuesCent
  },
    showFigValue: {
      showFigValue: showFigValue === 'no' ? false : showFigValue,
      unitValue: figValuesAll.valuesUnit,
      decValue: figValuesAll.valuesDec,
      centValue: figValuesAll.valuesCent
    }, // === 'si' ? true : false,
    showLens: showLens === 'si' ? true : false,
    alignLens: alignLens === 'punto' ? true : false,
    showArcs: {
      showArcs: showArcs !== 'no' ? showArcs : false,
      //arcsDirection: arcsDirection !== 'no' ? arcsDirection : false,
      showArcsValues : {
        initArcPt: arcsValuesFrom,
        endArcPt: arcsValuesTo
      }
    },
    showMiniScale: (rectType !== 'enteros' && rectType !== 'mixta') && showMiniScale === 'si' ? true : false,
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
    orientation: rectOrientation,
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
      lupa: lupaImg,
      pictoImg: pictoImg
    },
    values: {
      rectValues: rectValues.split(','),
      rectValuesUnit: rectValuesAll.valuesUnit,
      rectValuesDec: rectValuesAll.valuesDec,
      rectValuesCent: rectValuesAll.valuesCent,
      valuesUnit: valuesUnit.split(','),
      valuesDec: eval(valuesDec) >= state.scale.divisions ? state.scale.divisions : eval(valuesDec),
      valuesCent: eval(valuesCent),
      valuesSeparator: valuesSeparator == 'coma' ? ',' : '.'
    }
  }
  state.chart.position = {
    x0: state.container.position.x0 + state.chart.padding.left,
    y0: state.container.position.y0 + state.chart.padding.top,
    x1: state.container.position.x1 - state.chart.padding.right,
    y1: state.container.position.y1 - state.chart.padding.bottom
  }

  /*
  let adaptHeight = 2
  if (state.typeRect !== 'enteros con decimales' && state.typeRect !== 'mixta') {
    if (state.show.showMiniScale) {
      adaptHeight = 4
    }
  }
  */
  let mainData = {
    pointsData: ptosPrincipales(state),
    pointsDataMini: ptosPrincipalesMini(state),
    //centerChartY: state.chart.position.y0 + (state.chart.position.y1 - state.chart.position.y0 + state.chart.axis.width)/adaptHeight,
    values: state.chart.values.valuesUnit,
    initValue: Math.min(...state.chart.values.valuesUnit).toString().split('.')[0]
  }

  
  drawRects(state, state.canvas, 'red')
  drawRects(state, state.container, 'blue')
  drawRects(state, state.chart, 'green')
  init(state, mainData)

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

// Dibuja los espacios definidos, container, chart
function drawRects(state, el, color) {
  const { ctx } = state
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.rect(el.position.x0, el.position.y0, el.position.x1 - el.position.x0, el.position.y1 - el.position.y0)
  ctx.stroke()
  ctx.restore()
  ctx.save()
}

// Inicializa la graficación de la recta
function init(state, mainData) {
  const { show, typeRect } = state
  state.titles.mainTitle.title !== '' && insertarTitPrinc(state)
  insertarEjePrincipal(state, mainData)
  if (typeRect !== 'enteros' && typeRect !== 'mixta' && typeRect !== 'enteros con decimales' && show.showMiniScale) {
    insertarEjeMini(state, mainData)
  }
}

// Main Title
function insertarTitPrinc(state) {
  const { ctx, canvas } = state
  const { mainTitle } = state.titles
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

function insertarEjePrincipal(state, mainData) {
  const { ctx, typeRect, scale, chart, show } = state
  const { pointsData } = mainData
  ctx.save()
  let xIni = pointsData.xIni
  let xFin = pointsData.xFin
  let centroY = pointsData.centroY
  chart.axis.width > 0 && generarEje(state, xIni, xFin, centroY)
  scale.width > 0 && scale.length > 0 && generarEscala(state, xIni, xFin, centroY, scale.divisions)
  if (typeRect !== 'enteros' && typeRect !== 'mixta' && scale.width > 0 && scale.length > 0) {
    generarEscalaDec(state, xIni, xFin, centroY, scale.divisions)
  }
  chart.values.rectValues !== '' && show.showExValues && mostrarValoresExternos(state, xIni, xFin, centroY, scale.divisions, scale.value)
  chart.values.rectValues !== '' && mostrarValores(state, xIni, xFin, centroY, scale.divisions, scale.value)
  chart.values.rectValues !== '' && show.showPointValue.showPointValue && mostrarPuntos(state, xIni, xFin, centroY, scale.divisions)
  chart.values.rectValues !== '' && show.showFigValue.showFigValue && mostrarFigura(state, xIni, xFin, centroY, scale.divisions)
  show.showArcs.showArcs && mostrarArcos(state, xIni, xFin, centroY, scale.divisions, scale.value)
  ctx.restore()
  ctx.save()
}

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

/* -------------------------------- Mostrar Eje -------------------------------- */

function mostrarValoresExternos(state, xIni, xFin, centroY, divisiones, valorEscala) {
  const { ctx, typeRect, font, scale, chart } = state
  ctx.save()
  centroY += scale.length*1.3
  let segment = (xFin - xIni)/(divisiones+1)
  let arr = [0, eval(divisiones)-1]
  arr.map((val) => {
    let theValue, xPos
    if (typeRect === 'enteros') {
      theValue = eval(Math.min(...chart.values.rectValuesUnit)) + val*eval(valorEscala)
      xPos = xIni + segment + segment*val
      mostrarNumero(state, xPos, centroY, 1.5, theValue, theValue, theValue)
    } else if (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
      theValue = eval(Math.min(...chart.values.rectValuesUnit)) + val*eval(valorEscala)
      xPos = xIni + segment + segment*val
      ctx.fillText(theValue, xPos, centroY)
    }
  })
  ctx.restore()
  ctx.save()
}

function mostrarValores(state, xIni, xFin, centroY, divisiones, valorEscala) {
  const { ctx, typeRect, font, scale, chart, show } = state
  ctx.save()
  centroY += scale.length*1.3
  let segment = (xFin - xIni)/(divisiones+1)
  let arrValEnteros = show.showAllValues.selectValuesToShow.valuesUnit
  for (let i = 1; i < divisiones-1; i++) {
    let xPos = xIni + segment + segment*i
    let theValue
    if (typeRect === 'enteros') {
      theValue = eval(Math.min(...chart.values.rectValuesUnit)) + i*eval(valorEscala)
      switch (show.showAllValues.showAllValues) {
        case 'mostrar':
          arrValEnteros.includes(theValue.toString()) && mostrarNumero(state, xPos, centroY, 1, theValue, theValue, theValue)
          break;
        case 'ocultar':
          !arrValEnteros.includes(theValue.toString()) && mostrarNumero(state, xPos, centroY, 1, theValue, theValue, theValue)
          break;
        case 'todos':
          mostrarNumero(state, xPos, centroY, 1, theValue, theValue, theValue)
          break;
      }
    } else if (typeRect === 'mixta') {
      theValue = eval(Math.min(...chart.values.rectValuesUnit)) + i*eval(valorEscala)
      switch (show.showAllValues.showAllValues) {
        case 'mostrar':
          arrValEnteros.includes(theValue.toString()) && ctx.fillText(theValue, xPos, centroY)
          break;
        case 'ocultar':
          !arrValEnteros.includes(theValue.toString()) && ctx.fillText(theValue, xPos, centroY)
          break;
        case 'todos':
          ctx.fillText(theValue, xPos, centroY)
          break;
      }
    }

  }
  ctx.restore()
  ctx.save()
}

function mostrarPuntos(state, xIni, xFin, centroY, divisiones) {
  const { ctx, scale, show, typeRect, font, chart } = state
  const { unitValue, decValue, centValue } = show.showPointValue
  ctx.save()  
  let segment = (xFin - xIni)/(divisiones+1)
  let miniSegment = segment/10
  //let theValue
  let minVal = Math.min(...chart.values.rectValuesUnit)
  if (typeRect === 'enteros') {
    unitValue.forEach( (unit) => {
      unit = eval(unit)
      let xPos = xIni + segment + segment*((unit - minVal)/scale.value)
      drawPoint(ctx, xPos, centroY)
    })
  } else if (typeRect !== 'enteros' && typeRect !== 'mixta') {
    decValue.forEach( (dec,index) => {
      if (dec !== '') {
        if (centValue[index] !== '') {
          let xPos = xIni + segment + segment*dec + miniSegment*centValue[index]
          drawPoint(ctx, xPos, centroY)
        }
      }
    })
  } else {
    decValue.forEach( dec => {
      if (dec !== '') {
        let xPos = xIni + segment + segment*dec
        drawPoint(ctx, xPos, centroY)
      }
    })
  }
  ctx.restore()
  ctx.save()
  function drawPoint(ctx, xPos, centroY) {
    ctx.strokeStyle = scale.color
    ctx.fillStyle = font.color
    ctx.lineWidth = (typeRect !== 'enteros' && typeRect !== 'mixta') ? scale.width/2 : scale.width
    let theRadius = (typeRect !== 'enteros' && typeRect !== 'mixta') ? scale.length/3 : scale.length/2
    ctx.beginPath()
    ctx.arc(xPos, centroY, theRadius, 0,360*Math.PI/180)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
}

function mostrarFigura(state, xIni, xFin, centroY, divisiones) {
  const { ctx, scale, show, typeRect, font, chart } = state
  const { unitValue, decValue, centValue } = show.showFigValue
  ctx.save()  
  let segment = (xFin - xIni)/(divisiones+1)
  let miniSegment = segment/10
  let diamondW = scale.length*1.5
  let diamondH = diamondW*1.3
  let yDist = show.showFigValue.showFigValue === 'abajo' ? scale.length*1.5 : - (scale.length*1.5 + diamondH)
  let minVal = Math.min(...chart.values.rectValuesUnit)
  if (typeRect === 'enteros') {
    unitValue.map( (unit) => {
      unit = eval(unit)
      if (((unit - minVal) % scale.value) === 0) {
        let xPos = xIni + segment + segment*((unit - minVal)/scale.value)
        drawDiamond(ctx, xPos, centroY, diamondW, diamondH, yDist)
      }
    })
  } else if (typeRect !== 'enteros' && typeRect !== 'mixta') {
    decValue.forEach( (dec,index) => {
      if (dec !== '') {
        if (centValue[index] !== '') {
          let xPos = xIni + segment + segment*dec + miniSegment*centValue[index]
          drawDiamond(ctx, xPos, centroY, diamondW, diamondH, yDist)
        }
      }
    })
  } else {
    decValue.forEach( dec => {
      if (dec !== '') {
        let xPos = xIni + segment + segment*dec
        drawDiamond(ctx, xPos, centroY, diamondW, diamondH, yDist)
      }
    })
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
}

function mostrarArcos(state, xIni, xFin, centroY, divisiones, valorEscala) {
  const { ctx, typeRect, scale, font, show, chart } = state
  ctx.save()
  let initPoint, endPoint
  let arcsDirection = show.showArcs.showArcs === 'derecha' ? true : false
  let segment = (xFin - xIni)/(divisiones+1)
  let minVal = Math.min(...chart.values.rectValuesUnit)
  valorEscala = eval(valorEscala)
  if (typeRect === 'enteros') {
    let initVal = show.showArcs.showArcsValues.initArcPt.valuesUnit;
    let endVal = show.showArcs.showArcsValues.endArcPt.valuesUnit;
    initPoint = ((initVal - minVal)/valorEscala);
    endPoint = ((endVal - minVal)/valorEscala);
    (((initVal - minVal) % valorEscala) === 0) && (((endVal - minVal) % valorEscala) === 0) && dibujarArcos()
  } else {
    //valuesDec
    //valuesCent
  }
  function dibujarArcos() {
    for (let i = initPoint; i < endPoint; i ++) {
      let xPos = xIni + segment*i
      let yPos = centroY
      ctx.strokeStyle = font.color
      ctx.lineWidth = Math.round(scale.width/2)
      ctx.beginPath()
      ctx.arc(xPos + segment + segment/2,yPos - scale.length/2,segment/2,220*Math.PI/180,320*Math.PI/180)
      let arrowDirection = arcsDirection ? -segment*0.15 : segment*0.15
      let arrowInitPt = arcsDirection ? (segment/2)*Math.cos(40*Math.PI/180) : -(segment/2)*Math.cos(40*Math.PI/180)
      ctx.moveTo(xPos + segment + segment/2 + arrowInitPt, (yPos - scale.length/2) - (segment/2)*Math.sin(40*Math.PI/180) - segment*0.15)
      ctx.lineTo(xPos + segment + segment/2 + arrowInitPt, (yPos - scale.length/2) - (segment/2)*Math.sin(40*Math.PI/180))
      ctx.lineTo(xPos + segment + segment/2 + arrowInitPt + arrowDirection, (yPos - scale.length/2) - (segment/2)*Math.sin(40*Math.PI/180))
      ctx.stroke()
      ctx.closePath()
    }
  }
}

/* -------------------------------- Mini Eje -------------------------------- */

function insertarEjeMini(state, mainData) {
  const { ctx, show } = state
  const { pointsDataMini } = mainData
  ctx.save()
  let xIni = pointsDataMini.xIni
  let xFin = pointsDataMini.xFin
  let centroY = pointsDataMini.centroY
  generarEje(state, xIni, xFin, centroY)
  generarEscala(state, xIni, xFin, centroY, 11)
  show.showMiniPointValue && mostrarPuntosMini(state, xIni, xFin, centroY, 11)
  show.showMiniFigure.showMiniFig && mostrarFigMini(state, xIni, xFin, centroY, 11)
  show.showMiniArcs.show && mostrarArcos(state, xIni, xFin, centroY, 11, show.showMiniArcs.initArcPtMini.valuesCent, show.showMiniArcs.endArcPtMini.valuesCent, show.showMiniArcs.show)
  ctx.restore()
  ctx.save()
}

function mostrarPuntosMini(state, xIni, xFin, centroY, divisiones) {
  const { ctx, scale, show, font } = state
  const { valuesCent } = show.showMiniTheValue
  ctx.save()  
  ctx.strokeStyle = scale.color
  ctx.fillStyle = font.color
  ctx.lineWidth = scale.width
  let theRadius = scale.length/2
  let segment = (xFin - xIni)/(divisiones+1)
  valuesCent.forEach( (cent) => {
    if (cent !== '') {
      let xPos = xIni + segment + segment*cent
      ctx.beginPath()
      ctx.arc(xPos, centroY, theRadius, 0,360*Math.PI/180)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }
  })
  ctx.restore()
  ctx.save()
}

function mostrarFigMini(state, xIni, xFin, centroY, divisiones) {
  const { ctx, scale, show, font } = state
  const { showMiniTheValue } = show
  const { valuesCent, valuesDec, valuesUnit } = show.showMiniFigure.wichMiniFigValues
  ctx.save()
  ctx.strokeStyle = scale.color
  ctx.fillStyle = font.color
  let segment = (xFin - xIni)/(divisiones+1)
  ctx.fillStyle = '#dbac04'
  ctx.strokeStyle = '#dbac04'
  let diamondW = scale.length*1.5
  let diamondH = diamondW*1.3
  let yDist = show.showMiniFigure.showMiniFig === 'abajo' ? scale.length*1.5 : - (scale.length*1.5 + diamondH)
  valuesCent.forEach( (cent,index) => {
    if (valuesUnit[index] === showMiniTheValue.valuesUnit[0] && valuesDec[index] === showMiniTheValue.valuesDec[0]) {
      if (valuesCent[index] !== '') {
        let xPos = xIni + segment + segment*valuesCent[index]
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
    }
  })
  ctx.restore()
  ctx.save()
}

/* -------------------------------- Mini Eje -------------------------------- */

function mostrarNumero(state, xPos, centroY, multSize, unidad, decimo, centesimo) {
  const { ctx, font, typeRect, scale } = state
  ctx.strokeStyle = font.color
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = font.size*multSize + 'px ' + font.family
  switch (typeRect) {
    case 'mixta':
      ctx.fillText(unidad, xPos, centroY)
      break;
    case 'enteros con decimales':
      
      break;
    case 'decimal':
      
      break;
    case 'centesimal':
      
      break;
    case 'enteros':
      // Parte Entera
      let deltaLine = eval(font.size)*multSize*1.5/2 - eval(scale.width)/2 + eval(scale.length)
      let textLength = ctx.measureText('00').width
      ctx.font = font.size*multSize*1.5 + 'px ' + font.family
      ctx.textAlign = 'right'
      //let textLength = ctx.measureText(txt).width
      ctx.fillText(unidad, xPos, centroY + font.size/4)
      // Parte Fracción
      ctx.font = font.size*multSize + 'px ' + font.family
      ctx.textAlign = 'center'
      deltaLine = deltaLine*0.7
      ctx.lineWidth = scale.width
      lineaFraccion(state, xPos, centroY, deltaLine, textLength)
      ctx.textBaseline = 'bottom'
      ctx.fillText(decimo, xPos + textLength/2, centroY + deltaLine + eval(scale.width))
      ctx.textBaseline = 'top'
      ctx.fillText(10, xPos + textLength/2, centroY + deltaLine)
      break;
    case 'mixta decimal':
      
      break;
    case 'mixta centesimal':
      
      break;
  }
  function lineaFraccion(state, xPos, centroY, deltaLine, textLength) {
    const { ctx, chart, scale } = state
    ctx.beginPath()
    ctx.strokeStyle = chart.axis.color
    ctx.moveTo(xPos, centroY + deltaLine)
    ctx.lineTo(xPos + textLength, centroY + deltaLine)
    ctx.stroke()
    ctx.closePath()
  }
}