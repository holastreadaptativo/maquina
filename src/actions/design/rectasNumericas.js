import { replace } from 'actions'
//import { setInterval } from 'timers';

export function rectNumMixtaFn(config) {
  const { container, params, variables, versions, vt } = config

  const { 
    rectType, rectOrientation, /*background, borderWidth, borderColor, borderStyle, borderRadius, */titleValue,
    titleColor, titleSize, titleWeight, canvasPadding, containerPadding, chartPadding, /*innerChartPadding,*/ rectValuesUnit,
    rectValuesDec, rectValuesCent, valuesSeparator, axisColor, withArrows, axisWidth, fontColor, fontSize, fontFamily, fontWeight, 
    pictoImg, lupaImg, scaleDivisions, scaleValue, scaleWidth, scaleColor, scaleLength, showExValues,
    showAllValues, showTheValue, showPointValue, showFigValue, showLens, showArcs, showMiniScale, alignLens
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
    value: eval(scaleValue),
    width: eval(scaleWidth),
    color: scaleColor,
    length: eval(scaleLength)
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
    showMiniScale: showMiniScale === 'si' ? true : false
  }
  state.font = {
    family: fontFamily,
    weight: fontWeight,
    size: eval(fontSize),
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
      width: eval(axisWidth),
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
      valuesDec: eval(valuesDec),
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

  let adaptHeight = state.show.showMiniScale ? 4 : 2
  let mainData = {
    pointsData: ptosPrincipales(state),
    centerChartY: state.chart.position.y0 + (state.chart.position.y1 - state.chart.position.y0 + state.chart.axis.width)/adaptHeight
  }

  
  drawRects(state, state.canvas, 'red')
  drawRects(state, state.container, 'blue')
  drawRects(state, state.chart, 'green')
  initFn(state, mainData)

}


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

function initFn(state, mainData) {
  const { chart } = state
  insTitPrinc(state)
  chart.axis.width > 0 && insEjePrincipal(state, mainData)
  insValores(state, mainData)
}

// retornar punto inicial y final del gráfico
function ptosPrincipales(state) {
  const { ctx, chart, scale } = state
  const { x0, x1 } = chart.position
  ctx.save()
  let chartWidth = (x1 - x0)
  let widthSegment = chartWidth/(scale.divisions < 1 ? 1 : (scale.divisions + 1))
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
    if (typeRect === 'decimal' || typeRect === 'centesimal' || typeRect === 'mixta centesimal') {
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

// Insertar Valores
function insValores(state, mainData) {
  const { /*typeRect, */show } = state
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
  showMiniScale && mostrarMiniEscala(state, mainData)
}

// Mostrar Todos los Valores
function mostrarValoresExtremos(state, mainData) {
  const { ctx, scale, font, chart, typeRect } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.fillStyle = font.color
    ctx.font = `${font.weight} ${font.size}px ${font.family}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    if (i === 0 || i === scale.divisions-1) {
      ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
      if (typeRect === 'mixta centesimal' || typeRect === 'mixta') {
        ctx.fillText(`${chart.values.valuesUnit}`, xPos - ctx.measureText(chart.values.valuesUnit).width/2, yPos + scale.length*1.1)
      } else {
        i === 0 && ctx.fillText(`${chart.values.valuesUnit}`, xPos, yPos + scale.length*1.1)
        i !== 0 && ctx.fillText(`${chart.values.valuesUnit+1}`, xPos, yPos + scale.length*1.1)
      }
      ctx.font = `${font.weight} ${(font.size)}px ${font.family}`
      ctx.strokeStyle = chart.axis.color
      ctx.lineWidth = chart.axis.width/2
      if (typeRect === 'mixta centesimal' || typeRect === 'mixta') {
        ctx.moveTo(xPos, yPos + scale.length*1.1 + font.size*1.1)
        ctx.lineTo(xPos + ctx.measureText('100').width, yPos + scale.length*1.1 + font.size*1.1)
        ctx.stroke()
      }
      typeRect == 'mixta centesimal' && ctx.fillText('100', xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1 + font.size + chart.axis.width/2)
      typeRect == 'mixta' && ctx.fillText('10', xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1 + font.size + chart.axis.width/2)
      if (i === 0) {
        typeRect == 'mixta centesimal' && ctx.fillText(`${chart.values.valuesDec}0`, xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1)
        typeRect == 'mixta' && ctx.fillText(`${chart.values.valuesDec}`, xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1)
      } else if (i === scale.divisions-1) {
        typeRect == 'mixta centesimal' && ctx.fillText(`${chart.values.valuesDec+1}0`, xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1)
        typeRect == 'mixta' && ctx.fillText(`${chart.values.valuesDec+1}`, xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1)
      }
    }
  }
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
      if (i !== valuesDec + 1) {
        if (typeRect === 'enteros' || typeRect === 'decimal' || typeRect === 'centesimal') {
          ctx.fillText(valuesUnit + valuesSeparator + i, xPos, yPos + scale.length*1.1)
        } else if (typeRect === 'mixta' || typeRect === 'mixta decimal') {
          ctx.strokeStyle = chart.axis.color
          ctx.lineWidth = chart.axis.width/2
          ctx.moveTo(xPos, yPos + scale.length*1.1 + font.size)
          typeRect === 'mixta' && ctx.lineTo(xPos + ctx.measureText('10').width, yPos + scale.length*1.1 + font.size)
          typeRect === 'mixta centesimal' && ctx.lineTo(xPos + ctx.measureText('100').width, yPos + scale.length*1.1 + font.size)
          ctx.stroke()
        }
      }
    }
  }
  ctx.restore()
  ctx.save()
}

// Mostrar Valor 
function mostrarValor(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  ctx.fillStyle = font.color
  ctx.font = `${font.weight} ${font.size}px ${font.family}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    if (i === chart.values.valuesCent) {
      ctx.fillText(chart.values.valuesUnit + chart.values.valuesSeparator + eval(chart.values.valuesDec) + i, xPos, yPos + scale.length*1.1)
    }
  }
}

// Mostrar Punto Valor
function mostrarPuntoValor(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  ctx.fillStyle = font.color
  ctx.lineWidth = scale.width*0.6
  ctx.strokeStyle = chart.axis.color
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    if (chart.values.valuesCent === i) {
      ctx.beginPath()
      ctx.arc(xPos, centerChartY, scale.length/2,0,360*Math.PI/180)
      ctx.fill()
      ctx.stroke()
    }
  }
  ctx.restore()
  ctx.save()
}

// Mostrar Figura Valor
function mostrarFigValor(state, mainData) {
  const { ctx, scale, font, chart, show } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    if (chart.values.valuesCent === i) {
      let img = new Image()
      img.src = chart.image.pictoImg
      img.onload = function() {
        let imgHeight = show.showTheValue ? font.size*1.1 : 0
        ctx.drawImage(img, xPos - img.width/2, yPos + scale.length*1.2 + imgHeight);
      }
    }
  }
}

// Mostrar Lupa
function mostrarLupa(state, mainData) {
  const { ctx, scale, chart, show } = state
  const { pointsData, centerChartY } = mainData

  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    if (chart.values.valuesCent === i) {
      let img = new Image()
      img.src = chart.image.lupa
      let imgHeight = pointsData.segment*2.3
      let imgWidth = imgHeight*1.5
      img.onload = function() {
        let moveLens = show.alignLens === true ? 0 : imgWidth*0.15
        ctx.drawImage(img, xPos - imgWidth*0.3 + moveLens, yPos - imgHeight*0.4, imgWidth, imgHeight)
      }
    }
  }
}

// Mostrar Arcos
function mostrarArcos(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < chart.values.valuesCent; i++) {
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
  const { ctx, chart, scale } = state
  const { x0, x1 } = chart.position
  const { centerChartY } = mainData
  ctx.save()
  let lineLength = (x1 - x0)/4
  let xPosInit = x0 + lineLength
  let xPosFin = x1 - lineLength
  let centerY = centerChartY*2.2
  generarEje(state, xPosInit, xPosFin, centerY)
  generarEscala(state, xPosInit, xPosFin, centerY, scale.divisions)

  ctx.restore()
  ctx.save()

}