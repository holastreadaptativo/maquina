import { replace } from 'actions'
//import { setInterval } from 'timers';

export function rectNumMixtaFn(config) {
  const { container, params, variables, versions, vt } = config

  const { 
    rectType, rectOrientation, background, borderWidth, borderColor, borderStyle, borderRadius, titleValue,
    titleColor, titleSize, titleWeight, canvasPadding, containerPadding, chartPadding, /*innerChartPadding,*/ rectValuesUnit,
    rectValuesDec, rectValuesCent, valuesSeparator, axisColor, withArrows, axisWidth, fontColor, fontSize, fontFamily, fontWeight, 
    pictoImg, lupaImg, scaleDivisions, scaleValue, scaleWidth, scaleColor, scaleLength, showExValues,
    showAllValues, showTheValue, showPointValue, showFigValue, showLens, showArcs, showMiniScale, alignLens,
    showMiniArcs, showMiniExValues, showMiniAllValues, showMiniTheValue, showMiniPointValue, showMiniFigValue, showMiniGuides
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

  let state = {

  }
  state.ctx = c.getContext('2d')
  state.typeRect = rectType
  state.scale = {
    divisions: eval(scaleDivisions) + 1,
    value: eval(scaleValue) === 0 ? 1 : eval(scaleValue),
    width: c.width < 500 ? eval(scaleWidth)*0.6 : eval(scaleWidth),
    color: scaleColor,
    length: c.width < 500 ? eval(scaleLength)*0.7 : eval(scaleLength)
  }
  state.show = {
    showExValues: showExValues === 'si' ? true : false,
    showAllValues: showAllValues === 'si' ? true : false,
    showTheValue: showTheValue === 'si' ? true : false,
    showPointValue: showPointValue === 'si' ? true : false,
    showFigValue: showFigValue === 'si' ? true : false,
    showLens: showLens === 'si' ? true : false,
    alignLens: alignLens === 'punto' ? true : false,
    showArcs: showArcs === 'si' ? true : false,
    showMiniScale: showMiniScale === 'si' ? true : false,
    showMiniExValues: showMiniExValues === 'si' ? true: false,
    showMiniAllValues: showMiniAllValues === 'si' ? true: false,
    showMiniTheValue: showMiniTheValue === 'si' ? true: false,
    showMiniPointValue: showMiniPointValue === 'si' ? true: false,
    showMiniFigValue: showMiniFigValue === 'si' ? true: false,
    showMiniArcs: showMiniArcs === 'si' ? true: false,
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
      valuesUnit: eval(valuesUnit),
      valuesDec: eval(valuesDec) >= scaleDivisions ? scaleDivisions : eval(valuesDec),
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

  let adaptHeight = 2
  if (state.typeRect !== 'enteros' && state.typeRect !== 'mixta') {
    if (state.show.showMiniScale) {
      adaptHeight = 4
    }
  }
  let mainData = {
    pointsData: ptosPrincipales(state),
    centerChartY: state.chart.position.y0 + (state.chart.position.y1 - state.chart.position.y0 + state.chart.axis.width)/adaptHeight
  }

  
  //drawRects(state, state.canvas, 'red')
  //drawRects(state, state.container, 'blue')
  //drawRects(state, state.chart, 'green')
  initFn(state, mainData)

}


// function drawRects(state, el, color) {
//   const { ctx } = state
//   ctx.save()
//   ctx.beginPath()
//   ctx.strokeStyle = color
//   ctx.rect(el.position.x0, el.position.y0, el.position.x1 - el.position.x0, el.position.y1 - el.position.y0)
//   ctx.stroke()
//   ctx.restore()
//   ctx.save()
// }

function initFn(state, mainData) {
  const { chart } = state
  insTitPrinc(state)
  chart.axis.width > 0 && insEjePrincipal(state, mainData)
  insElementos(state, mainData)
}

// retornar punto inicial y final del gráfico
function ptosPrincipales(state) {
  const { ctx, chart, scale } = state
  const { x0, x1 } = chart.position
  ctx.save()
  let chartWidth = (x1 - x0)
  let widthSegment = chartWidth/(scale.divisions < 1 ? 1 : (scale.divisions+1))
  let startingPoint = x0 + widthSegment
  let endingPoint = x1 - widthSegment
  ctx.restore()
  ctx.save()
  return {
    segment: widthSegment,
    initPoint: startingPoint,
    endingPoint: endingPoint
  }
}

// Main Title
function insTitPrinc(state) {
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

// Insertar Eje Principal
function insEjePrincipal(state, mainData) {
  const { ctx, chart, scale } = state
  const { x0, x1 } = chart.position
  const { centerChartY } = mainData
  ctx.save()
  generarEje(state, x0, x1, centerChartY)
  scale.divisions >= 1 && scale.width >= 1 && generarEscala(state, x0, x1, centerChartY, scale.divisions)
  ctx.restore()
  ctx.save()
}

// Generar Eje
function generarEje(state, xIni, xFin, yCentro) {
  const { ctx, chart, canvas } = state
  ctx.save()
  ctx.lineWidth = chart.axis.width - 1
  ctx.strokeStyle = chart.axis.color
  let arrowsLenght = canvas.width*0.01
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  if (chart.axis.arrows) {
    ctx.beginPath()
    ctx.moveTo(xIni + arrowsLenght, yCentro - arrowsLenght)
    ctx.lineTo(xIni, yCentro)
    ctx.lineTo(xIni + arrowsLenght, yCentro + arrowsLenght)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(xFin - arrowsLenght, yCentro - arrowsLenght)
    ctx.lineTo(xFin, yCentro)
    ctx.lineTo(xFin - arrowsLenght, yCentro + arrowsLenght)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.lineWidth = chart.axis.width
  ctx.moveTo(xIni, yCentro)
  ctx.lineTo(xFin, yCentro)
  ctx.stroke()
  ctx.restore()
  ctx.save()
}

// Generar Escala
function generarEscala(state, xIni, xFin, yCentro, divisiones) {
  const { ctx, scale, show, chart, typeRect } = state
  const { x0, x1 } = chart.position
  ctx.save()
  ctx.strokeStyle = scale.color
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  let segment = (xFin - xIni)/(divisiones+1)
  for (let i = 0; i < divisiones; i++) {
    ctx.lineWidth = scale.width
    let bordersScales = scale.length
    if (show.showMiniScale && (xFin - xIni) < (x1 - x0)*0.8 ) {
      ctx.lineWidth = scale.width*0.8
      if (i === 0 || i === (divisiones - 1)) {
        ctx.lineWidth = scale.width
        bordersScales = scale.length*1.2
      }
    }
    ctx.beginPath()
    ctx.moveTo(xIni + segment + segment*i, yCentro - bordersScales)
    ctx.lineTo(xIni + segment + segment*i, yCentro + bordersScales)
    ctx.stroke()
    ctx.closePath()
    if (typeRect === 'decimal' || typeRect === 'centesimal' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
      if (i !== (divisiones - 1) && (xFin - xIni) > (x1 - x0)*0.8) {
        for (let j = 1; j < 10; j ++) {
          let extraLarge = j === 5 ? bordersScales*0.2 : 0
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(xIni + segment + segment*i + segment/10*j, yCentro - bordersScales*0.7 - extraLarge)
          ctx.lineTo(xIni + segment + segment*i + segment/10*j, yCentro + bordersScales*0.7 + extraLarge)
          ctx.stroke()
          ctx.closePath()
        }
      }
    }
  }
  ctx.restore()
  ctx.save()
}

// Insertar Elementos
function insElementos(state, mainData) {
  const { typeRect, show } = state
  const {
    showExValues, showAllValues, showTheValue, showPointValue, showFigValue, showLens, showArcs, showMiniScale
  } = show

  showExValues && mostrarValoresExtremos(state, mainData)
  showAllValues && mostrarValores(state, mainData)
  showTheValue && mostrarValor(state, mainData)
  showPointValue && mostrarPuntoValor(state, mainData)
  showFigValue && mostrarFigValor(state, mainData)
  showLens && mostrarLupa(state, mainData)
  showArcs && mostrarArcos(state, mainData)
  if (typeRect !== 'enteros' && typeRect !== 'mixta') {
    showMiniScale && mostrarMiniEscala(state, mainData)
  }
}

// Mostrar Todos los Valores
function mostrarValoresExtremos(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.fillStyle = font.color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    if (i === 0 || i === scale.divisions-1) {
      ctx.font = `${font.weight} ${font.size*3}px ${font.family}`
      i === 0 && ctx.fillText(`${chart.values.valuesUnit}`, xPos, yPos + scale.length*1.1)
      i !== 0 && ctx.fillText(`${chart.values.valuesUnit+1}`, xPos, yPos + scale.length*1.1)
    }
  }
  ctx.restore()
  ctx.save()
}

// Mostrar Todos los Valores
function mostrarValores(state, mainData) {
  const { ctx, scale, font, chart, typeRect } = state
  const { valuesUnit, valuesSeparator, valuesDec } = chart.values
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.fillStyle = font.color
    ctx.font = `${font.weight} ${font.size}px ${font.family}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    if (i > 0 && i < scale.divisions - 1) {
      if (i !== valuesDec) {
        if (typeRect === 'enteros' || typeRect === 'decimal' || typeRect === 'centesimal') {
          ctx.font = `${font.weight} ${font.size*1.5}px ${font.family}`
          let valToShow = typeRect === 'enteros' || typeRect === 'decimal' ? valuesUnit + valuesSeparator + i : valuesUnit + valuesSeparator + i +'0'
          ctx.fillText(valToShow, xPos, yPos + scale.length*1.1)
        } else if (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
          ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
          //let enteroX = ctx.measureText('0').width/2
          let enteroX = ctx.measureText('0').width/2
          let decNumbDist = chart.values.valuesUnit === 0 ? -enteroX : 0
          chart.values.valuesUnit !== 0 && ctx.fillText(chart.values.valuesUnit, xPos - enteroX, yPos + scale.length*1.1)
          ctx.font = `${font.weight} ${font.size}px ${font.family}`
          let lineL = typeRect !== 'mixta centesimal' ? ctx.measureText('00').width : ctx.measureText('000').width
          let denVal = typeRect !== 'mixta centesimal' ? (scale.divisions-1) : (scale.divisions-1)*10
          let numMult = typeRect !== 'mixta centesimal' ? 1 : 10
          ctx.textBaseline = 'bottom'
          ctx.fillText(denVal, xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1 + font.size*2.5)
          ctx.textBaseline = 'top'
          ctx.fillText((i*numMult), xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1)
          ctx.beginPath()
          ctx.strokeStyle = chart.axis.color
          ctx.lineWidth = chart.axis.width/2
          ctx.lineCap = 'round'
          ctx.moveTo(xPos + decNumbDist, yPos + scale.length*1.1 + font.size*1.1)
          ctx.lineTo(xPos + decNumbDist + lineL, yPos + scale.length*1.1 + font.size*1.1)
          ctx.stroke()
          ctx.closePath()
          if (eval(valuesDec) <= eval(scale.divisions)) {
          }
        }
      }
    }
  }
  ctx.restore()
  ctx.save()
}

// Mostrar Valor 
function mostrarValor(state, mainData) {
  const { ctx, scale, font, chart, typeRect, show } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  ctx.fillStyle = font.color
  ctx.font = `${font.weight} ${font.size}px ${font.family}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  let xPos = pointsData.initPoint + pointsData.segment*chart.values.valuesDec
  let yPos = centerChartY
  let distImg = (typeRect === 'enteros' || typeRect === 'mixta') && show.showFigValue ? scale.length*2.5 : 0
  if (typeRect === 'enteros' || typeRect === 'decimal' || typeRect === 'centesimal') {
    ctx.font = `${font.weight} ${font.size*1.5}px ${font.family}`
    let valPoint = typeRect === 'centesimal' ? chart.values.valuesUnit + chart.values.valuesSeparator + chart.values.valuesDec +'0' : chart.values.valuesUnit + chart.values.valuesSeparator + chart.values.valuesDec
    ctx.fillText(valPoint, xPos, yPos + scale.length*1.1 + distImg)
  } else if (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
    ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
    //let enteroX = ctx.measureText('0').width/2
    let enteroX = ctx.measureText('0').width/2
    let decNumbDist = chart.values.valuesUnit === 0 ? -enteroX : 0
    chart.values.valuesUnit !== 0 && ctx.fillText(chart.values.valuesUnit, xPos - enteroX, yPos + scale.length*1.1 + distImg)
    ctx.font = `${font.weight} ${font.size}px ${font.family}`
    let lineL = typeRect !== 'mixta centesimal' ? ctx.measureText('00').width : ctx.measureText('000').width
    let denVal = typeRect !== 'mixta centesimal' ? (scale.divisions-1) : (scale.divisions-1)*10
    let numMult = typeRect !== 'mixta centesimal' ? 1 : 10
    ctx.textBaseline = 'bottom'
    ctx.fillText(denVal, xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1 + font.size*2.5 + distImg)
    ctx.textBaseline = 'top'
    ctx.fillText((chart.values.valuesDec)*numMult, xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1 + distImg)
    ctx.beginPath()
    ctx.strokeStyle = chart.axis.color
    ctx.lineWidth = chart.axis.width/2
    ctx.lineCap = 'round'
    ctx.moveTo(xPos + decNumbDist, yPos + scale.length*1.1 + font.size*1.1 + distImg)
    ctx.lineTo(xPos + decNumbDist + lineL, yPos + scale.length*1.1 + font.size*1.1 + distImg)
    ctx.stroke()
    ctx.closePath()
  }
}

// Mostrar Punto Valor
function mostrarPuntoValor(state, mainData) {
  const { ctx, scale, font, chart, typeRect } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  ctx.fillStyle = font.color
  ctx.lineWidth = scale.width*0.6
  ctx.strokeStyle = chart.axis.color
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    if (typeRect === 'enteros' || typeRect === 'mixta') {
      if (chart.values.valuesDec === i) {
        ctx.beginPath()
        ctx.arc(xPos, centerChartY, scale.length/2,0,360*Math.PI/180)
        ctx.fill()
        ctx.stroke()
      }
    } else if (typeRect === 'decimal' || typeRect === 'centesimal' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
      if (chart.values.valuesDec === i) {
        for (let j = 0; j < 10; j++) {
          if (chart.values.valuesCent === j) {
            ctx.beginPath()
            ctx.lineWidth = scale.width*0.4
            ctx.arc(xPos + (pointsData.segment/10)*j, centerChartY, scale.length/3,0,360*Math.PI/180)
            ctx.fill()
            ctx.stroke()
          }
        }
      }
    }
  }
  ctx.restore()
  ctx.save()
}

// Mostrar Figura Valor
function mostrarFigValor(state, mainData) {
  const { ctx, scale, /*font,*/ chart, /*show,*/ typeRect } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  ctx.beginPath()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    // let imgHeight = show.showTheValue ? (typeRect === 'mixta' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') ? font.size*2.1 : font.size*1.1 : 0
    // let img = new Image()
    // img.src = chart.image.pictoImg
    ctx.fillStyle = '#dbac04'
    ctx.strokeStyle = '#dbac04'
    let diamondW = scale.length*1.5
    let diamondH = diamondW*1.3
    if (typeRect === 'enteros' || typeRect === 'mixta') {
      if (chart.values.valuesDec === i) {
        ctx.moveTo(xPos, yPos + scale.length*1.5)
        ctx.lineTo(xPos + diamondW/2, yPos + diamondH/2 + scale.length*1.5)
        ctx.lineTo(xPos, yPos + diamondH + scale.length*1.5)
        ctx.lineTo(xPos - diamondW/2, yPos + diamondH/2 + scale.length*1.5)
        ctx.lineTo(xPos, yPos + scale.length*1.5)
        // img.onload = function() {
        //   ctx.drawImage(img, xPos - img.width/2, yPos + scale.length*1.2 + imgHeight);
        // }
      }
    } else if (typeRect === 'decimal' || typeRect === 'centesimal' || typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
      if (chart.values.valuesDec === i) {
        for (let j = 0; j < 10; j++) {
          if (chart.values.valuesCent === j) {
            ctx.moveTo(xPos + (pointsData.segment/10)*j, yPos + scale.length*1.5)
            ctx.lineTo(xPos + (pointsData.segment/10)*j + diamondW/2, yPos + diamondH/2 + scale.length*1.5)
            ctx.lineTo(xPos + (pointsData.segment/10)*j, yPos + diamondH + scale.length*1.5)
            ctx.lineTo(xPos + (pointsData.segment/10)*j - diamondW/2, yPos + diamondH/2 + scale.length*1.5)
            ctx.lineTo(xPos + (pointsData.segment/10)*j, yPos + scale.length*1.5)
            // img.onload = function() {
            //   ctx.drawImage(img, xPos + (pointsData.segment/10)*j - img.width/2, yPos + scale.length*1.2 + imgHeight);
            // }
          }
        }
      }
    }
  }
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
}

// Mostrar Lupa
function mostrarLupa(state, mainData) {
  const { ctx, scale, chart, show } = state
  const { pointsData, centerChartY } = mainData

  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    if (chart.values.valuesDec === i) {
      let img = new Image()
      img.src = chart.image.lupa
      let imgHeight = pointsData.segment*2.6
      let imgWidth = imgHeight*1.5
      img.onload = function() {
        let moveLens = show.alignLens === true ? 0 : imgWidth*0.15
        ctx.drawImage(img, xPos - imgWidth*0.3 + moveLens, yPos - imgHeight*0.3, imgWidth, imgHeight)
      }
    }
  }
}

