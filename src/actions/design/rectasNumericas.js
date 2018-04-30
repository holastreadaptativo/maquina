import { replace } from 'actions'

export function rectNumMixtaFn(config) {
  const { container, params, variables, versions, vt } = config

  const { 
    rectType, rectOrientation, background, borderWidth, borderColor, borderStyle, borderRadius, titleValue,
    titleColor, titleSize, titleWeight, canvasPadding, containerPadding, chartPadding, /*innerChartPadding,*/ rectValuesUnit,
    rectValuesDec, rectValuesCent, valuesSeparator, axisColor, withArrows, axisWidth, fontColor, fontSize, fontFamily, fontWeight, 
    pictoImg, lupaImg, scaleDivisions, scaleValue, scaleWidth, scaleColor, scaleLength, showValues, showLens
  } = params

  let canvasPaddingAux = {}, containerPaddingAux = {}, chartPaddingAux = {}, innerChartPaddingAux = {}
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
    length: eval(scaleLength),
    showValues: showValues
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
      showLens: showLens === 'si' ? true : false,
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

  let mainData = {
    pointsData: ptosPrincipales(state),
    centerChartY: state.chart.position.y0 + (state.chart.position.y1 - state.chart.position.y0 + state.chart.axis.width)/2
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
  const { chart, scale } = state
  insTitPrinc(state)
  chart.axis.width > 0 && insEjePrincipal(state, mainData)
  scale.divisions >=1 && scale.width >= 1 && insEscala(state, mainData)
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
  return {
    segment: widthSegment,
    initPoint: startingPoint,
    endingPoint: endingPoint
  }
  ctx.restore()
  ctx.save()

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
  const { ctx, chart, canvas } = state
  const { x0, x1 } = chart.position
  const { centerChartY } = mainData
  ctx.save()
  ctx.lineWidth = chart.axis.width - 1
  ctx.strokeStyle = chart.axis.color
  let arrowsLenght = canvas.height*0.02
  ctx.lineCap="round";
  ctx.lineJoin="round";
  if (chart.axis.arrows) {
    ctx.beginPath()
    ctx.moveTo(x0 + arrowsLenght, centerChartY - arrowsLenght)
    ctx.lineTo(x0, centerChartY)
    ctx.lineTo(x0 + arrowsLenght, centerChartY + arrowsLenght)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x1 - arrowsLenght, centerChartY - arrowsLenght)
    ctx.lineTo(x1, centerChartY)
    ctx.lineTo(x1 - arrowsLenght, centerChartY + arrowsLenght)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.lineWidth = chart.axis.width
  ctx.moveTo(x0, centerChartY)
  ctx.lineTo(x1, centerChartY)
  ctx.stroke()
  ctx.restore()
  ctx.save()
}

// Insertar Escala
function insEscala(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  ctx.lineWidth = scale.width
  ctx.strokeStyle = scale.color
  ctx.lineCap="round";
  ctx.lineJoin="round";
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.beginPath()
    //ctx.moveTo(pointsData.initPoint + pointsData.segment*i, centerChartY)
    ctx.moveTo(xPos, yPos - scale.length)
    ctx.lineTo(xPos, yPos + scale.length)
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()
  ctx.save()
}

// Insertar Valores
function insValores(state, mainData) {
  const { typeRect } = state

  switch (typeRect) {
    case "mixta":
      insValoresMixta(state, mainData)      
      break;
  
    default:
      insValoresDecimal(state, mainData)
      break;
  }

  insFlechasGuias(state, mainData)
}

// Insertar Valores Mixtos
function insValoresMixta(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.fillStyle = font.color
    ctx.font = `${font.weight} ${font.size}px ${font.family}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    if (chart.image.showLens && chart.values.valuesCent === i) {
      let img = new Image()
      img.src = chart.image.lupa
      let imgHeight = pointsData.segment*2
      let imgWidth = imgHeight*1.5
      img.onload = function() {
        ctx.drawImage(img, xPos - imgWidth*0.3, yPos - imgHeight*0.4, imgWidth, imgHeight)
      }
    }
    if (i === 0 || i === scale.divisions-1) {
      ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
      ctx.fillText(`${chart.values.valuesUnit}`, xPos - ctx.measureText(chart.values.valuesUnit).width/2, yPos + scale.length*1.1)
      ctx.font = `${font.weight} ${(font.size)*0.8}px ${font.family}`
      ctx.strokeStyle = chart.axis.color
      ctx.lineWidth = chart.axis.width/2
      ctx.moveTo(xPos, yPos + scale.length*1.1 + font.size)
      ctx.lineTo(xPos + ctx.measureText('100').width, yPos + scale.length*1.1 + font.size)
      ctx.stroke()
      ctx.fillText('100', xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1 + font.size + chart.axis.width/2)
      if (i === 0) {
        ctx.fillText(`${chart.values.valuesDec}0`, xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1)
      } else if (i === scale.divisions-1) {
        ctx.fillText(`${chart.values.valuesDec+1}0`, xPos + ctx.measureText('100').width/2, yPos + scale.length*1.1)
      }
      ctx.font = `${font.weight} ${(font.size)}px ${font.family}`
    } else {
      switch (scale.showValues) {
        case 'valores':
          ctx.fillText(chart.values.valuesUnit + chart.values.valuesSeparator + eval(chart.values.valuesDec) + i, xPos, yPos + scale.length*1.1)
          break;
        case 'valor':
          if (chart.values.valuesCent === i) {
            ctx.fillText(chart.values.valuesUnit + chart.values.valuesSeparator + eval(chart.values.valuesDec) + i, xPos, yPos + scale.length*1.1)
          }
          break;
        case 'valor + punto':
          if (chart.values.valuesCent === i) {
            ctx.fillText(chart.values.valuesUnit + chart.values.valuesSeparator + eval(chart.values.valuesDec) + i, xPos, yPos + scale.length*1.1)
            ctx.beginPath()
            ctx.fillStyle = font.color
            ctx.arc(xPos, yPos, scale.length/2,0,360*Math.PI/180)
            ctx.fill()
          }
          break;
        case 'punto':
          if (chart.values.valuesCent === i) {
            ctx.beginPath()
            ctx.fillStyle = font.color
            ctx.arc(xPos, yPos, scale.length/2,0,360*Math.PI/180)
            ctx.fill()
          }
          break;
        case 'figura':
          if (chart.values.valuesCent === i) {
            let img = new Image()
            img.src = chart.image.pictoImg
            img.onload = function() {
              //ctx.beginPath()
              ctx.drawImage(img, xPos - img.width/2, yPos + scale.length*1.2);
            }
          }
          break;
        case 'ninguno':
          break;      
        default:
          ctx.fillText(chart.values.valuesUnit + chart.values.valuesSeparator + eval(chart.values.valuesDec) + i, xPos, yPos + scale.length*1.1)
          if (chart.values.valuesCent === i) {
            ctx.beginPath()
            ctx.fillStyle = font.color
            ctx.arc(xPos, yPos, scale.length/2,0,360*Math.PI/180)
            ctx.fill()
          }
          break;
      }
    }
    ctx.closePath()
  }
  ctx.restore()
  ctx.save()
}

// Insertar Valores Decimales
function insValoresDecimal(state, mainData) {
  const { ctx, scale, font, chart } = state
  const { pointsData, centerChartY } = mainData
  ctx.save()
  for (let i = 0; i < scale.divisions; i++) {
    let xPos = pointsData.initPoint + pointsData.segment*i
    let yPos = centerChartY
    ctx.fillStyle = font.color
    ctx.font = `${font.weight} ${font.size}px ${font.family}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    if (i === 0) {
      ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
      ctx.fillText(chart.values.valuesUnit, xPos, yPos + scale.length*1.1)
    } else if (i === scale.divisions-1) {
      ctx.font = `${font.weight} ${font.size*2}px ${font.family}`
      ctx.fillText(chart.values.valuesUnit + 1, xPos, yPos + scale.length*1.1)
    } else {
      ctx.fillText(chart.values.valuesUnit + chart.values.valuesSeparator + i +'0', xPos, yPos + scale.length*1.1)
    }
    ctx.closePath()
  }
  ctx.restore()
  ctx.save()
}

// Insertar Flechas Guias
function insFlechasGuias(state, mainData) {
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
    ctx.moveTo(xPos,Math.sin(320*Math.PI/180)*(yPos))
    ctx.lineTo(xPos - 10,Math.sin(320*Math.PI/180)*(yPos))
    ctx.stroke()
    ctx.closePath()
  }
}