// Mostrar Arcos
function mostrarArcos(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < chart.values.valuesDec; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.strokeStyle = font.color
    ctx.lineWidth = Math.round(scale.width/2)
    ctx.beginPath()
    ctx.arc(xPos + pointsData.segment/2,yPos,pointsData.segment/2,220*Math.PI/180,320*Math.PI/180)
    ctx.moveTo(xPos + pointsData.segment/2 + (pointsData.segment/2)*Math.cos(40*Math.PI/180), (yPos) - (pointsData.segment/2)*Math.sin(40*Math.PI/180) - pointsData.segment*0.15)
    ctx.lineTo(xPos + pointsData.segment/2 + (pointsData.segment/2)*Math.cos(40*Math.PI/180), (yPos) - (pointsData.segment/2)*Math.sin(40*Math.PI/180))
    ctx.lineTo(xPos + pointsData.segment/2 + (pointsData.segment/2)*Math.cos(40*Math.PI/180) - pointsData.segment*0.15, (yPos) - (pointsData.segment/2)*Math.sin(40*Math.PI/180))
    ctx.stroke()
    ctx.closePath()
  }
}

// Mostrar Mini Escala
function mostrarMiniEscala(state, mainData) {
  const { ctx, chart, /*scale,*/ show } = state
  const { x0, x1 } = chart.position
  const { centerChartY } = mainData
  ctx.save()
  let lineLength = (x1 - x0)/8
  let xPosInit = x0 + lineLength
  let xPosFin = x1 - lineLength
  let centerY = centerChartY*2.2
  generarEje(state, xPosInit, xPosFin, centerY)
  generarEscala(state, xPosInit, xPosFin, centerY, 11)
  show.showMiniExValues && mostrarValExtMini(state, xPosInit, xPosFin, centerY)
  show.showMiniAllValues && mostratValoresMini(state, xPosInit, xPosFin, centerY)
  show.showMiniTheValue && mostratElValorMini(state, xPosInit, xPosFin, centerY)
  show.showMiniPointValue && mostratPtoValorMini(state, xPosInit, xPosFin, centerY)
  show.showMiniFigValue && mostraFigValorMini(state, xPosInit, xPosFin, centerY)
  show.showMiniArcs && mostrarArcosMini(state, xPosInit, xPosFin, centerY, chart.values.valuesCent)
  show.showMiniGuides && lineasGuiaMiniRect(state, xPosInit, xPosFin, centerY, mainData)

  ctx.restore()
  ctx.save()

  function lineasGuiaMiniRect(state, xPosInit, xPosFin, centerY, mainData) {
    const { ctx, scale, font, chart } = state
    ctx.save()
    ctx.lineCap = 'round'
    ctx.strokeStyle = chart.axis.color
    ctx.lineWidth = Math.round(chart.axis.width*0.5)
    let segmentMini = (xPosFin - xPosInit)/12
    ctx.beginPath()
    ctx.moveTo(mainData.pointsData.initPoint + mainData.pointsData.segment*chart.values.valuesDec, mainData.centerChartY + scale.length*1.3 + font.size*2.5)
    ctx.lineTo(xPosInit + segmentMini, centerY - scale.length*2.5)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(mainData.pointsData.initPoint + mainData.pointsData.segment*(1 + chart.values.valuesDec), mainData.centerChartY + scale.length*1.3 + font.size*2.5)
    ctx.lineTo(xPosInit + segmentMini*11, centerY - scale.length*2.5)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.save()
  }

  function mostraFigValorMini(state, xPosIni, xPosFin, posY) {
    const { ctx, scale, /*font, show,*/ chart } = state
    ctx.save()
    ctx.beginPath()
    let segment = (xPosFin - xPosIni)/12
    let xPos = xPosIni + segment + segment*chart.values.valuesCent
    let yPos = posY
    ctx.fillStyle = '#dbac04'
    ctx.strokeStyle = '#dbac04'
    let diamondW = scale.length*1.5
    let diamondH = diamondW*1.3
    ctx.moveTo(xPos, yPos + scale.length*1.5)
    ctx.lineTo(xPos + diamondW/2, yPos + diamondH/2 + scale.length*1.5)
    ctx.lineTo(xPos, yPos + diamondH + scale.length*1.5)
    ctx.lineTo(xPos - diamondW/2, yPos + diamondH/2 + scale.length*1.5)
    ctx.lineTo(xPos, yPos + scale.length*1.5)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    // let img = new Image()
    // img.src = chart.image.pictoImg
    // img.onload = function() {
    //   let imgHeight = show.showMiniTheValue ? font.size*2.1 : 0
    //   ctx.drawImage(img, xPos - img.width/2, yPos + scale.length*1.2 + imgHeight);
    // }
    ctx.restore()
    ctx.save()
  }

  function mostratPtoValorMini(state, xPosIni, xPosFin, posY) {
    const { ctx, scale, font, chart } = state
    ctx.save()
    let segment = (xPosFin - xPosIni)/12
    let xPos = xPosIni + segment + segment*chart.values.valuesCent
    let yPos = posY
    ctx.fillStyle = font.color
    ctx.lineWidth = scale.width*0.6
    ctx.strokeStyle = chart.axis.color
    ctx.beginPath()
    ctx.arc(xPos, yPos, scale.length/2,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.save()
  }

  function mostratElValorMini(state, xPosIni, xPosFin, posY) {
    const { ctx, typeRect, scale, font, chart, show } = state
    const { valuesUnit, valuesSeparator, valuesDec, valuesCent } = chart.values
    ctx.save()
    let segment = (xPosFin - xPosIni)/12
    let xPos = xPosIni + segment + segment*chart.values.valuesCent
    let yPos = posY
    ctx.fillStyle = font.color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.font = `${font.weight} ${font.size*1.8}px ${font.family}`
    let distImg = show.showMiniFigValue ? scale.length*2.5 : 0
    if (typeRect === 'decimal' || typeRect === 'centesimal') {
      ctx.font = `${font.weight} ${Math.round(font.size*1.1)}px ${font.family}`
      ctx.fillText(valuesUnit + valuesSeparator + valuesDec + '' + valuesCent , xPos, yPos + scale.length*1.1 + distImg)
    } else if (typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
      let enteroX = ctx.measureText('0').width/2
      let decNumbDist = chart.values.valuesUnit === 0 ? -enteroX : 0
      chart.values.valuesUnit !== 0 && ctx.fillText(chart.values.valuesUnit, xPos - enteroX, yPos + scale.length*1.1 + distImg)
      ctx.font = `${font.weight} ${font.size*0.8}px ${font.family}`
      let lineL = ctx.measureText('00').width
      let denVal = (scale.divisions-1)*10
      let numMult = 10
      ctx.textBaseline = 'bottom'
      ctx.fillText(denVal, xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1 + font.size*2.5 + distImg)
      ctx.textBaseline = 'top'
      ctx.fillText((chart.values.valuesDec*numMult + chart.values.valuesCent), xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1 + distImg)
      ctx.beginPath()
      ctx.strokeStyle = chart.axis.color
      ctx.lineWidth = chart.axis.width/2
      ctx.lineCap = 'round'
      ctx.moveTo(xPos + decNumbDist, yPos + scale.length*1.1 + font.size*1.1 + distImg)
      ctx.lineTo(xPos + decNumbDist + lineL, yPos + scale.length*1.1 + font.size*1.1 + distImg)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
      ctx.save()
    }
    
  }

  function mostratValoresMini(state, xPosIni, xPosFin, posY) {
    const { ctx, typeRect, scale, font, chart } = state
    const { valuesUnit, valuesSeparator, valuesDec } = chart.values
    ctx.save()
    for (let i = 0; i <= 10; i++) {
      let segment = (xPosFin - xPosIni)/12
      let xPos = xPosIni + segment + segment*i
      let yPos = posY
      ctx.fillStyle = font.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      if (i !== chart.values.valuesCent && i > 0 && i < 10) {
        if (typeRect === 'decimal' || typeRect === 'centesimal') {
          ctx.font = `${font.weight} ${Math.round(font.size*1.1)}px ${font.family}`
          ctx.fillText(valuesUnit + valuesSeparator + valuesDec + '' + i , xPos, yPos + scale.length*1.1)
        } else if (typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
          ctx.font = `${font.weight} ${font.size*1.8}px ${font.family}`
          let enteroX = ctx.measureText('0').width/2
          let decNumbDist = chart.values.valuesUnit === 0 ? -enteroX : 0
          chart.values.valuesUnit !== 0 && ctx.fillText(chart.values.valuesUnit, xPos - enteroX, yPos + scale.length*1.1)
          ctx.font = `${font.weight} ${font.size*0.8}px ${font.family}`
          let lineL = ctx.measureText('00').width
          let denVal = (scale.divisions-1)*10
          let numMult = 10
          ctx.textBaseline = 'bottom'
          ctx.fillText(denVal, xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1 + font.size*2.5)
          ctx.textBaseline = 'top'
          ctx.fillText((chart.values.valuesDec*numMult + i), xPos + lineL/2 + decNumbDist, yPos + scale.length*1.1)
          ctx.beginPath()
          ctx.strokeStyle = chart.axis.color
          ctx.lineWidth = chart.axis.width/2
          ctx.lineCap = 'round'
          ctx.moveTo(xPos + decNumbDist, yPos + scale.length*1.1 + font.size*1.1)
          ctx.lineTo(xPos + decNumbDist + lineL, yPos + scale.length*1.1 + font.size*1.1)
          ctx.stroke()
          ctx.closePath()
        }
      }
    }
    ctx.restore()
    ctx.save()
  }

  function mostrarValExtMini(state, xPosIni, xPosFin, posY) {
    const { ctx, typeRect, scale, font, chart } = state
    const { valuesUnit, valuesSeparator, valuesDec } = chart.values
    ctx.save()
    let valueDec = valuesDec
    for (let i = 0; i <= 10; i++) {
      let segment = (xPosFin - xPosIni)/12
      let xPos = xPosIni + segment + segment*i
      let yPos = posY
      ctx.fillStyle = font.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      if (i === 0 || i === 10) {
        if (typeRect === 'decimal' || typeRect === 'centesimal') {
          ctx.font = `${font.weight} ${font.size*1.5}px ${font.family}`
          //let valToShow = typeRect === 'enteros' || typeRect === 'decimal' ? valuesUnit + valuesSeparator + valueDec : valuesUnit + valuesSeparator + valueDec +'0'
          ctx.fillText(valuesUnit + valuesSeparator + valueDec +'0', xPos, yPos + scale.length*1.1)
        } else if (typeRect === 'mixta decimal' || typeRect === 'mixta centesimal') {
          ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
          //i === 0 && ctx.fillText(`${chart.values.valuesUnit}`, xPos, yPos + scale.length*1.1)
          //i !== 0 && ctx.fillText(`${chart.values.valuesUnit+1}`, xPos, yPos + scale.length*1.1)
          let enteroX = ctx.measureText('0').width/2
          let decNumbDist = chart.values.valuesUnit === 0 ? -enteroX : 0
          chart.values.valuesUnit !== 0 && ctx.fillText(chart.values.valuesUnit, xPos - enteroX, yPos + scale.length*1.2)
          ctx.font = `${font.weight} ${font.size}px ${font.family}`
          let lineL = ctx.measureText('00').width
          let denVal = (scale.divisions-1)*10
          let numMult = 10
          ctx.textBaseline = 'bottom'
          ctx.fillText(denVal, xPos + lineL/2 + decNumbDist, yPos + scale.length*1.2 + font.size*2.5)
          ctx.textBaseline = 'top'
          ctx.fillText((valueDec*numMult), xPos + lineL/2 + decNumbDist, yPos + scale.length*1.2)
          ctx.beginPath()
          ctx.strokeStyle = chart.axis.color
          ctx.lineWidth = chart.axis.width/2
          ctx.lineCap = 'round'
          ctx.moveTo(xPos + decNumbDist, yPos + scale.length*1.2 + font.size*1.1)
          ctx.lineTo(xPos + decNumbDist + lineL, yPos + scale.length*1.2 + font.size*1.1)
          ctx.stroke()
          ctx.closePath()
        }
        valueDec++
      }
    }
    ctx.restore()
    ctx.save()
  }

  function mostrarArcosMini(state, xPosIni, xPosFin, posY, pointBreak) {
    const { ctx, scale, font } = state
    ctx.save()
    for (let i = 0; i < pointBreak; i++) {
      let segment = (xPosFin - xPosIni)/12
      let xPos = xPosIni + segment + segment*i
      let yPos = posY
      ctx.strokeStyle = font.color
      ctx.lineWidth = Math.round(scale.width/2)
      ctx.beginPath()
      ctx.arc(xPos + segment/2,yPos - segment/3,segment/2,220*Math.PI/180,320*Math.PI/180)
      ctx.moveTo(xPos + segment/2 + (segment/2)*Math.cos(40*Math.PI/180), (yPos - segment/3) - (segment/2)*Math.sin(40*Math.PI/180) - segment*0.15)
      ctx.lineTo(xPos + segment/2 + (segment/2)*Math.cos(40*Math.PI/180), (yPos - segment/3) - (segment/2)*Math.sin(40*Math.PI/180))
      ctx.lineTo(xPos + segment/2 + (segment/2)*Math.cos(40*Math.PI/180) - segment*0.15, (yPos - segment/3) - (segment/2)*Math.sin(40*Math.PI/180))
      ctx.stroke()
      ctx.closePath()
    }
    ctx.restore()
    ctx.save()
  }
}